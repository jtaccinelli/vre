import { useFetcher } from "react-router";

import { FieldText } from "@app/components/field-text";
import { FieldRoomGenerateInput } from "@app/components/field-room-generate-input";
import { FieldCredentials } from "@app/components/field-credentials";
import { FormActions } from "@app/components/form-actions";
import { FormSubmit } from "@app/components/form-submit";

export function FormRoom() {
  const fetcher = useFetcher();

  return (
    <fetcher.Form
      className="relative flex flex-col divide-y divide-gray-950"
      action="/api/room/create"
      method="post"
    >
      <FieldText name="name" label="What do you want to name your room?" />
      <FieldRoomGenerateInput />
      <FieldCredentials />
      <FormActions fetcher={fetcher}>
        <FormSubmit cta="Create Room" />
      </FormActions>
    </fetcher.Form>
  );
}
