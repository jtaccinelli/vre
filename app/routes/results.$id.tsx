import { useEffect } from "react";
import { data, redirect, useLoaderData } from "react-router";

import { SessionHandler } from "@server/session";

import {
  processBestTrackResults,
  processBestUserResults,
  processMostTrackVotesResults,
} from "@app/lib/results";

import { useDialogEvent } from "@app/hooks/use-dialog-event";
import { PlaylistProvider } from "@app/hooks/use-playlist";

import { ActionBar } from "@app/components/action-bar";
import { DialogDeleteForm } from "@app/components/dialog-delete-form";
import { DialogOpen } from "@app/components/dialog-open";
import { DialogReopenVoting } from "@app/components/dialog-reopen-voting";
import { HeaderBack } from "@app/components/header-back";
import { HeaderResults } from "@app/components/header-results";
import { ResultsBar } from "@app/components/results-bar";
import { ResultsList } from "@app/components/results-list";
import { ResultsPie } from "@app/components/results-pie";

import type { Route } from "./+types/results.$id";

export async function loader({ params, context }: Route.LoaderArgs) {
  const userId = context.user?.id;
  const playlistId = params.id;

  if (!playlistId) throw redirect("/");

  const playlist = await context.playlist.get(playlistId);
  if (!playlist) throw redirect("/");

  const [form] = await context.form.get(playlistId);
  if (!form) throw redirect("/");
  if (form.enableVoting) throw redirect(`/vote/${params.id}`);

  const votes = await context.vote.playlist(playlistId);

  const ids = form.contributorIds.split(",").filter(Boolean);
  const users = await context.profiles.getByIds(ids);

  const tracks = playlist.tracks.items
    .map((item) =>
      item.track ? { ...item.track, added_by: item.added_by } : null,
    )
    .filter((track) => !!track);

  const bestTrackVote = processBestTrackResults(votes, tracks);
  const bestUserVote = processBestUserResults(votes, users);
  const mostTrackVotes = processMostTrackVotesResults(votes, users, tracks);

  const hasCreated = form.createdBy === userId;
  const isSignedIn = !!userId;

  const headers = new Headers();
  const savedRoomId = context.session.get(SessionHandler.KEY__ROOM_ID);
  if (!savedRoomId) {
    context.session.set(SessionHandler.KEY__ROOM_ID, form.roomId);
    headers.set("Set-Cookie", await context.session.commit());
  }

  return data(
    {
      playlist,
      votes,
      results: {
        bestTrackVote,
        bestUserVote,
        mostTrackVotes,
      },
      savedRoomId,
      hasCreated,
      isSignedIn,
    },
    { headers },
  );
}

export function meta({ data }: Route.MetaArgs) {
  if (!data) return [];

  const { playlist } = data;

  return [
    {
      title: `Result for "${playlist.name}"`,
    },
    {
      property: "og:image",
      content: playlist.images[0].url,
    },
  ];
}

export default function Page() {
  const data = useLoaderData<typeof loader>();

  const { playlist, votes, results, hasCreated, isSignedIn, savedRoomId } = data;

  useEffect(() => {
    if (!savedRoomId) window.location.reload();
  }, []);

  return (
    <PlaylistProvider value={playlist}>
      <div className="flex flex-col">
        <HeaderBack />
        <HeaderResults playlist={playlist} />
        {!isSignedIn ? null : (
          <ActionBar
            message="You're managing this form."
            actions={[
              <DialogOpen id="reopen-voting">Reopen Voting</DialogOpen>,
              <DialogOpen id="delete-form">Delete Form</DialogOpen>,
            ]}
          />
        )}
        <div className="flex flex-col divide-y divide-gray-800">
          <ResultsBar
            label="Best Track"
            data={results.bestTrackVote}
            canTiebreak={hasCreated}
            field="track-ids"
          />
          <ResultsBar
            label="Most Track Votes"
            data={results.mostTrackVotes}
            field="track-ids"
          />
          <ResultsPie
            label="Best Contributor"
            data={results.bestUserVote}
            canTiebreak={hasCreated}
            field="user-ids"
          />
          <ResultsList
            label="Honourable Mentions"
            votes={votes}
            map={(vote) => vote.honourableMentions}
          />
          <ResultsList
            label="Shame Votes"
            votes={votes}
            map={(vote) => vote.shameVotes}
          />
        </div>
      </div>
      <DialogReopenVoting playlist={playlist} />
      <DialogDeleteForm playlist={playlist} />
    </PlaylistProvider>
  );
}
