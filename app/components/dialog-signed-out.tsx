import { useEffect } from "react";
import { useRouteLoaderData } from "react-router";

import type { loader } from "@app/root";

import { useDialogEvent } from "@app/hooks/use-dialog-event";

import { DialogBasic } from "@app/components/dialog-basic";
import { DialogCreateRoom } from "@app/components/dialog-create-room";
import { DialogJoinRoom } from "@app/components/dialog-join-room";
import { DialogOpen } from "@app/components/dialog-open";

export function DialogSignedOut() {
  const data = useRouteLoaderData<typeof loader>("root");
  const dialog = useDialogEvent("signed-out");

  useEffect(() => {
    const isOpen = !data?.room;
    if (isOpen) dialog.open();
    else dialog.close();
  }, [data]);

  return (
    <>
      <DialogBasic
        id="signed-out"
        isClosable={false}
        emoji="💿"
        heading="Welcome to the VRE!"
        subheading="Trading tunes since '24"
      >
        <DialogOpen id="join-room" className="btn btn-primary">
          Join Room
        </DialogOpen>
        <DialogOpen id="create-room" className="btn btn-secondary">
          Create Room
        </DialogOpen>
      </DialogBasic>
      <DialogJoinRoom />
      <DialogCreateRoom />
    </>
  );
}
