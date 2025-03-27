import AuthenticationPage from "./pages/auth/AuthenticationPage";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Verification from "./pages/auth/components/Verification";
import ForgotPassword from "./pages/auth/components/ForgotPassword";
import Dashboard from "./pages/dashboard/Dashboard";
import VerifyEmailPassword from "./pages/auth/components/VerifyEmailPassword";
import Visitation from "./pages/visitation";
import PatientForm from "./pages/registration";
import ManageAccess from "./pages/manage-access/ManageAccess";
import ManageCard from "./pages/manage-card/ManageCard";
import SetReminder from "./pages/set-reminder/SetReminder";
import DoctorAssignment from "./pages/doctors-assignment/DoctorAssignment";
import AnteNatal from "./pages/ante-natal/AnteNatal";
import ChildBirth from "./pages/child-birth/ChildBirth";
import PostNatal from "./pages/post-natal/PostNatal";
import Immunization from "./pages/immunization/Immunization";
import FamilyPlanning from "./pages/family-planning/FamilyPlanning";

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
        <Route path="/visitation-log" element={<Visitation />} />
        <Route path="/registration" element={<PatientForm />} />
        <Route path="/manage-access" element={<ManageAccess />} />
        <Route path="/manage-card" element={<ManageCard />} />
        <Route path="/set-reminder" element={<SetReminder />} />
        <Route path="/doctor-assignments" element={<DoctorAssignment />} />
        <Route path="/ante-natal" element={<AnteNatal />} />
        <Route path="/child-birth" element={<ChildBirth />} />
        <Route path="/post-natal" element={<PostNatal />} />
        <Route path="immunization" element={<Immunization />} />
        <Route path="/family-planning" element={<FamilyPlanning />} />
        {/* <Route path="signin" element={<Signin/>}/>
        <Route path="signup" element={<Signup/>}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
