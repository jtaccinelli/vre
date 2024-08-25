import { json, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { Link } from "@remix-run/react";

import { Footer } from "~/components/footer";
import { HeaderProfile } from "~/components/header-profile";
import { ListBallots } from "~/components/list-ballots";

type Response = SpotifyApi.CurrentUsersProfileResponse;

export async function loader({ context }: LoaderFunctionArgs) {
  const profile = await context.spotify.fetch<Response>("/me");

  return json({
    profile,
  });
}

export default function Page() {
  return (
    <>
      <HeaderProfile />
      <ListBallots ballots={[]} />
      <Footer>
        <Link to="/playlist/search" className="btn btn-primary grow">
          Search Playlists
        </Link>
        <Link to="/ballot/create" className="btn btn-primary grow">
          Create Ballot
        </Link>
      </Footer>
    </>
  );
}
