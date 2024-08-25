import { useMemo } from "react";

import { SpotifyImage } from "./spotify-image";

type Props = {
  item: SpotifyApi.PlaylistTrackObject;
};

export function CardTrack({ item }: Props) {
  const { track } = item;
  const [image] = track?.album?.images ?? [];

  const artists = useMemo(() => {
    return track?.artists.map((artist) => artist.name).join(", ");
  }, [track]);

  if (!track) return null;

  return (
    <div className="flex flex-col gap-4 rounded bg-gray-900 p-2 pr-8">
      <div className="flex items-center gap-4">
        <SpotifyImage
          image={image}
          alt="Profile"
          className="h-28 w-28 rounded-sm"
        />
        <div className="flex flex-col items-start gap-1 overflow-hidden py-2">
          <p className="font-semibold">{track.name}</p>
          <p className="text-sm text-gray-500">{track.album.name}</p>
          <p className="text-sm text-gray-500">{artists}</p>
        </div>
      </div>
    </div>
  );
}
