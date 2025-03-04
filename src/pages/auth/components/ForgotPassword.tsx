import { useState } from "react";
import Logo from "@/assets/icon/Frame 121.svg";
import ImageScreen from "@/assets/image/Signup Img.png";
import hospitalIcon from "@/assets/icon/Frame 5.svg";
import ForgotPasswordReset from "./ForgotPasswordReset";
import UpdatePassword from "./UpdatePassword";
import VerifyEmailPassword from "./VerifyEmailPassword";

const ForgotPassword = () => {
  const [activeTab, setActiveTab] = useState<
    "ForgotPasswordReset" | "VerifyEmailPassword" | "UpdatePassword"
  >("ForgotPasswordReset");
  return (
    <div className="flex w-10/12 m-auto min-h-screen p-12">
      <div className="flex w-full bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Section */}
        <div className="w-1/2 p-12 bg-purple-100 flex flex-col">
          <img src={Logo} className="text-purple-800 w-[120px]" />
          <p className="text-gray-700 text-lg mt-2">
            Powering hospitals with seamless patient management from check-in to{" "}
            <br />
            prescriptions all in one place.
          </p>
          <img
            src={ImageScreen}
            alt="Healthcare"
            className="mt-12 rounded-lg"
          />
        </div>

        {/* Right Section */}
        <div className="w-1/2 p-14">
          <div className="w-full shadow-none border-none">
            <div className="flex gap-3">
              <div className="icon-imag">
                <img src={hospitalIcon} alt="" />
              </div>
              <div className="">
                <h4 className="text-lg font-bold">St James Hospital</h4>
                <p className="text-sm">
                  Let's reset your password. Enter your email address and we'll
                  send you a link to reset your password.
                </p>
              </div>
            </div>

            {/* Conditional Rendering */}
            {activeTab === "ForgotPasswordReset" ? (
              <ForgotPasswordReset setActiveTab={setActiveTab} />
            ) : activeTab === "VerifyEmailPassword" ? (
              <VerifyEmailPassword />
            ) : (
              <UpdatePassword />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
