import { Link, useNavigation } from "react-router";

import { useRootLoaderData } from "@app/hooks/use-root-loader";

import { SpotifyImage } from "@app/components/spotify-image";

export function Footer() {
  const { user } = useRootLoaderData();
  const navigation = useNavigation();

  return (
    <div className="sticky bottom-0 flex flex-col">
      {navigation.state === "idle" ? null : (
        <div className="animate-load h-px bg-white" />
      )}
      <div className="flex items-center justify-between bg-gray-950 p-4">
        <div className="flex items-center gap-3">
          <SpotifyImage
            image={user?.images?.[0]}
            alt="Profile"
            className="size-8 rounded-full"
          />
          <p className="text flex flex-col text-white">
            <span className="text-gray-300">Signed in as</span>
            <span className="font-semibold">{user?.display_name}</span>
          </p>
        </div>
        <nav className="flex items-center gap-4 pr-4">
          <Link to="/api/auth/sign-out" className="link">
            Sign Out
          </Link>
        </nav>
      </div>
    </div>
  );
}
