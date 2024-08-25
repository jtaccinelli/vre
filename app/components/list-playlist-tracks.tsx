import { CardTrack } from "./card-track";
import { ListEmpty } from "./list-empty";

type Props = {
  tracks: SpotifyApi.PlaylistTrackObject[];
};

export function ListPlaylistTracks({ tracks }: Props) {
  if (tracks?.length === 0) {
    return <ListEmpty message="You have no relevant ballots!" />;
  }

  return (
    <div className="flex flex-grow flex-col gap-2">
      {tracks.map((track) => {
        return <CardTrack key={track.added_at} item={track} />;
      })}
    </div>
  );
}
