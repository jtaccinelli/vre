import { json, LoaderFunctionArgs } from "@remix-run/cloudflare";

// Check Playlist ID
export async function loader({ context, params }: LoaderFunctionArgs) {
  const playlistId = params.id;
  if (!playlistId) throw new Error("No playlist ID");

  // Get Playlist Data
  const response = await context.spotify.fetch(`/playlists/${playlistId}`);
  const playlist = await response.json<SpotifyApi.PlaylistBaseObject>();

  return json({
    playlist,
  });
}
