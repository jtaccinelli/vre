import { useState } from "react";
import { useFetcher } from "react-router";

import type { RoomSchema } from "@server/schema";

import { FieldRoomValidateInput } from "@app/components/field-room-validate-input";
import { FormActions } from "@app/components/form-actions";
import { FormSubmit } from "@app/components/form-submit";

export function FormJoinRoom() {
  const fetcher = useFetcher();
  const [hasValidRoom, setHasValidRoom] = useState(false);

  const handleFindRoom = (room?: RoomSchema) => {
    setHasValidRoom(!!room);
  };

  return (
    <fetcher.Form
      action="/api/room/join"
      method="post"
      className="flex flex-col"
    >
      <FieldRoomValidateInput onFindRoom={handleFindRoom} />
      <FormActions fetcher={fetcher}>
        <FormSubmit cta="Join Room" disabled={!hasValidRoom} />
        <FormSubmit
          cta="Sign in with Spotify"
          variant="secondary"
          formAction="/api/auth/sign-in"
          formMethod="post"
          disabled={!hasValidRoom}
        />
      </FormActions>
    </fetcher.Form>
  );
}
