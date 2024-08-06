import "~/index.css";

import { json, LoaderFunctionArgs } from "@remix-run/cloudflare";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import { Navigation } from "~/components/navigation";
import { config } from "~/config";

export function meta() {
  return [
    { title: "Virtual Record Exchange" },
    { name: "description", content: "Trade tunes" },
  ];
}

export function links() {
  return [{ rel: "stylesheet", href: "https://rsms.me/inter/inter.css" }];
}

export function loader({ context }: LoaderFunctionArgs) {
  const accessToken = context.session.get(config.keys.session.accessToken);
  const isLoggedIn = new Boolean(accessToken);

  return json({
    isLoggedIn,
  });
}

export default function App() {
  const { isLoggedIn } = useLoaderData<typeof loader>();

  return (
    <html lang="en" className="relative min-h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="absolute inset-0 bg-gray-950 text-white">
        <div className="clamp flex h-full flex-col">
          <header className="flex items-center justify-between p-8">
            <p className="font-semibold">📀 VRE</p>
            <Navigation isLoggedIn={isLoggedIn} />
          </header>
          <main className="flex-grow overflow-y-scroll p-8">
            <Outlet />
          </main>
          <footer className="flex justify-between p-8 text-xs text-gray-500">
            <p>💃 Trading tunes since &apos;24</p>
            <p>Made with 🎧 by Jordan Accinelli</p>
          </footer>
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
