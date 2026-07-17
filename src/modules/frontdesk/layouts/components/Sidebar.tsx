import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Activity,
  Syringe,
  ClipboardCheck,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import {
  DashboardLayoutIcon,
  ReceiptIcon,
  AddAlertIcon,
  FamilyIcon,
  BabyIcon,
  BlockIcon,
  PregnantWomanIcon,
  GridMenuIcon,
  BreastfeedingIcon,
} from "@frontdesk/svgs/svg";

import ChevronToggle from "./ChevronToggle";
import easycareLogo from "@frontdesk/assets/logos/easycare/logo-only.png";
import hospitalLogo from "@frontdesk/assets/logos/st-peter-hospital.png";
import { useSidebar } from "../hooks/useSidebar";

// 1. Update Types to accept standard React functional components (SVGs)
type SidebarProp = {
  icon: React.ElementType;
  label: string;
  link?: string;
  active?: boolean;
  isCollapsed: boolean;
};

// 2. Map standard Lucide SVG icons (Swap with your custom @/svgs if needed)
const MAIN_MENU = [
  { label: "Dashboard", icon: DashboardLayoutIcon, link: "/frontdesk" },
  { label: "Visitation", icon: ReceiptIcon, link: "/frontdesk/visitation-log" },
];

const PERFORM_ACTION = [
  {
    label: "Book Appointment",
    icon: ReceiptIcon,
    link: "/frontdesk/reminder",
  },
  { label: "Manage Access", icon: BlockIcon, link: "/frontdesk/manage-access" },
  { label: "Manage Card", icon: GridMenuIcon, link: "/frontdesk/manage-card" },
  { label: "Set Reminder", icon: AddAlertIcon, link: "/frontdesk/reminder" },
];

const REPORT = [
  {
    label: "Ante Natal",
    icon: PregnantWomanIcon,
    link: "/frontdesk/ante-natal",
  },
  {
    label: "Child Birth",
    icon: BreastfeedingIcon,
    link: "/frontdesk/child-birth",
  },
  { label: "Doctor Logs", icon: Activity, link: "/frontdesk/doctor-assignments" },
  {
    label: "Family Planning",
    icon: FamilyIcon,
    link: "/frontdesk/family-planning",
  },
  { label: "Immunization", icon: Syringe, link: "/frontdesk/immunization" },
  { label: "Post Natal", icon: BabyIcon, link: "/frontdesk/post-natal" },
  {
    label: "Registration",
    icon: ClipboardCheck,
    link: "/frontdesk/registration",
  },
  {
    label: "Registration Log",
    icon: ReceiptIcon,
    link: "/frontdesk/registration-log",
  },
];

export default function Sidebar() {
  const location = useLocation();
  const { width, isDragging, isCollapsed, startResizing, toggleCollapse } =
    useSidebar();

  const [openMenus, setOpenMenus] = useState({
    main: true,
    action: true,
    reports: true,
  });

  const toggleMenu = (menuName: keyof typeof openMenus) => {
    // Prevent toggling accordion if the sidebar is completely collapsed
    if (isCollapsed) return;
    setOpenMenus((prev) => ({ ...prev, [menuName]: !prev[menuName] }));
  };

  // Reusable NavItem Component
  const NavItem = ({
    icon: Icon,
    label,
    link,
    active,
    isCollapsed,
  }: SidebarProp) => {
    const content = (
      <div
        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 group ${
          active
            ? "bg-indigo-50 text-primary border border-primary/20"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        } ${isCollapsed ? "justify-center" : "justify-start"}`}
        title={isCollapsed ? label : undefined}
      >
        <Icon
          className={`w-5 h-5 shrink-0 transition-colors ${
            active ? "text-primary" : "text-gray-500 group-hover:text-gray-700"
          }`}
          strokeWidth={active ? 2.5 : 2}
        />
        {!isCollapsed && (
          <span
            className={`text-sm font-medium truncate ${active && "text-primary"}`}
          >
            {label}
          </span>
        )}
      </div>
    );

    return link ? <Link to={link}>{content}</Link> : content;
  };

  return (
    <aside
      style={{ width: `${width}px` }}
      className={`relative bg-white border-r border-border min-h-screen flex flex-col shrink-0 ${
        !isDragging && "transition-[width] duration-300 ease-in-out"
      }`}
    >
      {/* Drag Handle */}
      <div
        onMouseDown={startResizing}
        className="absolute top-0 right-0 w-1.5 h-full cursor-col-resize hover:bg-primary/40 active:bg-primary transition-colors z-50"
      />

      <div
        className={`px-4 pt-6 pb-4 flex items-center justify-between ${isCollapsed && "flex-col gap-4"}`}
      >
        {/* Logo Section */}
        <div className="flex items-center gap-2 overflow-hidden">
          <img
            className="w-8 h-8 shrink-0"
            src={easycareLogo}
            alt="easycare-logo"
          />
          {!isCollapsed && (
            <p className="text-xl font-bold text-[#573FD1] truncate">
              EasyCare<span className="text-black font-light">™</span>
            </p>
          )}
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={toggleCollapse}
          className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 shrink-0"
        >
          {isCollapsed ? (
            <PanelLeftOpen size={20} />
          ) : (
            <PanelLeftClose size={20} />
          )}
        </button>
      </div>

      <div className="px-4 mb-4">
        <div className="w-full border-b border-gray-200"></div>
      </div>

      {/* Hospital Profile */}
      <div className="px-4 mb-4">
        <div
          className={`bg-[#FAFAFA] border border-gray-200 rounded-xl p-2.5 flex items-center gap-3 ${isCollapsed && "justify-center"}`}
        >
          <div className="w-10 h-10 shrink-0 rounded-lg bg-white border border-gray-100 flex items-center justify-center shadow-sm">
            <img
              src={hospitalLogo}
              alt="Hospital"
              className="w-6 h-6 object-contain"
            />
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden">
              <div className="text-sm font-semibold text-gray-900 truncate">
                St James Hospital
              </div>
              <div className="text-[11px] text-gray-500 font-medium truncate">
                Front Desk Personnel
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="px-4 mb-4">
        <div className="w-full border-b border-gray-200"></div>
      </div>

      {/* Navigation Areas */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar px-3 pb-6 space-y-6">
        {/* Main Menu */}
        <div>
          {!isCollapsed && (
            <div className="flex justify-between items-center px-2 mb-2">
              <h1 className="font-semibold text-gray-400 text-xs tracking-wider uppercase">
                Main Menu
              </h1>
              <button
                onClick={() => toggleMenu("main")}
                className="p-1 hover:bg-gray-50 rounded"
              >
                <ChevronToggle isOpen={openMenus.main} />
              </button>
            </div>
          )}
          {(openMenus.main || isCollapsed) && (
            <div className="space-y-1">
              {MAIN_MENU.map((m) => (
                <NavItem
                  key={m.label}
                  {...m}
                  isCollapsed={isCollapsed}
                  active={location.pathname === m.link}
                />
              ))}
            </div>
          )}
        </div>

        {/* Perform Action */}
        <div>
          {!isCollapsed && (
            <div className="flex justify-between items-center px-2 mb-2">
              <h1 className="font-semibold text-gray-400 text-xs tracking-wider uppercase">
                Perform Action
              </h1>
              <button
                onClick={() => toggleMenu("action")}
                className="p-1 hover:bg-gray-50 rounded"
              >
                <ChevronToggle isOpen={openMenus.action} />
              </button>
            </div>
          )}
          {(openMenus.action || isCollapsed) && (
            <div className="space-y-1">
              {PERFORM_ACTION.map((m) => (
                <NavItem
                  key={m.label}
                  {...m}
                  isCollapsed={isCollapsed}
                  active={location.pathname === m.link}
                />
              ))}
            </div>
          )}
        </div>

        {/* Reports */}
        <div>
          {!isCollapsed && (
            <div className="flex justify-between items-center px-2 mb-2">
              <h1 className="font-semibold text-gray-400 text-xs tracking-wider uppercase">
                Reports
              </h1>
              <button
                onClick={() => toggleMenu("reports")}
                className="p-1 hover:bg-gray-50 rounded"
              >
                <ChevronToggle isOpen={openMenus.reports} />
              </button>
            </div>
          )}
          {(openMenus.reports || isCollapsed) && (
            <div className="space-y-1">
              {REPORT.map((m) => (
                <NavItem
                  key={m.label}
                  {...m}
                  isCollapsed={isCollapsed}
                  active={location.pathname === m.link}
                />
              ))}
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
}
