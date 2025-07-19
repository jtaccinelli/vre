import { redirect } from "react-router";
import type { Route } from "./+types/api.vote.delete";

import { isString } from "@app/lib/predicates";
import { error } from "@app/lib/routes";

export async function action({ context, request }: Route.ActionArgs) {
  const form = await request.formData();

  const playlistId = form.get("playlist-id");
  const voteId = form.get("vote-id");

  const hasValidData = isString(playlistId) && isString(voteId);
  if (!hasValidData) return error("Form was incomplete");

  await context.vote.delete(parseInt(voteId));

  throw redirect(`/vote/${playlistId}`);
}
