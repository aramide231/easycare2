import { useLocation, Link } from "react-router-dom";
import { Search } from "lucide-react";
import AppGridMenu from "@/components/header/AppGridMenu";
import ProfileMenu from "@/components/header/ProfileMenu";
import Clock from "@/layouts/nurse/components/Clock";

const breadcrumbPatterns = [
  /^\/diagnostics\/notifications$/,
  /^\/diagnostics\/visitation-logs$/,
  /^\/diagnostics\/make-request$/,
  /^\/diagnostics\/investigative-list$/,
  /^\/diagnostics\/set-reminder$/,
  /^\/diagnostics\/request-logs$/,
  /^\/diagnostics\/investigation-logs$/,
  /^\/diagnostics\/patient-profile\/.+/,
  /^\/diagnostics\/previous-patient-records\/.+/,
  /^\/diagnostics\/investigation-profile\/.+/,
];

const REPORT_BREADCRUMBS: Record<string, string> = {
  "/diagnostics/visitation-logs": "Visitation Logs",
  "/diagnostics/investigation-logs": "Investigations Logs",
  "/diagnostics/request-logs": "Request Logs",
};

const PERFORM_ACTION_BREADCRUMBS: Record<string, string> = {
  "/diagnostics/investigative-list": "Investigation List",
  "/diagnostics/make-request": "Make Request",
  "/diagnostics/set-reminder": "Set Reminder",
};

export default function DiagnosticsTopbar() {
  const location = useLocation();

  const isBreadcrumbPage = breadcrumbPatterns.some((pattern) =>
    pattern.test(location.pathname)
  );

  const renderBreadcrumbs = () => {
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

    const isProfile = /^\/diagnostics\/investigation-profile\/.+/.test(
      location.pathname
    );
    const pathParts = location.pathname.split("/").filter(Boolean);
    const trailParts = isProfile ? pathParts.slice(0, -1) : pathParts;

    const breadcrumbItems = [
      { name: "Dashboard", path: "/diagnostics" },
      ...trailParts.map((part, index) => {
        const fullPath = `/${trailParts.slice(0, index + 1).join("/")}`;
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
    <header className="w-full shrink-0 border-b border-gray-200 bg-white">
      <div className="flex min-h-[76px] items-center justify-between gap-4 px-4 py-3 md:px-8">
        <div className="min-w-0 w-full max-w-md">
          {isBreadcrumbPage ? (
            <div className="flex h-10 min-w-0 items-center">
              {renderBreadcrumbs()}
            </div>
          ) : (
            <div className="relative h-10 w-full">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center gap-3 pl-4">
                <Search
                  className="h-[18px] w-[18px] text-gray-500"
                  strokeWidth={2.5}
                />
                <span className="text-gray-300 font-light text-lg pb-0.5">|</span>
              </div>
              <input
                type="text"
                placeholder="Search Patients ID"
                className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-14 pr-4 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-2 focus:border-[#573FD1]"
              />
            </div>
          )}
        </div>

        <div className="flex shrink-0 items-center justify-end gap-5">
          <Clock />
          <AppGridMenu />
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
}
