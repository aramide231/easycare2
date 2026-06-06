import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { getRoleHomePath } from "@/lib/authRoutes";

import Logo from "@/assets/icon/Frame 121.svg";
import Signin from "./components/Signin.tsx";
import Signup from "./components/Signup.tsx";
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
      navigate(getRoleHomePath(user.userRole));
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-lg font-semibold text-purple-600 animate-pulse">
          Redirecting...
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row w-full max-w-5xl h-auto md:h-[85vh] bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-gray-100"
      >
        {/* Left Section */}
        <div className="hidden md:flex flex-col justify-between w-1/2 bg-gradient-to-br from-[#573FD1] to-[#816AF5] text-white p-8">
          <div>
            <img src={Logo} alt="logo" className="w-24 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">St James Hospital</h2>
            <p className="text-sm text-purple-100 leading-relaxed max-w-sm">
              Powering hospitals with seamless patient management — from check-in
              to prescriptions, all in one place.
            </p>
          </div>

          <div className="mt-auto">
            <ImageCarousel />
          </div>
        </div>

  {/* Right Section */}
  <div className="flex flex-col w-full md:w-1/2 p-8 min-h-0">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <img src={hospitalIcon} alt="hospital icon" className="w-10 h-10" />
            <div>
              <h4 className="text-lg font-semibold text-gray-900">
                Welcome to St James
              </h4>
              <p className="text-xs text-gray-500">
                {activeTab === "Signup"
                  ? "Optimize Patient Care — Sign Up in a Minute"
                  : "Access your hospital dashboard instantly"}
              </p>
            </div>
          </div>

          {/* Tabs as Segmented Control */}
          <div className="flex justify-center mb-6 bg-gray-100 rounded-full p-1">
            {["Signup", "Signin"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as "Signup" | "Signin")}
                className={`w-1/2 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === tab
                    ? "bg-[#573FD1] text-white shadow-md"
                    : "text-gray-600 hover:text-[#573FD1]"
                }`}
              >
                {tab === "Signup" ? "Sign Up" : "Sign In"}
              </button>
            ))}
          </div>

          {/* Form Container */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex-1 overflow-y-auto scrollbar-hide min-h-0"
          >
            {activeTab === "Signup" ? <Signup /> : <Signin />}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthenticationPage;
