import { useRouteLoaderData } from "react-router";

import type { loader } from "@app/root";

import { DialogBasic } from "@app/components/dialog-basic";
import { DialogJoinRoom } from "@app/components/dialog-join-room";
import { DialogCreateRoom } from "@app/components/dialog-create-room";

export function DialogSignedOut() {
  const data = useRouteLoaderData<typeof loader>("root");
  const isOpen = !data?.room;

  return (
    <DialogBasic
      id="signed-out"
      open={isOpen}
      emoji="💿"
      heading="Welcome to the VRE!"
      subheading="Trading tunes since '24"
    >
      <DialogJoinRoom className="btn btn-primary" />
      <DialogCreateRoom className="btn btn-secondary" />
    </DialogBasic>
  );
}
