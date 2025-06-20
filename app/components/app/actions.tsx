import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function Actions({ children }: Props) {
  return (
    <div className="sticky top-0 flex items-center gap-2 bg-white p-4">
      {children}
    </div>
  );
}
