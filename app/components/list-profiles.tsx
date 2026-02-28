import type { UserSchema } from "@server/schema";

import { SpotifyImage } from "@app/components/spotify-image";

type Props = {
  profiles: UserSchema[];
  onEdit: (profile: UserSchema) => void;
};

export function ListProfiles({ profiles, onEdit }: Props) {
  if (profiles.length === 0) {
    return <p className="text text-gray-500">No users registered yet.</p>;
  }

  return (
    <div className="flex flex-col divide-y divide-gray-950 overflow-hidden rounded">
      {profiles.map((profile) => {
        function handleEdit() {
          onEdit(profile);
        }

        return (
          <button
            key={profile.id}
            type="button"
            onClick={handleEdit}
            className="flex items-center gap-4 bg-gray-800 px-4 py-3 text-left transition-colors hover:cursor-pointer hover:bg-gray-700"
          >
            <SpotifyImage
              url={profile.imageUrl}
              className="size-10 shrink-0 rounded-full bg-gray-700 object-cover"
            />
            <div className="flex min-w-0 flex-col">
              <p className="label truncate">{profile.name}</p>
              <p className="text truncate text-gray-400">{profile.id}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
