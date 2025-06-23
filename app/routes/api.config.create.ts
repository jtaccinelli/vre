import { redirect } from "react-router";
import type { Route } from "./+types/api.config.create";

import { isString } from "@app/lib/predicates";

export async function action({ context, request }: Route.ActionArgs) {
  const userId = context?.user?.id;
  if (!userId) throw redirect("/");

  const form = await request.formData();

  const playlistId = form.get("playlist-id");
  const contributorIds = form.get("contributor-ids");
  const contributorVoteCount = form.get("contributor-vote-count");
  const trackVoteCount = form.get("track-vote-count");

  const hasValidData =
    isString(playlistId) &&
    isString(contributorIds) &&
    isString(trackVoteCount) &&
    isString(contributorVoteCount);

  if (!hasValidData) {
    throw new Error("Data for config creation was sent with incorrect format");
  }

  await context.config.create({
    playlistId: playlistId,
    createdBy: userId,
    contributorIds: contributorIds,
    contributorVoteCount: parseInt(contributorVoteCount),
    trackVoteCount: parseInt(trackVoteCount),
    enableHonourableMentions: true,
    enableShameVotes: true,
    enableVoting: true,
  });

  throw redirect("/vote/" + playlistId);
}
