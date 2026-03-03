import { useState } from "react";
import { redirect, useFetcher, useLoaderData } from "react-router";

import type { UserSchema } from "@server/schema";
import { SessionHandler } from "@server/session";

import { useDialogEvent } from "@app/hooks/use-dialog-event";

import { DialogEditProfile } from "@app/components/dialog-edit-profile";
import { FieldCredentials } from "@app/components/field-credentials";
import { FieldText } from "@app/components/field-text";
import { FormActions } from "@app/components/form-actions";
import { FormSubmit } from "@app/components/form-submit";
import { HeaderBack } from "@app/components/header-back";
import { ListProfiles } from "@app/components/list-profiles";
import { Section } from "@app/components/section";

import type { Route } from "./+types/room";

export async function loader({ context }: Route.LoaderArgs) {
  if (!context.user) throw redirect("/");

  const roomId: string | undefined = context.session.get(
    SessionHandler.KEY__ROOM_ID,
  );

  if (!roomId) throw redirect("/");

  const [room] = await context.room.get(roomId);
  if (!room) throw redirect("/");

  const profiles = await context.profiles.getByRoomId(roomId);

  return { room, profiles };
}

export default function Page() {
  const { room, profiles } = useLoaderData<typeof loader>();
  const [editingProfile, setEditingProfile] = useState<UserSchema | null>(null);
  const editProfileDialog = useDialogEvent("edit-profile");

  const fetcher = useFetcher();

  function handleEditProfile(profile: UserSchema) {
    setEditingProfile(profile);
    editProfileDialog.open();
  }

  function handleCloseEdit() {
    setEditingProfile(null);
  }

  return (
    <div className="flex flex-col">
      <HeaderBack />
      <fetcher.Form
        action="/api/room/update"
        method="post"
        className="flex flex-col divide-y divide-gray-950"
      >
        <FieldText name="name" label="Room name" defaultValue={room.name} />
        <FieldCredentials
          defaultClientId={room.clientId}
          defaultClientSecret={room.clientSecret}
        />
        <FormActions fetcher={fetcher}>
          <FormSubmit cta="Save Changes" />
        </FormActions>
      </fetcher.Form>
      <Section title="Room Users">
        <ListProfiles profiles={profiles} onEdit={handleEditProfile} />
        <fetcher.Form action="/api/profile/sync" method="get">
          <FormSubmit cta="Sync Users" variant="secondary" />
        </fetcher.Form>
      </Section>
      <DialogEditProfile profile={editingProfile} onClose={handleCloseEdit} />
    </div>
  );
}
