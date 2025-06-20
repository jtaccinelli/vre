import { useState } from "react";
import { Form } from "react-router";

import type { Group } from "~/schema";
import { GROUP_EVENTS } from "~/lib/events";

import { useBoolean } from "~/hooks/use-boolean";
import { useEventSubscribe } from "~/hooks/use-event-subscribe";

import { Dialog } from "~/components/shared/dialog";

type Props = {
  groups: Group[];
};

export function DialogGroupDelete({ groups }: Props) {
  const [group, setGroup] = useState<Group>();
  const [isShow, updateIsShow] = useBoolean(false);

  useEventSubscribe(GROUP_EVENTS.DELETE, (event) => {
    const handle = event.detail.handle;
    if (!handle) return;

    updateIsShow.true();
    setGroup(groups.find((group) => group.handle === handle));
  });

  if (!group || !group.title) return;

  return (
    <Dialog
      state={[isShow, updateIsShow]}
      heading="Delete Group"
      blurb={`Are you sure you want to delete the "${group.title}" group? This cannot
        be undone.`}
    >
      <Form method="POST" action="/api/group/delete" reloadDocument>
        <input type="hidden" name="handle" value={group.handle} />
        <div className="flex gap-2">
          <button className="btn btn-danger">Delete Group</button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={updateIsShow.false}
          >
            Cancel
          </button>
        </div>
      </Form>
    </Dialog>
  );
}
