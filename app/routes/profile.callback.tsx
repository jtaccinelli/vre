import { json, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useNavigate } from "@remix-run/react";
import { useEffect } from "react";

import { Banner } from "~/components/banner";
import { config } from "~/config";

export async function loader({ request, context }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code") ?? undefined;

  const { accessToken } = await context.spotify.fetchAccessToken(request, code);

  context.session.set(config.keys.session.accessToken, accessToken);

  const headers = new Headers();
  headers.set("Set-Cookie", await context.session.commit());

  return json(null, {
    headers,
  });
}

export default function Page() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, [navigate]);

  return <Banner content="Logging you in..." />;
}
