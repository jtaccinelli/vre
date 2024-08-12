import { Form } from "@remix-run/react";

export default function Page() {
  return (
    <div className="flex h-full w-full flex-col justify-center gap-8">
      <Form
        method="post"
        action="/api/fetch-preview"
        className="flex w-full flex-col items-start gap-4"
      >
        <p className="font-semibold">Enter A Playlist URL</p>
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
    </div>
  );
}
