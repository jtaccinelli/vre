import { useNavigate, useNavigation, type Fetcher } from "react-router";

import { isFormError } from "@app/lib/predicates";

import { Alert } from "@app/components/alert";
import { Spinner } from "@app/components/spinner";

type Props = {
  fetcher: Fetcher;
  cta: string;
};

export function FormSubmit({ cta, fetcher }: Props) {
  const navigation = useNavigation();

  const hasError = isFormError(fetcher.data);
  const isSubmitting = navigation.state !== "idle";

  return (
    <div className="sticky bottom-0 flex items-center justify-between bg-gray-900 px-6 py-4">
      <button type="submit" className="btn btn-primary self-start">
        <span>{cta}</span>
        {!isSubmitting ? null : <Spinner />}
      </button>
      {!hasError ? null : (
        <p className="font-semibold text-red-700">{fetcher.data.message}</p>
      )}
    </div>
  );
}
