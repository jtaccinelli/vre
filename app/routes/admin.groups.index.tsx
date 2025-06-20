import type { Route } from "./+types/admin.groups.index";

import { useLoaderData } from "react-router";

import { GROUP_EVENTS } from "~/lib/events";

import { useEventDispatch } from "~/hooks/use-event-dispatch";

import { Header } from "~/components/app/header";
import { DialogGroupCreate } from "~/components/app/dialog-group-create";
import { DialogGroupUpdate } from "~/components/app/dialog-group-update";
import { DialogGroupDelete } from "~/components/app/dialog-group-delete";
import { TileGroup } from "~/components/app/tile-group";
import { TileNoResults } from "~/components/app/tile-no-results";
import { Copy } from "@phosphor-icons/react";
import { Actions } from "~/components/app/actions";

export function meta() {
  return [
    {
      title: "Groups",
    },
  ];
}

export async function loader({ context }: Route.LoaderArgs) {
  const groups = await context.group.list();
  return {
    groups,
    hasGroups: groups.length > 0,
    groupCount: groups.length || "No",
  };
}

export default function Groups() {
  const { groups, hasGroups, groupCount } = useLoaderData<typeof loader>();
  const dispatch = useEventDispatch();

  const handleCreateGroup = () => {
    dispatch(GROUP_EVENTS.CREATE);
  };

  return (
    <>
      <Header heading="Groups" icon={Copy} />
      <Actions>
        <button className="btn btn-primary" onClick={handleCreateGroup}>
          New
        </button>
        <p className="ml-auto text-gray-400">{groupCount} groups</p>
      </Actions>
      <div className="flex w-full flex-col gap-px">
        {hasGroups ? (
          groups.map((group) => <TileGroup key={group.handle} group={group} />)
        ) : (
          <TileNoResults
            message="No groups found."
            cta="Create your first"
            onClick={handleCreateGroup}
          />
        )}
      </div>
      <DialogGroupUpdate groups={groups} />
      <DialogGroupDelete groups={groups} />
      <DialogGroupCreate />
    </>
  );
}
