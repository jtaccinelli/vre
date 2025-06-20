import { useEffect, useRef, type ReactNode } from "react";
import { X } from "@phosphor-icons/react";

import type { BooleanState } from "~/hooks/use-boolean";

type Props = {
  heading: string;
  blurb?: string;
  state: BooleanState;
  children: ReactNode;
};

export function Dialog({ heading, blurb, state, children }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  const [isOpen, updateIsOpen] = state;

  useEffect(() => {
    if (!ref.current) return;
    if (isOpen) ref.current.showModal();
    else ref.current.close();
  }, [isOpen]);

  return (
    <dialog
      ref={ref}
      className="top-1/2 left-1/2 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 divide-y-2 divide-gray-100 rounded bg-white backdrop:bg-black/20"
    >
      <div className="flex items-center justify-between p-2">
        <p className="ml-2 text-lg font-medium">{heading}</p>
        <button
          onClick={updateIsOpen.false}
          className="btn btn-icon btn-secondary"
        >
          <X size={20} weight="bold" />
        </button>
      </div>
      {!blurb ? null : <p className="p-4">{blurb}</p>}
      <div className="flex flex-col gap-4 p-4">{children}</div>
    </dialog>
  );
}
