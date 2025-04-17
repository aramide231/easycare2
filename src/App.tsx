import AuthenticationPage from "./pages/auth/AuthenticationPage";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Verification from "./pages/auth/components/Verification";
import ForgotPassword from "./pages/auth/components/ForgotPassword";
import VerifyEmailPassword from "./pages/auth/components/VerifyEmailPassword";
import FrontDesk from "./pages/frontdesk/FrontDesk";
import Dashboard from "./pages/frontdesk/dashboard/Dashboard";
import EditPatient from "./pages/frontdesk/editPatient/EditPatient";
import Visitation from "./pages/frontdesk/visitation";
import Registration from "./pages/frontdesk/registration";
import Notifications from "./pages/frontdesk/notifications/Notifications";
import ManageAccess from "./pages/frontdesk/manage-access/ManageAccess";
import ManageCard from "./pages/frontdesk/manage-card/ManageCard";
import ReminderPage from "./pages/frontdesk/set-reminder/ReminderPage";
import SetReminder from "./pages/frontdesk/set-reminder/components/SetReminder";
import ViewReminder from "./pages/frontdesk/set-reminder/components/ViewReminder";
import DoctorAssignment from "./pages/frontdesk/doctors-assignment/DoctorAssignment";
import AnteNatal from "./pages/frontdesk/ante-natal/AnteNatal";
import ChildBirth from "./pages/frontdesk/child-birth/ChildBirth";
import PostNatal from "./pages/frontdesk/post-natal/PostNatal";
import Immunization from "./pages/frontdesk/immunization/Immunization";
import FamilyPlanning from "./pages/frontdesk/family-planning/FamilyPlanning";
import NotFound from "./pages/frontdesk/notFound/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthenticationPage />} />
        <Route path="/auth/Verification" element={<Verification />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/auth/forgot-password/verify-email"
          element={<VerifyEmailPassword />}
        />
        <Route path="/frontdesk/*" element={<FrontDesk />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="edit/:id" element={<EditPatient />} />
          <Route path="visitation-log" element={<Visitation />} />
          <Route path="registration" element={<Registration />} />
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
        </Route>
        <Route path="*" element={<NotFound />} />

        {/* <Route path="signin" element={<Signin/>}/>
        <Route path="signup" element={<Signup/>}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
