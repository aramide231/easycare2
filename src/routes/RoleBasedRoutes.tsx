// routes/RoleBasedRoutes.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import { FrontdeskRoutes } from "@/modules/frontdesk";
import NurseLayout from "../layouts/NurseLayout";
import DoctorLayout from "../layouts/DoctorLayout";
import AdminLayout from "../layouts/AdminLayout";

import Notifications from "@frontdesk/pages/notifications/Notifications";

// import Nurse component
import NurseDashboard from "@/pages/nurse/dashboard/Dashboard";
import NursePatientProfile from "@/pages/nurse/patient-profile/PatientProfile";
import NurseAdmission from "@/pages/nurse/patient-management/admission/Admission";
import NurseAvailableWard from "@/pages/nurse/patient-management/available-ward/AvailableWard";
import NurseDischarge from "@/pages/nurse/patient-management/discharge/Discharge";
import NurseAdmissionReport from "@/pages/nurse/reports/admission/AdmissionReport";
import NurseDischargeReport from "@/pages/nurse/reports/discharge/DischargeReport";
import NurseChildBirthReport from "@/pages/nurse/reports/child-birth/ChildBirthReport";
import NurseAnteNatalReport from "@/pages/nurse/reports/ante-natal/AnteNatalReport";
import NursePostNatalReport from "@/pages/nurse/reports/post-natal/PostNatalReport";
import NurseFamilyPlanningReport from "@/pages/nurse/reports/family-planning/FamilyPlanningReport";
import NurseImmunizationReport from "@/pages/nurse/reports/immunization/ImmunizationReport";
import NurseDispensedDrugsReport from "@/pages/nurse/reports/dispensed-drugs/DispensedDrugsReport";
import NurseMakeRequest from "@/pages/nurse/perform-action/make-request/MakeRequest";
import NurseSetReminder from "@/pages/nurse/perform-action/set-reminder/SetReminder";
import NurseReportWriting from "@/pages/nurse/reports/report-writing/ReportWriting";
import NurseRequisition from "@/pages/nurse/reports/requisition/Requisition";
import PreviousPatientRecords from "@/pages/shared/previousPatientRecords/PreviousPatientRecords";

// import doctors component
import DoctorDashboard from "@/pages/doctor/dashboard/DoctorDashboard";
import DoctorNotification from "@/pages/doctor/notifications/DoctorNotifications";
import DoctorPatientProfile from "@/pages/doctor/patientProfile/PatientProfile";

import AdminDashboard from "@/pages/admin/dashboard/AdminDashboard";
import AuthenticationPage from "@/pages/auth/AuthenticationPage";
import Verification from "@/pages/auth/components/Verification";
import ForgotPassword from "@/pages/auth/components/ForgotPassword";
import PreviewEntry from "@/pages/preview/PreviewEntry";
import DoctorAdmission from "@/pages/doctor/admission/Admission";
import DoctorDischarge from "@/pages/doctor/discharge/Discharge";
import DoctorAccountSettings from "@/pages/doctor/account/AccountSettings";
import DoctorYourProfile from "@/pages/doctor/account/YourProfile";
import DoctorFlagProfile from "@/pages/doctor/flag-profile/DoctorFlagProfile";
import DoctorPreviousPatientRecords from "@/pages/doctor/previousPatientRecords/PreviousPatientRecords";
import DoctorAdmissionReport from "@/pages/doctor/reports/AdmissionReport";
import DoctorDischargeReport from "@/pages/doctor/reports/DischargeReport";
import DoctorAnteNatalReport from "@/pages/doctor/reports/AnteNatalReport";
import DoctorChildBirthReport from "@/pages/doctor/reports/ChildBirthReport";
import DoctorImmunizationReport from "@/pages/doctor/reports/ImmunizationReport";
import DoctorPostNatalReport from "@/pages/doctor/reports/PostNatalReport";
import DoctorFamilyPlanningReport from "@/pages/doctor/reports/FamilyPlanningReport";
import DoctorLogsReport from "@/pages/doctor/reports/DoctorLogsReport";
import DoctorRegistrationReport from "@/pages/doctor/reports/RegistrationReport";

function AuthLoadingScreen() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <p className="animate-pulse text-lg font-semibold text-[#573FD1]">
        Loading...
      </p>
    </div>
  );
}

const RoleBasedRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <AuthLoadingScreen />;
  }

  const homePath = "/";

  return (
    <Routes>
      <Route path="/" element={<PreviewEntry />} />

      <Route
        path="/auth"
        element={
          user ? <Navigate to={homePath} replace /> : <AuthenticationPage />
        }
      />
      <Route
        path="/auth/verification"
        element={
          user ? <Navigate to={homePath} replace /> : <Verification />
        }
      />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Frontdesk — available for preview without login */}
      {FrontdeskRoutes()}

      {/* Nurse */}
      <Route path="/nurse" element={<NurseLayout />}>
          <Route index element={<NurseDashboard />} />
          <Route path="dashboard" element={<NurseDashboard />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="admission" element={<NurseAdmission />} />
          <Route path="available-ward" element={<NurseAvailableWard />} />
          <Route path="discharge" element={<NurseDischarge />} />
          <Route path="make-request" element={<NurseMakeRequest />} />
          <Route path="reminder" element={<NurseSetReminder />} />
          <Route path="reports/admission" element={<NurseAdmissionReport />} />
          <Route path="reports/discharge" element={<NurseDischargeReport />} />
          <Route path="child-birth" element={<NurseChildBirthReport />} />
          <Route path="ante-natal" element={<NurseAnteNatalReport />} />
          <Route path="post-natal" element={<NursePostNatalReport />} />
          <Route path="family-planning" element={<NurseFamilyPlanningReport />} />
          <Route path="immunization" element={<NurseImmunizationReport />} />
          <Route path="dispensed-drugs" element={<NurseDispensedDrugsReport />} />
          <Route path="report-writing" element={<NurseReportWriting />} />
          <Route path="requisition" element={<NurseRequisition />} />
          <Route path="patient-profile/:id" element={<NursePatientProfile />} />
          <Route
            path="previous-patient-records/:patientId"
            element={<PreviousPatientRecords />}
          />
        </Route>

      {/* Doctor */}
      <Route path="/doctor" element={<DoctorLayout />}>
        <Route index element={<DoctorDashboard />} />
        <Route path="notifications-doctor" element={<DoctorNotification />} />
        <Route path="admission" element={<DoctorAdmission />} />
        <Route path="discharge" element={<DoctorDischarge />} />
        <Route path="account" element={<DoctorAccountSettings />} />
        <Route path="account/profile" element={<DoctorYourProfile />} />
        <Route path="flag-profile/:id" element={<DoctorFlagProfile />} />
        <Route path="patient-profile/:id" element={<DoctorPatientProfile />} />
        <Route
          path="previous-patient-records/:patientId"
          element={<DoctorPreviousPatientRecords />}
        />
        <Route path="reports/admission" element={<DoctorAdmissionReport />} />
        <Route path="reports/discharge" element={<DoctorDischargeReport />} />
        <Route path="ante-natal" element={<DoctorAnteNatalReport />} />
        <Route path="child-birth" element={<DoctorChildBirthReport />} />
        <Route path="immunization" element={<DoctorImmunizationReport />} />
        <Route path="post-natal" element={<DoctorPostNatalReport />} />
        <Route path="family-planning" element={<DoctorFamilyPlanningReport />} />
        <Route path="doctor-assignments" element={<DoctorLogsReport />} />
        <Route path="registration-log" element={<DoctorRegistrationReport />} />
      </Route>

      {/* Admin */}
      {user?.userRole === "admin" && (
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<div>User Management</div>} />
        </Route>
      )}

      <Route path="*" element={<Navigate to={homePath} replace />} />
    </Routes>
  );
};

export default RoleBasedRoutes;
