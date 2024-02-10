import { createCookieSessionStorage } from "@remix-run/cloudflare";

export async function createSessionHandler(context: AppContext) {
  const cookieStorage = createCookieSessionStorage({
    cookie: {
      name: "__session",
      secrets: [context.env.COOKIE_SECRET],
      sameSite: "lax",
    },
  });

  const cookie = context.request.headers.get("Cookie");
  const session = await cookieStorage.getSession(cookie);

  const commitSession = async () => {
    await cookieStorage.commitSession(session);
  };

  return { session, commitSession };
}

export const SESSION_KEYS = {
  SPOTIFY_ACCESS_TOKEN: "spotify_access_token",
} as const;
