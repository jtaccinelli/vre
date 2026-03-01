import type { Route } from "./+types/api.room.list";

export async function loader({ context }: Route.LoaderArgs) {
  if (!context.user) return { rooms: [] };
  return { rooms: await context.room.getByUserId(context.user.id) };
}
