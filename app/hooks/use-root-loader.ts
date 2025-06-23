import { useRouteLoaderData } from "react-router";

export function useRootLoaderData() {
  return useRouteLoaderData("root");
}
