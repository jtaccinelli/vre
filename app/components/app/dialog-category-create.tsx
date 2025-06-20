import { Form } from "react-router";

import { CATEGORY_EVENTS } from "~/lib/events";

import { useBoolean } from "~/hooks/use-boolean";
import { useEventSubscribe } from "~/hooks/use-event-subscribe";

import { Dialog } from "~/components/shared/dialog";
import { Field } from "~/components/shared/field";

export function DialogCategoryCreate() {
  const [isShow, updateIsShow] = useBoolean(false);

  useEventSubscribe(CATEGORY_EVENTS.CREATE, () => {
    updateIsShow.true();
  });

  return (
    <Dialog
      state={[isShow, updateIsShow]}
      heading="Create Category"
      blurb="These are assigned to entries whenever they are created, and provide context around how those entries should behave."
    >
      <Form
        method="POST"
        action="/api/category/create"
        className="flex flex-col items-start gap-2"
        reloadDocument
      >
        <Field name="title" label="Title">
          <input type="text" />
        </Field>
        <button className="btn btn-primary">Create New Category</button>
      </Form>
    </Dialog>
  );
}
