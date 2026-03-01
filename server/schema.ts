import { type InferSelectModel } from "drizzle-orm";
import {
  text,
  sqliteTable as table,
  integer,
  primaryKey,
} from "drizzle-orm/sqlite-core";

export const room = table("room", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  clientId: text("client_id").notNull(),
  clientSecret: text("client_secret").notNull(),
});

export const form = table("form", {
  playlistId: text("playlist_id").primaryKey(),
  roomId: text("room_id").references(() => room.id),
  createdBy: text("created_by").notNull(),
  contributorIds: text("contributor_ids").notNull(),
  contributorVoteCount: integer("contributor_vote_count").default(1),
  trackVoteCount: integer("track_vote_count").default(3),
  enableHonourableMentions: integer("enable_honourable_mentions", {
    mode: "boolean",
  }).default(true),
  enableShameVotes: integer("enable_shame_votes", { mode: "boolean" }).default(
    true,
  ),
  enableVoting: integer("enable_voting", { mode: "boolean" }).default(true),
});

export const vote = table("vote", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  playlistId: text("playlist_id").notNull(),
  voterId: text("voter_id"),
  contributorIds: text("contributor_ids"),
  trackIds: text("track_ids"),
  honourableMentions: text("honourable_mentions"),
  shameVotes: text("shame_votes"),
});

export const user = table("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  imageUrl: text("image_url"),
});

export const userRoom = table(
  "user_room",
  {
    userId: text("user_id")
      .notNull()
      .references(() => user.id),
    roomId: text("room_id")
      .notNull()
      .references(() => room.id),
  },
  (t) => [primaryKey({ columns: [t.userId, t.roomId] })],
);

export type VoteSchema = InferSelectModel<typeof vote>;
export type FormSchema = InferSelectModel<typeof form>;
export type RoomSchema = InferSelectModel<typeof room>;
export type UserSchema = InferSelectModel<typeof user>;
export type UserRoomSchema = InferSelectModel<typeof userRoom>;
