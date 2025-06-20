import {
  ClockCounterClockwise,
  Copy,
  Gear,
  MapPin,
  Clipboard,
  HouseSimple,
} from "@phosphor-icons/react";

const NAV_LINKS = [
  {
    type: "link",
    icon: HouseSimple,
    to: "/admin",
    label: "Home",
  },
  {
    type: "divider",
  },
  {
    type: "link",
    icon: MapPin,
    to: "/admin/entries",
    label: "Entries",
  },
  {
    type: "link",
    icon: ClockCounterClockwise,
    to: "/admin/versions",
    label: "Versions",
  },
  {
    type: "link",
    icon: Clipboard,
    to: "/admin/categories",
    label: "Categories",
  },

  {
    type: "link",
    icon: Copy,
    to: "/admin/groups",
    label: "Groups",
  },
  {
    type: "divider",
  },
  {
    type: "link",
    icon: Gear,
    to: "/admin/settings",
    label: "Settings",
  },
] as const;

export function Navigation() {
  return <nav className="flex flex-col gap-1"></nav>;
}
