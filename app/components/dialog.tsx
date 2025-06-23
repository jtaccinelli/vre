import { type ReactNode } from "react";
import clsx from "clsx";

import { useUi } from "@app/hooks/use-ui";

type Props = {
  open: boolean;
  onClose?: () => void;
  children?: ReactNode;
  className?: string;
};

export function Dialog({
  open,
  className,
  onClose = () => {},
  children,
}: Props) {
  const ui = useUi({
    closed: !open,
  });

  return (
    <div
      data-ui={ui}
      className="group ui-[closed]:pointer-events-none ui-[closed]:opacity-0 fixed inset-0 z-40 transition-opacity"
    >
      <button
        type="button"
        className="absolute inset-0 z-0 bg-gray-950/80"
        onClick={onClose}
      />
      <div className="absolute bottom-0 left-1/2 z-10 w-full max-w-screen-sm -translate-x-1/2 px-2">
        <div
          className={clsx(
            "group-ui-[closed]:translate-y-1/2 max-h-[75vh] w-full overflow-y-scroll rounded-t-xl bg-gray-900 transition-transform",
            className,
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
