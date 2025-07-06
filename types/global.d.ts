import type { EventName } from "@app/lib/events";

export {};

declare global {
  type CustomEventMap<Details = Record<string, string>> = {
    [key in EventName]: CustomEvent<Details>;
  };

  interface WindowEventMap extends CustomEventMap {}
  interface DocumentEventMap extends CustomEventMap {}
}
