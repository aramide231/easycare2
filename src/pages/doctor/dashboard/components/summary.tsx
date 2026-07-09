import { useAuth } from "@/context/AuthContext";
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
    icon: <FaUserCheck size={22} className="text-white" />,
    variant: "dark",
    path: "/doctor",
  },
  {
    title: "In Patient",
    subtitle: "10 patients",
    icon: <FaHospitalUser size={22} className="text-white" />,
    variant: "dark",
    path: "/doctor/admission",
  },
  {
    title: "Notifications",
    subtitle: `${DOCTOR_NOTIFICATION_COUNT} new notifications`,
    icon: <FaBell size={22} className="text-[#FA7401]" />,
    variant: "notification",
    path: "/doctor/notifications-doctor",
  },
];

const DoctorDashboardSummary = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      <div className="p-4">
        <h2 className="text-2xl font-semibold">
          Good Afternoon, {user?.fullName}
        </h2>
        <p>Have a wonderful day at work</p>
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
