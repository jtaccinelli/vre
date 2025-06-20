import { sql, type InferSelectModel } from "drizzle-orm";
import {
  real,
  text,
  sqliteTable as table,
  integer,
} from "drizzle-orm/sqlite-core";

export const settings = table("settings", {
  isNeedImages: integer("is_need_images", { mode: "boolean" }),
  isAllowExpire: integer("is_allow_expire", { mode: "boolean" }),
});

export const group = table("group", {
  handle: text("handle").unique().notNull(),
  title: text("title").notNull(),
});

export const category = table("category", {
  handle: text("handle").unique().notNull(),
  title: text("title"),
  isEnabled: integer("is_enabled", { mode: "boolean" }).default(true),
  canExpire: integer("can_expire", { mode: "boolean" }).default(true),
  verifyBy: integer("verify_by", { mode: "number" }).default(1460),
  expireBy: integer("expire_by", { mode: "number" }).default(2920),
  schema: text("fields", { mode: "json" }).default("{}"),
  group: text("group").references(() => group.handle),
});

export const version = table("version", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  body: text("body"),
  data: text("data", { mode: "json" }),
  isHidden: integer("is_hidden", { mode: "boolean" }).default(false),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  verifiedAt: text("verified_at").default(sql`(CURRENT_TIMESTAMP)`),
});

export const entry = table("entry", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  lng: real("lng").notNull(),
  lat: real("lat").notNull(),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("updated_at").default(sql`(CURRENT_TIMESTAMP)`),
  category: text("type").references(() => category.handle),
  version: integer("version", { mode: "number" }).references(() => version.id),
});

// export const user = table("users", {
//   id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
//   email: text("email").notNull(),
//   name: text("name").notNull(),
// });

export type Settings = InferSelectModel<typeof settings>;
export type Group = InferSelectModel<typeof group>;
export type Category = InferSelectModel<typeof category>;
export type Version = InferSelectModel<typeof version>;
export type Entry = InferSelectModel<typeof entry>;

// export type User = InferSelectModel<typeof user>;
