import { LoaderFunctionArgs, json } from "@remix-run/node";
import { SPOTIFY_ENDPOINTS } from "~/lib/spotify";

export async function loader({ params, context }: LoaderFunctionArgs) {
  const id = params.id;
  if (!id) return json({});

  console.log(context);

  // const response = await context.spotify.fetch(SPOTIFY_ENDPOINTS.PLAYLIST + id);
  // const data = await response.json();
  // console.log(data);
  return json({});
}

export default function Page() {
  return (
    <main>
      <h1>Playlist</h1>
    </main>
  );
}
