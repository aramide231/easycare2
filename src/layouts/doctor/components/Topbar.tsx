import { useLocation, Link } from "react-router-dom";
import AppGridMenu from "@/components/header/AppGridMenu";
import ProfileMenu from "@/components/header/ProfileMenu";
import HeaderPatientSearch from "@/components/header/HeaderPatientSearch";
import Clock from "@doctor-shared/components/layout/Clock";

const DOCTOR_REPORT_PATHS = [
  "/doctor/reports/admission",
  "/doctor/reports/discharge",
  "/doctor/doctor-logs",
  "/doctor/immunization",
  "/doctor/ante-natal",
  "/doctor/child-birth",
  "/doctor/post-natal",
  "/doctor/registration-log",
  "/doctor/family-planning",
  "/doctor/dispensed-drugs",
  "/doctor/report-writing",
  "/doctor/requisition",
] as const;

const DOCTOR_REPORT_LABELS: Record<string, string> = {
  "/doctor/reports/admission": "Admission",
  "/doctor/reports/discharge": "Discharge",
  "/doctor/doctor-logs": "Doctor Logs",
  "/doctor/immunization": "Immunization",
  "/doctor/ante-natal": "Ante Natal",
  "/doctor/child-birth": "Child Birth",
  "/doctor/post-natal": "Post Natal",
  "/doctor/registration-log": "Registration",
  "/doctor/family-planning": "Family Planning",
  "/doctor/dispensed-drugs": "Dispensed Drugs",
  "/doctor/report-writing": "Report Writing",
  "/doctor/requisition": "Requisition",
};

const PERFORM_ACTION_LABELS: Record<string, string> = {
  "/doctor/make-request": "Make Request",
  "/doctor/set-reminder": "Set Reminder",
};

const breadcrumbPatterns = [
  /^\/doctor\/notifications-doctor$/,
  /^\/doctor\/admission$/,
  /^\/doctor\/discharge$/,
  /^\/doctor\/available-ward$/,
  /^\/doctor\/make-request$/,
  /^\/doctor\/set-reminder$/,
  /^\/doctor\/patient-profile\/.+/,
  /^\/doctor\/account(\/.*)?$/,
  /^\/doctor\/flag-profile\/.+/,
  /^\/doctor\/previous-patient-records\/.+/,
  ...DOCTOR_REPORT_PATHS.map((path) => new RegExp(`^${path}$`)),
];

const Topbar = () => {
  const location = useLocation();

  const isBreadcrumbPage = breadcrumbPatterns.some((pattern) =>
    pattern.test(location.pathname),
  );

  const isDashboard =
    location.pathname === "/doctor" || location.pathname === "/doctor/dashboard";

  const patientManagementLabels: Record<string, string> = {
    admission: "Admission",
    "available-ward": "Available Ward",
    discharge: "Discharge",
  };

  const renderBreadcrumbs = () => {
    const reportLabel = DOCTOR_REPORT_LABELS[location.pathname];
    if (reportLabel) {
      return (
        <div className="flex h-10 min-w-0 items-center gap-1 text-sm text-gray-500">
          <span>Report</span>
          <span className="mx-1 shrink-0 text-gray-400">&gt;</span>
          <span className="truncate capitalize">{reportLabel}</span>
        </div>
      );
    }

    const isPatientProfile = /^\/doctor\/patient-profile\/.+/.test(
      location.pathname,
    );
    const isAccountPage = /^\/doctor\/account(\/.*)?$/.test(location.pathname);
    const isFlagProfile = /^\/doctor\/flag-profile\/.+/.test(location.pathname);
    const isPreviousPatientRecords =
      /^\/doctor\/previous-patient-records\/.+/.test(location.pathname);
    const performActionLabel = PERFORM_ACTION_LABELS[location.pathname];
    const patientManagementMatch = location.pathname.match(
      /^\/doctor\/(admission|available-ward|discharge)$/,
    );
    const pathParts = location.pathname.split("/").filter(Boolean);
    const trailParts =
      isPatientProfile || isPreviousPatientRecords || isFlagProfile
        ? pathParts.slice(0, -1)
        : pathParts;

    const breadcrumbItems = isPreviousPatientRecords
      ? [
          { name: "Dashboard", path: "/doctor" },
          { name: "Prev Medical History", path: location.pathname },
        ]
      : performActionLabel
        ? [
            { name: "Dashboard", path: "/doctor" },
            { name: performActionLabel, path: location.pathname },
          ]
        : patientManagementMatch
          ? [
              { name: "Dashboard", path: "/doctor" },
              {
                name:
                  patientManagementLabels[patientManagementMatch[1]] ??
                  patientManagementMatch[1],
                path: location.pathname,
              },
            ]
          : isAccountPage
            ? [
                { name: "Dashboard", path: "/doctor" },
                { name: "Account", path: "/doctor/account" },
              ]
            : [
                { name: "Dashboard", path: "/doctor" },
                ...trailParts.slice(1).map((part, index, parts) => {
                  const fullPath = `/doctor/${parts.slice(0, index + 1).join("/")}`;
                  const formatted =
                    part === "notifications-doctor"
                      ? "Notifications"
                      : Number.isNaN(Number(part))
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

        <div className="flex shrink-0 items-center justify-end gap-4 md:gap-6 justify-self-end">
          <AppGridMenu />
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
};

export default Topbar;
