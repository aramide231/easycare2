import AuthenticationPage from "./pages/auth/AuthenticationPage";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Verification from "./pages/auth/components/Verification";
import ForgotPassword from "./pages/auth/components/ForgotPassword";
import Dashboard from "./pages/dashboard/Dashboard";
import VerifyEmailPassword from "./pages/auth/components/VerifyEmailPassword";
import Visitation from "./pages/visitation";
import ManageAccess from "./pages/manage-access/ManageAccess";
import ManageCard from "./pages/manage-card/ManageCard";
import SetReminder from "./pages/set-reminder/components/SetReminder";
import DoctorAssignment from "./pages/doctors-assignment/DoctorAssignment";
import AnteNatal from "./pages/ante-natal/AnteNatal";
import ChildBirth from "./pages/child-birth/ChildBirth";
import PostNatal from "./pages/post-natal/PostNatal";
import Immunization from "./pages/immunization/Immunization";
import FamilyPlanning from "./pages/family-planning/FamilyPlanning";
import EditPatient from "./pages/editPatient/EditPatient";
import ViewReminder from "./pages/set-reminder/components/ViewReminder";
import ReminderPage from "./pages/set-reminder/ReminderPage";
import NotFound from "./pages/notFound/NotFound";
import Notifications from "./pages/notifications/Notifications";
import Registration from "./pages/registration";
// import Registration from "./pages/registration";

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
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/edit/:id" element={<EditPatient />} />
        <Route path="/visitation-log" element={<Visitation />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/manage-access" element={<ManageAccess />} />
        <Route path="/manage-card" element={<ManageCard />} />
        <Route path="/reminder" element={<ReminderPage />} />
        <Route path="/reminder/set-reminder" element={<SetReminder />} />
        <Route path="/reminder/view-schedule" element={<ViewReminder />} />
        <Route path="/doctor-assignments" element={<DoctorAssignment />} />
        <Route path="/ante-natal" element={<AnteNatal />} />
        <Route path="/child-birth" element={<ChildBirth />} />
        <Route path="/post-natal" element={<PostNatal />} />
        <Route path="/immunization" element={<Immunization />} />
        <Route path="/family-planning" element={<FamilyPlanning />} />
        <Route path="*" element={<NotFound />} />
        {/* <Route path="signin" element={<Signin/>}/>
        <Route path="signup" element={<Signup/>}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
