import { Dialog } from "@app/components/dialog";
import { FormRoom } from "@app/components/form-room";

export function DialogCreateRoom() {
  return (
    <Dialog id="create-room" heading="Create a Room" className="flex flex-col text-left">
      <FormRoom />
    </Dialog>
  );
}
