import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

import Logo from "@/assets/icon/Frame 121.svg";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import hospitalIcon from "@/assets/icon/Frame 5.svg";
import ImageCarousel from "@/components/ui/carousel";

const AuthenticationPage = () => {
  const [activeTab, setActiveTab] = useState<"Signup" | "Signin">("Signup");
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setActiveTab(params.get("tab") === "signin" ? "Signin" : "Signup");
  }, [location.search]);

  useEffect(() => {
    if (!loading && user) {
      switch (user.userRole) {
        case "frontdesk":
          navigate("/frontdesk");
          break;
        case "nurse":
          navigate("/nurse");
          break;
        case "doctor":
          navigate("/doctor");
          break;
        case "admin":
          navigate("/admin");
          break;
        default:
          navigate("/");
      }
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-purple-600">Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen w-screen overflow-hidden bg-gray-50 px-2">
      <div className="flex w-full max-w-5xl h-[85vh] bg-white rounded-md shadow-md overflow-hidden">
        {/* Left Section */}
        <div className="w-1/2 bg-purple-100 p-6 flex flex-col justify-between">
          <div>
            <img src={Logo} className="w-[90px]" />
            <p className="text-gray-700 text-sm mt-4 leading-snug">
              Powering hospitals with seamless patient management—from check-in
              to prescriptions—all in one place.
            </p>
          </div>
          <div className="mt-auto">
            <ImageCarousel />
          </div>
        </div>

        {/* Right Section */}
        <div className="w-1/2 p-6 flex flex-col">
          <div className="flex gap-3 mb-4">
            <img src={hospitalIcon} alt="icon" className="w-10 h-10" />
            <div>
              <h4 className="text-base font-bold">St James Hospital</h4>
              <p className="text-xs text-gray-600">
                Optimize Patient Care—Sign Up in a Minute
              </p>
            </div>
          </div>

          {/* Tabs */}
          <ul className="flex justify-center gap-6 mb-4 text-sm font-medium">
            <li
              className={`cursor-pointer ${
                activeTab === "Signup"
                  ? "text-[#573fd1] underline"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("Signup")}
            >
              Sign Up
            </li>
            <li
              className={`cursor-pointer ${
                activeTab === "Signin"
                  ? "text-[#573fd1] underline"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("Signin")}
            >
              Sign In
            </li>
          </ul>

          {/* Form with smooth scroll & no scrollbar */}
          <div className="flex-1 overflow-y-auto scroll-smooth scrollbar-hide">
            {activeTab === "Signup" ? <Signup /> : <Signin />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationPage;
