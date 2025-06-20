import { cloneElement, type ComponentProps, type ReactElement } from "react";
import type { Icon } from "@phosphor-icons/react";
import clsx from "clsx";

type Props = {
  label: string;
  name: string;
  icon?: Icon;
  children: ReactElement<ComponentProps<"input">>;
};

export function Field({ label, icon: Icon, children, name }: Props) {
  return (
    <fieldset className="focus-within:outline-primary-600/50 flex w-full items-center gap-2 rounded bg-gray-50 px-4 focus-within:outline-2">
      <label htmlFor={name} className="text-gray-400">
        {label}
      </label>
      {cloneElement(children, {
        ...children.props,
        name: name,
        className: clsx(
          children.props.className,
          "h-11 grow appearance-none focus:outline-none",
        ),
      })}
      {!Icon ? null : <Icon size={24} />}
    </fieldset>
  );
}
