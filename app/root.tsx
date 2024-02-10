import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import stylesheet from "~/styles/index.css";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: stylesheet,
  },
  {
    rel: "preconnect",
    href: "https://fonts.googleapis.com",
  },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,500&display=swap",
  },
];

export const meta: MetaFunction = () => [
  {
    charset: "utf-8",
    title: "New Remix App",
    viewport: "width=device-width,initial-scale=1",
  },
];

export const loader: LoaderFunction = ({ context }) => {
  console.log(context);
  return null;
};

export default function App() {
  return (
    <html lang="en" className="h-full w-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="min-h-full bg-gray-900 text-white p-8">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
