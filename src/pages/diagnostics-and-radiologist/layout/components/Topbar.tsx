import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import AppGridMenu from "@/components/header/AppGridMenu";
import ProfileMenu from "@/components/header/ProfileMenu";
import Clock from "./Clock";
import HeaderPatientSearch from "./HeaderPatientSearch";

const BASE = "/diagnostics-and-radiologist";

const breadcrumbPatterns = [
  new RegExp(`^${BASE}/notifications$`),
  new RegExp(`^${BASE}/make-request$`),
  new RegExp(`^${BASE}/investigations-list$`),
  new RegExp(`^${BASE}/set-reminder$`),
  new RegExp(`^${BASE}/investigation-logs$`),
  new RegExp(`^${BASE}/request-logs$`),
  new RegExp(`^${BASE}/visitation-logs$`),
  new RegExp(`^${BASE}/patient-profile/.+`),
  new RegExp(`^${BASE}/previous-patient-records/.+`),
  new RegExp(`^${BASE}/investigation-profile/.+`),
];

const pageLabels: Record<string, string> = {
  notifications: "Notification",
  "make-request": "Make Request",
  "investigations-list": "Investigation List",
  "set-reminder": "Set Reminder",
  "investigation-logs": "Investigations Logs",
  "request-logs": "Request Logs",
  "visitation-logs": "Visitation Logs",
  "patient-profile": "Patient Profile",
  "previous-patient-records": "Prev Medical History",
  "investigation-profile": "Investigation Profile",
};

const reportPages = ["visitation-logs", "investigation-logs", "request-logs"];
const performActionPages = [
  "make-request",
  "investigations-list",
  "set-reminder",
];

function getParentLabel(segment: string): string {
  if (reportPages.includes(segment)) return "Reports";
  if (performActionPages.includes(segment)) return "Perform Action";
  return "Dashboard";
}

function getPageSegment(pathname: string): string | null {
  const segments = pathname.split("/").filter(Boolean);
  return segments[1] ?? null;
}

type TopbarProps = {
  onOpenMobileNav?: () => void;
};

export default function Topbar({ onOpenMobileNav }: TopbarProps) {
  const location = useLocation();
  const segment = getPageSegment(location.pathname);

  const isBreadcrumbPage = breadcrumbPatterns.some((pattern) =>
    pattern.test(location.pathname),
  );

  const renderBreadcrumbs = () => {
    if (!segment) return null;
    const label = pageLabels[segment];
    if (!label) return null;

    const parentLabel = getParentLabel(segment);
    const parentIsDashboard = parentLabel === "Dashboard";

    return (
      <div className="flex h-10 min-w-0 items-center gap-1 text-sm text-gray-500">
        {parentIsDashboard ? (
          <Link
            to={BASE}
            className="truncate capitalize text-[#573FD1] hover:underline"
          >
            {parentLabel}
          </Link>
        ) : (
          <span className="truncate capitalize">{parentLabel}</span>
        )}
        <span className="mx-1 shrink-0 text-gray-400">&gt;</span>
        <span className="truncate capitalize text-gray-800">{label}</span>
      </div>
    );
  };

  return (
    <header className="w-full shrink-0 border-b border-gray-200 bg-white">
      <div className="flex min-h-[72px] w-full flex-wrap items-center gap-3 px-3 py-3 sm:gap-4 sm:px-5 sm:py-4 md:min-h-[84px] md:gap-6 md:px-8">
        <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3 md:gap-5">
          <button
            type="button"
            onClick={onOpenMobileNav}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-200 text-gray-700 transition hover:bg-gray-50 md:hidden"
            aria-label="Open navigation"
          >
            <Menu className="h-5 w-5" />
          </button>

          {isBreadcrumbPage && (
            <div className="hidden max-w-[10rem] shrink-0 sm:block md:max-w-[14rem]">
              {renderBreadcrumbs()}
            </div>
          )}

          <div className="min-w-0 flex-1">
            <HeaderPatientSearch />
          </div>
        </div>

        <div className="hidden shrink-0 px-2 lg:block">
          <Clock />
        </div>

        <div className="flex shrink-0 items-center justify-end gap-3 sm:gap-4 md:gap-6">
          <AppGridMenu />
          <ProfileMenu />
        </div>
      </div>

      {isBreadcrumbPage ? (
        <div className="border-t border-gray-100 px-3 py-2 sm:hidden">
          {renderBreadcrumbs()}
        </div>
      ) : null}
    </header>
  );
}
