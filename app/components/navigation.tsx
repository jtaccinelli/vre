import { Link } from "@remix-run/react";

type Props = {
  isLoggedIn: boolean;
};

export function Navigation({ isLoggedIn }: Props) {
  return (
    <nav className="flex gap-2">
      {isLoggedIn ? (
        <Link to="/profile" className="p-2">
          Profile
        </Link>
      ) : (
        <Link
          to="/api/login"
          className="p-2 text-emerald-600 underline underline-offset-4"
        >
          Sign in
        </Link>
      )}
    </nav>
  );
}
