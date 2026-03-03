import { useNavigation } from "react-router";
import clsx from "clsx";

import { Spinner } from "@app/components/spinner";

type Variant = "primary" | "secondary";

const variantClass: Record<Variant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
};

type Props = {
  cta: string;
  variant?: Variant;
  formAction?: string;
  formMethod?: string;
  disabled?: boolean;
};

export function FormSubmit({ cta, variant = "primary", formAction, formMethod, disabled }: Props) {
  const navigation = useNavigation();

  const isSubmitting = navigation.state !== "idle";

  return (
    <button type="submit" formAction={formAction} formMethod={formMethod} disabled={disabled} className={clsx("btn", variantClass[variant], "self-start")}>
      <span>{cta}</span>
      {!isSubmitting ? null : <Spinner />}
    </button>
  );
}
