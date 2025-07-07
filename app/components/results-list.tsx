import { useMemo } from "react";

import type { VoteSchema } from "@server/schema";

import { Placeholder } from "@app/components/placeholder";

type Props = {
  label: string;
  votes: VoteSchema[];
  map: (vote: VoteSchema) => string | null;
};

export function ResultsList({ label, votes, map }: Props) {
  const items = useMemo(() => {
    return votes.map(map).filter((item) => !!item);
  }, [votes]);

  return (
    <div className="flex flex-col gap-4 px-6 py-8">
      <div className="flex items-end justify-between">
        <label className="label">{label}</label>
        <p className="text text-gray-400">{items.length} answer(s)</p>
      </div>

      <div className="flex flex-col divide-y divide-gray-900 overflow-hidden rounded">
        {!items.length ? (
          <Placeholder label="No submissions" />
        ) : (
          items.map((item) => (
            <p className="flex justify-between bg-gray-800 p-4 text-left">
              <span className="label grow text-white">{item}</span>
            </p>
          ))
        )}
      </div>
    </div>
  );
}
