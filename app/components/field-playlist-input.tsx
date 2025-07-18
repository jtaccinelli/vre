import { type ChangeEvent, useMemo, useState } from "react";
import { useFetcher } from "react-router";

import type { Loader } from "@app/routes/api.playlist.fetch";

import { extractContributorIds } from "@app/lib/helpers";

import { Alert } from "@app/components/alert";
import { Placeholder } from "@app/components/placeholder";
import { SpotifyImage } from "@app/components/spotify-image";

const URL_STARTER = "https://open.spotify.com/playlist/";

export function FieldPlaylistInput() {
  const [value, setValue] = useState<string>("");
  const fetcher = useFetcher<Loader>();

  const { playlist, contributorIds, hasForm } = useMemo(() => {
    if (!fetcher.data?.playlist) return {};

    const playlist = fetcher.data.playlist;
    const hasForm = fetcher.data.hasForm;
    const contributorIds = extractContributorIds(playlist);

    return {
      playlist,
      hasForm,
      contributorIds,
    };
  }, [fetcher.data]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (!value.startsWith(URL_STARTER)) return;

    setValue(value);
    const id = value.split("?").shift()?.split("/").pop();
    fetcher.load(`/api/playlist/fetch?id=${id}`);
  };

  const handleClear = () => {
    setValue("");
  };

  return (
    <div className="flex flex-col gap-4 px-6 py-8">
      <input type="hidden" name="playlist-id" value={playlist?.id ?? ""} />
      <input type="hidden" name="contributor-ids" value={contributorIds} />
      <label className="label -mb-4 block">What playlist are we using?</label>
      <div className="flex justify-between">
        <p className="text text-gray-400">Paste in a playlist URL below</p>
        <button
          type="button"
          onClick={handleClear}
          className="link disabled:hidden"
          disabled={!value}
        >
          Clear
        </button>
      </div>
      <input
        type="url"
        placeholder={`${URL_STARTER}...`}
        value={value}
        disabled={!!playlist && !!value}
        onChange={handleChange}
        className="field-input rounded border-transparent bg-gray-700 text-white placeholder:text-gray-500"
      />
      {!value ? (
        <Placeholder label="No URL has been provided" />
      ) : fetcher.state === "loading" ? (
        <Placeholder label="Searching for playlist..." loading />
      ) : !playlist ? (
        <Placeholder label="No playlist found" />
      ) : (
        <div className="flex w-full overflow-hidden rounded bg-gray-800">
          <SpotifyImage
            image={playlist?.images[0]}
            className="aspect-square size-24 shrink-0 bg-gray-950 object-cover"
          />
          <div className="flex grow flex-col justify-center px-6">
            <p className="heading truncate">{playlist.name}</p>
            <p className="label truncate text-gray-400">
              {playlist.tracks.total} tracks
            </p>
          </div>
        </div>
      )}
      {!hasForm || !playlist ? null : (
        <Alert
          message="This playlist already has a form created."
          cta="Go Vote"
          href={`/vote/${playlist.id}`}
        />
      )}
    </div>
  );
}
