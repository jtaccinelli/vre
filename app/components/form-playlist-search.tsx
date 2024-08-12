import { Form } from "@remix-run/react";

export function FormPlaylistSearch() {
  return (
    <Form
      method="post"
      action="/search"
      className="flex w-full flex-col items-start gap-4"
    >
      <p className="font-semibold">Search from your playlists</p>
      <input
        className="w-full bg-gray-900 px-4 py-3"
        type="text"
        name="query"
        id="query"
        required
      />
      <button type="submit" className="btn btn-primary">
        Search
      </button>
    </Form>
  );
}
