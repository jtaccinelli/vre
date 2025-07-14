import { Form } from "react-router";

import { FieldRoomValidateInput } from "@app/components/field-room-validate-input";

export function FormSignIn() {
  return (
    <Form action="/api/auth/sign-in" method="post" className="flex flex-col">
      <FieldRoomValidateInput />
      <div className="sticky bottom-0 bg-gray-900 px-6 py-4">
        <button type="submit" className="btn btn-primary self-start">
          Sign In w/ Spotify
        </button>
      </div>
    </Form>
  );
}
