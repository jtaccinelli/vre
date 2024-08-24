import { PropsWithChildren } from "react";

export function Header({ children }: PropsWithChildren) {
  return (
    <div className="flex w-full items-center gap-2 rounded bg-gray-900 p-2">
      {children}
    </div>
  );
}
