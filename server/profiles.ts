import type { DrizzleD1Database } from "drizzle-orm/d1";
import { eq, inArray } from "drizzle-orm";

import * as schema from "@server/schema";
import { user, type UserSchema } from "@server/schema";

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
    return await this.db.select().from(user).where(eq(user.roomId, roomId));
  }

  async update(id: string, data: Partial<Pick<UserSchema, "name" | "imageUrl">>) {
    return await this.db.update(user).set(data).where(eq(user.id, id));
  }

  async delete(id: string) {
    return await this.db.delete(user).where(eq(user.id, id));
  }

  async upsert(spotifyUsers: User[], roomId: string) {
    const values = spotifyUsers.map((spotifyUser) => ({
      id: spotifyUser.id,
      roomId,
      name: spotifyUser.display_name ?? spotifyUser.id,
      imageUrl: spotifyUser.images?.[0]?.url ?? null,
    }));

    if (values.length === 0) return;

    return await this.db.insert(user).values(values).onConflictDoNothing();
  }
}
