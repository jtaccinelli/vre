import { useCallback } from "react";
import { useNavigate } from "react-router";

import type { Vote } from "@server/schema";

import { CardUser } from "./card-user";
import { DialogSearch } from "./dialog-search";

type Props = {
  users: User[];
  playlist: Playlist;
  className?: string;
  votes: Vote[];
};

export function DialogProxyVote({ users, playlist, votes, className }: Props) {
  const navigate = useNavigate();

  const handleFilter = (item: User, query: string) => {
    const hasVoted = votes.some((vote) => vote.voterId === item.id);
    if (hasVoted) return false;

    if (!query) return true;
    const term = query.toLowerCase();
    const displayName = item?.display_name ?? item.id;

    const hasNameMatch = displayName.toLowerCase().includes(term);
    const hasIdMatch = item.id.toLowerCase().includes(term);

    return hasNameMatch || hasIdMatch;
  };

  const handleNavigate = (user: User) => () => {
    navigate(`/vote/${playlist.id}?user=${user.id}`);
  };

  const renderUser = useCallback((item: User) => {
    return (
      <button type="button" onClick={handleNavigate(item)}>
        <CardUser user={item} />
      </button>
    );
  }, []);

  return (
    <DialogSearch
      cta="Vote on behalf of..."
      label="Search Users"
      placeholder="Search for users by name..."
      className={className}
      items={users}
      filter={handleFilter}
      renderItem={renderUser}
    />
  );
}
