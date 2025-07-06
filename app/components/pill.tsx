import { X } from "@phosphor-icons/react";

type Props = {
  onClick: () => void;
  label: string;
};

export function Pill({ label, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="text flex items-center gap-1 rounded bg-white px-3 py-1 whitespace-nowrap text-black hover:cursor-pointer"
    >
      <span>{label}</span>
      <X size={16} />
    </button>
  );
}
