import AuthenticationPage from "./pages/auth/AuthenticationPage";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Verification from "./pages/auth/components/Verification";
import ForgotPassword from "./pages/auth/components/ForgotPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthenticationPage />} />
        <Route path="/auth/Verification" element={<Verification />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* <Route path="signin" element={<Signin/>}/>
        <Route path="signup" element={<Signup/>}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
