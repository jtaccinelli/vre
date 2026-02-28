import type { UserSchema } from "@server/schema";

import { SpotifyImage } from "@app/components/spotify-image";

type Props = {
  user: UserSchema;
  isSelected: boolean;
  onClick: () => void;
};

export function CardUser({ user, isSelected, onClick }: Props) {
  return (
    <div
      data-ui={isSelected && "selected"}
      className="group ui-selected:bg-white ui-selected:text-black flex shrink-0 overflow-hidden rounded bg-gray-800 transition-all hover:cursor-pointer hover:bg-gray-700"
    >
      <div className="relative size-20 shrink-0">
        <SpotifyImage
          url={user.imageUrl}
          className="size-full bg-gray-950"
        />
      </div>
      <button
        type="button"
        onClick={onClick}
        className="flex min-w-0 grow flex-col justify-center px-3 py-2 text-left hover:cursor-pointer"
      >
        <p className="label">{user.name}</p>
      </button>
    </div>
  );
}
