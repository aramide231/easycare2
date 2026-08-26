import type { ElementType } from "react";
import { Activity, Home, Hospital, Pill, Syringe } from "lucide-react";
import {
  AddAlertIcon,
  BabyIcon,
  BlockIcon,
  BreastfeedingIcon,
  DashboardLayoutIcon,
  FamilyIcon,
  GridMenuIcon,
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
];

export const PATIENT_MANAGEMENT: NavItem[] = [
  { label: "Admission", icon: Hospital, link: "/doctor/admission" },
  {
    label: "Available Ward",
    icon: GridMenuIcon,
    link: "/doctor/available-ward",
  },
  { label: "Discharge", icon: Home, link: "/doctor/discharge" },
];

export const PERFORM_ACTION: NavItem[] = [
  { label: "Make Request", icon: BlockIcon, link: "/doctor/make-request" },
  { label: "Set Reminder", icon: AddAlertIcon, link: "/doctor/set-reminder" },
];

export const REPORTS: NavItem[] = [
  { label: "Ante Natal", icon: PregnantWomanIcon, link: "/doctor/ante-natal" },
  {
    label: "Child Birth",
    icon: BreastfeedingIcon,
    link: "/doctor/child-birth",
  },
  {
    label: "Dispensed Drug(s)",
    icon: Pill,
    link: "/doctor/dispensed-drugs",
  },
  { label: "Immunization", icon: Syringe, link: "/doctor/immunization" },
  {
    label: "Report Writing",
    icon: ReceiptIcon,
    link: "/doctor/report-writing",
  },
  {
    label: "Requisition",
    icon: Activity,
    link: "/doctor/requisition",
  },
  {
    label: "Family Planning",
    icon: FamilyIcon,
    link: "/doctor/family-planning",
  },
  { label: "Post Natal", icon: BabyIcon, link: "/doctor/post-natal" },
];
