import { useState } from "react";
import { Link } from "react-router";

import { useRootLoaderData } from "@app/hooks/use-root-loader";
import { useBoolean } from "@app/hooks/use-boolean";

import { DialogBasic } from "@app/components/dialog-basic";
import { DialogSignIn } from "@app/components/dialog-sign-in";
import { DialogCreateRoom } from "@app/components/dialog-create-room";

export function DialogSignedOut() {
  const { isLoggedIn } = useRootLoaderData();
  const [isOpen, setIsOpen] = useBoolean(!isLoggedIn);

  return (
    <DialogBasic
      id="signed-out"
      open={isOpen}
      emoji="💿"
      heading="Welcome to the VRE!"
      subheading="Trading tunes since '24"
    >
      <DialogSignIn className="btn btn-primary" />
      <DialogCreateRoom className="btn btn-secondary" />
    </DialogBasic>
  );
}
