import { json, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";

export async function loader({ context }: LoaderFunctionArgs) {
  const profile = await context.spotify.fetch("/me");

  console.log(profile);

  return json({
    profile,
  });
}

export default function Page() {
  const { profile } = useLoaderData<typeof loader>();

  console.log(profile);

  return (
    <div>
      Test Account Page<Link to="/api/logout">Log Out</Link>
    </div>
  );
}
