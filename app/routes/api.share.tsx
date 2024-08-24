import { LoaderFunctionArgs, redirect } from "@remix-run/cloudflare";

export async function loader({ request }: LoaderFunctionArgs) {
  const requestUrl = new URL(request.url);
  const playlistData = requestUrl.searchParams.get("link");

  if (!playlistData) return redirect("/");

  const playlistUrl = new URL(playlistData);
  const playlistId = playlistUrl.pathname.split("/").pop();

  return redirect(`/playlist/${playlistId}`);
}
