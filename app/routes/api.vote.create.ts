import { redirect } from "react-router";
import type { Route } from "./+types/api.vote.create";

import { isNotFile, isString } from "@app/lib/predicates";
import { error } from "@app/lib/routes";

export async function action({ context, request }: Route.ActionArgs) {
  const userId = context?.user?.id;
  if (!userId) throw redirect("/");

  const form = await request.formData();

  const playlistId = form.get("playlist-id");
  const contributorIds = form.get("user-ids");
  const trackIds = form.get("track-ids");
  const honourableMentions = form.get("honourable-mentions");
  const shameVotes = form.get("shame-votes");
  const voterId = form.get("voter-id") ?? userId;

  const hasValidData =
    isString(playlistId) &&
    isNotFile(contributorIds) &&
    isNotFile(trackIds) &&
    isNotFile(honourableMentions) &&
    isNotFile(voterId) &&
    isNotFile(shameVotes);

  if (!hasValidData) return error("Form was incomplete");

  await context.vote.create({
    playlistId,
    voterId,
    contributorIds,
    trackIds,
    honourableMentions,
    shameVotes,
  });

  throw redirect("/");
}
