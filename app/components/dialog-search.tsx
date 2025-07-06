import {
  type ChangeEvent,
  type ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import { MagnifyingGlass, X } from "@phosphor-icons/react";
import { useNavigation } from "react-router";

import { useBoolean } from "@app/hooks/use-boolean";

import { Dialog } from "@app/components/dialog";
import { Placeholder } from "@app/components/placeholder";

type Props<Item> = {
  label: string;
  cta: string;
  placeholder: string;
  disabled?: boolean;
  items: Item[];
  renderItem: (item: Item) => ReactNode;
  filter: (item: Item, query: string) => boolean;
  className?: string;
};

export function DialogSearch<Item>({
  label,
  cta,
  placeholder,
  disabled,
  items,
  filter,
  renderItem,
  className,
}: Props<Item>) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useBoolean(false);
  const navigation = useNavigation();

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      return filter(item, query);
    });
  }, [items, query]);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleClear = () => {
    setQuery("");
  };

  useEffect(() => {
    if (disabled) setIsOpen.false();
  }, [disabled]);

  useEffect(() => {
    if (navigation.state !== "idle") setIsOpen.false();
  }, [navigation]);

  return (
    <>
      <button
        type="button"
        onClick={setIsOpen.true}
        className={className}
        disabled={disabled}
      >
        {cta}
      </button>
      <Dialog
        open={isOpen}
        onClose={setIsOpen.false}
        heading={label}
        className="flex flex-col"
      >
        <div className="flex flex-col gap-3 px-6 py-8 text-white">
          {!filteredItems.length ? (
            <Placeholder label="No results found" />
          ) : (
            filteredItems.map((item) => renderItem(item))
          )}
        </div>
        <div className="sticky bottom-0 z-10 border-t border-gray-950 bg-gray-900 p-6">
          <div className="flex h-11 w-full rounded bg-gray-700 text-white outline-white focus-within:outline-1">
            <input
              name="query"
              type="text"
              value={query}
              onChange={handleSearch}
              placeholder={placeholder}
              disabled={disabled}
              className="grow rounded border-transparent bg-transparent px-3 placeholder:text-gray-500 focus:outline-none"
            />
            <button
              className="group flex size-11 items-center justify-center"
              onClick={handleClear}
              disabled={!query}
            >
              <MagnifyingGlass
                size={20}
                className="hidden group-disabled:block"
              />
              <X size={20} className="group-disabled:hidden" />
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
