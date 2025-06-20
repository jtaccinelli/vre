import { eq } from "drizzle-orm";
import type { DrizzleD1Database } from "drizzle-orm/d1";

import * as schema from "~/schema";
import { category, type Category } from "~/schema";

export class CategoryManager {
  db;

  constructor(db: DrizzleD1Database<typeof schema>) {
    this.db = db;
  }

  async list() {
    return await this.db.select().from(category).all();
  }

  async get(handle: Category["handle"]) {
    return await this.db
      .select()
      .from(category)
      .where(eq(category.handle, handle))
      .limit(1);
  }

  async create(data: Category) {
    return await this.db.insert(category).values(data);
  }

  async update(
    handle: Category["handle"],
    data: Partial<Omit<Category, "handle">>,
  ) {
    return await this.db
      .update(category)
      .set(data)
      .where(eq(category.handle, handle));
  }

  async delete(handle: Category["handle"]) {
    return await this.db.delete(category).where(eq(category.handle, handle));
  }
}
