import { useCallback } from "react";
import type { EventName } from "~/lib/events";

export function useEventDispatch() {
  return useCallback((event: EventName, detail?: Record<string, string>) => {
    document.dispatchEvent(new CustomEvent(event, { detail }));
  }, []);
}
