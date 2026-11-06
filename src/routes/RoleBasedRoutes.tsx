// routes/RoleBasedRoutes.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import { FrontdeskRoutes, FrontdeskLayout } from "@/modules/frontdesk";
import BookAppointment from "@/modules/frontdesk/pages/book-appointment/BookAppointment";
import { HmoRoutes } from "@/modules/hmo";
import { PharmacyRoutes } from "@/modules/pharmacy";
import { DiagnosticsRadiologistRoutes } from "@/pages/diagnostics-and-radiologist/routes";
import NurseLayout from "../layouts/NurseLayout";
import DoctorLayout from "../layouts/DoctorLayout";
import DiagnosticsLayout from "../layouts/DiagnosticsLayout";
import AdminLayout from "../layouts/AdminLayout";

import Notifications from "@frontdesk/pages/notifications/Notifications";
import ComingSoonPage from "@/components/ui/ComingSoonPage";
import ReminderPage from "@frontdesk/pages/set-reminder/ReminderPage";

// import Nurse component
import PatientRecordScope from "@/pages/doctor/patientProfile/components/PatientRecordScope";
import NurseDashboard from "@/pages/nurse/dashboard/Dashboard";
import NursePatientProfile from "@/pages/nurse/patient-profile/PatientProfile";
import NurseFlagProfile from "@/pages/nurse/patient-profile/flag-profile/FlagProfile";
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

// import doctors (clinician) component from EasyCare-Aramide
import DoctorDashboard from "@/pages/doctor/dashboard/DoctorDashboard";
import DoctorNotification from "@/pages/doctor/notifications/DoctorNotifications";
import DoctorPatientProfile from "@/pages/doctor/patientProfile/PatientProfile";
import DoctorAccountSettings from "@/pages/doctor/account/AccountSettings";
import DoctorYourProfile from "@/pages/doctor/account/YourProfile";
import DoctorFlagProfile from "@/pages/doctor/flag-profile/DoctorFlagProfile";
import DoctorAdmission from "@/pages/doctor/admission/Admission";
import DoctorDischarge from "@/pages/doctor/discharge/Discharge";
import DoctorAdmissionReport from "@/pages/doctor/reports/AdmissionReport";
import DoctorAnteNatalReport from "@/pages/doctor/reports/AnteNatalReport";
import DoctorChildBirthReport from "@/pages/doctor/reports/ChildBirthReport";
import DoctorDischargeReport from "@/pages/doctor/reports/DischargeReport";
import DoctorFamilyPlanningReport from "@/pages/doctor/reports/FamilyPlanningReport";
import DoctorImmunizationReport from "@/pages/doctor/reports/ImmunizationReport";
import DoctorLogsReport from "@/pages/doctor/reports/DoctorLogsReport";
import DoctorPostNatalReport from "@/pages/doctor/reports/PostNatalReport";
import DoctorPreviousPatientRecords from "@/pages/doctor/previousPatientRecords/PreviousPatientRecords";
import DoctorRegistrationReport from "@/pages/doctor/reports/RegistrationReport";
import DoctorMakeRequest from "@/pages/nurse/makeRequest/MakeRequest";

// import Diagnostics / Laboratory component from EasyCare-Aramide
import DiagnosticsDashboard from "@/pages/diagnostics/dashboard/DiagnosticsDashboard";
import DiagnosticsNotifications from "@/pages/diagnostics/notifications/DiagnosticsNotifications";
import VisitationLog from "@/pages/diagnostics/visitation/VisitationLog";
import MakeRequest from "@/pages/diagnostics/make-request/MakeRequest";
import DiagnosticsSetReminder from "@/pages/diagnostics/set-reminder/SetReminder";
import InvestigativeList from "@/pages/diagnostics/investigative-list/InvestigativeList";
import DiagnosticsRequestLogs from "@/pages/diagnostics/request-logs/RequestLogs";
import InvestigationLogs from "@/pages/diagnostics/investigation-logs/InvestigationLogs";
import InvestigationProfile from "@/pages/diagnostics/investigation-profile/InvestigationProfile";
import DiagnosticsPatientProfile from "@/pages/diagnostics/patient-profile/DiagnosticsPatientProfile";
import DiagnosticsPreviousPatientRecords from "@/pages/diagnostics/previous-patient-records/DiagnosticsPreviousPatientRecords";

import AdminDashboard from "@/pages/admin/dashboard/AdminDashboard";
import AuthenticationPage from "@/pages/auth/AuthenticationPage";
import Verification from "@/pages/auth/components/Verification";
import ForgotPassword from "@/pages/auth/components/ForgotPassword";
import PreviewEntry from "@/pages/preview/PreviewEntry";

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
        element={user ? <Navigate to={homePath} replace /> : <Verification />}
      />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Frontdesk — available for preview without login */}
      {FrontdeskRoutes()}

      {/* Frontdesk additional routes */}
      <Route path="/frontdesk" element={<FrontdeskLayout />}>
        <Route
          path="previous-patient-records/:patientId"
          element={<PreviousPatientRecords />}
        />
        <Route path="book-appointment" element={<BookAppointment />} />
      </Route>

      {/* HMO — available for preview without login */}
      {HmoRoutes()}

      {/* Pharmacy — available for preview without login */}
      {PharmacyRoutes()}

      {/* Diagnostics & Radiologist — available for preview without login */}
      {DiagnosticsRadiologistRoutes()}

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
        <Route
          path="patient-profile/:id"
          element={
            <PatientRecordScope>
              <NursePatientProfile />
            </PatientRecordScope>
          }
        />
        <Route path="patient-profile/:id" element={<NursePatientProfile />} />
        <Route path="flag-profile/:id" element={<NurseFlagProfile />} />
        <Route
          path="previous-patient-records/:patientId"
          element={<PreviousPatientRecords />}
        />
      </Route>

      {/* Doctor (Clinician) — hooked up from EasyCare-Aramide */}
      <Route path="/doctor" element={<DoctorLayout />}>
        <Route index element={<DoctorDashboard />} />
        <Route path="notifications-doctor" element={<DoctorNotification />} />
        <Route path="patient-profile/:id" element={<DoctorPatientProfile />} />
        <Route path="account" element={<DoctorAccountSettings />} />
        <Route path="account/profile" element={<DoctorYourProfile />} />
        <Route path="flag-profile/:id" element={<DoctorFlagProfile />} />
        <Route
          path="previous-patient-records/:patientId"
          element={<DoctorPreviousPatientRecords />}
        />
        <Route path="admission" element={<DoctorAdmission />} />
        <Route path="available-ward" element={<NurseAvailableWard />} />
        <Route path="dispensed-drugs" element={<NurseDispensedDrugsReport />} />
        <Route path="discharge" element={<DoctorDischarge />} />
        <Route path="make-request" element={<DoctorMakeRequest />} />
        <Route path="set-reminder" element={<ReminderPage />} />
        <Route path="reports/admission" element={<DoctorAdmissionReport />} />
        <Route path="reports/discharge" element={<DoctorDischargeReport />} />
        <Route path="doctor-logs" element={<DoctorLogsReport />} />
        <Route path="immunization" element={<DoctorImmunizationReport />} />
        <Route path="ante-natal" element={<DoctorAnteNatalReport />} />
        <Route path="child-birth" element={<DoctorChildBirthReport />} />
        <Route path="post-natal" element={<DoctorPostNatalReport />} />
        <Route path="registration-log" element={<DoctorRegistrationReport />} />
        <Route
          path="family-planning"
          element={<DoctorFamilyPlanningReport />}
        />
        <Route
          path="report-writing"
          element={<ComingSoonPage title="Report Writing" />}
        />
        <Route
          path="requisition"
          element={<ComingSoonPage title="Requisition" />}
        />
      </Route>

      {/* Diagnostics / Laboratory — hooked up from EasyCare-Aramide */}
      <Route path="/diagnostics" element={<DiagnosticsLayout />}>
        <Route index element={<DiagnosticsDashboard />} />
        <Route path="notifications" element={<DiagnosticsNotifications />} />
        <Route path="visitation-logs" element={<VisitationLog />} />
        <Route path="make-request" element={<MakeRequest />} />
        <Route path="investigative-list" element={<InvestigativeList />} />
        <Route path="set-reminder" element={<DiagnosticsSetReminder />} />
        <Route path="request-logs" element={<DiagnosticsRequestLogs />} />
        <Route path="investigation-logs" element={<InvestigationLogs />} />
        <Route
          path="patient-profile/:id"
          element={<DiagnosticsPatientProfile />}
        />
        <Route
          path="previous-patient-records/:id"
          element={<DiagnosticsPreviousPatientRecords />}
        />
        <Route
          path="investigation-profile/:id"
          element={<InvestigationProfile />}
        />
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
