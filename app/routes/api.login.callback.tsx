/**
 * This endpoint handles responses as they come from Spotify
 */

import { LoaderFunctionArgs, redirect } from "@remix-run/cloudflare";

import { config } from "~/config";

export async function loader({ request, context }: LoaderFunctionArgs) {
  const url = new URL(request.url);

  const code = url.searchParams.get("code") ?? undefined;
  const { accessToken } = await context.spotify.fetchAccessToken(code);

  context.session.set(config.keys.session.accessToken, accessToken);
  context.session.set(config.keys.session.fetchedOn, Date.now());

  const headers = new Headers();
  headers.set("Set-Cookie", await context.session.commit());

  return redirect("/account", {
    headers,
  });
}
