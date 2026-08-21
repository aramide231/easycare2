import type { LucideIcon } from "lucide-react";
import {
  Bell,
  ClipboardList,
  FileText,
  LayoutDashboard,
  UserRound,
  UserRoundSearch,
} from "lucide-react";

export type NavItem = {
  label: string;
  icon: LucideIcon;
  link: string;
};

export const MAIN_MENU: NavItem[] = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    link: "/diagnostics-and-radiologist",
  },
];

export const PERFORM_ACTION: NavItem[] = [
  {
    label: "Make Request",
    icon: ClipboardList,
    link: "/diagnostics-and-radiologist/make-request",
  },
  {
    label: "Investigations List",
    icon: UserRoundSearch,
    link: "/diagnostics-and-radiologist/investigations-list",
  },
  {
    label: "Set Reminder",
    icon: Bell,
    link: "/diagnostics-and-radiologist/set-reminder",
  },
];

export const REPORTS: NavItem[] = [
  {
    label: "Investigations Logs",
    icon: UserRound,
    link: "/diagnostics-and-radiologist/investigation-logs",
  },
  {
    label: "Request Logs",
    icon: ClipboardList,
    link: "/diagnostics-and-radiologist/request-logs",
  },
  {
    label: "Visitation Logs",
    icon: FileText,
    link: "/diagnostics-and-radiologist/visitation-logs",
  },
];
