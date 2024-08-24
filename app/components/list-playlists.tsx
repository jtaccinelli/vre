import { Link, useFetcher } from "@remix-run/react";

import { CardPlaylist } from "~/components/card-playlist";
import { action, KEY__ACTION_PLAYLIST_SEARCH } from "~/routes/playlist.search";

import { ListEmpty } from "./list-empty";

export function ListPlaylists() {
  const fetcher = useFetcher<typeof action>({
    key: KEY__ACTION_PLAYLIST_SEARCH,
  });

  if (!fetcher.data) return <ListEmpty message="No playlists found." />;

  return (
    <div className="flex h-full flex-col gap-4 overflow-y-scroll">
      {fetcher.data.results.playlists.items.map((item) => (
        <Link to={`/playlist/${item.id}`} key={item.id}>
          <CardPlaylist playlist={item} />
        </Link>
      ))}
    </div>
  );
}
