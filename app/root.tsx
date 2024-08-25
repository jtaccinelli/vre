import "~/index.css";

import { ManifestLink } from "@remix-pwa/sw";
import { json, LoaderFunctionArgs, redirect } from "@remix-run/cloudflare";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { Favicon } from "~/components/favicon";

export function meta() {
  return [
    { title: "Virtual Record Exchange" },
    { name: "description", content: "Trade tunes" },
  ];
}

export function links() {
  return [{ rel: "stylesheet", href: "https://rsms.me/inter/inter.css" }];
}

export async function loader({ context }: LoaderFunctionArgs) {
  const isLoggedIn = context.auth.isLoggedIn;

  if (isLoggedIn) {
    type Response = SpotifyApi.CurrentUsersProfileResponse;
    const profile = await context.spotify.fetch<Response>("/me");

    if (!profile.display_name) {
      return redirect("/api/logout");
    }

    return json({
      isLoggedIn,
      profile,
    });
  }

  return json({
    isLoggedIn,
    profile: null,
  });
}

export default function App() {
  return (
    <html lang="en" className="relative min-h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Favicon />
        <Meta />
        <Links />
        <ManifestLink />
      </head>
      <body className="absolute inset-0 bg-gray-950 text-white">
        <div className="clamp flex h-full flex-col">
          <main className="flex-grow overflow-y-scroll p-8">
            <Outlet />
          </main>
          <footer className="flex justify-between p-8 text-xs text-gray-500">
            <p>💃 Trading tunes since &apos;24</p>
          </footer>
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
