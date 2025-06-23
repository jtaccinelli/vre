import type { Route } from "./+types/api.auth.callback";

export async function loader({ request, context }: Route.LoaderArgs) {
  await context.auth.signUserIn(request);
}
