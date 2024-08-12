import { json, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { useMemo } from "react";

import { config } from "~/config";

type Response = SpotifyApi.SinglePlaylistResponse;

export async function loader({ context, params }: LoaderFunctionArgs) {
  // Check if the user is logged in
  const accessToken = await context.session.get(
    config.keys.session.accessToken,
  );

  const isLoggedIn = new Boolean(accessToken);

  // Check Playlist ID
  const playlistId = params.id;
  if (!playlistId) throw new Error("No playlist ID");

  // Get Playlist Data
  const playlist = await context.spotify.fetch<Response>(
    `/playlists/${playlistId}`,
  );

  return json({
    isLoggedIn,
    playlist,
  });
}

export default function Page() {
  const { playlist, isLoggedIn } = useLoaderData<typeof loader>();

  const image = useMemo(() => {
    return playlist.images[0];
  }, [playlist]);

  return (
    <div className="flex flex-col gap-4">
      <p className="font-semibold">Found Playlist</p>
      <section className="flex items-center gap-4 rounded-sm bg-gray-900 p-2">
        <img
          className="h-36 w-36 rounded-sm"
          src={image.url}
          alt={playlist.name}
          height={image.height}
          width={image.width}
        />
        <div className="flex flex-col items-start gap-1 py-2">
          <p className="text-lg font-semibold">{playlist.name}</p>
          <p className="text-sm text-gray-500">
            Created by {playlist.owner.display_name}
          </p>
          <p className="text-sm text-gray-500">
            {playlist.tracks.total} Tracks, {playlist.followers.total} followers
          </p>
        </div>
      </section>
      <section className="flex gap-4">
        {isLoggedIn ? (
          <a className="btn btn-primary" href={`/playlist/${playlist.id}`}>
            Open Ballot
          </a>
        ) : (
          <a className="btn btn-secondary" href="/api/login">
            Sign In
          </a>
        )}
      </section>
    </div>
  );
}
