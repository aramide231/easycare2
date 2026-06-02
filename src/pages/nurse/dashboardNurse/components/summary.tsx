import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { FaBell, FaUserCheck, FaSyncAlt } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { buildMockNotifications } from "@/data/mockNotifications";
import { MOCK_PATIENTS_TOTAL } from "@/pages/nurse/dashboardNurse/data/mockPatients";
import { usePatientManagement } from "@/pages/nurse/context/PatientManagementContext";
import DashboardSummaryCard from "./DashboardSummaryCard";

type SummaryItem = {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  variant: "dark" | "notification";
  action: "navigate" | "refresh";
  path?: string;
};

type Props = {
  onRefreshPatients?: () => void;
};

const DashboardSummaryForAll = ({ onRefreshPatients }: Props) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { admissions } = usePatientManagement();

  const notificationCount = buildMockNotifications().length;

  const summaryItems: SummaryItem[] = [
    {
      title: "New Registration",
      subtitle: "50 new patients",
      icon: <FaUserCheck size={22} className="text-white" />,
      variant: "dark",
      action: "navigate",
      path: "/frontdesk/registration",
    },
    {
      title: "Patients for visitation",
      subtitle: "1,119 patients",
      icon: <FaUserCheck size={22} className="text-white" />,
      variant: "dark",
      action: "navigate",
      path: "/frontdesk/visitation-log",
    },
    {
      title: "Notifications",
      subtitle: `${notificationCount} messages`,
      icon: <FaBell size={22} className="text-[#FA7401]" />,
      variant: "notification",
      action: "navigate",
      path: "/frontdesk/notifications",
    },
  ];

  const summaryItemsNurse: SummaryItem[] = [
    {
      title: "Out Patient",
      subtitle: `${MOCK_PATIENTS_TOTAL} patients`,
      icon: <FaSyncAlt size={22} className="text-white" />,
      variant: "dark",
      action: "refresh",
    },
    {
      title: "In Patient",
      subtitle: `${admissions.length} patients`,
      icon: <FaUserCheck size={22} className="text-white" />,
      variant: "dark",
      action: "navigate",
      path: "/nurse/admission",
    },
    {
      title: "Notifications",
      subtitle: `${notificationCount} messages`,
      icon: <FaBell size={22} className="text-[#FA7401]" />,
      variant: "notification",
      action: "navigate",
      path: "/nurse/notifications",
    },
  ];

  const summaryItemsDoctor: SummaryItem[] = [
    {
      title: "Out Patient",
      subtitle: `${MOCK_PATIENTS_TOTAL} patients`,
      icon: <FaUserCheck size={22} className="text-white" />,
      variant: "dark",
      action: "navigate",
      path: "/doctor",
    },
    {
      title: "In Patient",
      subtitle: `${admissions.length} patients`,
      icon: <FaUserCheck size={22} className="text-white" />,
      variant: "dark",
      action: "navigate",
      path: "/doctor",
    },
    {
      title: "Notifications",
      subtitle: `${notificationCount} messages`,
      icon: <FaBell size={22} className="text-[#FA7401]" />,
      variant: "notification",
      action: "navigate",
      path: "/doctor/notifications-doctor",
    },
  ];

  const isNurseRoute = location.pathname.startsWith("/nurse");
  const isDoctorRoute = location.pathname.startsWith("/doctor");

  const activeSummaryItems = isNurseRoute
    ? summaryItemsNurse
    : isDoctorRoute
      ? summaryItemsDoctor
      : summaryItems;

  const handleCardClick = (item: SummaryItem) => {
    if (item.action === "refresh") {
      onRefreshPatients?.();
      toast.success("Patient log refreshed");
      return;
    }
    if (item.path) navigate(item.path);
  };

  return (
    <div>
      <div className="p-4">
        <h2 className="text-2xl font-semibold">
          Good Afternoon, {user?.fullName}
        </h2>
        <p>Have a wonderful day at work</p>
      </div>
      <div className="flex w-full gap-4 p-4">
        {activeSummaryItems.map((item) => (
          <DashboardSummaryCard
            key={item.title}
            title={item.title}
            subtitle={item.subtitle}
            icon={item.icon}
            variant={item.variant}
            onClick={() => handleCardClick(item)}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardSummaryForAll;
