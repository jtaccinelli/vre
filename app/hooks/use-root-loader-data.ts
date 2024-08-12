import { SerializeFrom } from "@remix-run/cloudflare";
import { useRouteLoaderData } from "react-router";

import { loader } from "~/root";

export function useRootLoaderData() {
  return useRouteLoaderData("root") as SerializeFrom<typeof loader>;
}
