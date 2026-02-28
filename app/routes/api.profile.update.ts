import { redirect } from "react-router";
import type { Route } from "./+types/api.profile.update";

import { isString } from "@app/lib/predicates";
import { error } from "@app/lib/routes";

export async function action({ request, context }: Route.ActionArgs) {
  if (!context.user) throw redirect("/");

  const form = await request.formData();
  const profileId = form.get("profile-id");
  const name = form.get("name");
  const imageUrl = form.get("image-url");

  const hasValidData = isString(profileId) && isString(name);
  if (!hasValidData) return error("Form was incomplete");

  await context.profiles.update(profileId, {
    name,
    imageUrl: isString(imageUrl) ? imageUrl : null,
  });

  throw redirect("/room");
}
