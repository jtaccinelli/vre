import { useState } from "react";
import { redirect, useFetcher, useLoaderData } from "react-router";
import type { Route } from "./+types/room";

import { SessionHandler } from "@server/session";
import type { UserSchema } from "@server/schema";

import { HeaderBack } from "@app/components/header-back";
import { FieldText } from "@app/components/field-text";
import { FieldCredentials } from "@app/components/field-credentials";
import { FormActions } from "@app/components/form-actions";
import { FormSubmit } from "@app/components/form-submit";
import { Section } from "@app/components/section";
import { ListProfiles } from "@app/components/list-profiles";
import { DialogEditProfile } from "@app/components/dialog-edit-profile";

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
  const fetcher = useFetcher();
  const [editingProfile, setEditingProfile] = useState<UserSchema | null>(null);

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
        <ListProfiles profiles={profiles} onEdit={setEditingProfile} />
      </Section>
      <DialogEditProfile profile={editingProfile} onClose={handleCloseEdit} />
    </div>
  );
}
