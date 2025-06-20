import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  route("account", "./routes/account.layout.tsx", [
    index("./routes/account.index.tsx"),
    route("login", "./routes/account.login.tsx"),
    route("logout", "./routes/account.logout.tsx"),
  ]),
  route("admin", "./routes/admin.layout.tsx", [
    index("./routes/admin.index.tsx"),
    route("settings", "./routes/admin.settings.tsx"),
    ...prefix("entries", [
      index("./routes/admin.entries.index.tsx"),
      route(":id", "./routes/admin.entries.id.tsx"),
    ]),
    ...prefix("versions", [
      index("./routes/admin.versions.index.tsx"),
      route(":id", "./routes/admin.versions.id.tsx"),
    ]),
    ...prefix("categories", [
      index("./routes/admin.categories.index.tsx"),
      route(":id", "./routes/admin.categories.id.tsx"),
    ]),
    route("groups", "./routes/admin.groups.index.tsx"),
  ]),
  ...prefix("api", [
    ...prefix("version", [
      route("activate", "./routes/api.version.activate.ts"),
      route("delete", "./routes/api.version.delete.ts"),
    ]),
    ...prefix("image", [
      route("upload", "./routes/api.image.upload.ts"),
      route("delete", "./routes/api.image.delete.ts"),
    ]),
    ...prefix("location", [
      route("address", "./routes/api.location.address.ts"),
      route("delete", "./routes/api.location.geocode.ts"),
    ]),
    ...prefix("entry", [
      route("create", "./routes/api.entry.create.ts"),
      route("delete", "./routes/api.entry.delete.ts"),
      route("hide", "./routes/api.entry.hide.ts"),
      route("summary", "./routes/api.entry.summary.ts"),
      route("update", "./routes/api.entry.update.ts"),
      route("verify", "./routes/api.entry.verify.ts"),
    ]),
    ...prefix("group", [
      route("create", "./routes/api.group.create.ts"),
      route("delete", "./routes/api.group.delete.ts"),
      route("update", "./routes/api.group.update.ts"),
    ]),
  ]),
  route("app", "./routes/app.layout.tsx", [
    index("./routes/app.index.tsx"),
    route("search", "./routes/app.search.tsx"),
    route("create", "./routes/app.create.layout.tsx", [
      index("./routes/app.create.index.tsx"),
      route("location", "./routes/app.create.location.tsx"),
      route("details", "./routes/app.create.details.tsx"),
      route("image", "./routes/app.create.image.tsx"),
      route("confirm", "./routes/app.create.confirm.tsx"),
    ]),
    route("entry/:id", "./routes/app.entry.id.layout.tsx", [
      index("./routes/app.entry.id.index.tsx"),
      route("edit", "./routes/app.entry.id.edit.tsx"),
    ]),
  ]),
  layout("./routes/site.layout.tsx", [
    index("./routes/site.index.tsx"),
    route("contact", "./routes/site.contact.tsx"),
    route("content", "./routes/site.content.layout.tsx", []),
  ]),
] satisfies RouteConfig;
