import { type ReactNode } from "react";
import { Link } from "react-router";

import { ActionMenu } from "@app/components/action-menu";
import { SpotifyImage } from "@app/components/spotify-image";
import { SpotifyLogo } from "@app/components/spotify-logo";

type Props = {
  playlist: Playlist;
  href?: string;
  cta?: string;
  tags?: (string | false)[];
  actions?: ReactNode[];
};

export function CardPlaylist({ playlist, href, cta, tags, actions }: Props) {
  return (
    <div className="flex w-full overflow-hidden rounded bg-gray-800 max-sm:flex-col">
      <SpotifyImage
        image={playlist?.images[0]}
        className="aspect-square h-36 shrink-0 bg-gray-950 object-cover md:w-36"
      />
      <div className="flex grow flex-col">
        <Link
          to={href ?? ""}
          className="flex min-w-0 grow flex-col justify-center gap-2 p-3"
        >
          <div className="flex w-full grow items-center">
            <p className="heading truncate">{playlist.name}</p>
          </div>
          <div className="flex items-center gap-1.5 text-gray-400">
            <p className="badge bg-gray-400 text-black">
              {playlist.tracks.total ?? 0} tracks
            </p>
            {tags?.map((tag) => {
              if (!tag) return null;
              return (
                <p key={tag} className="badge bg-gray-700">
                  {tag}
                </p>
              );
            })}
          </div>
        </Link>
        <div className="flex items-center justify-end gap-4 border-t border-gray-900 p-3">
          {!cta || !href ? null : (
            <Link to={href} className="link grow">
              {cta}
            </Link>
          )}
          <Link to={playlist.external_urls.spotify} target="_blank">
            <SpotifyLogo className="size-4" />
          </Link>
          {!actions?.length ? null : <ActionMenu items={actions} />}
        </div>
      </div>
    </div>
  );
}
