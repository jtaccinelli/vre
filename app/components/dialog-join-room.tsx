import { Dialog } from "@app/components/dialog";
import { FormJoinRoom } from "@app/components/form-join-room";

export function DialogJoinRoom() {
  return (
    <Dialog id="join-room" heading="Join a Room" className="text-left">
      <FormJoinRoom />
    </Dialog>
  );
}
