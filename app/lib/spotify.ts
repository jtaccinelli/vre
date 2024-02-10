import { Session } from "@remix-run/node";

import { SESSION_KEYS } from "~/lib/session";

export const SPOTIFY_ENDPOINTS = {
  ACCESS_TOKEN: "https://accounts.spotify.com/api/token",
  PLAYLIST: "https://api.spotify.com/v1/playlists/",
} as const;

// Function for handling fetching the access token for Spotify

export async function generateSpotifyToken(session: Session) {
  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: process.env.SPOTIFY_CLIENT_ID,
    client_secret: process.env.SPOTIFY_CLIENT_SECRET,
  });

  const headers = new Headers({
    "Content-Type": "application/x-www-form-urlencoded",
  });

  const response = await fetch(SPOTIFY_ENDPOINTS.ACCESS_TOKEN, {
    headers,
    body: body.toString(),
  });

  const data = await response.json();

  if (!data.access_token) return null; //TODO: handle this

  session.set(SESSION_KEYS.SPOTIFY_ACCESS_TOKEN, data.access_token);
  return data.access_token;
}

export async function createSpotifyHandler(request: Request, session: Session) {
  async function fetchWithBearer(endpoint: string, options?: RequestInit) {
    let accessToken = await session.get(SESSION_KEYS.SPOTIFY_ACCESS_TOKEN);
    if (!accessToken) accessToken = await generateSpotifyToken(session);

    const headers = new Headers(options?.headers);
    headers.set("Authorization", `Bearer ${accessToken}`);

    const response = await fetch(endpoint, { ...options, headers });
    return await response.json();
  }

  return {
    fetch: fetchWithBearer,
  };
}
