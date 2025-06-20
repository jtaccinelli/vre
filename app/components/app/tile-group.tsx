import { Pen, Trash } from "@phosphor-icons/react";

import type { Group } from "~/schema";
import { GROUP_EVENTS } from "~/lib/events";

import { useEventDispatch } from "~/hooks/use-event-dispatch";

type Props = {
  group: Group;
};

export function TileGroup({ group }: Props) {
  const dispatch = useEventDispatch();

  if (!group) return;

  const handleUpdateGroup = () => {
    dispatch(GROUP_EVENTS.UPDATE, {
      handle: group.handle,
    });
  };

  const handleDeleteGroup = () => {
    dispatch(GROUP_EVENTS.DELETE, {
      handle: group.handle,
    });
  };

  return (
    <div className="flex items-center gap-2 bg-white p-2 pl-4">
      <p className="font-medium">{group.title}</p>
      <p className="grow text-sm text-gray-400">{group.handle}</p>
      <button
        className="btn btn-icon btn-outline shrink-0"
        onClick={handleUpdateGroup}
      >
        <Pen size={20} />
      </button>
      <button
        className="btn btn-icon btn-outline shrink-0"
        onClick={handleDeleteGroup}
      >
        <Trash size={20} className="text-red-700" />
      </button>
    </div>
  );
}
