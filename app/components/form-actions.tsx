import { type ReactNode } from "react";
import { type Fetcher } from "react-router";

import { isFormError } from "@app/lib/predicates";

type Props = {
  fetcher: Fetcher;
  children: ReactNode;
};

export function FormActions({ fetcher, children }: Props) {
  const hasError = isFormError(fetcher.data);

  return (
    <div className="sticky bottom-0 flex items-center justify-between bg-gray-900 px-6 py-4">
      {children}
      {!hasError ? null : (
        <p className="font-semibold text-red-700">{fetcher.data.message}</p>
      )}
    </div>
  );
}
