import { v4 as uuid } from "uuid";

export function toKebabCase(value: string) {
  return value.toLowerCase().replace(/\s+/g, "-");
}


export function generateHandle() {
  return uuid();
}

export function generateRoomId() {
  return Math.random().toString(36).substring(2, 8);
}

export function extractContributorIds(playlist: Playlist) {
  return playlist.tracks.items
    .reduce<string[]>((array, item) => {
      const hasId = array.some((id) => id === item.added_by.id);
      if (!hasId) array.push(item.added_by.id);
      return array;
    }, [])
    .join(",");
}
