import { useEffect } from "react";

export function useDocumentEvent<K extends keyof DocumentEventMap>(
  event: K,
  handler: (event: DocumentEventMap[K]) => void,
) {
  useEffect(() => {
    document.addEventListener(event, handler);
    return () => document.removeEventListener(event, handler);
  }, [event, handler]);
}
