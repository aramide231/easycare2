import { Navigate, Route } from "react-router-dom";

import FrontdeskLayout from "@frontdesk/layouts/FrontdeskLayout";
import FrontdeskDashboard from "@frontdesk/pages/dashboard/Dashboard";
import Visitation from "@frontdesk/pages/visitation";
import Notifications from "@frontdesk/pages/notifications/Notifications";
import ReminderPage from "@frontdesk/pages/set-reminder/ReminderPage";
import SetReminder from "@frontdesk/pages/set-reminder/components/SetReminder";
import ViewReminder from "@frontdesk/pages/set-reminder/components/ViewReminder";
import BookAppointment from "@frontdesk/pages/book-appointment/BookAppointment";
import DoctorAssignment from "@frontdesk/pages/doctors-assignment/DoctorAssignment";
import AnteNatal from "@frontdesk/pages/ante-natal/AnteNatal";
import ChildBirth from "@frontdesk/pages/child-birth/ChildBirth";
import PostNatal from "@frontdesk/pages/post-natal/PostNatal";
import Immunization from "@frontdesk/pages/immunization/Immunization";
import FamilyPlanning from "@frontdesk/pages/family-planning/FamilyPlanning";
import { PatientRouteRedirect } from "@/components/patient/patientWorkspace";
import PatientRegistry from "@/pages/patients/PatientRegistry";
import PatientEditor from "@/pages/patients/PatientEditor";
import PatientAccess from "@/pages/patients/PatientAccess";

/**
 * Frontdesk module routes — self-contained under /frontdesk.
 * Mount inside RoleBasedRoutes when the user has the frontdesk role.
 */
export function FrontdeskRoutes() {
  return (
    <Route path="/frontdesk" element={<FrontdeskLayout />}>
      <Route index element={<FrontdeskDashboard />} />
      <Route path="edit/:id" element={<PatientRouteRedirect suffix="/edit" />} />
      <Route path="visitation-log" element={<Visitation />} />
      <Route path="registration" element={<PatientEditor />} />
      <Route path="patient-info-reg" element={<Navigate to="/frontdesk/registration" replace />} />
      <Route path="patient-Insurance-reg" element={<Navigate to="/frontdesk/registration" replace />} />
      <Route path="patient-emergency-reg" element={<Navigate to="/frontdesk/registration" replace />} />
      <Route path="patient-reg-success" element={<Navigate to="/patients" replace state={null} />} />
      <Route path="notifications" element={<Notifications />} />
      <Route path="manage-access" element={<PatientAccess />} />
      <Route path="manage-card" element={<PatientRegistry />} />
      <Route path="reminder" element={<ReminderPage />} />
      <Route path="reminder/set-reminder" element={<SetReminder />} />
      <Route path="reminder/view-schedule" element={<ViewReminder />} />
      <Route path="book-appointment" element={<BookAppointment />} />
      <Route path="doctor-assignments" element={<DoctorAssignment />} />
      <Route path="ante-natal" element={<AnteNatal />} />
      <Route path="child-birth" element={<ChildBirth />} />
      <Route path="post-natal" element={<PostNatal />} />
      <Route path="immunization" element={<Immunization />} />
      <Route path="family-planning" element={<FamilyPlanning />} />
      <Route path="registration-log" element={<PatientRegistry />} />
      <Route path="flag-profile/:id" element={<PatientRouteRedirect />} />
      <Route path="patient-profile/:id" element={<PatientRouteRedirect />} />
    </Route>
  );
}

export { FrontdeskLayout };
