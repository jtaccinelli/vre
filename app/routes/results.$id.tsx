import { useLoaderData } from "react-router";
import { redirect } from "react-router";

import {
  processBestTrackResults,
  processBestUserResults,
  processMostTrackVotesResults,
} from "@app/lib/results";

import { PlaylistProvider } from "@app/hooks/use-playlist";

import { ActionBar } from "@app/components/action-bar";
import { DialogDeleteForm } from "@app/components/dialog-delete-form";
import { DialogReopenVoting } from "@app/components/dialog-reopen-voting";
import { HeaderResults } from "@app/components/header-results";
import { ResultsList } from "@app/components/results-list";
import { ResultsBar } from "@app/components/results-bar";
import { ResultsPie } from "@app/components/results-pie";
import type { Route } from "./+types/results.$id";
import { HeaderBack } from "@app/components/header-back";

export async function loader({ params, context }: Route.LoaderArgs) {
  const userId = context.user?.id;
  const playlistId = params.id;

  if (!playlistId || !userId) throw redirect("/");

  const playlist = await context.spotify.fetchPlaylist(playlistId);
  if (!playlist) throw redirect("/");

  const [form] = await context.form.get(playlistId);
  if (!form) throw redirect("/");
  if (form.enableVoting) throw redirect(`/vote/${params.id}`);

  const votes = await context.vote.playlist(playlistId);
  const users = await context.spotify.fetchUsersFromPlaylist(playlist);

  const tracks = playlist.tracks.items
    .map((item) =>
      item.track ? { ...item.track, added_by: item.added_by } : null,
    )
    .filter((track) => !!track);

  const bestTrackVote = processBestTrackResults(votes, tracks);
  const bestUserVote = processBestUserResults(votes, users);
  const mostTrackVotes = processMostTrackVotesResults(votes, users, tracks);

  const hasCreated = form.createdBy === userId;

  return {
    playlist,
    votes,
    data: {
      bestTrackVote,
      bestUserVote,
      mostTrackVotes,
    },
    hasCreated,
  };
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
  const { playlist, votes, data, hasCreated } = useLoaderData<typeof loader>();

  return (
    <PlaylistProvider value={playlist}>
      <div className="flex flex-col">
        <HeaderBack />
        <HeaderResults playlist={playlist} />
        {!hasCreated ? null : (
          <ActionBar
            message="You created this form."
            actions={[
              <DialogReopenVoting playlist={playlist} />,
              <DialogDeleteForm playlist={playlist} />,
            ]}
          />
        )}
        <div className="flex flex-col divide-y divide-gray-800">
          <ResultsBar
            label="Best Track"
            data={data.bestTrackVote}
            canTiebreak={hasCreated}
            field="track-ids"
          />
          <ResultsBar
            label="Most Track Votes"
            data={data.mostTrackVotes}
            field="track-ids"
          />
          <ResultsPie
            label="Best Contributor"
            data={data.bestUserVote}
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
    </PlaylistProvider>
  );
}
