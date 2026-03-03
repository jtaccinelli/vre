import { drizzle, DrizzleD1Database } from "drizzle-orm/d1";
import { createRequestHandler } from "react-router";

import { AuthHandler } from "@server/auth";
import { FormHandler } from "@server/form";
import { PlaylistHandler } from "@server/playlist";
import { ProfileHandler } from "@server/profiles";
import { RoomHandler } from "@server/room";
import * as schema from "@server/schema";
import { SessionHandler } from "@server/session";
import { SpotifyHandler } from "@server/spotify";
import { VoteHandler } from "@server/vote";

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
    playlist: PlaylistHandler;
    room: RoomHandler;
    vote: VoteHandler;
    form: FormHandler;
    profiles: ProfileHandler;
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
    const playlist = new PlaylistHandler(env.PLAYLISTS, spotify);
    const user = await spotify.fetchCurrentUser();

    const form = new FormHandler(db, session);
    const vote = new VoteHandler(db, user);
    const profiles = new ProfileHandler(db);

    return requestHandler(request, {
      cloudflare: { env, ctx },
      db,
      session,
      auth,
      spotify,
      playlist,
      vote,
      room,
      form,
      profiles,
      user,
    });
  },
} satisfies ExportedHandler<Env>;
