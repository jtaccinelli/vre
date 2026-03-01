import { useEffect } from "react";
import { Link } from "react-router";

import { useDialogEvent } from "@app/hooks/use-dialog-event";
import { DialogBasic } from "@app/components/dialog-basic";

export function DialogCantVote() {
  const dialog = useDialogEvent("cant-vote");

  useEffect(() => {
    dialog.open();
  }, []);

  return (
    <DialogBasic
      id="cant-vote"
      isClosable={false}
      emoji="🧑‍⚖️"
      heading="You can't vote!"
      subheading="You didn't contribute to this playlist."
    >
      <Link to="/" className="btn btn-primary">
        Back Home
      </Link>
    </DialogBasic>
  );
}
