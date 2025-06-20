import type { Route } from "./+types/admin.categories.id";

import { useLoaderData } from "react-router";
import { Copy } from "@phosphor-icons/react";

import { CATEGORY_EVENTS } from "~/lib/events";

import { useEventDispatch } from "~/hooks/use-event-dispatch";

import { Header } from "~/components/app/header";
import { DialogCategoryCreate } from "~/components/app/dialog-category-create";
import { DialogGroupUpdate } from "~/components/app/dialog-group-update";
import { DialogGroupDelete } from "~/components/app/dialog-group-delete";
import { TileGroup } from "~/components/app/tile-group";
import { Actions } from "~/components/app/actions";

export function meta() {
  return [
    {
      title: "Categories",
    },
  ];
}

export async function loader({ context }: Route.LoaderArgs) {
  const categories = await context.category.list();
  return {
    categories,
    hasCategories: categories.length > 0,
    categoryCount: categories.length || "No",
  };
}

export default function Categories() {
  const { categories, hasCategories, categoryCount } =
    useLoaderData<typeof loader>();
  const dispatch = useEventDispatch();

  const handleCreateCategory = () => {
    dispatch(CATEGORY_EVENTS.CREATE);
  };

  const subheading = hasCategories
    ? `${categories.length} categories`
    : `No categories`;

  return (
    <>
      <Header heading="Groups" icon={Copy} />
      <Actions>
        <button className="btn btn-primary" onClick={handleCreateCategory}>
          New
        </button>
        <p className="ml-auto text-gray-400">{categoryCount} groups</p>
      </Actions>
      <div className="flex w-full flex-col gap-1">
        {hasCategories ? (
          categories.map((category) => null)
        ) : (
          <div className="gap-2 rounded bg-white p-4">
            <p>No categories found.</p>
            <button
              className="underline underline-offset-4 hover:cursor-pointer"
              onClick={handleCreateCategory}
            >
              Try create a new one
            </button>
          </div>
        )}
      </div>
      {/* <DialogGroupUpdate groups={groups} />
      <DialogGroupDelete groups={groups} /> */}
      <DialogCategoryCreate />
    </>
  );
}
