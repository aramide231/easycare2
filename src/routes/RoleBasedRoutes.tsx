// routes/RoleBasedRoutes.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import FrontdeskLayout from "../layouts/FrontdeskLayout";
import NurseLayout from "../layouts/NurseLayout";
import DoctorLayout from "../layouts/DoctorLayout";
import AdminLayout from "../layouts/AdminLayout";

// Import frontDesk components
import FrontdeskDashboard from "../pages/frontdesk/dashboard/Dashboard";
import EditPatient from "@/pages/frontdesk/editPatient/EditPatient";
import Visitation from "@/pages/frontdesk/visitation";
import Notifications from "@/pages/frontdesk/notifications/Notifications";
import ManageAccess from "@/pages/frontdesk/manage-access/ManageAccess";
import ManageCard from "@/pages/frontdesk/manage-card/ManageCard";
import ReminderPage from "@/pages/frontdesk/set-reminder/ReminderPage";
import SetReminder from "@/pages/frontdesk/set-reminder/components/SetReminder";
import ViewReminder from "@/pages/frontdesk/set-reminder/components/ViewReminder";
import DoctorAssignment from "@/pages/frontdesk/doctors-assignment/DoctorAssignment";
import AnteNatal from "@/pages/frontdesk/ante-natal/AnteNatal";
import ChildBirth from "@/pages/frontdesk/child-birth/ChildBirth";
import PostNatal from "@/pages/frontdesk/post-natal/PostNatal";
import Immunization from "@/pages/frontdesk/immunization/Immunization";
import FamilyPlanning from "@/pages/frontdesk/family-planning/FamilyPlanning";
import FlagProfile from "@/pages/frontdesk/flag-profile/FlagProfile";

// import Nurse component
import NurseDashboard from "@/pages/nurse/dashboardNurse/Dashboard";
import NursePatientProfile from "@/pages/nurse/patientProfile/PatientProfile";

// import doctors component
import DoctorDashboard from "@/pages/doctor/dashboard/DoctorDashboard";
import DoctorNotification from "@/pages/doctor/notifications/DoctorNotifications";
import DoctorPatientProfile from "@/pages/doctor/patientProfile/PatientProfile";

import AdminDashboard from "@/pages/admin/dashboard/AdminDashboard";
import AuthenticationPage from "@/pages/auth/AuthenticationPage";
import Verification from "@/pages/auth/components/Verification";
import ForgotPassword from "@/pages/auth/components/ForgotPassword";
import RegistrationLog from "@/pages/frontdesk/RegistrationLog";
import RegistrationForm from "@/pages/frontdesk/Registration/RegistrationForm";


const RoleBasedRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* sign up and sign in page */}
      <Route path="/" element={<AuthenticationPage />} />
      <Route path="/auth/verification" element={<Verification />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

     

      {/* Frontdesk */}
      {user && user.userRole === "frontdesk" && (
        <Route path="/frontdesk" element={<FrontdeskLayout />}>
          <Route index element={<FrontdeskDashboard />} />
          <Route path="edit/:id" element={<EditPatient />} />
          <Route path="visitation-log" element={<Visitation />} />
          <Route path="registration" element={<RegistrationForm />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="manage-access" element={<ManageAccess />} />
          <Route path="manage-card" element={<ManageCard />} />
          <Route path="reminder" element={<ReminderPage />} />
          <Route path="reminder/set-reminder" element={<SetReminder />} />
          <Route path="reminder/view-schedule" element={<ViewReminder />} />
          <Route path="doctor-assignments" element={<DoctorAssignment />} />
          <Route path="ante-natal" element={<AnteNatal />} />
          <Route path="child-birth" element={<ChildBirth />} />
          <Route path="post-natal" element={<PostNatal />} />
          <Route path="immunization" element={<Immunization />} />
          <Route path="family-planning" element={<FamilyPlanning />} />
          <Route path="registration-log" element={<RegistrationLog />} />
          <Route path="flag-profile/:id" element={<FlagProfile />} />
        </Route>
      )}

      {/* Nurse */}
      {user && user.userRole === "nurse" && (
        <Route path="/nurse" element={<NurseLayout />}>
          <Route index element={<NurseDashboard />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="patient-profile/:id" element={<NursePatientProfile />} />
        </Route>
      )}

      {/* Doctor */}
      {user && user.userRole === "doctor" && (
        <Route path="/doctor" element={<DoctorLayout />}>
          <Route index element={<DoctorDashboard />} />
          <Route path="notifications-doctor" element={<DoctorNotification />} />
          <Route path="patient-profile/:id" element={<DoctorPatientProfile />} />
        </Route>
      )}

      {/* Admin */}
      {user && user.userRole === "admin" && (
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<div>User Management</div>} />
        </Route>
      )}

      {/* Default fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default RoleBasedRoutes;
