import { SpotifyImage } from "./spotify-image";

type Props = {
  profile: SpotifyApi.CurrentUsersProfileResponse;
};

export function CardProfile({ profile }: Props) {
  const [image] = profile?.images ?? [];

  return (
    <div className="flex flex-col gap-4 rounded bg-gray-900 p-4 pr-8">
      <div className="flex items-center gap-4">
        <SpotifyImage
          image={image}
          alt="Profile"
          className="h-16 w-16 rounded-full"
        />
        <div className="flex flex-grow flex-col">
          <p className="text-gray-500">Logged in as</p>
          <p>{profile.display_name}</p>
        </div>
        <a href="/api/logout" className="text-sm text-emerald-600 underline">
          Not you?
        </a>
      </div>
    </div>
  );
}
