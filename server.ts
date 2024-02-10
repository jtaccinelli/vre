import { logDevReady } from "@remix-run/cloudflare";
import { createPagesFunctionHandler } from "@remix-run/cloudflare-pages";
import * as build from "@remix-run/dev/server-build";

import { createSessionHandler } from "~/lib/session";
import { createSpotifyHandler } from "~/lib/spotify";

if (process.env.NODE_ENV === "development") {
  logDevReady(build);
}

export const onRequest = createPagesFunctionHandler({
  build,
  getLoadContext: async (context) => {
    const { session, commitSession } = await createSessionHandler(context);
    const spotify = await createSpotifyHandler(context, session);

    return {
      env: context.env,
      session,
      commitSession,
      spotify,
    };
  },
  mode: build.mode,
});
