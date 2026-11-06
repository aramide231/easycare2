import { useAuth } from "@doctor-shared/context/useAuth";
import { FaBell, FaHospitalUser, FaUserCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DashboardSummaryCard from "./DashboardSummaryCard";

type SummaryItem = {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  variant: "dark" | "notification";
  path: string;
};

const DOCTOR_NOTIFICATION_COUNT = 5;

const summaryItems: SummaryItem[] = [
  {
    title: "Out Patient",
    subtitle: "50 new patients",
    icon: <FaUserCheck size={24} className="text-white" />,
    variant: "dark",
    path: "/doctor",
  },
  {
    title: "In Patient",
    subtitle: "10 patients",
    icon: <FaHospitalUser size={24} className="text-white" />,
    variant: "dark",
    path: "/doctor/admission",
  },
  {
    title: "Notifications",
    subtitle: `${DOCTOR_NOTIFICATION_COUNT} new notifications`,
    icon: <FaBell size={24} className="text-[#FA7401]" />,
    variant: "notification",
    path: "/doctor/notifications-doctor",
  },
];

function getTimeOfDayGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

const DoctorDashboardSummary = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const greeting = getTimeOfDayGreeting();
  const displayName = user?.fullName?.trim() || "Dr. Chibuzor";

  return (
    <div>
      <div className="p-4">
        <h2 className="text-3xl font-semibold text-gray-900">
          {greeting}, {displayName}
        </h2>
        <p className="mt-1 text-gray-600">Have a wonderful day at work</p>
      </div>
      <div className="flex w-full gap-4 p-4">
        {summaryItems.map((item) => (
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
};

export default DoctorDashboardSummary;
