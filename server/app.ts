import { drizzle, DrizzleD1Database } from "drizzle-orm/d1";
import { createRequestHandler } from "react-router";
import * as schema from "~/schema";
import { GroupManager } from "./group";
import { CategoryManager } from "./category";

declare module "react-router" {
  export interface AppLoadContext {
    cloudflare: {
      env: Env;
      ctx: ExecutionContext;
    };
    db: DrizzleD1Database<typeof schema>;
    group: GroupManager;
    category: CategoryManager;
  }
}

const requestHandler = createRequestHandler(
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE,
);

export default {
  async fetch(request, env, ctx) {
    const db = drizzle(env.DB, {
      schema,
    });

    const group = new GroupManager(db);
    const category = new CategoryManager(db);

    return requestHandler(request, {
      cloudflare: { env, ctx },
      db,
      group,
      category,
    });
  },
} satisfies ExportedHandler<Env>;
