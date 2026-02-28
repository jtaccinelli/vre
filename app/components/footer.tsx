import { Link, useNavigation, useRouteLoaderData } from "react-router";

import type { loader } from "@app/root";

export function Footer() {
  const navigation = useNavigation();
  const data = useRouteLoaderData<typeof loader>("root");
  const room = data?.room;

  return (
    <div className="sticky bottom-0 flex flex-col">
      {navigation.state === "idle" ? null : (
        <div className="animate-load h-px bg-white" />
      )}
      <div className="flex items-center justify-between bg-gray-950 p-4">
        <p className="text flex flex-col text-white">
          <span className="text-gray-300">Joined room</span>
          <span className="font-semibold">{room?.name ?? "—"}</span>
        </p>
        <nav className="flex items-center gap-4 pr-4">
          <Link to="/api/room/leave" className="link cursor-pointer">
            Leave Room
          </Link>
        </nav>
      </div>
    </div>
  );
}
