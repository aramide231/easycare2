import { Route } from "react-router-dom";

import FrontdeskLayout from "@frontdesk/layouts/FrontdeskLayout";
import FrontdeskDashboard from "@frontdesk/pages/dashboard/Dashboard";
import EditPatient from "@frontdesk/pages/editPatient/EditPatient";
import Visitation from "@frontdesk/pages/visitation";
import Notifications from "@frontdesk/pages/notifications/Notifications";
import ManageAccess from "@frontdesk/pages/manage-access/ManageAccess";
import ManageCard from "@frontdesk/pages/manage-card/ManageCard";
import ReminderPage from "@frontdesk/pages/set-reminder/ReminderPage";
import SetReminder from "@frontdesk/pages/set-reminder/components/SetReminder";
import ViewReminder from "@frontdesk/pages/set-reminder/components/ViewReminder";
import DoctorAssignment from "@frontdesk/pages/doctors-assignment/DoctorAssignment";
import AnteNatal from "@frontdesk/pages/ante-natal/AnteNatal";
import ChildBirth from "@frontdesk/pages/child-birth/ChildBirth";
import PostNatal from "@frontdesk/pages/post-natal/PostNatal";
import Immunization from "@frontdesk/pages/immunization/Immunization";
import FamilyPlanning from "@frontdesk/pages/family-planning/FamilyPlanning";
import RegistrationLog from "@frontdesk/pages/RegistrationLog";
import Registration from "@frontdesk/pages/Registration/Registration";
import PatientInfoRegistration from "@frontdesk/pages/Registration/PatientInfoRegistration";
import PatientInsuranceReg from "@frontdesk/pages/Registration/PatientInsuranceReg";
import PatientEmergencyReg from "@frontdesk/pages/Registration/PatientEmergencyReg";
import PatientRegSuccess from "@frontdesk/pages/Registration/PatientRegSuccess";
import FlagProfile from "@frontdesk/pages/flag-profile/FlagProfile";

/**
 * Frontdesk module routes — self-contained under /frontdesk.
 * Mount inside RoleBasedRoutes when the user has the frontdesk role.
 */
export function FrontdeskRoutes() {
  return (
    <Route path="/frontdesk" element={<FrontdeskLayout />}>
      <Route index element={<FrontdeskDashboard />} />
      <Route path="edit/:id" element={<EditPatient />} />
      <Route path="visitation-log" element={<Visitation />} />
      <Route path="registration" element={<Registration />} />
      <Route path="patient-info-reg" element={<PatientInfoRegistration />} />
      <Route path="patient-Insurance-reg" element={<PatientInsuranceReg />} />
      <Route path="patient-emergency-reg" element={<PatientEmergencyReg />} />
      <Route path="patient-reg-success" element={<PatientRegSuccess />} />
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
  );
}

export { FrontdeskLayout };
