import { useLoaderData } from "react-router";

import type { loader } from "@app/routes/index";
import { useBoolean } from "@app/hooks/use-boolean";

import { Dialog } from "@app/components/dialog";
import { FormCreate } from "@app/components/form-create";

export function DialogCreateForm() {
  const { user } = useLoaderData<typeof loader>();
  const [isOpen, setIsOpen] = useBoolean(false);

  return (
    <>
      {!user ? null : (
        <button onClick={setIsOpen.true} className="btn btn-primary">
          Create Form
        </button>
      )}
      <Dialog
        id="create-form"
        open={isOpen}
        onClose={setIsOpen.false}
        heading="Create a Form"
        className="flex flex-col"
      >
        <FormCreate />
      </Dialog>
    </>
  );
}
