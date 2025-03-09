import AuthenticationPage from "./pages/auth/AuthenticationPage";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Verification from "./pages/auth/components/Verification";
import ForgotPassword from "./pages/auth/components/ForgotPassword";
import Dashboard from "./pages/dashboard/Dashboard";
import VerifyEmailPassword from "./pages/auth/components/VerifyEmailPassword";
import Visitation from "./pages/visitation";
import PatientForm from "./pages/registration";



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
        {/* <Route path="signin" element={<Signin/>}/>
        <Route path="signup" element={<Signup/>}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
