import { createCookieSessionStorage } from "@remix-run/node";

// Create Cookie Session Storage
export const cookieStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    secrets: [process.env.COOKIE_SECRET],
    sameSite: "lax",
  },
});

export async function createSessionHandler(request: Request) {
  const cookie = request.headers.get("Cookie");
  const session = await cookieStorage.getSession(cookie);

  const commitSession = async () => {
    await cookieStorage.commitSession(session);
  };

  return { session, commitSession };
}

export const SESSION_KEYS = {
  SPOTIFY_ACCESS_TOKEN: "spotify_access_token",
} as const;
