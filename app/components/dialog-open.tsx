import { type ReactNode } from "react";

import { useDialogEvent } from "@app/hooks/use-dialog-event";

type Props = {
  id: string;
  className?: string;
  disabled?: boolean;
  children: ReactNode;
};

export function DialogOpen({ id, className, disabled, children }: Props) {
  const dialog = useDialogEvent(id);
  return (
    <button type="button" onClick={dialog.open} className={className} disabled={disabled}>
      {children}
    </button>
  );
}
