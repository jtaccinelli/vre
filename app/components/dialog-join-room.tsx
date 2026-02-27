import { useBoolean } from "@app/hooks/use-boolean";

import { Dialog } from "@app/components/dialog";
import { FormJoinRoom } from "@app/components/form-join-room";

type Props = {
  className?: string;
};

export function DialogJoinRoom({ className }: Props) {
  const [isOpen, setIsOpen] = useBoolean(false);

  return (
    <>
      <button onClick={setIsOpen.true} className={className} tabIndex={0}>
        Join Room
      </button>
      <Dialog
        id="join-room"
        open={isOpen}
        onClose={setIsOpen.false}
        heading="Join a Room"
        className="text-left"
      >
        <FormJoinRoom onSuccess={setIsOpen.false} />
      </Dialog>
    </>
  );
}
