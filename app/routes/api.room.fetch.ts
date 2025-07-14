import type { Route } from "./+types/api.playlist.fetch";
import { isString } from "@app/lib/predicates";

const FALLBACK_VALUE = {
  room: undefined,
};

export async function loader({ request, context }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const roomId = url.searchParams.get("id");
  if (!isString(roomId)) return FALLBACK_VALUE;

  const [room] = await context.room.get(roomId);
  if (!room?.id) return FALLBACK_VALUE;

  return {
    room,
  };
}

export type Loader = typeof loader;
