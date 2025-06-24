import { CaretLeft } from "@phosphor-icons/react";
import { Link } from "react-router";

type Props = {
  playlist: Playlist;
};

export function HeaderResults({ playlist }: Props) {
  return (
    <div className="flex w-full flex-col gap-6 p-6 pt-10">
      <Link to="/" className="flex items-center gap-2">
        <CaretLeft size={20} />
        <span className="link">Back to home page</span>
      </Link>
      <p className="text -mb-6 text-gray-400">Playlist Results</p>
      <h3 className="title">{playlist.name}</h3>
    </div>
  );
}
