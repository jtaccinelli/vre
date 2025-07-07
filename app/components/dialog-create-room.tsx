import { useBoolean } from "@app/hooks/use-boolean";

import { Dialog } from "@app/components/dialog";
import { FormCreate } from "@app/components/form-create";

export function DialogCreateRoom() {
  const [isOpen, setIsOpen] = useBoolean(false);

  return (
    <>
      <button onClick={setIsOpen.true} className="btn btn-primary">
        Create Room
      </button>
      <Dialog
        id="create-room"
        open={isOpen}
        onClose={setIsOpen.false}
        heading="Create a Room"
        className="flex flex-col"
      >
        <FormCreate />
      </Dialog>
    </>
  );
}
