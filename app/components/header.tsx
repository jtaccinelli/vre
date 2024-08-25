import { ReactNode } from "react";

type Props = {
  text?: string;
  children?: ReactNode;
};

export function Header({ children, text }: Props) {
  return (
    <div className="sticky top-0 flex w-full items-center gap-2 rounded bg-gray-800 p-2">
      {!text ? null : <p className="flex-grow px-4 py-3 font-medium">{text}</p>}
      {children}
    </div>
  );
}
