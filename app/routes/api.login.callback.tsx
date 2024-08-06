/**
 * This endpoint handles responses as they come from Spotify
 */

import { LoaderFunctionArgs, redirect } from "@remix-run/cloudflare";

import { config } from "~/config";

export async function loader({ request, context }: LoaderFunctionArgs) {
  const url = new URL(request.url);

  const code = url.searchParams.get("code") ?? undefined;
  const authToken = await context.spotify.fetchAuthToken(code);

  await context.session.set(config.keys.session.authToken, authToken);

  const headers = new Headers();
  headers.set("Set-Cookie", await context.session.commit());

  return redirect("/account", {
    headers: headers,
  });
}
