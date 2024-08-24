import { json, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

import { CardPlaylist } from "~/components/card-playlist";
import { Divider } from "~/components/divider";
import { FormPlaylistSearch } from "~/components/form-playlist-search";

type Response = SpotifyApi.PlaylistSearchResponse;

export async function loader({ context, request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get("query");

  if (!query) throw new Error("No search query provided.");

  const params = new URLSearchParams();
  params.set("q", query);
  params.set("type", "playlist");
  params.set("limit", "20");

  const endpoint = `/search?${params.toString()}`;

  const results = await context.spotify.fetch<Response>(endpoint);

  console.log(results.playlists.items);

  return json({
    results,
    query,
  });
}

export default function Page() {
  const { results, query } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col gap-8">
      <FormPlaylistSearch query={query} />
      <Divider />
      <div className="flex flex-col gap-1">
        <p className="font-semibold">Search for &ldquo;{query}&rdquo;</p>
        <p className="text-gray-700">
          {results.playlists.items.length} results
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {results.playlists.items.map((item) => (
          <a href={`/playlist/${item.id}`} key={item.id}>
            <CardPlaylist playlist={item} />
          </a>
        ))}
      </div>
    </div>
  );
}
