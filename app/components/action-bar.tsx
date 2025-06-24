import { Component, type ComponentProps, type ReactNode } from "react";

import { ActionMenu } from "@app/components/action-menu";

type Props = {
  message: string;
  actions: ReactNode[];
};

export function ActionBar({ message, actions }: Props) {
  return (
    <div className="flex items-center justify-between gap-2 bg-gray-300 px-6 py-4 text-black">
      <p className="label">{message}</p>
      <ActionMenu items={actions} />
    </div>
  );
}
