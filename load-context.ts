import { type PlatformProxy } from "wrangler";

import { KVSession } from "./app/lib/session";

type Cloudflare = Omit<PlatformProxy<Env>, "dispose">;

export interface BaseAppLoadContext {
  cloudflare: Cloudflare;
}

type GetLoadContextArgs = {
  request: Request;
  context: BaseAppLoadContext;
};

declare module "@remix-run/cloudflare" {
  interface AppLoadContext extends BaseAppLoadContext {
    cloudflare: Cloudflare;
    session: KVSession 
  }
}

export async function getLoadContext({ request, context }: GetLoadContextArgs) {
  const session = await KVSession.init(request, context);

  return {
    session
  }
}