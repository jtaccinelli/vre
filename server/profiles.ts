import { eq, inArray } from "drizzle-orm";
import type { DrizzleD1Database } from "drizzle-orm/d1";

import * as schema from "@server/schema";
import { user, userRoom, type UserSchema } from "@server/schema";

export class ProfileHandler {
  db;

  constructor(db: DrizzleD1Database<typeof schema>) {
    this.db = db;
  }

  async getByIds(ids: string[]) {
    if (ids.length === 0) return [];
    return await this.db.select().from(user).where(inArray(user.id, ids));
  }

  async getByRoomId(roomId: string) {
    const rows = await this.db
      .select({ user })
      .from(user)
      .innerJoin(userRoom, eq(userRoom.userId, user.id))
      .where(eq(userRoom.roomId, roomId));
    return rows.map((row) => row.user);
  }

  async update(id: string, data: Partial<Pick<UserSchema, "name" | "imageUrl">>) {
    return await this.db.update(user).set(data).where(eq(user.id, id));
  }

  async delete(id: string) {
    return await this.db.delete(user).where(eq(user.id, id));
  }

  async upsert(spotifyUsers: User[], roomId: string) {
    if (spotifyUsers.length === 0) return;

    const userValues = spotifyUsers.map((spotifyUser) => ({
      id: spotifyUser.id,
      name: spotifyUser.display_name ?? spotifyUser.id,
      imageUrl: spotifyUser.images?.[0]?.url ?? null,
    }));

    const userRoomValues = spotifyUsers.map((spotifyUser) => ({
      userId: spotifyUser.id,
      roomId,
    }));

    const chunkSize = 25;

    for (let index = 0; index < userValues.length; index += chunkSize) {
      const chunk = userValues.slice(index, index + chunkSize);
      await this.db.insert(user).values(chunk).onConflictDoNothing();
    }

    for (let index = 0; index < userRoomValues.length; index += chunkSize) {
      const chunk = userRoomValues.slice(index, index + chunkSize);
      await this.db.insert(userRoom).values(chunk).onConflictDoNothing();
    }
  }
}
