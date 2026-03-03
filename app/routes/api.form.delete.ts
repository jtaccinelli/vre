import { redirect } from "react-router";

import { isString } from "@app/lib/predicates";
import { error } from "@app/lib/routes";

import type { Route } from "./+types/api.form.delete";

export async function action({ context, request }: Route.ActionArgs) {
  const form = await request.formData();
  const playlistId = form.get("playlist-id");

  const hasValidData = isString(playlistId);
  if (!hasValidData) return error("No playlist ID provided.");

  await context.form.delete(playlistId);
  throw redirect(`/`);
}
