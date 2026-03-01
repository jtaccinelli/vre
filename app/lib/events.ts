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

declare global {
  interface DocumentEventMap {
    "dialog:open": CustomEvent<{ id: string }>;
    "dialog:close": CustomEvent<{ id: string }>;
  }
}

export function dispatchDialogOpen(id: string) {
  document.dispatchEvent(
    new CustomEvent(DIALOG_EVENTS.OPEN, { detail: { id } }),
  );
}

export function dispatchDialogClose(id: string) {
  document.dispatchEvent(
    new CustomEvent(DIALOG_EVENTS.CLOSE, { detail: { id } }),
  );
}
