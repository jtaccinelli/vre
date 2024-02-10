import { Session } from "@remix-run/cloudflare";

import { SESSION_KEYS } from "~/lib/session";

export const SPOTIFY_ENDPOINTS = {
  ACCESS_TOKEN: "https://accounts.spotify.com/api/token",
  PLAYLIST: "https://api.spotify.com/v1/playlists/",
} as const;

// Function for handling fetching the access token for Spotify

export async function generateSpotifyToken(
  context: AppContext,
  session: Session
) {
  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: context.env.SPOTIFY_CLIENT_ID,
    client_secret: context.env.SPOTIFY_CLIENT_SECRET,
  });

  const headers = new Headers({
    "Content-Type": "application/x-www-form-urlencoded",
  });

  const response = await fetch(SPOTIFY_ENDPOINTS.ACCESS_TOKEN, {
    headers,
    body: body.toString(),
  });

  const data = await response.json<{
    access_token: string;
  }>();

  if (!data.access_token) return null; //TODO: handle this

  session.set(SESSION_KEYS.SPOTIFY_ACCESS_TOKEN, data.access_token);
  return data.access_token;
}

export async function createSpotifyHandler(
  context: AppContext,
  session: Session
) {
  async function fetchWithBearer(endpoint: string, options?: RequestInit) {
    let accessToken = await session.get(SESSION_KEYS.SPOTIFY_ACCESS_TOKEN);
    if (!accessToken)
      accessToken = await generateSpotifyToken(context, session);

    const headers = new Headers(options?.headers);
    headers.set("Authorization", `Bearer ${accessToken}`);

    const response = await fetch(endpoint, { ...options, headers });
    return await response.json();
  }

  return {
    fetch: fetchWithBearer,
  };
}
