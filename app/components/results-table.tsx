import type { ResultValue } from "@app/lib/results";
import { Placeholder } from "@app/components/placeholder";

type Props = {
  results: ResultValue[];
  placeholder: string;
  suffix: string;
};

export function ResultsTable({ results, placeholder, suffix }: Props) {
  return (
    <div className="flex flex-col divide-y divide-gray-900 overflow-hidden rounded">
      {!results.length ? (
        <Placeholder label={placeholder} />
      ) : (
        results.map((item) => (
          <p className="flex justify-between bg-gray-800 p-4 text-left">
            <span className="label grow truncate text-white">{item.name}</span>
            <span className="text whitespace-nowrap text-gray-400">
              {item.count} {suffix}
            </span>
          </p>
        ))
      )}
    </div>
  );
}
