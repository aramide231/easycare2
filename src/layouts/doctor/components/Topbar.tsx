import { useLocation, Link } from "react-router-dom";
import { Search } from "lucide-react";
import AppGridMenu from "@doctor-shared/components/AppGridMenu";
import ProfileMenu from "@doctor-shared/components/ProfileMenu";
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

const breadcrumbPatterns = [
  /^\/doctor\/?$/,
  /^\/doctor\/dashboard$/,
  /^\/doctor\/notifications-doctor$/,
  /^\/doctor\/admission$/,
  /^\/doctor\/discharge$/,
  /^\/doctor\/available-ward$/,
  /^\/doctor\/patient-profile\/.+/,
  /^\/doctor\/account(\/.*)?$/,
  /^\/doctor\/flag-profile\/.+/,
  /^\/doctor\/previous-patient-records\/.+/,
  ...DOCTOR_REPORT_PATHS.map((path) => new RegExp(`^${path}$`)),
];

const Topbar = () => {
  const location = useLocation();

  const isBreadcrumbPage = breadcrumbPatterns.some((pattern) =>
    pattern.test(location.pathname)
  );

  const patientManagementLabels: Record<string, string> = {
    admission: "Admission",
    "available-ward": "Available Ward",
    discharge: "Discharge",
  };

  const renderBreadcrumbs = () => {
    const isPatientProfile = /^\/doctor\/patient-profile\/.+/.test(
      location.pathname
    );
    const isAccountPage = /^\/doctor\/account(\/.*)?$/.test(location.pathname);
    const isFlagProfile = /^\/doctor\/flag-profile\/.+/.test(location.pathname);
    const isPreviousPatientRecords =
      /^\/doctor\/previous-patient-records\/.+/.test(location.pathname);
    const reportLabel = DOCTOR_REPORT_LABELS[location.pathname];
    const patientManagementMatch = location.pathname.match(
      /^\/doctor\/(admission|available-ward|discharge)$/
    );
    const pathParts = location.pathname.split("/").filter(Boolean);
    const trailParts = isPatientProfile ? pathParts.slice(0, -1) : pathParts;

    const breadcrumbItems = isPreviousPatientRecords
      ? [
          { name: "Dashboard", path: "/doctor" },
          { name: "Prev Medical History", path: location.pathname },
        ]
      : reportLabel
      ? [
          { name: "Report", path: "/doctor/immunization" },
          { name: reportLabel, path: location.pathname },
        ]
      : patientManagementMatch
        ? [
            { name: "Patient Management", path: "/doctor/admission" },
            {
              name:
                patientManagementLabels[patientManagementMatch[1]] ??
                patientManagementMatch[1],
              path: location.pathname,
            },
          ]
        : [
          { name: "Dashboard", path: "/doctor" },
          ...trailParts.map((part, index) => {
            const fullPath = `/${trailParts.slice(0, index + 1).join("/")}`;
            const formatted = Number.isNaN(Number(part))
              ? part.replace(/-/g, " ")
              : `ID: ${part}`;
            return { name: formatted, path: fullPath };
          }),
        ];

    if (isPatientProfile) {
      breadcrumbItems.push({ name: "Patient Profile", path: location.pathname });
    }

    if (isAccountPage) {
      breadcrumbItems.push({ name: "Account", path: "/doctor/account" });
      if (location.pathname.endsWith("/profile")) {
        breadcrumbItems.push({
          name: "Your Profile",
          path: location.pathname,
        });
      }
    }

    if (isFlagProfile) {
      breadcrumbItems.push({
        name: "Flag Patient",
        path: location.pathname,
      });
    }

    if (isPreviousPatientRecords) {
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
    }

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
      <div className="grid min-h-[76px] grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 py-3 md:px-8">
        <div className="min-w-0 w-full max-w-md justify-self-start">
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
                <span className="pb-0.5 text-lg font-light text-gray-300">|</span>
              </div>
              <input
                type="text"
                placeholder="Search Patients ID"
                className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-14 pr-4 text-sm text-gray-900 placeholder:text-gray-500 focus:border-2 focus:border-[#573FD1] focus:outline-none"
              />
            </div>
          )}
        </div>

        <div className="shrink-0 justify-self-center px-2">
          <Clock />
        </div>

        <div className="flex shrink-0 items-center justify-end gap-5 justify-self-end">
          <AppGridMenu />
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
};

export default Topbar;
