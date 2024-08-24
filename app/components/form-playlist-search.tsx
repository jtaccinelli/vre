import { useFetcher } from "@remix-run/react";

import { KEY__ACTION_PLAYLIST_SEARCH } from "~/routes/playlist.search";

export function FormPlaylistSearch() {
  const fetcher = useFetcher({ key: KEY__ACTION_PLAYLIST_SEARCH });

  return (
    <fetcher.Form
      method="post"
      action="/playlist/search"
      className="flex w-full items-start gap-4"
    >
      <input
        className="w-full bg-gray-900 px-4 py-3"
        type="text"
        name="query"
        id="query"
        placeholder="e.g. VRE"
        required
      />
      <button type="submit" className="btn btn-primary">
        Search
      </button>
    </fetcher.Form>
  );
}
