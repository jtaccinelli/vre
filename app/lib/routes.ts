import type { FormError } from "react-router";

export function message(message: string) {
  return {
    message,
  };
}

export function error(message: string): FormError {
  return {
    type: "error",
    message,
  };
}
