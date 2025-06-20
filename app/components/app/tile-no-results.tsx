import type { MouseEventHandler } from "react";

type Props = {
  message: string;
  cta: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export function TileNoResults({ message, cta, onClick }: Props) {
  return (
    <div className="gap-2 rounded bg-white p-4">
      <p className="font-medium">{message}</p>
      <button
        className="underline underline-offset-4 hover:cursor-pointer"
        onClick={onClick}
      >
        {cta}
      </button>
    </div>
  );
}
