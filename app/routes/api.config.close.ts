import { redirect } from "react-router";
import type { Route } from "./+types/api.config.close";

import { isString } from "@app/lib/predicates";

export async function action({ context, request }: Route.ActionArgs) {
  const form = await request.formData();
  const playlistId = form.get("playlist-id");

  const hasValidData = isString(playlistId);
  if (!hasValidData) throw Error("No playlist ID provided.");

  await context.config.update(playlistId, {
    enableVoting: false,
  });

  throw redirect(`/results/${playlistId}`);
}
