import { useEffect } from "react";

import { useBoolean } from "@app/hooks/use-boolean";
import { useLocalStorage } from "@app/hooks/use-local-storage";

import { DialogBasic } from "@app/components/dialog-basic";
import { DialogJoinRoom } from "@app/components/dialog-join-room";
import { DialogSignIn } from "./dialog-sign-in";

export function DialogSignedOut() {
  const [isOpen, setIsOpen] = useBoolean(true);
  const [roomId] = useLocalStorage("room-id");

  useEffect(() => {
    if (roomId) setIsOpen.false();
  }, [roomId]);

  return (
    <DialogBasic
      id="signed-out"
      open={isOpen}
      emoji="💿"
      heading="Welcome to the VRE!"
      subheading="Trading tunes since '24"
    >
      <DialogJoinRoom className="btn btn-primary" />
      <DialogSignIn className="btn btn-secondary" />
    </DialogBasic>
  );
}
