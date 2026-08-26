import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import easyCareLogoFull from "@pharmacy/assets/icon/Frame 121.svg";
import hospitalLogo from "@pharmacy/assets/icon/Frame 5.svg";
import EasyCareMark from "@pharmacy/vendor/layout/EasyCareMark";
import ChevronToggle from "@pharmacy/vendor/layout/ChevronToggle";
import { useSidebar } from "@pharmacy/vendor/layout/useSidebar";
import {
  MAIN_MENU,
  PERFORM_ACTION,
  REPORTS,
  STORE_MANAGEMENT,
  type NavItem,
} from "../config/pharmacyNavItems";

type SidebarProp = NavItem & {
  active?: boolean;
  isCollapsed: boolean;
};

type MenuSection = "main" | "storeManagement" | "performAction" | "reports";

export default function PharmacySidebar() {
  const location = useLocation();
  const { width, isDragging, isCollapsed, startResizing, toggleCollapse } =
    useSidebar();

  const [openMenus, setOpenMenus] = useState({
    main: true,
    storeManagement: true,
    performAction: true,
    reports: true,
  });

  const hospitalSubtitle = "PHARMACY";

  const toggleMenu = (menuName: MenuSection) => {
    if (isCollapsed) return;
    setOpenMenus((prev) => ({ ...prev, [menuName]: !prev[menuName] }));
  };

  const isNavActive = (path: string) => {
    if (path === "/pharmacy") {
      return (
        location.pathname === "/pharmacy" ||
        location.pathname === "/pharmacy/dashboard"
      );
    }
    return (
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    );
  };

  useEffect(() => {
    if (
      STORE_MANAGEMENT.some((item) =>
        location.pathname.startsWith(item.link)
      )
    ) {
      setOpenMenus((prev) => ({ ...prev, storeManagement: true }));
    }
    if (
      PERFORM_ACTION.some((item) => location.pathname.startsWith(item.link))
    ) {
      setOpenMenus((prev) => ({ ...prev, performAction: true }));
    }
    if (REPORTS.some((item) => location.pathname.startsWith(item.link))) {
      setOpenMenus((prev) => ({ ...prev, reports: true }));
    }
  }, [location.pathname]);

  const NavItemLink = ({
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
          {items.map((item) => (
            <NavItemLink
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
      className={`relative flex min-h-screen shrink-0 flex-col border-r border-gray-200 bg-white ${
        !isDragging && "transition-[width] duration-300 ease-in-out"
      }`}
    >
      <div
        role="presentation"
        onMouseDown={startResizing}
        className="absolute top-0 right-0 z-50 h-full w-1.5 cursor-col-resize transition-colors hover:bg-[#573FD1]/40 active:bg-[#573FD1]"
      />

      <div
        className={`flex items-center justify-between px-4 pb-4 pt-6 ${
          isCollapsed && "flex-col gap-4"
        }`}
      >
        <div className="flex min-w-0 items-center gap-2 overflow-hidden">
          {isCollapsed ? (
            <EasyCareMark className="h-8 w-8 shrink-0" />
          ) : (
            <img
              className="h-8 w-auto max-w-[140px] shrink-0 object-contain object-left"
              src={easyCareLogoFull}
              alt="EasyCare"
            />
          )}
        </div>

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
              <div className="text-[11px] font-medium leading-snug text-gray-500">
                {hospitalSubtitle}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mb-4 px-4">
        <div className="w-full border-b border-gray-200" />
      </div>

      <nav className="hide-scrollbar flex-1 space-y-6 overflow-x-hidden overflow-y-auto px-3 pb-6">
        {renderSection("Main Menu", "main", MAIN_MENU)}
        {renderSection(
          "Store Management",
          "storeManagement",
          STORE_MANAGEMENT
        )}
        {renderSection("Perform Action", "performAction", PERFORM_ACTION)}
        {renderSection("Reports", "reports", REPORTS)}
      </nav>
    </aside>
  );
}
