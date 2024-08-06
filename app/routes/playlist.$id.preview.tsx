import { json, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { useMemo } from "react";

import { config } from "~/config";

export async function loader({ context, params }: LoaderFunctionArgs) {
  // Check if the user is logged in
  const authToken = await context.session.get(config.keys.session.authToken);
  const isLoggedIn = new Boolean(authToken);

  // Check Playlist ID
  const playlistId = params.id;
  if (!playlistId) throw new Error("No playlist ID");

  // Get Playlist Data
  const response = await context.spotify.fetch(`/playlists/${playlistId}`);
  const playlist = await response.json<SpotifyApi.PlaylistBaseObject>();

  console.log(playlist);

  return json({
    isLoggedIn,
    playlist,
  });
}

export default function Page() {
  const { playlist } = useLoaderData<typeof loader>();

  const image = useMemo(() => {
    return playlist.images[0];
  }, [playlist.name]);

  return (
    <div>
      <section className="flex items-center gap-4 rounded-sm bg-gray-900 p-4">
        <img
          className="h-32 w-32 rounded-sm"
          src={image.url}
          alt={playlist.name}
          height={image.height}
          width={image.width}
        />
        <div className="flex flex-col gap-1 py-2">
          <p className="text-xl font-semibold">{playlist.name}</p>
          <p className="mb-2 text-gray-500">Playlist</p>
          <p className="text-sm">10 Tracks - 12 Contributors</p>
        </div>
      </section>
    </div>
  );
}
