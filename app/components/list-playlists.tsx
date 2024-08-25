import { Link } from "@remix-run/react";

import { CardPlaylist } from "~/components/card-playlist";
import { ListEmpty } from "~/components/list-empty";

type Props = {
  playlists: SpotifyApi.PlaylistObjectSimplified[];
};

export function ListPlaylists({ playlists }: Props) {
  if (playlists.length === 0) {
    return <ListEmpty message="No playlists found." />;
  }

  return (
    <div className="flex flex-grow flex-col gap-4">
      {playlists.map((playlist) => (
        <Link to={`/playlist/${playlist.id}`} key={playlist.id}>
          <CardPlaylist playlist={playlist} />
        </Link>
      ))}
    </div>
  );
}
