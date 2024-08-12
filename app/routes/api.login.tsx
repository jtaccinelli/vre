/**
 * This endpoint handles building the login URL for Spotify to allow users to login.
 */

import { LoaderFunctionArgs, redirect } from "@remix-run/cloudflare";

import { config } from "~/config";

export async function loader({ request }: LoaderFunctionArgs) {
  const { clientId, loginEndpoint } = config.spotify;

  const state = (Math.random() + 1).toString(36).substring(7);
  const scope = [
    "playlist-read-private",
    "playlist-read-collaborative",
    "user-library-read",
    "user-read-private",
    "user-read-email",
  ].join(" ");

  const requestUrl = new URL(request.url);
  const redirectUri = `${requestUrl.origin}/${config.spotify.redirectUri}`;

  const url = new URL(loginEndpoint);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("scope", scope);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("show_dialog", "true");
  url.searchParams.set("state", state);

  return redirect(url.toString());
}
