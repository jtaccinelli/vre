import { useEffect } from "react";
import { Link } from "react-router";

import { useRootLoaderData } from "@app/hooks/use-root-loader";
import { useDialogEvent } from "@app/hooks/use-dialog-event";
import { DialogBasic } from "@app/components/dialog-basic";

export function DialogRefreshSession() {
  const { isLoggedIn, isTokenExpired } = useRootLoaderData();
  const isOpen = isLoggedIn && isTokenExpired;
  const dialog = useDialogEvent("refresh-session");

  useEffect(() => {
    if (isOpen) dialog.open();
    else dialog.close();
  }, [isOpen]);

  return (
    <DialogBasic
      id="refresh-session"
      isClosable={false}
      emoji="❤️‍🩹"
      heading="Oh no!"
      subheading="Looks like your session has expired"
    >
      <Link to="/api/auth/refresh" className="btn btn-primary">
        Refresh Session
      </Link>
      <Link to="/api/auth/sign-out" className="btn btn-secondary">
        Sign Out
      </Link>
    </DialogBasic>
  );
}
