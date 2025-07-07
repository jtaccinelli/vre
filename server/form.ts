import type { DrizzleD1Database } from "drizzle-orm/d1";
import { and, eq, like, or } from "drizzle-orm";

import * as schema from "@server/schema";
import { form, type FormSchema } from "@server/schema";

export class FormHandler {
  db;
  user;

  constructor(db: DrizzleD1Database<typeof schema>, user?: CurrentUser) {
    this.db = db;
    this.user = user;
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
    if (!this.user) return;
    return await this.db
      .select()
      .from(form)
      .where(
        or(
          like(form.contributorIds, `%${this.user.id}%`),
          eq(form.createdBy, `%${this.user.id}%`),
        ),
      );
  }

  async create(data: FormSchema) {
    return await this.db.insert(form).values(data);
  }

  async update(
    id: FormSchema["playlistId"],
    data: Partial<Omit<FormSchema, "playlistId">>,
  ) {
    if (!this.user) return;
    return await this.db
      .update(form)
      .set(data)
      .where(and(eq(form.playlistId, id), eq(form.createdBy, this.user.id)));
  }

  async delete(id: FormSchema["playlistId"]) {
    if (!this.user) return;
    return await this.db
      .delete(form)
      .where(and(eq(form.playlistId, id), eq(form.createdBy, this.user.id)));
  }
}
