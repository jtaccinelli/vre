import { redirect } from "react-router";
import type { Route } from "./+types/api.vote.tiebreak";

import { isNotFile, isString } from "@app/lib/predicates";
import { TIEBREAK_VOTER } from "@app/lib/results";

export async function action({ context, request }: Route.ActionArgs) {
  const form = await request.formData();

  const playlistId = form.get("playlist-id");
  const contributorId = form.get("user-id");
  const trackId = form.get("track-id");

  const hasValidData =
    isString(playlistId) && isNotFile(contributorId) && isNotFile(trackId);

  if (!hasValidData) {
    throw new Error("Data for form creation was sent with incorrect format");
  }

  await context.vote.create({
    playlistId,
    voterId: TIEBREAK_VOTER,
    contributorIds: contributorId,
    trackIds: trackId,
    honourableMentions: null,
    shameVotes: null,
  });

  throw redirect("/");
}
