import { Buffer } from "node:buffer";

import {
  createCookie,
  createWorkersKVSessionStorage,
  Session,
  SessionStorage,
} from "@remix-run/cloudflare";
import { type PlatformProxy } from "wrangler";

import { config } from "./app/config";

type Cloudflare = Omit<PlatformProxy<Env>, "dispose">;

export interface BaseAppLoadContext {
  cloudflare: Cloudflare;
}

type GetLoadContextArgs = {
  request: Request;
  context: BaseAppLoadContext;
};

// -- SESSION HANDLER

class KVSession {
  storage;
  session;

  constructor(storage: SessionStorage, session: Session) {
    this.storage = storage;
    this.session = session;
  }

  static async init(request: Request, context: BaseAppLoadContext) {
    const cookie = createCookie("__session", {
      secrets: ["r3m1xr0ck5"],
      sameSite: true,
    });

    const storage = createWorkersKVSessionStorage({
      kv: context.cloudflare.env.SESSION,
      cookie: cookie,
    });

    const session = await storage
      .getSession(request.headers.get("Cookie"))
      .catch(() => storage.getSession());

    return new this(storage, session);
  }

  get has() {
    return this.session.has;
  }

  get get() {
    return this.session.get;
  }

  get flash() {
    return this.session.flash;
  }

  get unset() {
    return this.session.unset;
  }

  get set() {
    return this.session.set;
  }

  destroy() {
    return this.storage.destroySession(this.session);
  }

  commit() {
    return this.storage.commitSession(this.session);
  }
}

// -- SPOTIFY HANDLER

export class Spotify {
  authToken;

  constructor(authToken: string) {
    this.authToken = authToken;
  }

  static async fetchAuthToken(code?: string) {
    const { clientId, clientSecret, authTokenEndpoint } = config.spotify;

    const authToken = `${clientId}:${clientSecret}`;
    const buffer = Buffer.from(authToken).toString("base64");

    const body = new URLSearchParams();
    if (code) {
      body.set("grant_type", "authorization_code");
      body.set("redirect_uri", config.spotify.redirectUri);
      body.set("code", code);
    } else {
      body.set("grant_type", "client_credentials");
    }

    const headers = new Headers();
    headers.set("Authorization", `Basic ${buffer}`);
    headers.set("Content-Type", "application/x-www-form-urlencoded");

    const response = await fetch(authTokenEndpoint, {
      method: "POST",
      headers,
      body: body.toString(),
    });

    const data = await response.json<{
      expires_in: string;
      access_token: string;
      token_type: string;
    }>();

    return data?.access_token;
  }

  static async init(session: KVSession) {
    const sessionToken = session.get("authToken");
    if (sessionToken) return new this(sessionToken);

    const accessToken = await this.fetchAuthToken();
    return new this(accessToken);
  }

  async fetch(endpoint: string, options: RequestInit = {}) {
    const { apiEndpoint } = config.spotify;

    const headers = new Headers(options.headers);
    headers.set("Authorization", `Bearer ${this.authToken}`);

    const url = `${apiEndpoint}${endpoint}`;

    return await fetch(url, { ...options, headers });
  }

  async fetchAuthToken(code?: string) {
    return await Spotify.fetchAuthToken(code);
  }
}

// -- ACTUAL CONTEXT SET UP

declare module "@remix-run/cloudflare" {
  interface AppLoadContext extends BaseAppLoadContext {
    cloudflare: Cloudflare;
    session: KVSession;
    spotify: Spotify;
  }
}

export async function getLoadContext({ request, context }: GetLoadContextArgs) {
  const session = await KVSession.init(request, context);
  const spotify = await Spotify.init(session);

  return {
    session,
    spotify,
  };
}
