import { Form } from "react-router";

import { GROUP_EVENTS } from "~/lib/events";

import { useBoolean } from "~/hooks/use-boolean";
import { useEventSubscribe } from "~/hooks/use-event-subscribe";

import { Dialog } from "~/components/shared/dialog";
import { Field } from "~/components/shared/field";

export function DialogGroupCreate() {
  const [isShow, updateIsShow] = useBoolean(false);

  useEventSubscribe(GROUP_EVENTS.CREATE, () => {
    updateIsShow.true();
  });

  return (
    <Dialog
      state={[isShow, updateIsShow]}
      heading="Create Group"
      blurb="These are used to group together categories, which can be used for
        filtering."
    >
      <Form
        method="POST"
        action="/api/group/create"
        className="flex flex-col items-start gap-2"
        reloadDocument
      >
        <Field name="title" label="Title">
          <input type="text" />
        </Field>
        <button className="btn btn-primary">Create New Group</button>
      </Form>
    </Dialog>
  );
}
