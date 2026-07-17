import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import easyCareLogoFull from "@doctor-shared/assets/icon/Frame 121.svg";
import hospitalLogo from "@doctor-shared/assets/icon/Frame 5.svg";
import EasyCareMark from "@doctor-shared/components/layout/EasyCareMark";
import ChevronToggle from "@doctor-shared/components/layout/ChevronToggle";
import { useSidebar } from "@/layouts/nurse/hooks/useSidebar";
import {
  ACCOUNT,
  MAIN_MENU,
  PATIENT_MANAGEMENT,
  REPORTS,
  type NavItem,
} from "../config/doctorNavItems";

type SidebarProp = NavItem & {
  active?: boolean;
  isCollapsed: boolean;
};

type MenuSection = "main" | "patientManagement" | "account" | "reports";

export default function DoctorSidebar() {
  const location = useLocation();
  const { width, isDragging, isCollapsed, startResizing, toggleCollapse } =
    useSidebar();

  const [openMenus, setOpenMenus] = useState({
    main: true,
    patientManagement: true,
    account: true,
    reports: false,
  });

  const toggleMenu = (menuName: MenuSection) => {
    if (isCollapsed) return;
    setOpenMenus((prev) => ({ ...prev, [menuName]: !prev[menuName] }));
  };

  const isNavActive = (path: string) => {
    if (path === "/doctor") {
      return location.pathname === "/doctor";
    }

    return (
      location.pathname === path ||
      location.pathname.startsWith(`${path}/`)
    );
  };

  useEffect(() => {
    const patientMgmtPaths = ["/doctor/admission", "/doctor/discharge"];
    if (patientMgmtPaths.some((path) => location.pathname.startsWith(path))) {
      setOpenMenus((prev) => ({ ...prev, patientManagement: true }));
    }

    if (location.pathname.startsWith("/doctor/account")) {
      setOpenMenus((prev) => ({ ...prev, account: true }));
    }

    const reportPaths = [
      "/doctor/reports/",
      "/doctor/child-birth",
      "/doctor/immunization",
      "/doctor/ante-natal",
      "/doctor/post-natal",
      "/doctor/family-planning",
      "/doctor/doctor-assignments",
      "/doctor/registration-log",
    ];
    if (reportPaths.some((path) => location.pathname.startsWith(path))) {
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
        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 group ${
          active
            ? "bg-indigo-50 text-[#573FD1] border border-[#573FD1]/20"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        } ${collapsed ? "justify-center" : "justify-start"}`}
        title={collapsed ? label : undefined}
      >
        <Icon
          className={`w-5 h-5 shrink-0 transition-colors ${
            active
              ? "text-[#573FD1]"
              : "text-gray-500 group-hover:text-gray-700"
          }`}
          strokeWidth={active ? 2.5 : 2}
        />
        {!collapsed && (
          <span
            className={`text-sm font-medium truncate ${
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
    items: NavItem[],
  ) => (
    <div>
      {!isCollapsed && (
        <div className="flex justify-between items-center px-2 mb-2">
          <h1 className="font-semibold text-gray-400 text-xs tracking-wider uppercase">
            {title}
          </h1>
          <button
            type="button"
            onClick={() => toggleMenu(menuKey)}
            className="p-1 hover:bg-gray-50 rounded"
          >
            <ChevronToggle isOpen={openMenus[menuKey]} />
          </button>
        </div>
      )}
      {(openMenus[menuKey] || isCollapsed) && (
        <div className="space-y-1">
          {items.map((item) => (
            <NavItem
              key={item.label}
              {...item}
              isCollapsed={isCollapsed}
              active={isNavActive(item.link)}
            />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <aside
      style={{ width: `${width}px` }}
      className={`relative flex h-full min-h-0 flex-col shrink-0 border-r border-gray-200 bg-white ${
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
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="flex min-w-0 items-center gap-2 overflow-hidden rounded-md transition hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-[#573FD1]/30"
          aria-label="Reload page"
          title="Reload page"
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
        </button>

        <button
          type="button"
          onClick={toggleCollapse}
          className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 shrink-0"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <PanelLeftOpen size={20} />
          ) : (
            <PanelLeftClose size={20} />
          )}
        </button>
      </div>

      <div className="px-4 mb-4">
        <div className="w-full border-b border-gray-200" />
      </div>

      <div className="px-4 mb-4">
        <div
          className={`bg-[#FAFAFA] border border-gray-200 rounded-xl p-2.5 flex items-center gap-3 ${
            isCollapsed && "justify-center"
          }`}
        >
          <div className="w-10 h-10 shrink-0 rounded-lg bg-white border border-gray-100 flex items-center justify-center shadow-sm p-1">
            <img
              src={hospitalLogo}
              alt="St James Hospital"
              className="w-full h-full object-contain"
            />
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden min-w-0">
              <div className="text-sm font-semibold text-gray-900 truncate">
                St James Hospital
              </div>
              <div className="text-[11px] text-gray-500 font-medium truncate">
                Doctor
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="px-4 mb-4">
        <div className="w-full border-b border-gray-200" />
      </div>

      <nav className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto hide-scrollbar px-3 pb-6 space-y-6">
        {renderSection("Main Menu", "main", MAIN_MENU)}
        {renderSection(
          "Patient Management",
          "patientManagement",
          PATIENT_MANAGEMENT,
        )}
        {renderSection("Account", "account", ACCOUNT)}
        {renderSection("Reports", "reports", REPORTS)}
      </nav>
    </aside>
  );
}
