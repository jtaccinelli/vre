import { useEffect } from "react";
import { Form, useFetcher } from "react-router";

import type { loader } from "@app/routes/api.room.list";
import { Dialog } from "@app/components/dialog";
import { Placeholder } from "@app/components/placeholder";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function DialogSwapRoom({ isOpen, onClose }: Props) {
  const fetcher = useFetcher<typeof loader>();

  useEffect(() => {
    if (isOpen && fetcher.state === "idle" && !fetcher.data) {
      fetcher.load("/api/room/list");
    }
  }, [isOpen]);

  const rooms = fetcher.data?.rooms ?? [];

  return (
    <Dialog
      id="swap-room"
      open={isOpen}
      onClose={onClose}
      heading="Swap Room"
      className="flex flex-col"
    >
      <div className="flex flex-col gap-3 px-6 py-8 text-white">
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
                className="w-full rounded bg-gray-800 px-4 py-3 text-left font-semibold hover:bg-gray-700"
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
