import type { Route } from "./+types/api.group.delete";

import { redirect } from "react-router";
import { error } from "~/lib/routes";

import { isValidString } from "~/lib/types";

export async function action({ request, context }: Route.ActionArgs) {
  const form = await request.formData();
  const handle = form.get("handle");

  if (!isValidString(handle)) {
    return error("Action does not have valid inputs.");
  }

  const response = await context.group.delete(handle);

  console.log("Response", response);

  return redirect("/admin/groups");
}
