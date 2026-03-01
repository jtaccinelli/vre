import { useEffect } from "react";
import { Form, useFetcher } from "react-router";

import type { loader } from "@app/routes/api.room.list";
import { useLocalStorage } from "@app/hooks/use-local-storage";
import { useDocumentEvent } from "@app/hooks/use-document-event";
import { DIALOG_EVENTS } from "@app/lib/events";
import { Dialog } from "@app/components/dialog";
import { Placeholder } from "@app/components/placeholder";

export function DialogSwapRoom() {
  const fetcher = useFetcher<typeof loader>();
  const [, roomIdActions] = useLocalStorage("room-id");

  useDocumentEvent(DIALOG_EVENTS.OPEN, (event) => {
    if (event.detail.id !== "swap-room") return;
    if (fetcher.state === "idle" && !fetcher.data) {
      fetcher.load("/api/room/list");
    }
  });

  const rooms = fetcher.data?.rooms ?? [];

  function handleSelectRoom(roomId: string) {
    return () => roomIdActions.set(roomId);
  }

  return (
    <Dialog id="swap-room" heading="Swap Room" className="flex flex-col">
      <div className="flex flex-col gap-2 px-6 py-8 text-white">
        {fetcher.state !== "idle" ? (
          <Placeholder label="Loading rooms…" />
        ) : !rooms.length ? (
          <Placeholder label="No rooms found" />
        ) : (
          rooms.map((room) => (
            <Form key={room.id} method="post" action="/api/room/join">
              <input type="hidden" name="room-id" value={room.id} />
              <button
                type="submit"
                className="w-full rounded bg-gray-800 p-4 text-left hover:bg-gray-700"
                onClick={handleSelectRoom(room.id)}
              >
                {room.name}
              </button>
            </Form>
          ))
        )}
      </div>
    </Dialog>
  );
}
