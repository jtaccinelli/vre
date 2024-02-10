/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/cloudflare" />
/// <reference types="@cloudflare/workers-types" />

declare global {
  interface Envs {
    NODE_ENV: "development" | "production" | "test";
    DATABASE_URL: string;
    SPOTIFY_CLIENT_ID: string;
    SPOTIFY_CLIENT_SECRET: string;
    COOKIE_SECRET: string;
  }
}

import "@remix-run/server-runtime";
declare module "@remix-run/server-runtime" {
  import { PrismaClient } from "@prisma/client";
  import { Session, SessionStorage } from "@remix-run/node";

  export interface AppLoadContext {
    prisma: PrismaClient;
    spotify: {
      fetch: (endpoint: string, options?: ResponseInit) => any;
    };
    session: Session;
    commitSession: () => void;
  }
}
