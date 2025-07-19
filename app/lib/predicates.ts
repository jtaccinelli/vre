import type { FormError } from "react-router";

export function isNotFile(
  value: FormDataEntryValue | null,
): value is string | null {
  return value === null || typeof value !== "object";
}

export function isString(value: FormDataEntryValue | null): value is string {
  return typeof value === "string" && value !== "";
}

export function isFormError(value: unknown): value is FormError {
  return (
    typeof value === "object" &&
    value !== null &&
    "type" in value &&
    "message" in value &&
    value.type === "error"
  );
}
