import type { Route } from "./+types/admin.layout";

import { Outlet } from "react-router";

import { Navigation } from "~/components/app/navigation";
import { Logo } from "~/components/shared/logo";

export default function Layout() {
  return (
    <div className="flex min-h-full w-screen bg-gray-100 p-4">
      <div className="flex w-xs shrink-0 flex-col justify-between gap-6 px-4 py-16">
        <Navigation />
        <Logo />
      </div>
      <div className="flex w-full flex-col gap-px overflow-hidden rounded-lg">
        <Outlet />
      </div>
    </div>
  );
}
