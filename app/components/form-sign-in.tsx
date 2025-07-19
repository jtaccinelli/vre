import { useFetcher } from "react-router";

import { FieldRoomValidateInput } from "@app/components/field-room-validate-input";
import { FormSubmit } from "./form-submit";

export function FormSignIn() {
  const fetcher = useFetcher();

  return (
    <fetcher.Form
      action="/api/auth/sign-in"
      method="post"
      className="flex flex-col"
    >
      <FieldRoomValidateInput />
      <FormSubmit fetcher={fetcher} cta="Sign In w/ Spotify" />
    </fetcher.Form>
  );
}
