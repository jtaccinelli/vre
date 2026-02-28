import type { DrizzleD1Database } from "drizzle-orm/d1";
import { and, eq } from "drizzle-orm";

import * as schema from "@server/schema";
import { form, type FormSchema, type RoomSchema } from "@server/schema";
import { SessionHandler } from "./session";

export class FormHandler {
  db;
  roomId;

  constructor(db: DrizzleD1Database<typeof schema>, session: SessionHandler) {
    this.db = db;
    this.roomId = session.get(SessionHandler.KEY__ROOM_ID) as RoomSchema["id"] | undefined;
  }

  async list() {
    return await this.db.select().from(form).all();
  }

  async get(id: FormSchema["playlistId"]) {
    return await this.db
      .select()
      .from(form)
      .where(eq(form.playlistId, id))
      .limit(1);
  }

  async current() {
    if (!this.roomId) return;
    return await this.db
      .select()
      .from(form)
      .where(eq(form.roomId, this.roomId));
  }

  async create(data: FormSchema) {
    return await this.db.insert(form).values(data);
  }

  async update(
    id: FormSchema["playlistId"],
    data: Partial<Omit<FormSchema, "playlistId">>,
  ) {
    if (!this.roomId) return;
    return await this.db
      .update(form)
      .set(data)
      .where(and(eq(form.playlistId, id), eq(form.roomId, this.roomId)));
  }

  async delete(id: FormSchema["playlistId"]) {
    if (!this.roomId) return;
    return await this.db
      .delete(form)
      .where(and(eq(form.playlistId, id), eq(form.roomId, this.roomId)));
  }
}
