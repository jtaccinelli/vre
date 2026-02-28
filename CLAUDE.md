# VRE — Claude Code Project Context

## What this project is

A Spotify-based collaborative voting app. Users join a **room**, link a Spotify playlist as a **form**, and vote on tracks and contributors. Results are displayed after voting closes.

Core entities:
- **Room** — a named group with Spotify OAuth credentials
- **Form** — tied to a Spotify playlist; holds voting config (contributor count, track vote count, shame votes, honourable mentions)
- **Vote** — a user's submitted ballot (contributor picks, track picks, and optional shame/honourable mentions)

## Stack

| Layer | Technology |
|---|---|
| Framework | React Router 7 (SSR enabled) |
| Runtime | Cloudflare Workers |
| Database | Drizzle ORM + Cloudflare D1 (SQLite) |
| Styling | Tailwind CSS 4 |
| Language | TypeScript (strict) |
| Package manager | pnpm |

## Commands

```bash
pnpm dev                       # Start dev server
pnpm build                     # Build for production
pnpm deploy                    # Build + deploy to Cloudflare
pnpm preview                   # Preview production build locally

pnpm db:migrate:generate       # Generate migration from schema changes
pnpm db:migrate:dev            # Apply migrations to local D1
pnpm db:migrate:prod           # Apply migrations to production D1

pnpm typegen:wrangler          # Regenerate Cloudflare env types -> types/cloudflare.d.ts
```

## Project structure

> **Important:** Every new route file added to `app/routes/` must also be registered in `app/routes.ts`. React Router uses this file as the explicit route manifest — files in `app/routes/` are not picked up automatically.

```
app/
  routes.ts        # Route manifest — register ALL routes here
  routes/          # React Router routes (index, vote.$id, results.$id, api.*)
  components/      # Shared UI components
  hooks/           # Custom React hooks
  lib/             # Utility functions
  styles/          # Global CSS
server/
  app.ts           # Cloudflare Worker entrypoint, builds AppLoadContext
  schema.ts        # Drizzle schema (room, form, vote tables)
  auth.ts          # OAuth/session auth handler
  spotify.ts       # Spotify API handler
  playlist.ts      # Playlist KV-cache handler (wraps Spotify + PLAYLISTS KV)
  form.ts          # Form business logic
  vote.ts          # Vote business logic
  room.ts          # Room business logic
  session.ts       # Session management
migrations/        # Drizzle-generated SQL migrations
types/             # TypeScript type definitions (cloudflare.d.ts generated)
```

## Architecture notes

- Server-side handlers (`SessionHandler`, `AuthHandler`, `SpotifyHandler`, `PlaylistHandler`, `RoomHandler`, `FormHandler`, `VoteHandler`) are instantiated per-request in `server/app.ts` and injected into React Router's `AppLoadContext`.
- Routes access these via `context` in `loader` / `action` functions.
- The `user` field on context is the currently authenticated Spotify user (`CurrentUser | undefined`).
- All DB access goes through Drizzle with the schema from `server/schema.ts`.
- **`PlaylistHandler`** (`server/playlist.ts`) — checks `PLAYLISTS` KV first, falls back to Spotify API and caches the result. Always use `context.playlist.get(id)` — never call `context.spotify.fetchPlaylist()` directly.

## Constraints

- **Cloudflare Workers only** — do not use Node.js APIs that are unsupported in the Workers runtime (no `fs`, `path`, `crypto` from Node, etc.). Use Web APIs or Workers-compatible alternatives.
- **No test suite** — there are no automated tests; verify changes manually via `pnpm dev`.
- **SSR is enabled** — components may run on the server; avoid browser-only APIs at the top level of components.

## Database schema

```ts
room    { id, name, clientId, clientSecret }
form    { playlistId (PK), roomId, createdBy, contributorIds, contributorVoteCount,
          trackVoteCount, enableHonourableMentions, enableShameVotes, enableVoting }
vote    { id (auto), playlistId, voterId, contributorIds, trackIds,
          honourableMentions, shameVotes }
user    { id (Spotify Profile ID, PK), roomId (FK → room), name, imageUrl }
```

Exported types: `RoomSchema`, `FormSchema`, `VoteSchema`, `UserSchema` (via `InferSelectModel`).

## UI conventions

- **Icons** — use `@phosphor-icons/react` for all icons.
- **Button classes** — `btn btn-primary`, `btn btn-secondary`; subtle link-style buttons use `link text-sm underline`.
- **Dialog hierarchy** — `Dialog` is the base component (handles open/close, backdrop, heading bar); `DialogBasic` is a centred wrapper used for splash/welcome-style dialogs. The X close button lives in `Dialog`'s heading bar and is only rendered when `onClose` is provided (no default). `Dialog` also auto-closes when navigation state changes (React Router `useNavigation`) and fires/listens to `DIALOG_EVENTS.OPEN` custom events so that opening one dialog closes any sibling dialogs. `DialogSearch` wraps `Dialog` with built-in search/filter UI and accepts `defaultOpen` (opens immediately on mount) and `isClosable` (defaults to `true`; pass `false` to omit `onClose` entirely, preventing the user from dismissing the dialog). `Dialog` is `z-60`; always renders above `ActionMenu` (`z-50`). `DialogCreateForm` is fully controlled — accepts `isOpen` and `onClose` props, no internal state or trigger button.
- **Room state** — fully session-based (server-side). The current room is available via `useRouteLoaderData<typeof loader>("root")` from `@app/root`. Joining navigates via form POST to `/api/room/join`; leaving links to `/api/room/leave` (GET loader). localStorage `"room-id"` is kept as a fallback backup only for pre-filling the room input if the session expires.
- **`useLocalStorage`** — returns `[value, actions]`. Always access actions via dot notation (`actions.set(val)`, `actions.clear()`), never destructure actions individually. Valid keys are enforced by the `LocalStorageKey` union type in `app/hooks/use-local-storage.ts` — add new keys there.
- **Auth flow** — `authoriseUser(roomId)` in `server/auth.ts` fetches the room's Spotify `clientId`/`clientSecret` from the DB, stores them in the session, and redirects to the Spotify OAuth URL. The room ID is always required for this step.
- **Form footer pattern** — use `FormActions` (sticky wrapper + error display, takes `fetcher` + `children`) wrapping one or more `FormSubmit` buttons (just the button element, takes `cta`, optional `variant` (`"primary"` | `"secondary"`, defaults to `"primary"`), optional `formAction`, optional `formMethod`, optional `disabled`). `FormSubmit` uses `useNavigation` to show a spinner while submitting. Alternative submit targets use `formAction`/`formMethod` props on `FormSubmit`; the form's `onSubmit` handler should check `(event.nativeEvent as SubmitEvent).submitter?.getAttribute("formaction")` and skip `preventDefault` for those buttons.
- **`ActionMenu`** — accepts `items: ReactNode[]`, `direction?: "up" | "down"` (default `"up"`), `variant?: "light" | "dark"` (default `"light"`), `icon?: ReactNode` (default: Gear icon). The `variant` describes the **background context** it sits on, not the icon colour: `"light"` = light background → dark icon; `"dark"` = dark background → light icon. Items are passed as ReactNode elements; `cloneElement` applies item styling (padding, hover) to the top-level element of each item. Closes on click-outside. Dropdown is `z-50`, `shadow-md`.
- **`HeaderRoom`** — theme-aware: light scheme (`bg-white`, dark text/icon) when user is signed in; dark scheme (`bg-gray-950`, light text/icon) when not. Dropdown contains: Manage Room / Sign In, Create Form (signed in only), Sign Out (signed in only), Leave Room. `DialogCreateForm` state is managed here.

## Code style

- **Imports** — always use aliased paths (`@app/components/...`, `@app/hooks/...`, etc.). Never use relative paths (e.g. `./foo`, `../foo`) except for React Router generated types (`./+types/...`) which must stay relative.
- **Event handlers** — never inline arrow functions directly on props (e.g. no `onChange={(e) => setState(e)}`). If a named function reference is already available (e.g. `updateRoom.leave`), pass it directly. If a new handler is needed, define it as a named function outside the JSX return (e.g. `handleSubmit`, `handleFindRoom`) with a name that includes a verb describing the action being captured.
- **Optional types** — always use `?` syntax for possibly-undefined values (e.g. `room?: Room`), never `Room | undefined`.
- **Boolean props** — always name boolean props as `is` or `has` statements (e.g. `isClosable`, `hasVoted`, `isOpen`). Never use bare adjectives or nouns (e.g. no `closable`, `open`, `voted`).
- **Tailwind classes** — never construct class names dynamically with template literals (e.g. no `` `btn-${variant}` ``); Tailwind's JIT compiler requires full class strings in source. Use a lookup object instead, keeping any shared prefix in the static className (e.g. `btn` stays in the JSX, only `btn-primary`/`btn-secondary` go in the lookup).
- **Conditional classes** — always use `clsx` to concatenate conditional class strings. Never use template literals for conditional classes.
