import { redirect } from "react-router";
import type { Route } from "./+types/api.form.create";

import { isString } from "@app/lib/predicates";

export async function action({ context, request }: Route.ActionArgs) {
  const userId = context?.user?.id;
  if (!userId) throw redirect("/");

  const form = await request.formData();

  const playlistId = form.get("playlist-id");
  const roomId = form.get("room-id");
  const contributorIds = form.get("contributor-ids");
  const contributorVoteCount = form.get("contributor-vote-count");
  const trackVoteCount = form.get("track-vote-count");

  const hasValidData =
    isString(playlistId) &&
    isString(roomId) &&
    isString(contributorIds) &&
    isString(trackVoteCount) &&
    isString(contributorVoteCount);

  if (!hasValidData) {
    throw new Error("Data for form creation was sent with incorrect format");
  }

  await context.form.create({
    playlistId: playlistId,
    roomId: roomId,
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
