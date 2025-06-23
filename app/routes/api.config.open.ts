import { redirect } from "react-router";
import type { Route } from "./+types/api.config.open";

import { isString } from "@app/lib/predicates";

export async function action({ context, request }: Route.ActionArgs) {
  const form = await request.formData();
  const playlistId = form.get("playlist-id");

  const hasValidData = isString(playlistId);
  if (!hasValidData) throw Error("No playlist ID provided.");

  await context.config.update(playlistId, {
    enableVoting: true,
  });

  throw redirect(`/results/${playlistId}`);
}
