import type { ElementType } from "react";
import { Bell, Home, Hospital, UserCircle } from "lucide-react";
import { DashboardLayoutIcon } from "@/svgs/frontdesk/svg";

export type NavItem = {
  label: string;
  icon: ElementType<{ className?: string; strokeWidth?: number }>;
  link: string;
};

export const MAIN_MENU: NavItem[] = [
  { label: "Dashboard", icon: DashboardLayoutIcon, link: "/doctor" },
  {
    label: "Notifications",
    icon: Bell,
    link: "/doctor/notifications-doctor",
  },
];

export const PATIENT_MANAGEMENT: NavItem[] = [
  { label: "Admission", icon: Hospital, link: "/doctor/admission" },
  { label: "Discharge", icon: Home, link: "/doctor/discharge" },
];

export const ACCOUNT: NavItem[] = [
  { label: "Account", icon: UserCircle, link: "/doctor/account" },
];
