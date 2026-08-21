import { Link, useLocation } from "react-router-dom";
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

export default function Topbar() {
  const location = useLocation();
  const segment = getPageSegment(location.pathname);

  const isDashboard =
    location.pathname === BASE || location.pathname === `${BASE}/dashboard`;

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
      <div
        className={`grid min-h-[84px] w-full items-center gap-4 px-5 py-4 md:gap-6 md:px-8 ${
          isDashboard
            ? "grid-cols-[42%_1fr_auto]"
            : "grid-cols-[minmax(0,60%)_1fr_auto]"
        }`}
      >
        <div
          className={`flex min-w-0 items-center gap-3 md:gap-5 ${
            isDashboard ? "w-full" : "w-full justify-self-start"
          }`}
        >
          {isBreadcrumbPage && (
            <div className="max-w-[10rem] shrink-0 md:max-w-[14rem]">
              {renderBreadcrumbs()}
            </div>
          )}

          <div
            className={
              isDashboard
                ? "w-full"
                : "min-w-[16rem] w-full flex-1 md:min-w-[22rem]"
            }
          >
            <HeaderPatientSearch />
          </div>
        </div>

        <div
          className={`px-2 ${
            isDashboard ? "flex justify-center" : "justify-self-center"
          }`}
        >
          <Clock />
        </div>

        <div className="flex shrink-0 items-center justify-end gap-4 justify-self-end md:gap-6">
          <AppGridMenu />
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
}
