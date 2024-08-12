import { Form } from "@remix-run/react";

export function FormPlaylistLink() {
  return (
    <Form
      method="post"
      action="/api/fetch-preview"
      className="flex w-full flex-col items-start gap-4"
    >
      <p className="font-semibold">Enter a playlist URL</p>
      <input
        className="w-full bg-gray-900 px-4 py-3"
        type="url"
        name="playlist"
        id="playlist"
        required
      />
      <button type="submit" className="btn btn-primary">
        Find Ballot
      </button>
    </Form>
  );
}
