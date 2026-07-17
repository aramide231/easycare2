import type { ElementType } from "react";
import {
  Activity,
  Bell,
  ClipboardCheck,
  Home,
  Hospital,
  Syringe,
  UserCircle,
} from "lucide-react";
import {
  BabyIcon,
  BreastfeedingIcon,
  DashboardLayoutIcon,
  FamilyIcon,
  PregnantWomanIcon,
  ReceiptIcon,
} from "@doctor-shared/svgs/navIcons";

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

export const REPORTS: NavItem[] = [
  {
    label: "Admission",
    icon: ClipboardCheck,
    link: "/doctor/reports/admission",
  },
  { label: "Discharge", icon: Home, link: "/doctor/reports/discharge" },
  { label: "Ante Natal", icon: PregnantWomanIcon, link: "/doctor/ante-natal" },
  {
    label: "Child Birth",
    icon: BreastfeedingIcon,
    link: "/doctor/child-birth",
  },
  { label: "Immunization", icon: Syringe, link: "/doctor/immunization" },
  {
    label: "Post Natal",
    icon: BabyIcon,
    link: "/doctor/post-natal",
  },
  {
    label: "Family Planning",
    icon: FamilyIcon,
    link: "/doctor/family-planning",
  },
  {
    label: "Doctor Logs",
    icon: Activity,
    link: "/doctor/doctor-assignments",
  },
  {
    label: "Registration",
    icon: ReceiptIcon,
    link: "/doctor/registration-log",
  },
];
