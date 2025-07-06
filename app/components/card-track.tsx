import { Link } from "react-router";
import { SpotifyImage } from "@app/components/spotify-image";
import { SpotifyLogo } from "@app/components/spotify-logo";
import { useTrackPreview } from "@app/hooks/use-track-preview";
import { Pause, Play } from "@phosphor-icons/react";

type Props = {
  track: Track;
  isSelected: boolean;
  onClick: () => void;
};

export function CardTrack({ track, isSelected, onClick }: Props) {
  const [isPlaying, setIsPlaying] = useTrackPreview(track.preview_url);

  const artists = track.artists.map((artist) => artist.name).join(", ");

  return (
    <div
      data-ui={isSelected && "selected"}
      className="group ui-selected:bg-white ui-selected:text-black flex shrink-0 items-center overflow-hidden rounded bg-gray-800 transition-all hover:bg-gray-700"
    >
      <Link
        to={track.external_urls.spotify}
        target="_blank"
        className="relative size-20 shrink-0"
      >
        <SpotifyImage
          image={track.album?.images?.[0]}
          className="size-full bg-gray-950"
        />
        <SpotifyLogo className="absolute right-2 bottom-2 size-4" />
      </Link>
      <button
        type="button"
        className="flex h-full min-w-0 grow flex-col justify-center px-3 py-2 text-left hover:cursor-pointer"
        onClick={onClick}
      >
        <p className="label">{track.name}</p>
        <p className="text min-w-0 truncate whitespace-nowrap text-gray-400">
          {`${artists} • ${track.album.name}`}
        </p>
      </button>
      <div className="flex size-20 shrink-0 items-center justify-center">
        <button
          onClick={setIsPlaying.toggle}
          type="button"
          className="btn-icon"
        >
          {isPlaying ? (
            <Pause weight="fill" size={20} />
          ) : (
            <Play weight="fill" size={20} />
          )}
        </button>
      </div>
    </div>
  );
}
