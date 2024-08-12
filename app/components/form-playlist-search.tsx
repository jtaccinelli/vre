import { Form } from "@remix-run/react";

type Props = {
  query?: string;
};

export function FormPlaylistSearch({ query }: Props) {
  return (
    <Form
      method="get"
      action="/search"
      className="flex w-full flex-col items-start gap-4"
    >
      <p className="font-semibold">Search from your playlists</p>
      <input
        className="w-full bg-gray-900 px-4 py-3"
        type="text"
        name="query"
        id="query"
        defaultValue={query}
        required
      />
      <button type="submit" className="btn btn-primary">
        Search
      </button>
    </Form>
  );
}
