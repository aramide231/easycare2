import type { ElementType } from "react";
import { Home, Hospital } from "lucide-react";
import {
  AddAlertIcon,
  BreastfeedingIcon,
  DashboardLayoutIcon,
  GridMenuIcon,
  PregnantWomanIcon,
  ReceiptIcon,
} from "@hmo/vendor/svgs/svg";
import { CalendarDays, ClipboardList, Stethoscope } from "lucide-react";

export type NavItem = {
  label: string;
  icon: ElementType<{ className?: string; strokeWidth?: number }>;
  link: string;
};

export const MAIN_MENU: NavItem[] = [
  { label: "Dashboard", icon: DashboardLayoutIcon, link: "/hmo" },
];

export const HMO_MANAGEMENT: NavItem[] = [
  {
    label: "HMO Registration",
    icon: ReceiptIcon,
    link: "/hmo/registration",
  },
  {
    label: "Account Review",
    icon: ClipboardList,
    link: "/hmo/account-review",
  },
  {
    label: "Bill Summary",
    icon: ReceiptIcon,
    link: "/hmo/bill-summary",
  },
  {
    label: "Claims Processor",
    icon: ClipboardList,
    link: "/hmo/claims-processor",
  },
];

export const PATIENT_MANAGEMENT: NavItem[] = [
  { label: "Admission", icon: Hospital, link: "/hmo/admission" },
  {
    label: "Available Ward",
    icon: GridMenuIcon,
    link: "/hmo/available-ward",
  },
  { label: "Discharge", icon: Home, link: "/hmo/discharge" },
];

export const PERFORM_ACTION: NavItem[] = [
  {
    label: "Service List",
    icon: CalendarDays,
    link: "/hmo/service-list",
  },
  { label: "Set Reminder", icon: AddAlertIcon, link: "/hmo/reminder" },
];

export const REPORTS: NavItem[] = [
  {
    label: "Ante Natal Logs",
    icon: PregnantWomanIcon,
    link: "/hmo/ante-natal-logs",
  },
  {
    label: "Child Birth Logs",
    icon: BreastfeedingIcon,
    link: "/hmo/child-birth-logs",
  },
  {
    label: "Discharged Logs",
    icon: Stethoscope,
    link: "/hmo/discharged-logs",
  },
  {
    label: "Ins. Registration Logs",
    icon: ReceiptIcon,
    link: "/hmo/ins-registration-logs",
  },
  {
    label: "Pre. Authorisation Logs",
    icon: ClipboardList,
    link: "/hmo/pre-authorisation-logs",
  },
];
