import { useFetcher } from "react-router";

import type { UserSchema } from "@server/schema";

import { Dialog } from "@app/components/dialog";
import { FieldText } from "@app/components/field-text";
import { FormActions } from "@app/components/form-actions";
import { FormSubmit } from "@app/components/form-submit";

type Props = {
  profile: UserSchema | null;
  onClose: () => void;
};

export function DialogEditProfile({ profile, onClose }: Props) {
  const fetcher = useFetcher();

  return (
    <Dialog
      id="edit-profile"
      open={!!profile}
      onClose={onClose}
      heading="Edit Profile"
    >
      {!profile ? null : (
        <fetcher.Form
          key={profile.id}
          action="/api/profile/update"
          method="post"
          className="flex flex-col divide-y divide-gray-950"
        >
          <input type="hidden" name="profile-id" value={profile.id} />
          <FieldText
            name="name"
            label="Display name"
            defaultValue={profile.name}
          />
          <FieldText
            name="image-url"
            label="Image URL"
            defaultValue={profile.imageUrl ?? ""}
            placeholder="https://..."
          />
          <FormActions fetcher={fetcher}>
            <FormSubmit cta="Save Changes" />
          </FormActions>
        </fetcher.Form>
      )}
    </Dialog>
  );
}
