import { useEffect, useRef, useState } from "react";
import { Form } from "react-router";

import type { Group } from "~/schema";
import { GROUP_EVENTS } from "~/lib/events";

import { useBoolean } from "~/hooks/use-boolean";
import { useEventSubscribe } from "~/hooks/use-event-subscribe";

import { Dialog } from "~/components/shared/dialog";
import { Field } from "~/components/shared/field";

type Props = {
  groups: Group[];
};

export function DialogGroupUpdate({ groups }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [group, setGroup] = useState<Group>();
  const [isShow, updateIsShow] = useBoolean(false);

  useEventSubscribe(GROUP_EVENTS.UPDATE, (event) => {
    const handle = event.detail.handle;
    if (!handle) return;

    updateIsShow.true();
    setGroup(groups.find((group) => group.handle === handle));
  });

  useEffect(() => {
    if (isShow && formRef.current) formRef.current.reset();
  }, [isShow]);

  if (!group || !group.title) return;

  return (
    <Dialog state={[isShow, updateIsShow]} heading="Update Group">
      <Form
        ref={formRef}
        method="POST"
        action="/api/group/update"
        className="flex flex-col items-start gap-2"
        reloadDocument
      >
        <Field name="title" label="Title">
          <input type="text" defaultValue={group.title} />
        </Field>
        <input type="hidden" name="handle" value={group.handle} />
        <button className="btn btn-primary">Update Group</button>
      </Form>
    </Dialog>
  );
}
