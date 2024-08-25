import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

export function Footer({ children }: Props) {
  return (
    <div className="sticky bottom-0 flex w-full items-center gap-2 bg-gray-950 pt-2">
      {children}
    </div>
  );
}
