import { useCallback } from "react";
import { useNavigate } from "react-router";

import type { UserSchema, VoteSchema } from "@server/schema";

import { CardUser } from "@app/components/card-user";
import { DialogSearch } from "@app/components/dialog-search";

type Props = {
  users: UserSchema[];
  playlist: Playlist;
  votes: VoteSchema[];
  defaultOpen?: boolean;
  className?: string;
};

export function DialogProxyVote({
  users,
  playlist,
  votes,
  defaultOpen,
  className,
}: Props) {
  const navigate = useNavigate();

  const handleFilter = (item: UserSchema, query: string) => {
    const hasVoted = votes.some((vote) => vote.voterId === item.id);
    if (hasVoted) return false;

    if (!query) return true;
    const term = query.toLowerCase();

    const hasNameMatch = item.name.toLowerCase().includes(term);
    const hasIdMatch = item.id.toLowerCase().includes(term);

    return hasNameMatch || hasIdMatch;
  };

  const handleNavigate = (user: UserSchema) => () => {
    navigate(`/vote/${playlist.id}?user=${user.id}`);
  };

  const renderUser = useCallback((item: UserSchema) => {
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
      label="Who is voting?"
      placeholder="Search for users by name..."
      defaultOpen={defaultOpen}
      isClosable={false}
      className={className}
      items={users}
      filter={handleFilter}
      renderItem={renderUser}
    />
  );
}
