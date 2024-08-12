import { useMemo } from "react";

type Props = {
  playlist: SpotifyApi.SinglePlaylistResponse;
};

export function CardPlaylist({ playlist }: Props) {
  const image = useMemo(() => {
    return playlist.images[0];
  }, [playlist]);

  return (
    <section className="flex items-center gap-4 rounded-sm bg-gray-900 p-2">
      <img
        className="h-36 w-36 rounded-sm"
        src={image.url}
        alt={playlist.name}
        height={image.height}
        width={image.width}
      />
      <div className="flex flex-col items-start gap-1 py-2">
        <p className="text-lg font-semibold">{playlist.name}</p>
        <p className="text-sm text-gray-500">
          Created by {playlist.owner.display_name}
        </p>
        <p className="text-sm text-gray-500">
          {playlist.tracks.total} Tracks, {playlist.followers.total} followers
        </p>
      </div>
    </section>
  );
}
