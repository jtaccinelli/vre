import { Link } from "@remix-run/react";

import { Header } from "~/components/header";

export function HeaderSearch() {
  return (
    <Header>
      <p className="flex-grow pl-4 font-medium">Search Playlists</p>
      <Link to="/profile" className="btn btn-secondary">
        Profile
      </Link>
    </Header>
  );
}
