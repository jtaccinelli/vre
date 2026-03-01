import type { DrizzleD1Database } from "drizzle-orm/d1";
import { and, eq, like, or } from "drizzle-orm";

import * as schema from "@server/schema";
import { room, userRoom, type RoomSchema } from "@server/schema";

export class RoomHandler {
  db;

  constructor(db: DrizzleD1Database<typeof schema>) {
    this.db = db;
  }

  async get(id: RoomSchema["id"]) {
    return await this.db.select().from(room).where(eq(room.id, id)).limit(1);
  }

  async create(data: RoomSchema) {
    return await this.db.insert(room).values(data);
  }

  async update(id: RoomSchema["id"], data: Partial<Omit<RoomSchema, "id">>) {
    return await this.db.update(room).set(data).where(eq(room.id, id));
  }

  async getByUserId(userId: string) {
    const rows = await this.db
      .select({ room })
      .from(room)
      .innerJoin(userRoom, eq(userRoom.roomId, room.id))
      .where(eq(userRoom.userId, userId));
    return rows.map((row) => row.room);
  }
}
