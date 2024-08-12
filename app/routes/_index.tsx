import { Divider } from "~/components/divider";
import { FormPlaylistLink } from "~/components/form-playlist-link";
import { FormPlaylistSearch } from "~/components/form-playlist-search";
import { useRootLoaderData } from "~/hooks/use-root-loader-data";

export default function Page() {
  const { isLoggedIn } = useRootLoaderData();

  if (!isLoggedIn) {
    return <div>You are not logged in.</div>;
  }

  return (
    <div className="flex h-full w-full flex-col justify-center gap-8">
      <FormPlaylistLink />
      <Divider content="OR" />
      <FormPlaylistSearch />
    </div>
  );
}
