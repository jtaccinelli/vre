import type { Route } from "./+types/api.auth.refresh";

export async function loader({ context }: Route.LoaderArgs) {
  await context.auth.refreshUserToken();
}
