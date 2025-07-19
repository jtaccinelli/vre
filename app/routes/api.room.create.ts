import { redirect } from "react-router";
import type { Route } from "./+types/api.form.create";

import { isString } from "@app/lib/predicates";
import { error } from "@app/lib/routes";

export async function action({ context, request }: Route.ActionArgs) {
  const form = await request.formData();

  const name = form.get("name");
  const id = form.get("room-id");
  const clientId = form.get("spotify-client-id");
  const clientSecret = form.get("spotify-client-secret");

  const hasValidData =
    isString(name) &&
    isString(id) &&
    isString(clientId) &&
    isString(clientSecret);

  if (!hasValidData) return error("Form was incomplete");

  await context.room.create({
    id,
    name,
    clientId,
    clientSecret,
  });

  return redirect("/");
}
