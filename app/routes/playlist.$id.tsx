import { json, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";

import { CardPlaylist } from "~/components/card-playlist";
import { Footer } from "~/components/footer";
import { Header } from "~/components/header";
import { ListPlaylistTracks } from "~/components/list-playlist-tracks";
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
    <>
      <Header text="Previewing Playlists" />
      <CardPlaylist playlist={playlist} />
      <Header text="Tracks">
        <p className="pr-4 text-gray-600">{playlist.tracks.total} tracks</p>
      </Header>
      <ListPlaylistTracks tracks={playlist.tracks?.items} />
      <Footer>
        {isLoggedIn ? (
          <Link
            className="btn btn-primary flex-grow"
            to={`/ballot/${playlist.id}`}
          >
            Open Ballot
          </Link>
        ) : (
          <Link className="btn btn-secondary" to="/api/login">
            Sign In
          </Link>
        )}
      </Footer>
    </>
  );
}
