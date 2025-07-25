import { redirect } from "react-router";
import type { Route } from "./+types/api.form.create";

import { SessionHandler } from "@server/session";

import { isString } from "@app/lib/predicates";
import { error } from "@app/lib/routes";

export async function action({ context, request }: Route.ActionArgs) {
  const userId = context?.user?.id;
  if (!userId) throw redirect("/");

  const form = await request.formData();

  const roomId = await context.session.get(SessionHandler.KEY__ROOM_ID);
  const playlistId = form.get("playlist-id");
  const contributorIds = form.get("contributor-ids");
  const contributorVoteCount = form.get("contributor-vote-count");
  const trackVoteCount = form.get("track-vote-count");

  const hasValidData =
    isString(roomId) &&
    isString(playlistId) &&
    isString(contributorIds) &&
    isString(trackVoteCount) &&
    isString(contributorVoteCount);

  if (!hasValidData) {
    return error("Form was incomplete");
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
