import { useLocation, Link } from "react-router-dom";
import AppGridMenu from "@/components/header/AppGridMenu";
import HeaderPatientSearch from "@/components/header/HeaderPatientSearch";
import ProfileMenu from "@/components/header/ProfileMenu";
import Clock from "./Clock";

const breadcrumbPatterns = [
  /^\/nurse\/notifications$/,
  /^\/nurse\/admission$/,
  /^\/nurse\/discharge$/,
  /^\/nurse\/available-ward$/,
  /^\/nurse\/child-birth$/,
  /^\/nurse\/immunization$/,
  /^\/nurse\/ante-natal$/,
  /^\/nurse\/post-natal$/,
  /^\/nurse\/family-planning$/,
  /^\/nurse\/dispensed-drugs$/,
  /^\/nurse\/report-writing$/,
  /^\/nurse\/make-request$/,
  /^\/nurse\/reminder$/,
  /^\/nurse\/reports\/.+/,
  /^\/nurse\/patient-profile\/.+/,
  /^\/nurse\/previous-patient-records\/.+/,
];

const nurseReportLabels: Record<string, string> = {
  "child-birth": "Child Birth",
  immunization: "Immunization",
  "ante-natal": "Ante Natal",
  "post-natal": "Post Natal",
  "family-planning": "Family Planning",
  "dispensed-drugs": "Dispensed Drugs",
  "report-writing": "Report Writing",
  requisition: "Requisition",
  admission: "Admission",
  discharge: "Discharge",
};

const Topbar = () => {
  const location = useLocation();

  const isBreadcrumbPage = breadcrumbPatterns.some((pattern) =>
    pattern.test(location.pathname),
  );

  const isDashboard =
    location.pathname === "/nurse" || location.pathname === "/nurse/dashboard";

  const renderBreadcrumbs = () => {
    const pathParts = location.pathname.split("/").filter(Boolean);
    const reportSegment =
      pathParts[0] === "nurse" && pathParts[1] === "reports"
        ? pathParts[2]
        : pathParts[1];
    const reportLabel =
      reportSegment && nurseReportLabels[reportSegment]
        ? nurseReportLabels[reportSegment]
        : null;

    if (reportLabel) {
      return (
        <div className="flex h-10 min-w-0 items-center gap-1 text-sm text-gray-500">
          <span>Report</span>
          <span className="mx-1 shrink-0 text-gray-400">&gt;</span>
          <span className="truncate capitalize">{reportLabel}</span>
        </div>
      );
    }

    const isPatientProfile = /^\/nurse\/patient-profile\/.+/.test(
      location.pathname,
    );
    const isPreviousRecords = /^\/nurse\/previous-patient-records\/.+/.test(
      location.pathname,
    );

    const trailParts =
      isPatientProfile || isPreviousRecords ? pathParts.slice(0, -1) : pathParts;

    const breadcrumbItems = [
      { name: "Dashboard", path: "/nurse" },
      ...trailParts.slice(1).map((part, index, parts) => {
        const fullPath = `/nurse/${parts.slice(0, index + 1).join("/")}`;
        const formatted =
          part === "previous-patient-records"
            ? "Prev Medical History"
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
              {!isLast && <span className="mx-1 shrink-0 text-gray-400">&gt;</span>}
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
              isDashboard ? "w-full" : "min-w-[16rem] w-full flex-1 md:min-w-[22rem]"
            }
          >
            <HeaderPatientSearch />
          </div>
        </div>

        <div className={`px-2 ${isDashboard ? "flex justify-center" : "justify-self-center"}`}>
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
