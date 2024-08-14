import { CardProfile } from "~/components/card-profile";
import { Divider } from "~/components/divider";
import { FormPlaylistLink } from "~/components/form-playlist-link";
import { FormPlaylistSearch } from "~/components/form-playlist-search";
import { useRootLoaderData } from "~/hooks/use-root-loader-data";

export default function Page() {
  const { profile, isLoggedIn } = useRootLoaderData();

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex flex-grow flex-col justify-center">
        <p className="text-2xl font-bold">VRE</p>
        <p className="text-gray-600">Virtual Record Exchange</p>
      </div>
      {isLoggedIn ? (
        <>
          <CardProfile profile={profile} />
          <a href="/account" className="btn btn-primary">
            Go to Account
          </a>
        </>
      ) : (
        <a href="/api/login" className="btn btn-primary">
          Sign in with Spotify
        </a>
      )}
    </div>
  );

  return (
    <div className="flex h-full w-full flex-col justify-center gap-8">
      <FormPlaylistLink />
      <Divider content="OR" />
      <FormPlaylistSearch />
    </div>
  );
}
