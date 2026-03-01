import { useMemo } from "react";

import type { ResultValue } from "@app/lib/results";
import { toKebabCase } from "@app/lib/helpers";

import { DialogOpen } from "@app/components/dialog-open";
import { DialogResults } from "@app/components/dialog-results";
import { DialogTiebreak } from "@app/components/dialog-tiebreak";
import { ResultsTable } from "@app/components/results-table";

type Props = {
  data: ResultValue[];
  label: string;
  field: string;
  canTiebreak?: boolean;
};

export function ResultsFooter({ data, label, field, canTiebreak }: Props) {
  const slug = toKebabCase(label);

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

  const showTiebreak = canTiebreak && winners.length > 1;

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
        <DialogOpen id={`results-${slug}`} className="btn btn-primary self-start">
          See All Results
        </DialogOpen>
        {!showTiebreak ? null : (
          <DialogOpen id={`tiebreak-${slug}`} className="btn btn-secondary">
            Tiebreak
          </DialogOpen>
        )}
      </div>
      <DialogResults id={`results-${slug}`} label={label} data={data} />
      {!showTiebreak ? null : (
        <DialogTiebreak id={`tiebreak-${slug}`} field={field} items={winners} />
      )}
    </>
  );
}
