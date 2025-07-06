import { CaretLeft } from "@phosphor-icons/react";
import { Link } from "react-router";

type Props = {
  playlist: Playlist;
};

export function HeaderResults({ playlist }: Props) {
  return (
    <div className="flex flex-col p-6 pt-10">
      <p className="text text-gray-400">Playlist Results</p>
      <h3 className="title">{playlist.name}</h3>
    </div>
  );
}
