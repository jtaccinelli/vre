import { Link } from "@remix-run/react";

type Props = {
  isLoggedIn: boolean;
};

export function Navigation({ isLoggedIn }: Props) {
  return (
    <nav className="flex gap-2">
      <Link to="/" className="p-2">
        Vote
      </Link>
      <Link to="/rules" className="p-2">
        Rules
      </Link>
      {isLoggedIn ? (
        <Link to="/account" className="p-2">
          Account
        </Link>
      ) : (
        <Link to="/api/login" className="p-2">
          Sign in
        </Link>
      )}
    </nav>
  );
}
