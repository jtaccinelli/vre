import { redirect } from "react-router";
import type { Route } from "./+types/api.profile.delete";

import { isString } from "@app/lib/predicates";
import { error } from "@app/lib/routes";

export async function action({ request, context }: Route.ActionArgs) {
  if (!context.user) throw redirect("/");

  const form = await request.formData();
  const profileId = form.get("profile-id");

  if (!isString(profileId)) return error("Form was incomplete");

  await context.profiles.delete(profileId);

  throw redirect("/room");
}
