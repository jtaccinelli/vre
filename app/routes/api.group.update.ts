import type { Route } from "./+types/api.group.update";

import { redirect } from "react-router";
import { error } from "~/lib/routes";

import { isValidString } from "~/lib/types";

export async function action({ request, context }: Route.ActionArgs) {
  const form = await request.formData();
  const title = form.get("title");
  const handle = form.get("handle");

  if (!isValidString(handle) || !isValidString(title)) {
    return error("Action does not have valid inputs.");
  }

  const [group] = await context.group.get(handle);
  const isNewTitle = group.title !== title;

  if (!isNewTitle) {
    return error("No new data was provided.");
  }

  const response = await context.group.update(handle, {
    title,
  });

  console.log("Response:", response);

  return redirect("/admin/groups");
}
