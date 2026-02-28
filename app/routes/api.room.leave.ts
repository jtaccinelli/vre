import { redirect } from "react-router";
import type { Route } from "./+types/api.room.leave";

import { SessionHandler } from "@server/session";

export async function loader({ context }: Route.LoaderArgs) {
  context.session.unset(SessionHandler.KEY__ROOM_ID);

  throw redirect("/", {
    headers: { "Set-Cookie": await context.session.commit() },
  });
}
