import { useEffect } from "react";
import { Form, useFetcher } from "react-router";

import type { loader } from "@app/routes/api.room.list";
import { useLocalStorage } from "@app/hooks/use-local-storage";
import { Dialog } from "@app/components/dialog";
import { Placeholder } from "@app/components/placeholder";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function DialogSwapRoom({ isOpen, onClose }: Props) {
  const fetcher = useFetcher<typeof loader>();
  const [, roomIdActions] = useLocalStorage("room-id");

  useEffect(() => {
    if (isOpen && fetcher.state === "idle" && !fetcher.data) {
      fetcher.load("/api/room/list");
    }
  }, [isOpen]);

  const rooms = fetcher.data?.rooms ?? [];

  function handleSelectRoom(roomId: string) {
    return () => roomIdActions.set(roomId);
  }

  return (
    <Dialog
      id="swap-room"
      open={isOpen}
      onClose={onClose}
      heading="Swap Room"
      className="flex flex-col"
    >
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
