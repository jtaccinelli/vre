import { dispatchDialogOpen, dispatchDialogClose } from "@app/lib/events";

export function useDialogEvent(id: string) {
  return {
    open: () => dispatchDialogOpen(id),
    close: () => dispatchDialogClose(id),
  };
}
