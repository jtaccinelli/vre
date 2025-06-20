export const GROUP_EVENTS = {
  CREATE: "group:create",
  UPDATE: "group:update",
  DELETE: "group:delete",
} as const;

export const CATEGORY_EVENTS = {
  CREATE: "category:create",
  UPDATE: "category:update",
  DELETE: "category:delete",
} as const;

export type EventMap = typeof GROUP_EVENTS | typeof CATEGORY_EVENTS;
export type EventName = EventMap[keyof EventMap];
