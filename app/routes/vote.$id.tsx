import { useLoaderData, redirect } from "react-router";
import { eq } from "drizzle-orm";

import { useRootLoaderData } from "@app/hooks/use-root-loader";

import { ActionBar } from "@app/components/action-bar";
import { DialogCantVote } from "@app/components/dialog-cant-vote";
import { DialogDeleteForm } from "@app/components/dialog-delete-form";
import { DialogCloseVoting } from "@app/components/dialog-close-voting";
import { DialogProxyVote } from "@app/components/dialog-proxy-vote";
import { FormVote } from "@app/components/form-vote";
import { HeaderVote } from "@app/components/header-vote";
import type { Route } from "./+types/vote.$id";

export async function loader({ request, params, context }: Route.LoaderArgs) {
  const userId = context.user?.id;
  const playlistId = params.id;
  const url = new URL(request.url);

  if (!playlistId || !userId) throw redirect("/");

  const playlist = await context.spotify.fetchPlaylist(playlistId);
  if (!playlist) throw redirect("/");

  const [config] = await context.config.get(playlistId);
  if (!config) throw redirect(`/`);
  if (!config.enableVoting) throw redirect(`/results/${params.id}`);

  const votes = await context.vote.playlist(playlistId);
  const users = await context.spotify.fetchUsersFromPlaylist(playlist);

  const proxiedUserId = url.searchParams.get("user");
  const proxiedUser = users.find((user) => user.id === proxiedUserId);

  const hasContributed = users.some((user) => user.id === userId);
  const hasCreated = config.createdBy === userId;

  return {
    playlist,
    users,
    config,
    votes,
    hasContributed,
    hasCreated,
    proxiedUser,
  };
}

export default function Page() {
  const { user } = useRootLoaderData();
  const data = useLoaderData<typeof loader>();

  if (!data.hasContributed) {
    return <DialogCantVote />;
  }

  const { playlist, users, config, votes, hasCreated, proxiedUser } = data;

  return (
    <div className="flex flex-col">
      <HeaderVote
        playlist={playlist}
        users={users}
        votes={votes}
        voter={proxiedUser ?? user}
      />
      {!hasCreated ? null : (
        <ActionBar
          message="You created this form."
          actions={[
            <DialogProxyVote
              playlist={playlist}
              users={users}
              votes={votes}
              className="text px-3 py-2 text-left whitespace-nowrap"
            />,
            <DialogCloseVoting
              playlist={playlist}
              className="text px-3 py-2 text-left whitespace-nowrap"
            />,
            <DialogDeleteForm
              playlist={playlist}
              className="text px-3 py-2 text-left whitespace-nowrap"
            />,
          ]}
        />
      )}
      <FormVote
        config={config}
        playlist={playlist}
        users={users}
        voter={proxiedUser ?? user}
      />
    </div>
  );
}
