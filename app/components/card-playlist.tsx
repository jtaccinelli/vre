import { SpotifyImage } from "./spotify-image";

type Props = {
  playlist: SpotifyApi.PlaylistObjectSimplified;
};

export function CardPlaylist({ playlist }: Props) {
  const [image] = playlist?.images ?? [];

  if (!playlist) return null;

  return (
    <section className="flex items-center gap-4 rounded-sm bg-gray-900 p-2">
      <SpotifyImage
        image={image}
        alt={playlist.name}
        className="h-28 w-28 rounded-sm"
      />
      <div className="flex flex-col items-start gap-1 overflow-hidden py-2">
        <p className="w-full truncate pr-4 text-lg font-semibold">
          {playlist.name}
        </p>
        <p className="text-sm text-gray-500">
          Created by {playlist.owner.display_name}
        </p>
        <p className="text-sm text-gray-500">{playlist.tracks.total} Tracks</p>
      </div>
    </section>
  );
}
