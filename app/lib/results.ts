import type { Vote } from "@server/schema";

export const TIEBREAK_VOTER = "tiebreaker";

export type ResultValue = {
  name: string;
  id: string;
  count: number;
};

type ResultValueMap = Map<string, ResultValue>;

function flattenIdsValues<Type>(values: Type[]) {
  return values
    .filter((ids) => typeof ids === "string")
    .reduce<string[]>((array, ids) => [...array, ...ids.split(",")], []);
}

function incrementValueCount(map: ResultValueMap, id: string) {
  const value = map.get(id);
  if (!value) return map;

  map.set(id, {
    ...value,
    count: value.count + 1,
  });

  return map;
}

function initialiseValue(
  map: ResultValueMap,
  id: string,
  value: Omit<ResultValue, "count" | "id">,
) {
  map.set(id, {
    ...value,
    id,
    count: 1,
  });

  return map;
}

export function processBestTrackResults(votes: Vote[], tracks: Track[]) {
  const ids = flattenIdsValues(votes.map((vote) => vote.trackIds));

  const data = ids.reduce<ResultValueMap>((map, id) => {
    if (map.has(id)) return incrementValueCount(map, id);

    const track = tracks.find((track) => track.id === id);
    if (!track) return map;

    return initialiseValue(map, track.id, {
      name: track.name,
    });
  }, new Map());

  return Array.from(data.values());
}

export function processBestUserResults(votes: Vote[], users: User[]) {
  const ids = flattenIdsValues(votes.map((vote) => vote.contributorIds));

  const data = ids.reduce<ResultValueMap>((map, id) => {
    if (map.has(id)) return incrementValueCount(map, id);

    const user = users.find((user) => user.id === id);
    if (!user) return map;

    return initialiseValue(map, user.id, {
      name: user.display_name ?? user.id,
    });
  }, new Map());

  return Array.from(data.values());
}

export function processMostTrackVotesResults(
  votes: Vote[],
  users: User[],
  tracks: (Track & { added_by: UserPublic })[],
) {
  const ids = flattenIdsValues(votes.map((vote) => vote.trackIds));

  const data = ids.reduce<ResultValueMap>((map, id) => {
    const track = tracks.find((track) => track.id === id);
    if (!track) return map;

    const contributorId = track.added_by.id;
    if (map.has(contributorId)) return incrementValueCount(map, contributorId);

    const user = users.find((user) => user.id === contributorId);
    if (!user) return map;

    return initialiseValue(map, user.id, {
      name: user.display_name ?? user.id,
    });
  }, new Map());

  return Array.from(data.values());
}
