import { Link } from "@remix-run/react";

export function Navigation() {
  return (
    <nav className="flex gap-2">
      <Link to="/" className="p-2">
        Vote
      </Link>
      <Link to="/rules" className="p-2">
        Rules
      </Link>
      <Link to="/account" className="p-2">
        Account
      </Link>
    </nav>
  );
}
