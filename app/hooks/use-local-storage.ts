import { useEffect, useState } from "react";

type LocalStorageKey = "room-id";

export function useLocalStorage(key: LocalStorageKey) {
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    setValue(localStorage.getItem(key));
  }, [key]);

  function set(next: string) {
    localStorage.setItem(key, next);
    setValue(next);
  }

  function clear() {
    localStorage.removeItem(key);
    setValue(null);
  }

  const actions = { set, clear };

  return [value, actions] as [typeof value, typeof actions];
}
