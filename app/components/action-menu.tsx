import {
  Children,
  cloneElement,
  isValidElement,
  type ComponentProps,
  type ReactNode,
} from "react";
import { Gear } from "@phosphor-icons/react";
import clsx from "clsx";

import { useBoolean } from "@app/hooks/use-boolean";
import { useUi } from "@app/hooks/use-ui";

type Props = {
  items: ReactNode[];
};

export function ActionMenu({ items }: Props) {
  const [isOpen, setIsOpen] = useBoolean(false);

  const ui = useUi({
    closed: !isOpen,
  });

  if (items.length === 0) return null;

  return (
    <div className="group relative">
      <button
        className="-m-3 flex size-11 items-center justify-center rounded-full transition hover:cursor-pointer hover:bg-gray-950/20"
        onClick={setIsOpen.toggle}
      >
        <Gear weight="fill" size={20} />
      </button>
      <div
        data-ui={ui}
        className={clsx(
          "absolute right-0 bottom-full mb-3 flex min-w-32 flex-col overflow-hidden rounded bg-white text-black transition-all",
          "ui-closed:pointer-events-none ui-closed:mb-0 ui-closed:opacity-0",
        )}
      >
        {Children.map(items, (item) => {
          if (isValidElement<ComponentProps<"div">>(item)) {
            return cloneElement(item, {
              className: clsx([
                "text px-3 py-2 text-left whitespace-nowrap hover:cursor-pointer hover:bg-gray-200 transition-all",
              ]),
            });
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
}
