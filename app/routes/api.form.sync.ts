import { redirect } from "react-router";
import type { Route } from "./+types/api.form.sync";

import { isString } from "@app/lib/predicates";
import { extractContributorIds } from "@app/lib/helpers";

export async function action({ context, request }: Route.ActionArgs) {
  const userId = context?.user?.id;
  if (!userId) throw redirect("/");

  const form = await request.formData();
  const playlistId = form.get("playlist-id");

  if (!isString(playlistId)) {
    throw new Error("Data for form sync was sent with incorrect format");
  }

  const playlist = await context.spotify.fetchPlaylist(playlistId);

  if (!playlist) {
    throw new Error("No playlist was found with: " + playlistId);
  }

  const contributorIds = extractContributorIds(playlist);

  await context.form.update(playlistId, {
    contributorIds: contributorIds,
  });

  throw redirect("/vote/" + playlistId);
}
