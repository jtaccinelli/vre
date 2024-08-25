import { Link } from "@remix-run/react";

import { Header } from "~/components/header";

export function HeaderSearch() {
  return (
    <Header text="Search Playlists">
      <Link to="/profile" className="btn btn-secondary">
        Profile
      </Link>
    </Header>
  );
}
