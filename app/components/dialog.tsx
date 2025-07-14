import { useEffect, type ReactNode } from "react";

import { useUi } from "@app/hooks/use-ui";
import { DIALOG_EVENTS } from "@app/lib/events";

type Props = {
  id: string;
  open: boolean;
  heading?: string;
  onClose?: () => void;
  children?: ReactNode;
  className?: string;
};

export function Dialog({
  id,
  open,
  heading,
  className,
  onClose = () => {},
  children,
}: Props) {
  const ui = useUi({
    closed: !open,
  });

  useEffect(() => {
    document.addEventListener(DIALOG_EVENTS.OPEN, (event) => {
      if (id === event.detail.id) return;
      onClose();
    });
  }, []);

  useEffect(() => {
    if (!open) return;
    document.dispatchEvent(
      new CustomEvent(DIALOG_EVENTS.OPEN, {
        detail: {
          id: id,
        },
      }),
    );
  }, [open]);

  return (
    <div
      data-ui={ui}
      className="group ui-closed:pointer-events-none ui-closed:opacity-0 fixed inset-0 z-40 transition-opacity"
    >
      <button
        type="button"
        className="absolute inset-0 z-0 bg-gray-950/80 backdrop-blur"
        onClick={onClose}
      />
      <div className="absolute bottom-0 left-1/2 z-10 w-full max-w-screen-sm -translate-x-1/2 px-2">
        <div className="group-ui-closed:translate-y-1/2 flex max-h-[70vh] w-full flex-col overflow-y-scroll rounded-t-xl bg-gray-900 transition-transform">
          {!heading ? null : (
            <div className="border-b border-gray-950 p-6 text-left">
              <p className="title text-white">{heading}</p>
            </div>
          )}
          <div className={className}>{children}</div>
        </div>
      </div>
    </div>
  );
}
