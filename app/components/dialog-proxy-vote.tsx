import { useCallback } from "react";
import { useNavigate } from "react-router";

import type { VoteSchema } from "@server/schema";

import { CardUser } from "@app/components/card-user";
import { DialogSearch } from "@app/components/dialog-search";

type Props = {
  users: User[];
  playlist: Playlist;
  className?: string;
  votes: VoteSchema[];
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
      <CardUser
        key={item.id}
        user={item}
        isSelected={false}
        onClick={handleNavigate(item)}
      />
    );
  }, []);

  return (
    <DialogSearch
      id="proxy-vote"
      cta="Vote on behalf of..."
      label="Proxy Vote"
      placeholder="Search for users by name..."
      className={className}
      items={users}
      filter={handleFilter}
      renderItem={renderUser}
    />
  );
}
