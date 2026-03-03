import { Suspense } from "react";
import { Await, useLoaderData } from "react-router";

import { HeaderHome } from "@app/components/header-list";
import { ListPlaylists } from "@app/components/list-playlists";
import { Placeholder } from "@app/components/placeholder";
import { Section } from "@app/components/section";

import type { Route } from "./+types";

export async function loader({ context }: Route.LoaderArgs) {
  async function playlistPromise() {
    const userId = context?.user?.id;

    const forms = await context.form.current();
    const votes = await context.vote.current();

    if (!forms) return [];

    const playlists = await Promise.all(
      forms.map((item) => {
        return context.playlist.get(item.playlistId);
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
        isSignedIn: !!userId,
      };
    });

    return enrichedPlaylists.filter((item) => !!item).reverse();
  }

  return {
    playlists: playlistPromise(),
    user: context.user,
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
