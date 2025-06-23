// import { XMarkIcon } from "@heroicons/react/16/solid";

type Props = {
  onClick: () => void;
  label: string;
};

export function Pill({ label, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="text flex items-center gap-1 rounded bg-white px-3 py-1 whitespace-nowrap text-black"
    >
      <span>{label}</span>
      {/* <XMarkIcon className="h-4 w-4" /> */}
    </button>
  );
}
