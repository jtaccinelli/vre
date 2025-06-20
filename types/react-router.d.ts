import type { DrizzleD1Database } from "drizzle-orm/d1";

import * as schema from "~/schema";

declare module "react-router" {
  export interface AppLoadContext {
    cloudflare: {
      env: Env;
      ctx: ExecutionContext;
    };
    db: DrizzleD1Database<typeof schema>;
  }
}
