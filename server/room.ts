import type { DrizzleD1Database } from "drizzle-orm/d1";
import { and, eq, like, or } from "drizzle-orm";

import * as schema from "@server/schema";
import { room, type RoomSchema } from "@server/schema";

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
}
