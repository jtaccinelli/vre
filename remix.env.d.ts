/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/cloudflare" />
/// <reference types="@cloudflare/workers-types" />

declare global {
  interface Env {
    NODE_ENV: "development" | "production" | "test";
    DATABASE_URL: string;
    SPOTIFY_CLIENT_ID: string;
    SPOTIFY_CLIENT_SECRET: string;
    COOKIE_SECRET: string;
  }

  type AppContext = EventContext<Env, string, Record<string, unknown>>;
}

import "@remix-run/server-runtime";
declare module "@remix-run/server-runtime" {
  import { Session, SessionStorage } from "@remix-run/cloudflare";

  export interface AppLoadContext {
    spotify: {
      fetch: (endpoint: string, options?: ResponseInit) => any;
    };
    session: Session;
    commitSession: () => void;
  }
}
