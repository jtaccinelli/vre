import type { DrizzleD1Database } from "drizzle-orm/d1";
import { and, eq, like, or } from "drizzle-orm";

import * as schema from "@server/schema";
import { config, type Config } from "@server/schema";

export class ConfigHandler {
  db;
  user;

  constructor(db: DrizzleD1Database<typeof schema>, user?: CurrentUser) {
    this.db = db;
    this.user = user;
  }

  async list() {
    return await this.db.select().from(config).all();
  }

  async get(id: Config["playlistId"]) {
    return await this.db
      .select()
      .from(config)
      .where(eq(config.playlistId, id))
      .limit(1);
  }

  async current() {
    if (!this.user) return;
    return await this.db
      .select()
      .from(config)
      .where(
        or(
          like(config.contributorIds, `%${this.user.id}%`),
          eq(config.createdBy, `%${this.user.id}%`),
        ),
      );
  }

  async create(data: Config) {
    return await this.db.insert(config).values(data);
  }

  async update(
    id: Config["playlistId"],
    data: Partial<Omit<Config, "playlistId">>,
  ) {
    if (!this.user) return;
    return await this.db
      .update(config)
      .set(data)
      .where(
        and(eq(config.playlistId, id), eq(config.createdBy, this.user.id)),
      );
  }

  async delete(id: Config["playlistId"]) {
    if (!this.user) return;
    return await this.db
      .delete(config)
      .where(
        and(eq(config.playlistId, id), eq(config.createdBy, this.user.id)),
      );
  }
}
