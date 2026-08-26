import { useLocation, Link } from "react-router-dom";
import { Search } from "lucide-react";
import AppGridMenu from "@/components/header/AppGridMenu";
import ProfileMenu from "@/components/header/ProfileMenu";
import Clock from "@pharmacy/vendor/layout/Clock";
import { runMainStoreAdd } from "@pharmacy/pages/main-store/lib/mainStoreActions";

const breadcrumbPatterns = [
  /^\/pharmacy\/main-store$/,
  /^\/pharmacy\/purchases$/,
  /^\/pharmacy\/dispense-store$/,
  /^\/pharmacy\/med-tracking$/,
  /^\/pharmacy\/store-request$/,
  /^\/pharmacy\/return-med$/,
  /^\/pharmacy\/set-reminder$/,
  /^\/pharmacy\/admission-logs$/,
  /^\/pharmacy\/discharge-logs$/,
  /^\/pharmacy\/purchase-logs$/,
  /^\/pharmacy\/dispensed-med-logs$/,
  /^\/pharmacy\/inventory$/,
  /^\/pharmacy\/main-store-logs$/,
  /^\/pharmacy\/request-logs$/,
  /^\/pharmacy\/return-logs$/,
  /^\/pharmacy\/notifications$/,
  /^\/pharmacy\/patient-profile\/.+/,
  /^\/pharmacy\/previous-patient-records\/.+/,
];

const STORE_BREADCRUMBS: Record<string, string> = {
  "/pharmacy/main-store": "Main Store",
  "/pharmacy/purchases": "Purchases",
  "/pharmacy/dispense-store": "Dispense Store",
  "/pharmacy/med-tracking": "Med. Tracking/Expiry",
};

const DASHBOARD_CHILD_BREADCRUMBS: Record<string, string> = {
  "/pharmacy/notifications": "Notification",
};

const PERFORM_ACTION_BREADCRUMBS: Record<string, string> = {
  "/pharmacy/store-request": "Store Request",
  "/pharmacy/return-med": "Return Med.",
  "/pharmacy/set-reminder": "Set Reminder",
};

const REPORT_BREADCRUMBS: Record<string, string> = {
  "/pharmacy/admission-logs": "Admission Logs",
  "/pharmacy/discharge-logs": "Discharge Logs",
  "/pharmacy/purchase-logs": "Purchase Logs",
  "/pharmacy/dispensed-med-logs": "Dispensed Med. Logs",
  "/pharmacy/inventory": "Inventory",
  "/pharmacy/main-store-logs": "Main Store Logs",
  "/pharmacy/request-logs": "Request Logs",
  "/pharmacy/return-logs": "Return Logs",
};

export default function PharmacyTopbar() {
  const location = useLocation();

  const isBreadcrumbPage = breadcrumbPatterns.some((pattern) =>
    pattern.test(location.pathname)
  );

  const renderBreadcrumbs = () => {
    const dashboardChild = DASHBOARD_CHILD_BREADCRUMBS[location.pathname];
    if (dashboardChild) {
      return (
        <div className="flex h-10 min-w-0 items-center gap-1 text-sm text-gray-500">
          <Link to="/pharmacy" className="text-[#573FD1] hover:underline">
            Dashboard
          </Link>
          <span className="mx-1 shrink-0 text-gray-400">&gt;</span>
          <span>{dashboardChild}</span>
        </div>
      );
    }

    const storeLabel = STORE_BREADCRUMBS[location.pathname];
    if (storeLabel) {
      return (
        <div className="flex h-10 min-w-0 items-center gap-1 text-sm text-gray-500">
          <span className="text-[#573FD1]">Store Management</span>
          <span className="mx-1 shrink-0 text-gray-400">&gt;</span>
          <span>{storeLabel}</span>
        </div>
      );
    }

    const performActionLabel = PERFORM_ACTION_BREADCRUMBS[location.pathname];
    if (performActionLabel) {
      return (
        <div className="flex h-10 min-w-0 items-center gap-1 text-sm text-gray-500">
          <span className="text-[#573FD1]">Perform Action</span>
          <span className="mx-1 shrink-0 text-gray-400">&gt;</span>
          <span>{performActionLabel}</span>
        </div>
      );
    }

    const reportLabel = REPORT_BREADCRUMBS[location.pathname];
    if (reportLabel) {
      return (
        <div className="flex h-10 min-w-0 items-center gap-1 text-sm text-gray-500">
          <span className="text-[#573FD1]">Reports</span>
          <span className="mx-1 shrink-0 text-gray-400">&gt;</span>
          <span>{reportLabel}</span>
        </div>
      );
    }

    const pathParts = location.pathname.split("/").filter(Boolean);
    const breadcrumbItems = [
      { name: "Dashboard", path: "/pharmacy" },
      ...pathParts.slice(1).map((part, index) => {
        const fullPath = `/pharmacy/${pathParts.slice(1, index + 2).join("/")}`;
        const formatted = Number.isNaN(Number(part))
          ? part.replace(/-/g, " ")
          : `ID: ${part}`;
        return { name: formatted, path: fullPath };
      }),
    ];

    return (
      <div className="flex h-10 min-w-0 items-center gap-1 text-sm text-gray-500">
        {breadcrumbItems.map((crumb, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          return (
            <span
              key={`${crumb.path}-${index}`}
              className="flex min-w-0 items-center gap-1"
            >
              {!isLast ? (
                <Link
                  to={crumb.path}
                  className="truncate capitalize text-[#573FD1] hover:underline"
                >
                  {crumb.name}
                </Link>
              ) : (
                <span className="truncate capitalize">{crumb.name}</span>
              )}
              {!isLast && (
                <span className="mx-1 shrink-0 text-gray-400">&gt;</span>
              )}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-40 flex shrink-0 items-center justify-between gap-4 border-b border-gray-200 bg-white/95 px-4 py-3 backdrop-blur md:px-6">
      <div className="min-w-0 flex-1">
        {isBreadcrumbPage ? (
          renderBreadcrumbs()
        ) : (
          <div className="relative max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder="Search Patients ID"
              className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-[#573FD1] focus:outline-none focus:ring-1 focus:ring-[#573FD1]"
            />
          </div>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <Clock />
        <AppGridMenu />
        <ProfileMenu />
        {location.pathname === "/pharmacy/main-store" ? (
          <button
            type="button"
            onClick={runMainStoreAdd}
            className="rounded-md bg-[#573FD1] px-4 py-2 text-sm font-semibold text-white hover:bg-[#4a35b8]"
          >
            + Add
          </button>
        ) : null}
      </div>
    </header>
  );
}
