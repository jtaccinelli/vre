import { v4 as uuid } from "uuid";

export function handleiseValue(value: string) {
  return value.toLowerCase().replace(" ", "-");
}

export function generateHandle() {
  return uuid();
}

export function generateRoomId() {
  return Math.random().toString(36).substring(2, 8);
}
