import { type ReactNode } from "react";

import { useDialogEvent } from "@app/hooks/use-dialog-event";
import { DialogBasic } from "@app/components/dialog-basic";

type Props = {
  id: string;
  emoji: string;
  heading: string;
  subheading: string;
  children?: ReactNode;
};

export function DialogConfirm({ id, emoji, heading, subheading, children }: Props) {
  const dialog = useDialogEvent(id);

  return (
    <DialogBasic id={id} emoji={emoji} heading={heading} subheading={subheading}>
      {children}
      <button onClick={dialog.close} className="btn btn-secondary">
        Cancel
      </button>
    </DialogBasic>
  );
}
