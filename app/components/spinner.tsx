import clsx from "clsx";

export function Spinner() {
  return (
    <span
      className={clsx(
        "flex size-4 origin-center animate-spin items-center justify-center rounded-full",
        "border-2 border-current border-r-transparent",
      )}
    />
  );
}
