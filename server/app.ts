import { drizzle, DrizzleD1Database } from "drizzle-orm/d1";
import { createRequestHandler } from "react-router";
import * as schema from "server/schema";

import { SessionHandler } from "./session";
import { AuthHandler } from "./auth";
import { VoteHandler } from "./vote";
import { FormHandler } from "./form";
import { SpotifyHandler } from "./spotify";
import { RoomHandler } from "./room";

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
    room: RoomHandler;
    vote: VoteHandler;
    form: FormHandler;
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

    const room = new RoomHandler(db);

    const session = await SessionHandler.init(request, env.SESSION);
    const auth = await AuthHandler.init(request, session, room);

    const spotify = new SpotifyHandler(auth);
    const user = await spotify.fetchCurrentUser();

    const form = new FormHandler(db, user);
    const vote = new VoteHandler(db, user);

    return requestHandler(request, {
      cloudflare: { env, ctx },
      db,
      session,
      auth,
      spotify,
      vote,
      room,
      form,
      user,
    });
  },
} satisfies ExportedHandler<Env>;
