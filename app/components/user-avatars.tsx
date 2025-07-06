import type { Vote } from "@server/schema";
import { useMemo } from "react";

import { SpotifyImage } from "./spotify-image";
import { Check, CheckCircle } from "@phosphor-icons/react";

type Props = {
  voter?: User;
  users: User[];
  votes: Vote[];
};

export function UserAvatars({ voter, users, votes }: Props) {
  const formattedUsers = useMemo(() => {
    return users
      .map((user) => {
        return {
          user: user,
          hasVoted: votes.some((vote) => vote.voterId === user.id),
        };
      })
      .sort((a, b) => (a.hasVoted === b.hasVoted ? 0 : a.hasVoted ? -1 : 1));
  }, [users, votes]);

  return (
    <div className="flex flex-col gap-1">
      <p className="text-gray-400">
        {votes.length} of {users.length} votes submitted
      </p>
      <div className="flex items-center gap-1 overflow-x-scroll pb-2">
        {!voter ? null : (
          <SpotifyImage
            key={voter.id}
            image={voter?.images?.[0]}
            className="mr-2 size-8 rounded-full border-2 border-white bg-gray-700"
          />
        )}
        {formattedUsers.map(({ user, hasVoted }) => {
          return hasVoted ? (
            <div
              key={user.id}
              className="relative size-8 rounded-full border-2 border-gray-700 bg-gray-900"
            >
              <SpotifyImage
                key={user.id}
                image={user?.images?.[0]}
                className="rounded-full"
              />
              <CheckCircle
                size={20}
                weight="fill"
                className="absolute -right-2 -bottom-2 text-white"
              />
            </div>
          ) : (
            <SpotifyImage
              key={user.id}
              image={user?.images?.[0]}
              className="size-8 rounded-full border-2 border-gray-700 bg-gray-900"
            />
          );
        })}
      </div>
    </div>
  );
}
