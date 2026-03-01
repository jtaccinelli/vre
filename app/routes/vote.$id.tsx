import { useLoaderData, redirect } from "react-router";
import type { Route } from "./+types/vote.$id";

import { ActionBar } from "@app/components/action-bar";
import { DialogCantVote } from "@app/components/dialog-cant-vote";
import { DialogDeleteForm } from "@app/components/dialog-delete-form";
import { DialogCloseVoting } from "@app/components/dialog-close-voting";
import { DialogProxyVote } from "@app/components/dialog-proxy-vote";
import { DialogSyncForm } from "@app/components/dialog-sync-form";
import { FormVote } from "@app/components/form-vote";
import { HeaderVote } from "@app/components/header-vote";
import { HeaderBack } from "@app/components/header-back";

export async function loader({ request, params, context }: Route.LoaderArgs) {
  const userId = context.user?.id;
  const playlistId = params.id;
  const url = new URL(request.url);

  if (!playlistId) throw redirect("/");

  const playlist = await context.playlist.get(playlistId);
  if (!playlist) throw redirect("/");

  const [form] = await context.form.get(playlistId);
  if (!form) throw redirect(`/`);
  if (!form.enableVoting) throw redirect(`/results/${params.id}`);

  const votes = await context.vote.playlist(playlistId);

  const ids = form.contributorIds.split(",").filter(Boolean);
  const users = await context.profiles.getByIds(ids);

  const proxiedUserId = url.searchParams.get("user");
  const proxiedUser = users.find((user) => user.id === proxiedUserId);
  const voter = proxiedUser ?? users.find((user) => user.id === userId);

  const hasContributed = users.some((user) => user.id === userId);
  const hasCreated = form.createdBy === userId;

  return {
    playlist,
    users,
    form,
    votes,
    hasContributed,
    hasCreated,
    proxiedUser,
    voter,
  };
}

export default function Page() {
  const data = useLoaderData<typeof loader>();

  const { playlist, users, form, votes, hasCreated, proxiedUser, voter } = data;

  return (
    <div className="flex flex-col">
      <HeaderBack />
      <HeaderVote
        playlist={playlist}
        users={users}
        votes={votes}
        voter={voter}
        hasCreated={hasCreated}
      />
      <DialogProxyVote
        playlist={playlist}
        users={users}
        votes={votes}
        defaultOpen={!proxiedUser}
      />
      {!hasCreated ? null : (
        <ActionBar
          message="You created this form."
          actions={[
            <DialogSyncForm playlist={playlist} />,
            <DialogCloseVoting playlist={playlist} />,
            <DialogDeleteForm playlist={playlist} />,
          ]}
        />
      )}
      <FormVote form={form} playlist={playlist} users={users} voter={voter} />
    </div>
  );
}
