import { logDevReady } from "@remix-run/cloudflare";
import { createPagesFunctionHandler } from "@remix-run/cloudflare-pages";
import * as build from "@remix-run/dev/server-build";

import { createPrismaHandler } from "~/lib/prisma";
import { createSessionHandler } from "~/lib/session";
import { createSpotifyHandler } from "~/lib/spotify";

if (process.env.NODE_ENV === "development") {
  logDevReady(build);
}

export const onRequest = createPagesFunctionHandler({
  build,
  getLoadContext: async ({ request, env }) => {
    const { session, commitSession } = await createSessionHandler(request);
    const prisma = await createPrismaHandler();
    const spotify = await createSpotifyHandler(request, session);

    return { env };
  },
  mode: build.mode,
});
