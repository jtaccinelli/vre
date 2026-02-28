import { useMemo, type ReactNode } from "react";
import { Form, Link, useNavigation, useRouteLoaderData } from "react-router";
import { DotsThree } from "@phosphor-icons/react";
import clsx from "clsx";

import type { loader } from "@app/root";
import { useBoolean } from "@app/hooks/use-boolean";
import { ActionMenu } from "@app/components/action-menu";
import { DialogCreateForm } from "@app/components/dialog-create-form";

const barClasses = {
  light: "bg-white",
  dark: "bg-gray-950",
};

const roomLabelClasses = {
  light: "text-gray-500",
  dark: "text-gray-400",
};

const roomNameClasses = {
  light: "text-gray-950",
  dark: "text-white",
};

export function HeaderRoom() {
  const navigation = useNavigation();
  const data = useRouteLoaderData<typeof loader>("root");
  const room = data?.room;
  const user = data?.user;
  const [isCreateFormOpen, setIsCreateFormOpen] = useBoolean(false);

  const theme = user ? "light" : "dark";

  const actions = useMemo(() => {
    const actions = [] as ReactNode[];
    if (user) {
      actions.push(
        <button type="button" onClick={setIsCreateFormOpen.true}>
          Create Form
        </button>,
      );
      actions.push(<Link to="/room">Manage Room</Link>);
      actions.push(<Link to="/api/auth/sign-out">Sign Out</Link>);
    } else {
      actions.push(
        <Form method="post" action="/api/auth/sign-in">
          <input type="hidden" name="room-id" value={room?.id ?? ""} />
          <button type="submit" className="w-full text-left">
            Sign In
          </button>
        </Form>,
      );
    }
    actions.push(<Link to="/api/room/leave">Leave Room</Link>);
    return actions;
  }, [room, user]);

  return (
    <div className="flex flex-col">
      <div
        className={clsx(
          "flex items-center justify-between p-4",
          barClasses[theme],
        )}
      >
        <p className="text flex gap-2">
          <span className={clsx(roomLabelClasses[theme])}>Room</span>
          <span className={clsx("font-semibold", roomNameClasses[theme])}>
            {room?.name ?? "—"}
          </span>
        </p>
        <ActionMenu
          direction="down"
          variant={theme}
          icon={<DotsThree weight="bold" size={20} />}
          items={actions}
        />
      </div>
      {navigation.state === "idle" ? null : (
        <div className="animate-load h-px bg-gray-950" />
      )}
      <DialogCreateForm
        isOpen={isCreateFormOpen}
        onClose={setIsCreateFormOpen.false}
      />
    </div>
  );
}
