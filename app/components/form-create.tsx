import { useFetcher } from "react-router";

import { FieldPlaylistInput } from "@app/components/field-playlist-input";
import { FieldTabs } from "@app/components/field-tabs";
import { FormSubmit } from "@app/components/form-submit";

export function FormCreate() {
  const fetcher = useFetcher();
  return (
    <fetcher.Form
      className="relative flex flex-col divide-y divide-gray-950"
      action="/api/form/create"
      method="post"
    >
      <FieldPlaylistInput />
      <FieldTabs
        name="track-vote-count"
        label="How many tracks should people be able to vote for?"
        defaultValue={3}
        values={[1, 2, 3, 4, 5]}
      />
      <FieldTabs
        name="contributor-vote-count"
        label="How many best contributors should people be able to vote for?"
        defaultValue={1}
        values={[1, 2, 3, 4, 5]}
      />
      <FormSubmit fetcher={fetcher} cta="Create Voting Form" />
    </fetcher.Form>
  );
}
