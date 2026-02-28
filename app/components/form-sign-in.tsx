import { useFetcher } from "react-router";

import { FieldRoomValidateInput } from "@app/components/field-room-validate-input";
import { FormActions } from "@app/components/form-actions";
import { FormSubmit } from "@app/components/form-submit";

export function FormSignIn() {
  const fetcher = useFetcher();

  return (
    <fetcher.Form
      action="/api/auth/sign-in"
      method="post"
      className="flex flex-col"
    >
      <FieldRoomValidateInput />
      <FormActions fetcher={fetcher}>
        <FormSubmit cta="Sign In w/ Spotify" />
      </FormActions>
    </fetcher.Form>
  );
}
