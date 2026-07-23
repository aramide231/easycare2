import { useLocation, Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import AppGridMenu from "@/components/header/AppGridMenu";
import HeaderPatientSearch from "@/components/header/HeaderPatientSearch";
import ProfileMenu from "@/components/header/ProfileMenu";
import Clock from "@hmo/vendor/layout/Clock";

const breadcrumbPatterns = [
  /^\/hmo\/notifications$/,
  /^\/hmo\/registration$/,
  /^\/hmo\/account-review$/,
  /^\/hmo\/bill-summary$/,
  /^\/hmo\/admission$/,
  /^\/hmo\/discharge$/,
  /^\/hmo\/available-ward$/,
  /^\/hmo\/service-list$/,
  /^\/hmo\/reminder$/,
  /^\/hmo\/ante-natal-logs$/,
  /^\/hmo\/child-birth-logs$/,
  /^\/hmo\/discharged-logs$/,
  /^\/hmo\/ins-registration-logs$/,
  /^\/hmo\/pre-authorisation-logs$/,
  /^\/hmo\/patient-profile\/.+/,
];

const pageLabels: Record<string, string> = {
  notifications: "Notification",
  registration: "HMO Registration",
  "account-review": "Account Review",
  "bill-summary": "Bill Summary",
  admission: "Admission",
  discharge: "Discharge",
  "available-ward": "Available Ward",
  "service-list": "Service List",
  reminder: "Set Reminder",
  "ante-natal-logs": "Ante Natal Logs",
  "child-birth-logs": "Child Birth Logs",
  "discharged-logs": "Discharged Logs",
  "ins-registration-logs": "Ins. Registration Logs",
  "pre-authorisation-logs": "Pre. Authorisation Logs",
  "patient-profile": "Patient Profile",
};

const Topbar = () => {
  const location = useLocation();

  const isBreadcrumbPage = breadcrumbPatterns.some((pattern) =>
    pattern.test(location.pathname),
  );

  const isDashboard =
    location.pathname === "/hmo" || location.pathname === "/hmo/dashboard";

  const isNotificationPage = location.pathname === "/hmo/notifications";
  const isAdmissionPage = location.pathname === "/hmo/admission";
  const isPatientProfilePage = /^\/hmo\/patient-profile\/.+/.test(
    location.pathname,
  );
  const isRegistrationPage = location.pathname === "/hmo/registration";
  const isAccountReviewPage = location.pathname === "/hmo/account-review";
  const isBillSummaryPage = location.pathname === "/hmo/bill-summary";
  const hideHeaderSearch =
    isNotificationPage ||
    isAdmissionPage ||
    location.pathname === "/hmo/discharge" ||
    isPatientProfilePage ||
    isRegistrationPage;

  const renderBreadcrumbs = () => {
    const segments = location.pathname.split("/").filter(Boolean);
    const segment = segments[1];

    if (isRegistrationPage || isAccountReviewPage || isBillSummaryPage) {
      const pageLabel = isRegistrationPage
        ? "HMO Registration"
        : isAccountReviewPage
          ? "Account Review"
          : "Bill Summary";

      return (
        <div className="flex h-10 min-w-0 items-center gap-2 text-base tracking-[-0.32px]">
          <span className="text-[#A5A5A5]">HMO Management</span>
          <span className="text-[#A5A5A5]">&gt;</span>
          <span className="font-normal text-black">{pageLabel}</span>
        </div>
      );
    }

    const label =
      segment === "patient-profile"
        ? pageLabels["patient-profile"]
        : segment
          ? pageLabels[segment]
          : null;
    if (!label) return null;

    return (
      <div className="flex h-10 min-w-0 items-center gap-1 text-sm text-gray-500">
        <Link
          to="/hmo"
          className="flex items-center gap-1 text-gray-500 hover:text-[#573FD1]"
        >
          <ChevronLeft size={16} />
          <span>Dashboard</span>
        </Link>
        <span className="mx-1 shrink-0 text-gray-400">&gt;</span>
        <span className="truncate font-medium text-gray-800">{label}</span>
      </div>
    );
  };

  return (
    <header className="w-full shrink-0 border-b border-gray-200 bg-white">
      <div
        className={`grid min-h-[80px] w-full items-center gap-4 px-5 py-4 md:gap-6 md:px-8 ${
          isDashboard
            ? "grid-cols-[1fr_auto_auto]"
            : "grid-cols-[minmax(0,60%)_1fr_auto]"
        }`}
      >
        <div className="flex min-w-0 items-center gap-3 md:gap-5">
          {isBreadcrumbPage && (
            <div className="max-w-[14rem] shrink-0">{renderBreadcrumbs()}</div>
          )}
          {!hideHeaderSearch && (
            <div
              className={
                isDashboard ? "w-full max-w-md" : "min-w-[16rem] flex-1"
              }
            >
              <HeaderPatientSearch />
            </div>
          )}
        </div>

        <div className={`px-2 ${isDashboard ? "flex justify-center" : "justify-self-center"}`}>
          <Clock />
        </div>

        <div className="flex shrink-0 items-center justify-end gap-4 md:gap-6">
          <AppGridMenu />
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
};

export default Topbar;
