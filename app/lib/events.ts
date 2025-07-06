export const PREVIEW_EVENTS = {
  PLAY: "preview:play",
  PAUSE: "preview:pause",
} as const;

export type EventMap = typeof PREVIEW_EVENTS;
export type EventName = EventMap[keyof EventMap];
