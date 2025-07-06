import { useMemo } from "react";

import { type ResultValue } from "@app/lib/results";

import { useBoolean } from "@app/hooks/use-boolean";

import { Dialog } from "@app/components/dialog";
import { ResultsTable } from "./results-table";

type Props = {
  label: string;
  cta: string;
  data: ResultValue[];
};

export function DialogResults({ label, cta, data }: Props) {
  const [isOpen, setIsOpen] = useBoolean(false);

  const sortedData = useMemo(() => {
    return data.sort((a, b) => {
      if (a.count == b.count) return 0;
      if (a.count < b.count) return 1;
      return -1;
    });
  }, [data]);

  return (
    <>
      <button
        type="button"
        onClick={setIsOpen.true}
        className="btn btn-primary self-start"
      >
        {cta}
      </button>
      <Dialog
        open={isOpen}
        onClose={setIsOpen.false}
        className="flex flex-col px-6 py-8"
        heading={label}
      >
        <ResultsTable
          results={sortedData}
          placeholder="No data"
          suffix="vote(s)"
        />
      </Dialog>
    </>
  );
}
