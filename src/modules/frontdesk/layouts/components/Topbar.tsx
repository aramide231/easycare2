import { useLocation, Link } from "react-router-dom";
import HeaderPatientSearch from "@/components/header/HeaderPatientSearch";
import AppGridMenu from "@/components/header/AppGridMenu";
import ProfileMenu from "@/components/header/ProfileMenu";
import Clock from "./Clock";

// ---------------------------------------------------------------------------
// Breadcrumb config — frontdesk pages that show breadcrumbs instead of
// just the search bar on the left.
// ---------------------------------------------------------------------------

const breadcrumbPatterns = [
  /^\/frontdesk\/notifications$/,
  /^\/frontdesk\/visitation-log$/,
  /^\/frontdesk\/registration.*$/,
  /^\/frontdesk\/manage-access$/,
  /^\/frontdesk\/manage-card$/,
  /^\/frontdesk\/reminder.*/,
  /^\/frontdesk\/doctor-assignments$/,
  /^\/frontdesk\/ante-natal$/,
  /^\/frontdesk\/child-birth$/,
  /^\/frontdesk\/post-natal$/,
  /^\/frontdesk\/immunization$/,
  /^\/frontdesk\/family-planning$/,
  /^\/frontdesk\/registration-log$/,
  /^\/frontdesk\/flag-profile\/.+/,
  /^\/frontdesk\/patient-profile\/.+/,
  /^\/frontdesk\/edit\/.+/,
  /^\/frontdesk\/book-appointment$/,
];

const frontdeskPageLabels: Record<string, string> = {
  "visitation-log": "Visitation Log",
  notifications: "Notifications",
  registration: "Registration",
  "patient-info-reg": "Patient Info",
  "patient-Insurance-reg": "Insurance",
  "patient-emergency-reg": "Emergency Contact",
  "patient-reg-success": "Success",
  "manage-access": "Manage Access",
  "manage-card": "Manage Card",
  reminder: "Reminder",
  "set-reminder": "Set Reminder",
  "view-schedule": "View Schedule",
  "doctor-assignments": "Doctor Assignments",
  "ante-natal": "Ante Natal",
  "child-birth": "Child Birth",
  "post-natal": "Post Natal",
  immunization: "Immunization",
  "family-planning": "Family Planning",
  "registration-log": "Registration Log",
  "flag-profile": "Flag Profile",
  "patient-profile": "Patient Profile",
  edit: "Edit Patient",
  "book-appointment": "Book Appointment",
};

// ---------------------------------------------------------------------------
// Topbar
// ---------------------------------------------------------------------------

const Topbar: React.FC = () => {
  const location = useLocation();

  const isDashboard = location.pathname === "/frontdesk";

  const isBreadcrumbPage = breadcrumbPatterns.some((pattern) =>
    pattern.test(location.pathname),
  );

  const renderBreadcrumbs = () => {
    const pathParts = location.pathname.split("/").filter(Boolean);

    const breadcrumbItems = [
      { name: "Dashboard", path: "/frontdesk" },
      ...pathParts.slice(1).map((part, index, parts) => {
        const fullPath = `/frontdesk/${parts.slice(0, index + 1).join("/")}`;
        const label =
          frontdeskPageLabels[part] ??
          (Number.isNaN(Number(part))
            ? part.replace(/-/g, " ")
            : `ID: ${part}`);
        return { name: label, path: fullPath };
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
      <div
        className={`grid min-h-[84px] w-full items-center gap-4 px-5 py-4 md:gap-6 md:px-8 ${
          isDashboard
            ? "grid-cols-[42%_1fr_auto]"
            : "grid-cols-[minmax(0,60%)_1fr_auto]"
        }`}
      >
        {/* Left — breadcrumb + search */}
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

        {/* Center — clock */}
        <div
          className={`px-2 ${isDashboard ? "flex justify-center" : "justify-self-center"}`}
        >
          <Clock />
        </div>

        {/* Right — app grid + profile */}
        <div className="flex shrink-0 items-center justify-end gap-4 md:gap-6 justify-self-end">
          <AppGridMenu />
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
};

export default Topbar;
