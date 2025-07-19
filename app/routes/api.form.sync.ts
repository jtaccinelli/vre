import { redirect } from "react-router";
import type { Route } from "./+types/api.form.sync";

import { isString } from "@app/lib/predicates";
import { extractContributorIds } from "@app/lib/helpers";
import { error } from "@app/lib/routes";

export async function action({ context, request }: Route.ActionArgs) {
  const userId = context?.user?.id;
  if (!userId) throw redirect("/");

  const form = await request.formData();
  const playlistId = form.get("playlist-id");
  if (!isString(playlistId)) return error("Form was incomplete");

  const playlist = await context.spotify.fetchPlaylist(playlistId);
  if (!playlist) return error("No playlist was found with");

  const contributorIds = extractContributorIds(playlist);

  await context.form.update(playlistId, {
    contributorIds: contributorIds,
  });

  throw redirect("/vote/" + playlistId);
}
