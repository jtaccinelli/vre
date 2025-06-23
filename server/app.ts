import { drizzle, DrizzleD1Database } from "drizzle-orm/d1";
import { createRequestHandler } from "react-router";
import * as schema from "server/schema";

import { SessionHandler } from "./session";
import { AuthHandler } from "./auth";
import { VoteHandler } from "./vote";
import { ConfigHandler } from "./config";
import { SpotifyHandler } from "./spotify";

declare module "react-router" {
  export interface AppLoadContext {
    cloudflare: {
      env: Env;
      ctx: ExecutionContext;
    };
    db: DrizzleD1Database<typeof schema>;
    session: SessionHandler;
    auth: AuthHandler;
    spotify: SpotifyHandler;
    vote: VoteHandler;
    config: ConfigHandler;
    user?: CurrentUser;
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

    const session = await SessionHandler.init(request, env.SESSION);
    const auth = await AuthHandler.init(request, session);

    const spotify = new SpotifyHandler(auth);
    const user = await spotify.fetchCurrentUser();

    const vote = new VoteHandler(db, user);
    const config = new ConfigHandler(db, user);

    return requestHandler(request, {
      cloudflare: { env, ctx },
      db,
      session,
      auth,
      spotify,
      vote,
      config,
      user,
    });
  },
} satisfies ExportedHandler<Env>;
