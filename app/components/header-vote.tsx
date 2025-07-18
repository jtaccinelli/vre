import { useMemo } from "react";

import type { FormSchema, VoteSchema } from "@server/schema";

import { DialogRevoteForm } from "@app/components/dialog-revote-form";
import { UserAvatars } from "@app/components/user-avatars";

type Props = {
  playlist: Playlist;
  users: User[];
  voter?: User;
  votes: VoteSchema[];
  hasCreated?: boolean;
};

export function HeaderVote({
  playlist,
  users,
  votes,
  voter,
  hasCreated,
}: Props) {
  const currentVote = useMemo(() => {
    return votes.find((vote) => vote.voterId === voter?.id);
  }, [voter, votes]);

  return (
    <div className="flex flex-col gap-6 p-6 pt-10">
      <div className="flex flex-col">
        <p className="text text-gray-400">Playlist Voting Form</p>
        <h1 className="title">{playlist.name}</h1>
      </div>

      <UserAvatars users={users} votes={votes} voter={voter} />
      {!currentVote && !hasCreated ? null : (
        <DialogRevoteForm vote={currentVote} playlist={playlist} />
      )}
    </div>
  );
}
