import type { Icon } from "@phosphor-icons/react";
import type { ReactNode } from "react";

type Props = {
  heading: string;
  icon?: Icon;
};

export function Header({ heading, icon }: Props) {
  const Icon = icon;
  return (
    <header className="flex flex-col gap-4 bg-white px-7 py-10">
      {!Icon ? null : <Icon size={32} className="text-primary-700" />}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{heading}</h1>
      </div>
    </header>
  );
}
