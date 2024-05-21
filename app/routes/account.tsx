import { json, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";

export async function loader({ context }: LoaderFunctionArgs) {
  const profile = await context.spotify.fetch("/me");
  return json({
    profile,
  });
}

export default function Page() {
  const { profile } = useLoaderData<typeof loader>();

  console.log(profile);
  return (
    <div>
      Account Page<Link to="/api/logout">Log Out</Link>
    </div>
  );
}
