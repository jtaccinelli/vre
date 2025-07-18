import { type ReactNode } from "react";

import { Dialog } from "@app/components/dialog";

type Props = {
  id: string;
  open: boolean;
  emoji: string;
  heading: string;
  subheading: string;
  onClose?: () => void;
  children?: ReactNode;
};

export function DialogBasic({
  id,
  open,
  emoji,
  heading,
  subheading,
  onClose,
  children,
}: Props) {
  return (
    <Dialog
      id={id}
      open={open}
      onClose={onClose}
      className="flex flex-col items-center p-6 pt-16 pb-12 text-center"
    >
      <span className="mb-6 text-6xl">{emoji}</span>
      <p className="title mb-1 text-white">{heading}</p>
      <p className="text mb-8 text-gray-400">{subheading}</p>
      <div className="flex gap-2">{children}</div>
    </Dialog>
  );
}
