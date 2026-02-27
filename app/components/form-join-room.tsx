import { type FormEvent } from "react";
import { useFetcher } from "react-router";

import { useLocalStorage } from "@app/hooks/use-local-storage";

import { FieldRoomValidateInput } from "@app/components/field-room-validate-input";
import { FormSubmit } from "@app/components/form-submit";

type Props = {
  onSuccess?: () => void;
};

export function FormJoinRoom({ onSuccess }: Props) {
  const fetcher = useFetcher();
  const [, updateRoomId] = useLocalStorage("room-id");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const roomId = data.get("room-id");
    if (!roomId || typeof roomId !== "string") return;
    updateRoomId.set(roomId);
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <FieldRoomValidateInput />
      <FormSubmit fetcher={fetcher} cta="Join Room" />
    </form>
  );
}
