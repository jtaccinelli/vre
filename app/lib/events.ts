export const PREVIEW_EVENTS = {
  PLAY: "preview:play",
  PAUSE: "preview:pause",
} as const;

export const DIALOG_EVENTS = {
  OPEN: "dialog:open",
  CLOSE: "dialog:close",
} as const;

export type EventMap = typeof PREVIEW_EVENTS & typeof DIALOG_EVENTS;
export type EventName = EventMap[keyof EventMap];
