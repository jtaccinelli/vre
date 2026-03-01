import { useMemo } from "react";
import { useAsyncValue } from "react-router";

import { CardPlaylist } from "@app/components/card-playlist";
import { DialogCloseVoting } from "@app/components/dialog-close-voting";
import { DialogDeleteForm } from "@app/components/dialog-delete-form";
import { DialogReopenVoting } from "@app/components/dialog-reopen-voting";
import { Placeholder } from "@app/components/placeholder";

type Props = {
  filter: (playlist: EnrichedPlaylist) => boolean;
};

export function ListPlaylists({ filter }: Props) {
  const playlists = useAsyncValue() as EnrichedPlaylist[];

  const filteredPlaylists = useMemo(
    () => playlists.filter(filter),
    [filter, playlists],
  );

  if (!filteredPlaylists.length) {
    return <Placeholder label="No playlists found" />;
  }

  return filteredPlaylists.map((playlist) => (
    <CardPlaylist
      key={playlist.data.id}
      playlist={playlist.data}
      cta={playlist.isOpen ? "Submit Vote" : "See Results"}
      href={
        playlist.isOpen
          ? `/vote/${playlist.data.id}`
          : `/results/${playlist.data.id}`
      }
      tags={[
        !!playlist.hasCreated && "You Made This",
        !!playlist.hasVoted && "Voted",
      ]}
      actions={[
        !!playlist.isSignedIn ? (
          <DialogDeleteForm playlist={playlist.data} />
        ) : null,
        !!playlist.isSignedIn && !!playlist.isOpen ? (
          <DialogCloseVoting playlist={playlist.data} />
        ) : null,
        !!playlist.isSignedIn && !playlist.isOpen ? (
          <DialogReopenVoting playlist={playlist.data} />
        ) : null,
      ]}
    />
  ));
}
