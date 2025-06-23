import type { Route } from "./+types/api.auth.sign-in";

export async function loader({ context }: Route.LoaderArgs) {
  await context.auth.authoriseUser();
}
