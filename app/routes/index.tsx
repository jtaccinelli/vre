import { Suspense } from "react";
import { Await, useLoaderData } from "react-router";
import type { Route } from "./+types";

import { HeaderHome } from "@app/components/header-list";
import { ListPlaylists } from "@app/components/list-playlists";
import { Section } from "@app/components/section";
import { Placeholder } from "@app/components/placeholder";

export async function loader({ context }: Route.LoaderArgs) {
  async function playlistPromise() {
    const userId = context?.user?.id;
    if (!userId) return [];

    const forms = await context.config.current();
    const votes = await context.vote.current();

    if (!forms) return [];

    const playlists = await Promise.all(
      forms.map((item) => {
        return context.spotify.fetchPlaylist(item.playlistId);
      }),
    );

    const enrichedPlaylists = playlists.map((playlist) => {
      if (!playlist) return undefined;

      const form = forms.find((form) => form.playlistId === playlist.id);
      const vote = votes.find((vote) => vote.playlistId === playlist.id);

      if (!form) return undefined;

      return {
        data: playlist,
        isOpen: !!form.enableVoting,
        hasVoted: !!vote,
        hasCreated: form.createdBy === userId,
      };
    });

    return enrichedPlaylists.filter((item) => !!item);
  }

  return {
    playlists: playlistPromise(),
  };
}

function ListPlaylistsFallback() {
  return <Placeholder label="Loading playlists..." loading />;
}

function ListPlaylistsError() {
  return (
    <Placeholder label="Something went wrong when fetching your playlists!" />
  );
}

export default function Index() {
  const { playlists } = useLoaderData<typeof loader>();

  return (
    <div>
      <HeaderHome />
      <Section title="Open Voting Forms">
        <Suspense fallback={<ListPlaylistsFallback />}>
          <Await resolve={playlists} errorElement={<ListPlaylistsError />}>
            <ListPlaylists filter={(playlist) => !!playlist.isOpen} />
          </Await>
        </Suspense>
      </Section>
      <Section title="Closed Voting Forms">
        <Suspense fallback={<ListPlaylistsFallback />}>
          <Await resolve={playlists} errorElement={<ListPlaylistsError />}>
            <ListPlaylists filter={(playlist) => !playlist.isOpen} />
          </Await>
        </Suspense>
      </Section>
    </div>
  );
}
