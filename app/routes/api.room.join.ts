import { redirect } from "react-router";

import { SessionHandler } from "@server/session";

import { isString } from "@app/lib/predicates";
import { error } from "@app/lib/routes";

import type { Route } from "./+types/api.room.join";

export async function action({ request, context }: Route.ActionArgs) {
  const form = await request.formData();
  const roomId = form.get("room-id");
  if (!isString(roomId)) return error("No Room ID provided.");

  const [room] = await context.room.get(roomId);
  if (!room) return error("Room not found.");

  context.session.set(SessionHandler.KEY__ROOM_ID, room.id);

  throw redirect("/", {
    headers: { "Set-Cookie": await context.session.commit() },
  });
}
