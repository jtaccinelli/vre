import { Empty } from "@phosphor-icons/react";

import { Spinner } from "@app/components/spinner";

type Props = {
  label: string;
  loading?: boolean;
};

export function Placeholder({ label, loading }: Props) {
  return (
    <p className="text flex items-center justify-between gap-3 rounded bg-gray-800 p-4 text-gray-600">
      <span className="grow">{label}</span>
      {loading ? <Spinner /> : <Empty size={20} />}
    </p>
  );
}
