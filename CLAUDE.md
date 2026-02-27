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

```
app/
  routes/          # React Router routes (index, vote.$id, results.$id)
  components/      # Shared UI components
  hooks/           # Custom React hooks
  lib/             # Utility functions
  styles/          # Global CSS
server/
  app.ts           # Cloudflare Worker entrypoint, builds AppLoadContext
  schema.ts        # Drizzle schema (room, form, vote tables)
  auth.ts          # OAuth/session auth handler
  spotify.ts       # Spotify API handler
  form.ts          # Form business logic
  vote.ts          # Vote business logic
  room.ts          # Room business logic
  session.ts       # Session management
migrations/        # Drizzle-generated SQL migrations
types/             # TypeScript type definitions (cloudflare.d.ts generated)
```

## Architecture notes

- Server-side handlers (`SessionHandler`, `AuthHandler`, `SpotifyHandler`, `RoomHandler`, `FormHandler`, `VoteHandler`) are instantiated per-request in `server/app.ts` and injected into React Router's `AppLoadContext`.
- Routes access these via `context` in `loader` / `action` functions.
- The `user` field on context is the currently authenticated Spotify user (`CurrentUser | undefined`).
- All DB access goes through Drizzle with the schema from `server/schema.ts`.

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
```

Exported types: `RoomSchema`, `FormSchema`, `VoteSchema` (via `InferSelectModel`).
