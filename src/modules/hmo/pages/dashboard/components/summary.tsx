import { useMemo } from "react";
import { getTimeGreeting } from "@/lib/dateTime";
import { useAuth } from "@/context/AuthContext";
import { FaBell, FaUserCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { buildMockHmoNotificationRecords } from "@hmo/pages/notifications/data/mockNotificationRecords";
import HmoSummaryCard from "./HmoSummaryCard";

const HmoDashboardSummary = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const notificationCount = useMemo(
    () => buildMockHmoNotificationRecords().length,
    [],
  );

  return (
    <div className="mb-6">
      <div className="mb-4">
        <h2 className="text-[22px] font-semibold text-gray-900">
          {getTimeGreeting()}, {user?.fullName ?? "John Doe"}
        </h2>
        <p className="text-sm text-gray-500">Have a wonderful day at work.</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <HmoSummaryCard
          title="Out Patient"
          subtitle="50 new patients"
          icon={<FaUserCheck size={22} className="text-white" />}
          variant="dark"
        />
        <HmoSummaryCard
          title="In Patient"
          subtitle="15 patients"
          icon={<FaUserCheck size={22} className="text-white" />}
          variant="dark"
        />
        <HmoSummaryCard
          title="Notifications"
          subtitle={`${notificationCount} messages`}
          icon={<FaBell size={22} className="text-[#FA7401]" />}
          variant="notification"
          onNavigate={() => navigate("/hmo/notifications")}
        />
      </div>
    </div>
  );
};

export default HmoDashboardSummary;
