import { Link, useRouteLoaderData } from "react-router";

import type { loader } from "@app/root";

import { SpotifyImage } from "@app/components/spotify-image";

export function FooterUser() {
  const data = useRouteLoaderData<typeof loader>("root");
  const user = data?.user;

  if (!user) return null;

  return (
    <div className="sticky bottom-0 flex items-center justify-between bg-gray-950 p-4">
      <div className="flex items-center gap-3">
        <SpotifyImage
          image={user.images?.[0]}
          className="size-8 rounded-full bg-gray-700 object-cover"
        />
        <p className="text flex flex-col text-white">
          <span className="text-gray-300">Signed in as</span>
          <span className="font-semibold">{user.display_name ?? user.id}</span>
        </p>
      </div>
      <nav className="flex items-center gap-4 pr-4">
        <Link to="/api/auth/sign-out" className="link cursor-pointer">
          Sign Out
        </Link>
      </nav>
    </div>
  );
}
