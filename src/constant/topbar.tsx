import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { formatTopBarDateTime } from "@/lib/dateTime";
import HeaderPatientSearch from "@/components/header/HeaderPatientSearch";
import AppGridMenu from "@/components/header/AppGridMenu";
import ProfileMenu from "@/components/header/ProfileMenu";

const Topbar = () => {
  const location = useLocation();

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = formatTopBarDateTime(currentTime);

  const breadcrumbPages = [
    { pattern: /^\/frontdesk\/edit\/\d+$/ },
    { pattern: /^\/frontdesk\/visitation-log$/ },
    { pattern: /^\/frontdesk\/registration$/ },
    { pattern: /^\/frontdesk\/notifications$/ },
    { pattern: /^\/frontdesk\/manage-access$/ },
    { pattern: /^\/frontdesk\/manage-card$/ },
    { pattern: /^\/frontdesk\/reminder$/ },
    { pattern: /^\/frontdesk\/doctor-assignment$/ },
    { pattern: /^\/frontdesk\/immunization$/ },
    { pattern: /^\/frontdesk\/ante-natal$/ },
    { pattern: /^\/frontdesk\/child-birth$/ },
    { pattern: /^\/frontdesk\/post-natal$/ },
    { pattern: /^\/frontdesk\/family-planning$/ },
    { pattern: /^\/doctor/ },
    { pattern: /^\/nurse\/?$/ },
    { pattern: /^\/nurse\/dashboard$/ },
    { pattern: /^\/nurse\/notifications$/ },
    { pattern: /^\/nurse\/admission$/ },
    { pattern: /^\/nurse\/discharge$/ },
    { pattern: /^\/nurse\/available-ward$/ },
    { pattern: /^\/nurse\/patient-profile\/\d+$/ },
    { pattern: /^\/nurse\/child-birth$/ },
    { pattern: /^\/nurse\/previous-patient-records\/.+$/ },
    { pattern: /^\/doctor\/previous-patient-records\/.+$/ },
  ];

  const isBreadcrumbPage = breadcrumbPages.some((route) =>
    route.pattern.test(location.pathname),
  );

  const isDashboard =
    location.pathname === "/frontdesk" ||
    location.pathname === "/doctor" ||
    location.pathname === "/nurse" ||
    location.pathname === "/nurse/dashboard";

  const renderBreadcrumbs = () => {
    const pathParts = location.pathname.split("/").filter(Boolean);

    const frontdeskReportLabels: Record<string, string> = {
      "child-birth": "Child Birth",
      "ante-natal": "Ante Natal",
      "post-natal": "Post Natal",
      immunization: "Immunization",
      "family-planning": "Family Planning",
      "doctor-assignments": "Doctor Logs",
      "registration-log": "Registration",
    };

    if (
      pathParts[0] === "frontdesk" &&
      pathParts[1] &&
      frontdeskReportLabels[pathParts[1]]
    ) {
      const breadcrumbItems = [
        { name: "Report", path: "" },
        {
          name: frontdeskReportLabels[pathParts[1]],
          path: location.pathname,
        },
      ];

      return (
        <div className="flex h-10 min-w-0 items-center gap-1 text-sm text-gray-500">
          {breadcrumbItems.map((crumb, index) => {
            const isLast = index === breadcrumbItems.length - 1;
            return (
              <span key={index} className="flex min-w-0 items-center gap-1">
                {!isLast && crumb.path ? (
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

    const isPreviousRecords =
      /^\/(doctor|nurse)\/previous-patient-records\/.+/.test(location.pathname);
    const trailParts = isPreviousRecords
      ? pathParts.slice(0, -1)
      : pathParts;
    const dashboardPath =
      pathParts[0] === "doctor"
        ? "/doctor"
        : pathParts[0] === "nurse"
          ? "/nurse"
          : "/";

    const breadcrumbItems = [
      { name: "Dashboard", path: dashboardPath },
      ...trailParts.slice(pathParts[0] === "doctor" || pathParts[0] === "nurse" ? 1 : 0).map((part, index, parts) => {
        const rolePrefix =
          pathParts[0] === "doctor" || pathParts[0] === "nurse"
            ? `/${pathParts[0]}`
            : "";
        const fullPath = `${rolePrefix}/${parts.slice(0, index + 1).join("/")}`;
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
            <span key={index} className="flex min-w-0 items-center gap-1">
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

        <div
          className={`px-2 text-sm text-gray-600 ${
            isDashboard ? "flex justify-center" : "justify-self-center"
          }`}
        >
          <span className="hidden sm:inline">{formattedTime}</span>
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
