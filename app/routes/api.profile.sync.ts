import { redirect } from "react-router";
import type { Route } from "./+types/api.profile.sync";

import { SessionHandler } from "@server/session";

export async function loader({ context }: Route.LoaderArgs) {
  if (!context.user) throw redirect("/");

  const roomId = context.session.get(SessionHandler.KEY__ROOM_ID) as string;

  const forms = await context.form.current();
  if (!forms || forms.length === 0) throw redirect("/room");

  for (const currentForm of forms) {
    const contributorIds = currentForm.contributorIds.split(",").filter(Boolean);

    const spotifyUserData = await Promise.all(
      contributorIds.map((contributorId) =>
        context.spotify.fetchUser(contributorId),
      ),
    );

    const validUsers = spotifyUserData.filter((spotifyUser) => !!spotifyUser);
    await context.profiles.upsert(validUsers, roomId);
  }

  throw redirect("/room");
}
