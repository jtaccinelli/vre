import type { Route } from "./+types/api.auth.sign-out";

export async function loader({ context }: Route.LoaderArgs) {
  await context.auth.signUserOut();
}
