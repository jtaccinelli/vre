import { Link } from "@remix-run/react";

import { SpotifyImage } from "~/components/spotify-image";
import { useRootLoaderData } from "~/hooks/use-root-loader-data";

export function HeaderProfile() {
  const { profile } = useRootLoaderData();

  const [image] = profile?.images ?? [];
  const firstName = profile?.display_name?.split(" ")?.[0] ?? "user";

  return (
    <div className="flex w-full items-center gap-2 rounded bg-gray-900 p-2">
      <SpotifyImage
        image={image}
        alt="Profile"
        className="h-8 w-8 rounded-full"
      />
      <p className="flex-grow">Hi, {firstName}!</p>
      <Link to="/api/logout" className="btn btn-secondary">
        Log Out
      </Link>
    </div>
  );
}
