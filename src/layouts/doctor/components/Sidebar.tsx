import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useAuth } from "@doctor-shared/context/useAuth";
import easyCareLogoFull from "@doctor-shared/assets/icon/Frame 121.svg";
import hospitalLogo from "@doctor-shared/assets/icon/Frame 5.svg";
import EasyCareMark from "@doctor-shared/components/layout/EasyCareMark";
import ChevronToggle from "@doctor-shared/components/layout/ChevronToggle";
import { useSidebar } from "@/layouts/nurse/hooks/useSidebar";
import {
  MAIN_MENU,
  PATIENT_MANAGEMENT,
  PERFORM_ACTION,
  REPORTS,
  type NavItem,
} from "../config/doctorNavItems";

type SidebarProp = NavItem & {
  active?: boolean;
  isCollapsed: boolean;
};

type MenuSection = "main" | "patientManagement" | "action" | "reports";

export default function Sidebar() {
  const location = useLocation();
  const { user } = useAuth();
  const { width, isDragging, isCollapsed, startResizing, toggleCollapse } =
    useSidebar();

  const [openMenus, setOpenMenus] = useState({
    main: true,
    patientManagement: true,
    action: false,
    reports: false,
  });

  const roleLabel =
    user?.userRole && user.userRole.length > 0
      ? user.userRole.charAt(0).toUpperCase() + user.userRole.slice(1)
      : "Doctor";

  const toggleMenu = (menuName: MenuSection) => {
    if (isCollapsed) return;
    setOpenMenus((prev) => ({ ...prev, [menuName]: !prev[menuName] }));
  };

  const isNavActive = (path: string) => {
    if (path === "/doctor") {
      return (
        location.pathname === "/doctor" ||
        location.pathname === "/doctor/dashboard"
      );
    }
    return (
      location.pathname === path ||
      location.pathname.startsWith(`${path}/`)
    );
  };

  useEffect(() => {
    const patientMgmtPaths = [
      "/doctor/admission",
      "/doctor/available-ward",
      "/doctor/discharge",
    ];
    const performActionPaths = [
      "/doctor/make-request",
      "/doctor/set-reminder",
    ];
    const reportPaths = [
      "/doctor/ante-natal",
      "/doctor/child-birth",
      "/doctor/dispensed-drugs",
      "/doctor/immunization",
      "/doctor/report-writing",
      "/doctor/requisition",
      "/doctor/family-planning",
      "/doctor/post-natal",
    ];

    if (patientMgmtPaths.some((p) => location.pathname.startsWith(p))) {
      setOpenMenus((prev) => ({ ...prev, patientManagement: true }));
    }
    if (performActionPaths.some((p) => location.pathname.startsWith(p))) {
      setOpenMenus((prev) => ({ ...prev, action: true }));
    }
    if (reportPaths.some((p) => location.pathname.startsWith(p))) {
      setOpenMenus((prev) => ({ ...prev, reports: true }));
    }
  }, [location.pathname]);

  const NavItem = ({
    icon: Icon,
    label,
    link,
    active,
    isCollapsed: collapsed,
  }: SidebarProp) => {
    const content = (
      <div
        className={`group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200 ${
          active
            ? "border border-[#573FD1]/20 bg-indigo-50 text-[#573FD1]"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        } ${collapsed ? "justify-center" : "justify-start"}`}
        title={collapsed ? label : undefined}
      >
        <Icon
          className={`h-5 w-5 shrink-0 transition-colors ${
            active
              ? "text-[#573FD1]"
              : "text-gray-500 group-hover:text-gray-700"
          }`}
          strokeWidth={active ? 2.5 : 2}
        />
        {!collapsed && (
          <span
            className={`truncate text-sm font-medium ${
              active ? "text-[#573FD1]" : ""
            }`}
          >
            {label}
          </span>
        )}
      </div>
    );

    return <Link to={link}>{content}</Link>;
  };

  const renderSection = (
    title: string,
    menuKey: MenuSection,
    items: NavItem[]
  ) => (
    <div>
      {!isCollapsed && (
        <div className="mb-2 flex items-center justify-between px-2">
          <h1 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            {title}
          </h1>
          <button
            type="button"
            onClick={() => toggleMenu(menuKey)}
            className="rounded p-1 hover:bg-gray-50"
          >
            <ChevronToggle isOpen={openMenus[menuKey]} />
          </button>
        </div>
      )}
      {(openMenus[menuKey] || isCollapsed) && (
        <div className="space-y-1">
          {items.map((m) => (
            <NavItem
              key={m.label}
              {...m}
              isCollapsed={isCollapsed}
              active={isNavActive(m.link)}
            />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <aside
      style={{ width: `${width}px` }}
      className={`relative bg-white border-r border-gray-200 h-full min-h-0 flex flex-col shrink-0 ${
        !isDragging && "transition-[width] duration-300 ease-in-out"
      }`}
    >
      <div
        role="presentation"
        onMouseDown={startResizing}
        className="absolute top-0 right-0 w-1.5 h-full cursor-col-resize hover:bg-[#573FD1]/40 active:bg-[#573FD1] transition-colors z-50"
      />

      <div
        className={`px-4 pt-6 pb-4 flex items-center justify-between ${
          isCollapsed && "flex-col gap-4"
        }`}
      >
        <Link
          to="/doctor"
          reloadDocument
          className="flex min-w-0 items-center gap-2 overflow-hidden rounded-md transition hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-[#573FD1]/30"
          aria-label="Open clinician dashboard"
          title="Open clinician dashboard"
        >
          {isCollapsed ? (
            <EasyCareMark className="h-8 w-8 shrink-0" />
          ) : (
            <img
              className="h-8 w-auto max-w-[140px] shrink-0 object-contain object-left"
              src={easyCareLogoFull}
              alt="EasyCare"
            />
          )}
        </Link>

        <button
          type="button"
          onClick={toggleCollapse}
          className="shrink-0 rounded-md p-1.5 text-gray-500 hover:bg-gray-100"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <PanelLeftOpen size={20} />
          ) : (
            <PanelLeftClose size={20} />
          )}
        </button>
      </div>

      <div className="mb-4 px-4">
        <div className="w-full border-b border-gray-200" />
      </div>

      <div className="mb-4 px-4">
        <div
          className={`flex items-center gap-3 rounded-xl border border-gray-200 bg-[#FAFAFA] p-2.5 ${
            isCollapsed && "justify-center"
          }`}
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-100 bg-white p-1 shadow-sm">
            <img
              src={hospitalLogo}
              alt="St James Hospital"
              className="h-full w-full object-contain"
            />
          </div>
          {!isCollapsed && (
            <div className="min-w-0 overflow-hidden">
              <div className="truncate text-sm font-semibold text-gray-900">
                St James Hospital
              </div>
              <div className="truncate text-[11px] font-medium text-gray-500">
                {roleLabel}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mb-4 px-4">
        <div className="w-full border-b border-gray-200" />
      </div>

      <nav className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto hide-scrollbar px-3 pb-6 space-y-6">
        {renderSection("Main Menu", "main", MAIN_MENU)}
        {renderSection(
          "Patient Management",
          "patientManagement",
          PATIENT_MANAGEMENT
        )}
        {renderSection("Perform Action", "action", PERFORM_ACTION)}
        {renderSection("Reports", "reports", REPORTS)}
      </nav>
    </aside>
  );
}
