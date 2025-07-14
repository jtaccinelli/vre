import { Form } from "react-router";

import { FieldText } from "@app/components/field-text";
import { FieldRoomGenerateInput } from "@app/components/field-room-generate-input";
import { FieldCredentials } from "@app/components/field-credentials";

export function FormRoom() {
  return (
    <Form
      className="relative flex flex-col divide-y divide-gray-950"
      action="/api/room/create"
      method="post"
    >
      <FieldText name="name" label="What do you want to name your room?" />
      <FieldRoomGenerateInput />
      <FieldCredentials />
      <div className="sticky bottom-0 bg-gray-900 px-6 py-4">
        <button type="submit" className="btn btn-primary self-start">
          Create Room
        </button>
      </div>
    </Form>
  );
}
