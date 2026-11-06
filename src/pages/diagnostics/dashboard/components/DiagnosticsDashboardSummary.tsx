import { FaBell, FaHospitalUser, FaUserCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import DashboardSummaryCard from "@/pages/doctor/dashboard/components/DashboardSummaryCard";
import {
  NOTIFICATION_ROWS,
  PATIENTS_LOG_ROWS,
  type PatientCategory,
} from "../../data/mockDiagnostics";

type SummaryItem = {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  variant: "dark" | "notification";
  path: string;
  patientCategory?: PatientCategory;
};

export default function DiagnosticsDashboardSummary() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const displayName = user?.fullName ?? "John Doe";

  const outPatientCount = PATIENTS_LOG_ROWS.filter(
    (row) => row.patientCategory === "OUT-PATIENT"
  ).length;
  const inPatientCount = PATIENTS_LOG_ROWS.filter(
    (row) => row.patientCategory === "IN-PATIENT"
  ).length;

  const items: SummaryItem[] = [
    {
      title: "Out Patient",
      subtitle: `${outPatientCount} new patients`,
      icon: <FaUserCheck size={22} className="text-white" />,
      variant: "dark",
      path: "/diagnostics",
      patientCategory: "OUT-PATIENT",
    },
    {
      title: "In Patient",
      subtitle: `${inPatientCount} patients`,
      icon: <FaHospitalUser size={22} className="text-white" />,
      variant: "dark",
      path: "/diagnostics",
      patientCategory: "IN-PATIENT",
    },
    {
      title: "Notifications",
      subtitle: `${NOTIFICATION_ROWS.length} messages`,
      icon: <FaBell size={22} className="text-[#FA7401]" />,
      variant: "notification",
      path: "/diagnostics/notifications",
    },
  ];

  return (
    <div>
      <div className="p-4">
        <h2 className="text-2xl font-semibold text-gray-900">
          Good Afternoon, {displayName}
        </h2>
        <p className="text-gray-600">Have A Wonderful Day At Work.</p>
      </div>

      <div className="flex w-full gap-4 p-4 pt-0">
        {items.map((item) => (
          <DashboardSummaryCard
            key={item.title}
            title={item.title}
            subtitle={item.subtitle}
            icon={item.icon}
            variant={item.variant}
            onClick={() =>
              navigate(item.path, {
                state: item.patientCategory
                  ? { patientCategory: item.patientCategory }
                  : undefined,
              })
            }
          />
        ))}
      </div>
    </div>
  );
}
