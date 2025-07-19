import type { Route } from "./+types/api.auth.sign-in";

import { isString } from "@app/lib/predicates";
import { error } from "@app/lib/routes";

export async function action({ request, context }: Route.LoaderArgs) {
  const form = await request.formData();
  const roomId = form.get("room-id");

  const hasValidData = isString(roomId);
  if (!hasValidData) return error("No Room ID provided.");

  await context.auth.authoriseUser(roomId);
}
