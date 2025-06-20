import { v4 as uuid } from "uuid";

export function handleiseValue(value: string) {
  return value.toLowerCase().replace(" ", "-");
}

export function generateHandle() {
  return uuid();
}
