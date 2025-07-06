import { Link } from "react-router";

import { SpotifyImage } from "@app/components/spotify-image";
import { SpotifyLogo } from "./spotify-logo";

type Props = {
  user: User;
  isSelected: boolean;
  onClick: () => void;
};

export function CardUser({ user, isSelected, onClick }: Props) {
  console.log(user);
  return (
    <div
      data-ui={isSelected && "selected"}
      className="group ui-selected:bg-white ui-selected:text-black flex shrink-0 items-center overflow-hidden rounded bg-gray-800 transition-all hover:cursor-pointer hover:bg-gray-700"
    >
      <Link
        to={user.external_urls.spotify}
        target="_blank"
        className="relative size-20 shrink-0"
      >
        <SpotifyImage
          image={user.images?.[0]}
          className="size-full bg-gray-950"
        />
        <SpotifyLogo className="absolute right-2 bottom-2 size-4" />
      </Link>
      <button
        type="button"
        onClick={onClick}
        className="flex h-full min-w-0 grow flex-col justify-center px-3 py-2 text-left hover:cursor-pointer"
      >
        <p className="label">{user?.display_name ?? user.id}</p>
      </button>
    </div>
  );
}
