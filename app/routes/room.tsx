import { redirect, useFetcher, useLoaderData } from "react-router";
import type { Route } from "./+types/room";

import { SessionHandler } from "@server/session";

import { HeaderBack } from "@app/components/header-back";
import { FieldText } from "@app/components/field-text";
import { FieldCredentials } from "@app/components/field-credentials";
import { FormActions } from "@app/components/form-actions";
import { FormSubmit } from "@app/components/form-submit";

export async function loader({ context }: Route.LoaderArgs) {
  if (!context.user) throw redirect("/");

  const roomId: string | undefined = context.session.get(SessionHandler.KEY__ROOM_ID);
  if (!roomId) throw redirect("/");

  const [room] = await context.room.get(roomId);
  if (!room) throw redirect("/");

  return { room };
}

export default function Page() {
  const { room } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();

  return (
    <div className="flex flex-col">
      <HeaderBack />
      <fetcher.Form
        action="/api/room/update"
        method="post"
        className="flex flex-col divide-y divide-gray-950"
      >
        <FieldText
          name="name"
          label="Room name"
          defaultValue={room.name}
        />
        <FieldCredentials
          defaultClientId={room.clientId}
          defaultClientSecret={room.clientSecret}
        />
        <FormActions fetcher={fetcher}>
          <FormSubmit cta="Save Changes" />
        </FormActions>
      </fetcher.Form>
    </div>
  );
}
