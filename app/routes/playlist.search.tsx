import { ActionFunctionArgs, json } from "@remix-run/cloudflare";
import { useFetcher } from "@remix-run/react";

import { Footer } from "~/components/footer";
import { FormPlaylistSearch } from "~/components/form-playlist-search";
import { Header } from "~/components/header";
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

  return json(results);
}

export default function Page() {
  const fetcher = useFetcher<typeof action>({
    key: KEY__ACTION_PLAYLIST_SEARCH,
  });

  return (
    <>
      <Header text="Search for a playlist" />
      <ListPlaylists playlists={fetcher.data?.playlists?.items ?? []} />
      <Footer>
        <FormPlaylistSearch />
      </Footer>
    </>
  );
}
