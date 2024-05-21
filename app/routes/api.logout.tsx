import { LoaderFunctionArgs, redirect } from "@remix-run/cloudflare";

import { config } from "~/config";

export async function loader({ context }: LoaderFunctionArgs) {
  context.session.unset(config.keys.session.authToken);

  const headers = new Headers();
  headers.set("Set-Cookie", await context.session.commit());

  return redirect("/", { headers });
}
