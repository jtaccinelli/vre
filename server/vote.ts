import type { DrizzleD1Database } from "drizzle-orm/d1";
import { and, eq } from "drizzle-orm";

import * as schema from "@server/schema";
import { vote, type Vote } from "@server/schema";

export class VoteHandler {
  db;
  user;

  constructor(db: DrizzleD1Database<typeof schema>, user?: CurrentUser) {
    this.db = db;
    this.user = user;
  }

  async list() {
    return await this.db.select().from(vote).all();
  }

  async get(id: Vote["id"]) {
    return await this.db.select().from(vote).where(eq(vote.id, id)).limit(1);
  }

  async current() {
    if (!this.user) return [];
    return await this.db
      .select()
      .from(vote)
      .where(eq(vote.voterId, this.user.id));
  }

  async playlist(playlistId: Vote["playlistId"]) {
    return await this.db
      .select()
      .from(vote)
      .where(eq(vote.playlistId, playlistId));
  }

  async create(data: Omit<Vote, "id">) {
    return await this.db.insert(vote).values(data);
  }

  async update(id: Vote["id"], data: Partial<Omit<Vote, "id">>) {
    if (!this.user) return;
    return await this.db
      .update(vote)
      .set(data)
      .where(and(eq(vote.id, id), eq(vote.voterId, this.user.id)));
  }

  async delete(id: Vote["id"]) {
    if (!this.user) return;
    return await this.db
      .delete(vote)
      .where(and(eq(vote.id, id), eq(vote.voterId, this.user.id)));
  }
}
