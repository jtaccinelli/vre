import "~/index.css";

import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

export function meta() {
  return [
    { title: "Virtual Record Exchange" },
    { name: "description", content: "Trade tunes" },
  ];
}

export function links() {
  return [{ rel: "stylesheet", href: "https://rsms.me/inter/inter.css" }];
}

export default function App() {
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
            <p className="text-xs text-gray-500">
              Facilitating The Trading Of Tunes
            </p>
          </header>
          <main className="flex-grow overflow-y-scroll p-8">
            <Outlet />
          </main>
          <footer className="flex justify-between p-8 text-xs text-gray-400">
            <p>Made with 🎧 by Jordan Accinelli</p>
            <p>💃 2024</p>
          </footer>
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
