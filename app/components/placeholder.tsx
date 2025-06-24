import { Empty } from "@phosphor-icons/react";
import clsx from "clsx";

type Props = {
  label: string;
  loading?: boolean;
};

export function Placeholder({ label, loading }: Props) {
  return (
    <p className="text flex items-center justify-between gap-3 rounded bg-gray-800 p-4 text-gray-600">
      <span className="grow">{label}</span>
      {loading ? (
        <span
          className={clsx(
            "flex size-4 origin-center animate-spin items-center justify-center rounded-full",
            "border-2 border-white border-r-transparent",
          )}
        />
      ) : (
        <Empty size={20} />
      )}
    </p>
  );
}
