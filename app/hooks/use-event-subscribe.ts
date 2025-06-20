import { useCallback, useEffect, useRef } from "react";
import type { EventName } from "~/lib/events";

export function useEventSubscribe<Details extends Record<string, string>>(
  event: EventName,
  callback: (event: DocumentEventMap[EventName]) => void,
) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    document.addEventListener(event, callbackRef.current);
    return () => {
      document.removeEventListener(event, callbackRef.current);
    };
  }, []);
}
