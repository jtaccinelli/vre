import { redirect } from "react-router";

import { SessionHandler } from "@server/session";

import { isString } from "@app/lib/predicates";
import { error } from "@app/lib/routes";

import type { Route } from "./+types/api.room.update";

export async function action({ request, context }: Route.ActionArgs) {
  if (!context.user) throw redirect("/");

  const roomId: string | undefined = context.session.get(SessionHandler.KEY__ROOM_ID);
  if (!roomId) throw redirect("/");

  const form = await request.formData();
  const name = form.get("name");
  const clientId = form.get("spotify-client-id");
  const clientSecret = form.get("spotify-client-secret");

  const hasValidData = isString(name) && isString(clientId) && isString(clientSecret);
  if (!hasValidData) return error("Form was incomplete");

  await context.room.update(roomId, { name, clientId, clientSecret });

  throw redirect("/room");
}
