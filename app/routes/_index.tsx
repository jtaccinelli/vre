import { ActionFunctionArgs } from "@remix-run/cloudflare";
import { Form } from "@remix-run/react";
import { redirect } from "react-router";

export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData();
  const playlist = form.get("playlist");

  if (!playlist || typeof playlist !== "string") {
    throw new Error("Playlist URL was not submitted in the right format.");
  }

  const playlistUrl = new URL(playlist);
  const playlistId = playlistUrl.pathname.split("/").pop();

  return redirect(`/preview/${playlistId}`);
}

export default function Page() {
  return (
    <div className="flex h-full w-full flex-col justify-center gap-8">
      <Form className="flex w-full flex-col items-start gap-4" method="post">
        <p>Enter A Playlist URL</p>
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
      <hr className="w-full border-gray-800" />
      <section
        aria-label="Playlist Link Instructions"
        className="font-xs flex flex-col gap-2"
      >
        <p className="font-semibold">Can&apos;t find the playlist url?</p>
        <ol className="list-inside list-decimal text-gray-400">
          <li>Open the playlist you want to vote on in Spotify.</li>
          <li>Click on the three dots.</li>
          <li>Go to Share &gt; Copy link to playlist.</li>
        </ol>
      </section>
    </div>
  );
}
