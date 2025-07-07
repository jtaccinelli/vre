import type { Route } from "./+types/api.playlist.fetch";
import { isString } from "@app/lib/predicates";

const FALLBACK_VALUE = {
  playlist: undefined,
  hasConfig: false,
};

export async function loader({ request, context }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const playlistId = url.searchParams.get("id");
  if (!isString(playlistId)) return FALLBACK_VALUE;

  const playlist = await context.spotify.fetchPlaylist(playlistId);
  if (!playlist?.id) return FALLBACK_VALUE;

  const form = await context.form.get(playlist.id);

  return {
    playlist,
    hasForm: form.length > 0,
  };
}

export type Loader = typeof loader;
