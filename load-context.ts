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
  accessToken;
  refreshToken;

  constructor(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  static async init(session: KVSession) {
    const storedAccessToken = session.get(config.keys.session.accessToken);
    const storedRefreshToken = session.get(config.keys.session.refreshToken);
    const storedFetchedOn = session.get(config.keys.session.fetchedOn);

    const fetchedOn = new Date(storedFetchedOn);
    const hasExpired = Date.now() - 3600 > fetchedOn.getTime();

    if (hasExpired || !storedAccessToken || !storedRefreshToken) {
      const { accessToken, refreshToken } = await this.fetchAccessToken();
      return new this(accessToken, refreshToken);
    }

    return new this(storedAccessToken, storedRefreshToken);
  }

  static async fetchAccessToken(code?: string) {
    const { clientId, clientSecret, accessTokenEndpoint } = config.spotify;

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

    const response = await fetch(accessTokenEndpoint, {
      method: "POST",
      headers,
      body: body.toString(),
    });

    const data = await response.json<{
      expires_in: string;
      access_token: string;
      refresh_token: string;
      token_type: string;
    }>();

    return {
      accessToken: data?.access_token,
      refreshToken: data?.refresh_token,
    };
  }

  async fetchAccessToken(code?: string) {
    return await Spotify.fetchAccessToken(code);
  }

  async fetch(endpoint: string, options: RequestInit = {}) {
    const { apiEndpoint } = config.spotify;

    const headers = new Headers(options.headers);
    headers.set("Authorization", `Bearer ${this.accessToken}`);

    const url = `${apiEndpoint}${endpoint}`;

    return await fetch(url, { ...options, headers });
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
