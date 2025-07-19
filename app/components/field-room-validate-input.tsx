import { type ChangeEvent, useEffect, useMemo, useState } from "react";
import { useFetcher } from "react-router";

import type { Loader } from "@app/routes/api.room.fetch";

import { Placeholder } from "@app/components/placeholder";
import { useRootLoaderData } from "@app/hooks/use-root-loader";

export function FieldRoomValidateInput() {
  const { roomId } = useRootLoaderData();
  const [value, setValue] = useState(roomId || "");
  const fetcher = useFetcher<Loader>();

  const room = useMemo(() => {
    return fetcher?.data?.room;
  }, [fetcher.data]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.length > 6) return;
    setValue(value);
  };

  useEffect(() => {
    if (value.length !== 6) return;
    fetcher.load(`/api/room/fetch?id=${value}`);
  }, [value]);

  return (
    <div className="flex flex-col gap-4 px-6 py-8">
      <input type="hidden" name="room-id" value={room?.id ?? ""} />
      <label className="label -mb-4 block">Provide your Room ID</label>
      <p className="text text-gray-400">
        A six digit code, provided by your host
      </p>
      <input
        type="text"
        placeholder="vR3RoX"
        value={value}
        onChange={handleChange}
        className="field-input rounded border-transparent bg-gray-700 font-mono text-white placeholder:text-gray-500"
      />
      {!value ? (
        <Placeholder label="No ID has been provided" />
      ) : fetcher.state === "loading" ? (
        <Placeholder label="Searching for room..." loading />
      ) : !room ? (
        <Placeholder label="No room has been found" />
      ) : (
        <div className="flex w-full overflow-hidden rounded bg-gray-800">
          <div className="flex grow flex-col justify-center p-4">
            <p className="heading truncate">{room.name}</p>
          </div>
        </div>
      )}
    </div>
  );
}
