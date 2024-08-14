import { json, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";

type Response = SpotifyApi.CurrentUsersProfileResponse;

export async function loader({ context }: LoaderFunctionArgs) {
  const profile = await context.spotify.fetch<Response>("/me");

  return json({
    profile,
  });
}

export default function Page() {
  const { profile } = useLoaderData<typeof loader>();

  return (
    <div className="flex h-full flex-col items-start justify-center gap-8">
      <div className="flex flex-col gap-2">
        <p className="font-semibold">Your Account</p>
        <p>{profile.display_name}</p>
      </div>
      <Link to="/api/logout" className="btn btn-secondary">
        Log Out
      </Link>
    </div>
  );
}
