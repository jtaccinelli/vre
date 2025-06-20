import type { Route } from "./+types/api.group.create";

import { redirect } from "react-router";
import { error } from "~/lib/routes";

import { generateHandle } from "~/lib/helpers";
import { isValidString } from "~/lib/types";

export async function action({ request, context }: Route.ActionArgs) {
  const form = await request.formData();
  const title = form.get("title");
  const handle = generateHandle();

  if (!isValidString(title)) {
    return error("Action does not have valid inputs.");
  }

  const response = await context.group.create({
    title,
    handle,
  });

  console.log("Response:", response);

  return redirect("/admin/groups");
}
