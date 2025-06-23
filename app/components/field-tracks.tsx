import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router";

import { DialogSearch } from "@app/components/dialog-search";
import { Pill } from "@app/components/pill";
import { SpotifyImage } from "@app/components/spotify-image";

type Props = {
  tracks: Track[];
  max?: number;
};

export function FieldTracks({ tracks, max = 3 }: Props) {
  const [selectedTracks, setSelectedTracks] = useState<Track[]>([]);

  const isAtSelectedMax = useMemo(() => {
    return selectedTracks.length >= max;
  }, [selectedTracks, max]);

  const handleSelectTrack = (item: Track) => () => {
    setSelectedTracks((tracks) => {
      return [...tracks, item];
    });
  };

  const handleClearTrack = (track: Track) => () => {
    setSelectedTracks((tracks) => {
      return tracks.filter((_track) => {
        return _track.id !== track.id;
      });
    });
  };

  const handleClearAll = () => {
    setSelectedTracks([]);
  };

  const handleToggleTrack = (item: Track) => () => {
    const isSelected = selectedTracks.some((track) => item.id === track.id);
    if (isSelected) handleClearTrack(item)();
    else handleSelectTrack(item)();
  };

  const handleFilter = (item: Track, query: string) => {
    if (!query) return true;
    const term = query.toLowerCase();
    const artists = item.artists.map((artist) => artist.name).join(", ");

    const hasNameMatch = item.name.toLowerCase().includes(term);
    const hasAlbumMatch = item.album.name.toLowerCase().includes(term);
    const hasArtistMatch = artists.toLowerCase().includes(term);
    return hasNameMatch || hasAlbumMatch || hasArtistMatch;
  };

  const renderTrack = useCallback(
    (item: Track) => {
      const isSelected = selectedTracks.some((track) => item.id === track.id);
      return (
        <button
          type="button"
          data-ui={isSelected && "selected"}
          className="group ui-[selected]:bg-white flex items-center overflow-hidden rounded bg-gray-800 transition-all hover:cursor-pointer hover:bg-gray-700"
          onClick={handleToggleTrack(item)}
        >
          <SpotifyImage
            image={item.album?.images?.[0]}
            className="size-16 bg-gray-950"
          />
          <div className="flex min-w-0 grow flex-col px-3 py-2 text-left">
            <p className="label group-ui-[selected]:text-black">{item.name}</p>
            <p className="text group-ui-[selected]:text-gray-600 flex min-w-0 gap-1 truncate whitespace-nowrap text-gray-400">
              <span>
                {item.artists.map((artist) => artist.name).join(", ")}
              </span>
              <span>•</span>
              <span>{item.album.name}</span>
            </p>
          </div>
          <Link
            to={item.external_urls.spotify}
            target="_blank"
            className="flex size-16 shrink-0 items-center justify-center"
          >
            <img
              src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_White.png"
              className="size-4"
              alt="Spotify Logo"
            />
          </Link>
        </button>
      );
    },
    [selectedTracks],
  );

  return (
    <div className="flex flex-col gap-4 px-6 py-8">
      <input
        type="hidden"
        name="track-ids"
        value={selectedTracks.map((track) => track.id).join(",")}
      />
      <label className="label -mb-4 block">
        What were the best tracks submitted this week?
      </label>
      <p className="text text-gray-400">Select a maximum of {max}</p>
      <div className="flex items-end justify-between">
        <div className="flex grow flex-wrap items-center gap-2">
          {selectedTracks.length === 0 ? (
            <p className="text flex items-center gap-1 rounded border border-gray-600 px-3 py-1 whitespace-nowrap text-gray-600">
              No Tracks Selected
            </p>
          ) : (
            selectedTracks.map((track) => (
              <Pill
                key={track.id}
                onClick={handleClearTrack(track)}
                label={track.name}
              />
            ))
          )}
        </div>
        <button
          type="button"
          onClick={handleClearAll}
          className="link disabled:hidden"
          disabled={!selectedTracks.length}
        >
          Clear
        </button>
      </div>
      <DialogSearch
        cta="Add your tracks..."
        label="Search Tracks"
        placeholder="Search for tracks by name..."
        className="field-input rounded border-transparent bg-gray-700 text-start text-gray-500"
        items={tracks}
        filter={handleFilter}
        renderItem={renderTrack}
        disabled={isAtSelectedMax}
      />
    </div>
  );
}
