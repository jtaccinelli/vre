import { ActionFunctionArgs, json } from "@remix-run/cloudflare";

import { FormPlaylistSearch } from "~/components/form-playlist-search";
import { HeaderSearch } from "~/components/header-search";
import { ListPlaylists } from "~/components/list-playlists";

export const KEY__ACTION_PLAYLIST_SEARCH = "search-playlist";

export async function action({ context, request }: ActionFunctionArgs) {
  const body = await request.formData();
  const query = body.get("query");

  if (!query || typeof query !== "string") {
    throw new Error("No search query provided.");
  }

  const params = new URLSearchParams();
  params.set("q", query);
  params.set("type", "playlist");
  params.set("limit", "20");

  const endpoint = `/search?${params.toString()}`;

  type Response = SpotifyApi.PlaylistSearchResponse;
  const results = await context.spotify.fetch<Response>(endpoint);

  return json({
    results,
    query,
  });
}

export default function Page() {
  return (
    <div className="flex h-full flex-col justify-center gap-4">
      <HeaderSearch />
      <FormPlaylistSearch />
      <ListPlaylists />
    </div>
  );
}
