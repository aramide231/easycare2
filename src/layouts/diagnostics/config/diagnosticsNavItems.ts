import type { ElementType } from "react";
import {
  Bell,
  ClipboardList,
  FileText,
  LayoutDashboard,
  UserRound,
  UserRoundSearch,
} from "lucide-react";
import { BlockIcon } from "@/svgs/frontdesk/svg";

export type NavItem = {
  label: string;
  icon: ElementType<{ className?: string; strokeWidth?: number }>;
  link: string;
};

export const MAIN_MENU: NavItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, link: "/diagnostics" },
];

export const PERFORM_ACTION: NavItem[] = [
  { label: "Make Request", icon: BlockIcon, link: "/diagnostics/make-request" },
  {
    label: "Investigations List",
    icon: UserRoundSearch,
    link: "/diagnostics/investigative-list",
  },
  { label: "Set Reminder", icon: Bell, link: "/diagnostics/set-reminder" },
];

export const REPORTS: NavItem[] = [
  {
    label: "Investigations Logs",
    icon: UserRound,
    link: "/diagnostics/investigation-logs",
  },
  {
    label: "Request Logs",
    icon: ClipboardList,
    link: "/diagnostics/request-logs",
  },
  {
    label: "Visitation Logs",
    icon: FileText,
    link: "/diagnostics/visitation-logs",
  },
];
