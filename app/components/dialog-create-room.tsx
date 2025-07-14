import { useBoolean } from "@app/hooks/use-boolean";

import { Dialog } from "@app/components/dialog";
import { FormRoom } from "@app/components/form-room";

type Props = {
  className: string;
};

export function DialogCreateRoom({ className }: Props) {
  const [isOpen, setIsOpen] = useBoolean(false);

  return (
    <>
      <button onClick={setIsOpen.true} className={className}>
        Create Room
      </button>
      <Dialog
        id="create-room"
        open={isOpen}
        onClose={setIsOpen.false}
        heading="Create a Room"
        className="flex flex-col text-left"
      >
        <FormRoom />
      </Dialog>
    </>
  );
}
