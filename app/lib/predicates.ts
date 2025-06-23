export function isNotFile(
  value: FormDataEntryValue | null,
): value is string | null {
  return value === null || typeof value !== "object";
}

export function isString(value: FormDataEntryValue | null): value is string {
  return typeof value === "string";
}
