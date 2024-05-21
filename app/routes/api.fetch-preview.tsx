import { ActionFunctionArgs, redirect } from "@remix-run/cloudflare";

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