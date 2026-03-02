import { useEffect, useMemo, useState } from "react";
import { useAsyncValue } from "react-router";

import { CardPlaylist } from "@app/components/card-playlist";
import { DialogCloseVoting } from "@app/components/dialog-close-voting";
import { DialogDeleteForm } from "@app/components/dialog-delete-form";
import { DialogReopenVoting } from "@app/components/dialog-reopen-voting";
import { Placeholder } from "@app/components/placeholder";
import { useDialogEvent } from "@app/hooks/use-dialog-event";

type Action = "delete" | "close" | "reopen";

type Selected = {
  playlist: EnrichedPlaylist;
  action: Action;
};

type Props = {
  filter: (playlist: EnrichedPlaylist) => boolean;
};

export function ListPlaylists({ filter }: Props) {
  const playlists = useAsyncValue() as EnrichedPlaylist[];
  const [selected, setSelected] = useState<Selected | null>(null);

  const deleteDialog = useDialogEvent("delete-form");
  const closeDialog = useDialogEvent("close-voting");
  const reopenDialog = useDialogEvent("reopen-voting");

  useEffect(() => {
    if (!selected) return;
    if (selected.action === "delete") deleteDialog.open();
    if (selected.action === "close") closeDialog.open();
    if (selected.action === "reopen") reopenDialog.open();
  }, [selected]);

  const filteredPlaylists = useMemo(
    () => playlists.filter(filter),
    [filter, playlists],
  );

  if (!filteredPlaylists.length) {
    return <Placeholder label="No playlists found" />;
  }

  return (
    <>
      {filteredPlaylists.map((playlist) => {
        function handleDeleteClick() {
          setSelected({ playlist, action: "delete" });
        }

        function handleCloseClick() {
          setSelected({ playlist, action: "close" });
        }

        function handleReopenClick() {
          setSelected({ playlist, action: "reopen" });
        }

        return (
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
              !!playlist.isSignedIn && (
                <button type="button" onClick={handleDeleteClick}>
                  Delete Form
                </button>
              ),
              !!playlist.isSignedIn && !!playlist.isOpen && (
                <button type="button" onClick={handleCloseClick}>
                  Close Voting
                </button>
              ),
              !!playlist.isSignedIn && !playlist.isOpen && (
                <button type="button" onClick={handleReopenClick}>
                  Reopen Voting
                </button>
              ),
            ]}
          />
        );
      })}
      <DialogDeleteForm playlist={selected?.playlist.data} />
      <DialogCloseVoting playlist={selected?.playlist.data} />
      <DialogReopenVoting playlist={selected?.playlist.data} />
    </>
  );
}
