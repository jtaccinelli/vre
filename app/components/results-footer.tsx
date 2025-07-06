import { useMemo } from "react";

import type { ResultValue } from "@app/lib/results";
import { DialogResults } from "@app/components/dialog-results";
import { DialogTiebreak } from "@app/components/dialog-tiebreak";
import { Placeholder } from "./placeholder";
import { ResultsTable } from "./results-table";

type Props = {
  data: ResultValue[];
  label: string;
  field: string;
  canTiebreak?: boolean;
};

export function ResultsFooter({ data, label, field, canTiebreak }: Props) {
  const total = useMemo(() => {
    return data.reduce((total, value) => total + value.count, 0);
  }, [data]);

  const winners = useMemo(() => {
    const top = data.reduce<ResultValue>(
      (final, value) => (value.count > final.count ? value : final),
      data[0],
    );

    return data.filter((value) => value.count === top.count);
  }, []);

  return (
    <>
      <div className="flex items-end justify-between pt-2">
        <label className="heading">{label}</label>
        <p className="label text-gray-400">
          {total} total {total > 1 ? "responses" : "response"}
        </p>
      </div>
      <ResultsTable results={winners} placeholder="No data" suffix="vote(s)" />
      <div className="flex gap-3">
        <DialogResults data={data} label={label} cta="See All Results" />
        {!canTiebreak || winners.length <= 1 ? null : (
          <DialogTiebreak
            cta="Tiebreak"
            field={field}
            className="btn btn-secondary"
            items={winners}
          />
        )}
      </div>
    </>
  );
}
