import { useState } from "react";
import Logo from "@/assets/icon/Frame 121.svg";
import ImageScreen from "@/assets/image/Signup Img.png";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import hospitalIcon from "@/assets/icon/Frame 5.svg";

const AuthenticationPage = () => {
  const [activeTab, setActiveTab] = useState<"Signup" | "Signin">("Signup");

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
                  Optimize Patient Care with St. James—Sign Up in Minute
                </p>
              </div>
            </div>
            {/* Tab Navigation */}
            <div className="mb-10 mt-6">
              <ul className="flex justify-center gap-4 font-lg">
                <li
                  className={`font-semibold cursor-pointer font-lg ${
                    activeTab === "Signup"
                      ? "text-[#573fd1] underline"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("Signup")}
                >
                  Sign Up
                </li>
                <li
                  className={`font-semibold cursor-pointer font-lg ${
                    activeTab === "Signin"
                      ? "text-[#573fd1] underline"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("Signin")}
                >
                  Sign In
                </li>
              </ul>
            </div>

            {/* Conditional Rendering */}
            {activeTab === "Signup" ? <Signup /> : <Signin />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationPage;
