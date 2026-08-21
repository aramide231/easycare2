import { FaBell, FaHospitalUser, FaUserCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { getTimeGreeting } from "@/lib/dateTime";
import { DASHBOARD_SUMMARY } from "../data/dashboardFigma";
import DashboardSummaryCard from "./DashboardSummaryCard";

export default function DashboardSummary() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const displayName = user?.fullName ?? "John Doe";

  const items = [
    {
      title: "Out Patient",
      subtitle: DASHBOARD_SUMMARY.outPatient,
      icon: <FaUserCheck size={22} className="text-white" />,
      variant: "dark" as const,
      path: "/diagnostics-and-radiologist",
    },
    {
      title: "In Patient",
      subtitle: DASHBOARD_SUMMARY.inPatient,
      icon: <FaHospitalUser size={22} className="text-white" />,
      variant: "dark" as const,
      path: "/diagnostics-and-radiologist",
    },
    {
      title: "Notifications",
      subtitle: DASHBOARD_SUMMARY.notifications,
      icon: <FaBell size={22} className="text-[#FA7401]" />,
      variant: "notification" as const,
      path: "/diagnostics-and-radiologist/notifications",
    },
  ];

  return (
    <div>
      <div className="px-1 py-3 sm:p-4">
        <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
          {getTimeGreeting()}, {displayName}
        </h2>
        <p className="text-sm text-gray-600 sm:text-base">
          Have a wonderful day at work
        </p>
      </div>

      <div className="mb-4 flex w-full flex-col gap-3 p-1 sm:flex-row sm:gap-4 sm:p-4">
        {items.map((item) => (
          <DashboardSummaryCard
            key={item.title}
            title={item.title}
            subtitle={item.subtitle}
            icon={item.icon}
            variant={item.variant}
            onClick={() => navigate(item.path)}
          />
        ))}
      </div>
    </div>
  );
}
