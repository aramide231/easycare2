import type { ElementType } from "react";
import {
  Archive,
  ArrowLeftRight,
  Bell,
  Building2,
  ClipboardList,
  Clock,
  FileText,
  LayoutDashboard,
  Package,
  PackageMinus,
  PackagePlus,
  Pill,
  ShoppingBag,
  Tag,
} from "lucide-react";

export type NavItem = {
  label: string;
  icon: ElementType<{ className?: string; strokeWidth?: number }>;
  link: string;
};

export const MAIN_MENU: NavItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, link: "/pharmacy" },
];

export const STORE_MANAGEMENT: NavItem[] = [
  { label: "Main Store", icon: Building2, link: "/pharmacy/main-store" },
  { label: "Purchases", icon: Tag, link: "/pharmacy/purchases" },
  { label: "Dispense Store", icon: Pill, link: "/pharmacy/dispense-store" },
  {
    label: "Med. Tracking/Expiry",
    icon: Clock,
    link: "/pharmacy/med-tracking",
  },
];

export const PERFORM_ACTION: NavItem[] = [
  {
    label: "Store Request",
    icon: PackagePlus,
    link: "/pharmacy/store-request",
  },
  { label: "Return Med.", icon: PackageMinus, link: "/pharmacy/return-med" },
  { label: "Set Reminder", icon: Bell, link: "/pharmacy/set-reminder" },
];

export const REPORTS: NavItem[] = [
  {
    label: "Admission Logs",
    icon: ClipboardList,
    link: "/pharmacy/admission-logs",
  },
  {
    label: "Discharge Logs",
    icon: FileText,
    link: "/pharmacy/discharge-logs",
  },
  {
    label: "Purchase Logs",
    icon: ShoppingBag,
    link: "/pharmacy/purchase-logs",
  },
  {
    label: "Dispensed Med. Logs",
    icon: Package,
    link: "/pharmacy/dispensed-med-logs",
  },
  { label: "Inventory", icon: Archive, link: "/pharmacy/inventory" },
  {
    label: "Main Store Logs",
    icon: Building2,
    link: "/pharmacy/main-store-logs",
  },
  {
    label: "Request Logs",
    icon: ArrowLeftRight,
    link: "/pharmacy/request-logs",
  },
  { label: "Return Logs", icon: PackageMinus, link: "/pharmacy/return-logs" },
];
