import type { ElementType } from "react";
import {
  Activity,
  ClipboardCheck,
  Home,
  Hospital,
  Pill,
  Syringe,
} from "lucide-react";
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
} from "@/svgs/frontdesk/svg";

export type NavItem = {
  label: string;
  icon: ElementType<{ className?: string; strokeWidth?: number }>;
  link: string;
};

export const MAIN_MENU: NavItem[] = [
  { label: "Dashboard", icon: DashboardLayoutIcon, link: "/nurse" },
];

export const PATIENT_MANAGEMENT: NavItem[] = [
  { label: "Admission", icon: Hospital, link: "/nurse/admission" },
  { label: "Available Ward", icon: GridMenuIcon, link: "/nurse/available-ward" },
  { label: "Discharge", icon: Home, link: "/nurse/discharge" },
];

export const PERFORM_ACTION: NavItem[] = [
  { label: "Make Request", icon: BlockIcon, link: "/nurse/make-request" },
  { label: "Set Reminder", icon: AddAlertIcon, link: "/nurse/reminder" },
];

export const REPORTS: NavItem[] = [
  {
    label: "Admission",
    icon: ClipboardCheck,
    link: "/nurse/reports/admission",
  },
  { label: "Discharge", icon: Home, link: "/nurse/reports/discharge" },
  { label: "Ante Natal", icon: PregnantWomanIcon, link: "/nurse/ante-natal" },
  {
    label: "Child Birth",
    icon: BreastfeedingIcon,
    link: "/nurse/child-birth",
  },
  {
    label: "Dispensed Drugs",
    icon: Pill,
    link: "/nurse/dispensed-drugs",
  },
  { label: "Immunization", icon: Syringe, link: "/nurse/immunization" },
  {
    label: "Report Writing",
    icon: ReceiptIcon,
    link: "/nurse/report-writing",
  },
  {
    label: "Requisition",
    icon: Activity,
    link: "/nurse/requisition",
  },
  {
    label: "Family Planning",
    icon: FamilyIcon,
    link: "/nurse/family-planning",
  },
  { label: "Post Natal", icon: BabyIcon, link: "/nurse/post-natal" },
];
