import { useCallback, useState } from "react";

export type BooleanState = ReturnType<typeof useBoolean>;

export function useBoolean(defaultValue: boolean) {
  const [value, setValue] = useState(defaultValue);

  const handleSetTrue = useCallback(() => {
    setValue(true);
  }, [setValue]);

  const handleSetFalse = useCallback(() => {
    setValue(false);
  }, [setValue]);

  const handleToggle = useCallback(() => {
    setValue((value) => !value);
  }, [setValue]);

  const actions = {
    true: handleSetTrue,
    false: handleSetFalse,
    toggle: handleToggle,
    set: setValue,
  };

  return [value, actions] as [typeof value, typeof actions];
}
