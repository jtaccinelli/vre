import { json, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

import { CardPlaylist } from "~/components/card-playlist";
import { useRootLoaderData } from "~/hooks/use-root-loader-data";

type Response = SpotifyApi.SinglePlaylistResponse;

export async function loader({ context, params }: LoaderFunctionArgs) {
  const playlistId = params.id;
  if (!playlistId) throw new Error("No playlist ID");

  const playlist = await context.spotify.fetch<Response>(
    `/playlists/${playlistId}`,
  );

  return json({
    playlist,
  });
}

export default function Page() {
  const { playlist } = useLoaderData<typeof loader>();
  const { isLoggedIn } = useRootLoaderData();

  return (
    <div className="flex flex-col gap-4">
      <p className="font-semibold">Previewing Playlist</p>
      <CardPlaylist playlist={playlist} />
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
