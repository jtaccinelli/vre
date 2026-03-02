import {
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  type ComponentProps,
  type ReactNode,
} from "react";
import { Gear } from "@phosphor-icons/react";
import clsx from "clsx";

import { useBoolean } from "@app/hooks/use-boolean";
import { useUi } from "@app/hooks/use-ui";

type Props = {
  items: ReactNode[];
  direction?: "up" | "down";
  variant?: "light" | "dark";
  icon?: ReactNode;
};

const directionClasses = {
  up: "bottom-full mb-3 ui-closed:mb-0",
  down: "top-full mt-3 ui-closed:mt-0",
};

const variantClasses = {
  light: "text-gray-950 hover:bg-black/10",
  dark: "text-white hover:bg-white/10",
};

export function ActionMenu({
  items,
  direction = "up",
  variant = "light",
  icon,
}: Props) {
  const [isOpen, setIsOpen] = useBoolean(false);
  const ref = useRef<HTMLDivElement>(null);

  const ui = useUi({
    closed: !isOpen,
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!isOpen) return;
      if (ref.current?.contains(event.target as Node)) return;
      setIsOpen.false();
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const validItems = items.filter(Boolean);

  if (validItems.length === 0) return null;

  return (
    <div ref={ref} className="group relative">
      <button
        className={clsx(
          "-m-3 flex size-11 items-center justify-center rounded-full transition-all hover:cursor-pointer",
          variantClasses[variant],
        )}
        onClick={setIsOpen.toggle}
      >
        {icon ?? <Gear weight="fill" size={20} />}
      </button>
      <div
        data-ui={ui}
        className={clsx(
          "absolute right-0 z-50 flex min-w-32 flex-col rounded bg-white text-black shadow-md transition-all",
          "ui-closed:pointer-events-none ui-closed:opacity-0",
          directionClasses[direction],
        )}
      >
        {validItems.map((item, index) => {
          if (isValidElement<ComponentProps<"div">>(item)) {
            const isFirst = index === 0;
            const isLast = index === validItems.length - 1;
            return cloneElement(item, {
              key: index,
              className: clsx(
                "text px-3 py-2 text-left whitespace-nowrap hover:cursor-pointer hover:bg-gray-200 transition-all",
                isFirst && "rounded-t",
                isLast && "rounded-b",
              ),
            });
          }
          return null;
        })}
      </div>
    </div>
  );
}
