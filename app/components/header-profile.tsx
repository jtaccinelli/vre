import { Link } from "@remix-run/react";

import { Header } from "~/components/header";
import { SpotifyImage } from "~/components/spotify-image";
import { useRootLoaderData } from "~/hooks/use-root-loader-data";

export function HeaderProfile() {
  const { profile } = useRootLoaderData();

  const [image] = profile?.images ?? [];
  const firstName = profile?.display_name?.split(" ")?.[0] ?? "user";

  return (
    <Header>
      <SpotifyImage
        image={image}
        alt="Profile"
        className="ml-2 h-8 w-8 rounded-full"
      />
      <p className="flex-grow">Hi, {firstName}!</p>
      <Link to="/api/logout" className="btn btn-secondary">
        Log Out
      </Link>
    </Header>
  );
}
