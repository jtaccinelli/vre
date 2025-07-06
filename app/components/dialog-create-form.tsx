import { useBoolean } from "@app/hooks/use-boolean";

import { Dialog } from "@app/components/dialog";
import { FormCreate } from "@app/components/form-create";

export function DialogCreateForm() {
  const [isOpen, setIsOpen] = useBoolean(false);

  return (
    <>
      <button onClick={setIsOpen.true} className="btn btn-primary">
        Create Form
      </button>
      <Dialog
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
