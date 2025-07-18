import {
  type RouteConfig,
  index,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("./routes/index.tsx"),
  route("vote/:id", "./routes/vote.$id.tsx"),
  route("results/:id", "./routes/results.$id.tsx"),
  ...prefix("api", [
    route("playlist/fetch", "./routes/api.playlist.fetch.ts"),
    ...prefix("room", [
      route("create", "./routes/api.room.create.ts"),
      route("fetch", "./routes/api.room.fetch.ts"),
    ]),
    ...prefix("auth", [
      route("callback", "./routes/api.auth.callback.ts"),
      route("refresh", "./routes/api.auth.refresh.ts"),
      route("sign-in", "./routes/api.auth.sign-in.ts"),
      route("sign-out", "./routes/api.auth.sign-out.ts"),
    ]),
    ...prefix("form", [
      route("close", "./routes/api.form.close.ts"),
      route("create", "./routes/api.form.create.ts"),
      route("sync", "./routes/api.form.sync.ts"),
      route("delete", "./routes/api.form.delete.ts"),
      route("open", "./routes/api.form.open.ts"),
    ]),
    ...prefix("vote", [
      route("create", "./routes/api.vote.create.ts"),
      route("delete", "./routes/api.vote.delete.ts"),
      route("tiebreak", "./routes/api.vote.tiebreak.ts"),
    ]),
  ]),
] satisfies RouteConfig;
