import { eq } from "drizzle-orm";
import type { DrizzleD1Database } from "drizzle-orm/d1";

import * as schema from "~/schema";
import { group, type Group } from "~/schema";

export class GroupManager {
  db;

  constructor(db: DrizzleD1Database<typeof schema>) {
    this.db = db;
  }

  async list() {
    return await this.db.select().from(group).all();
  }

  async get(handle: Group["handle"]) {
    return await this.db
      .select()
      .from(group)
      .where(eq(group.handle, handle))
      .limit(1);
  }

  async create(data: Group) {
    return await this.db.insert(group).values(data);
  }

  async update(handle: Group["handle"], data: Partial<Omit<Group, "handle">>) {
    return await this.db
      .update(group)
      .set(data)
      .where(eq(group.handle, handle));
  }

  async delete(handle: Group["handle"]) {
    return await this.db.delete(group).where(eq(group.handle, handle));
  }
}
