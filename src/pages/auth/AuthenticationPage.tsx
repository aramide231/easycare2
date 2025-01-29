import { useState } from "react";

import imageFile from "../../assets/image/Frame 2.png";

import Signin from "./components/Signin";
import Signup from "./components/Signup";

const AuthenticationPage = () => {
  const [activeTab, setActiveTab] = useState<"Signup" | "Signin">("Signup");

  return (
    <div className="h-screen w-full bg-[#eaeaea] flex items-center justify-center">
      <div className="flex w-[80%] h-[800px] mx-auto bg-white overflow-hidden rounded-[40px] shadow-lg">
        {/* Left Section */}
        <div className="bg-gradient-to-t from-[#eaeaea] to-[#573fd7] flex-1 items-center p-8 rounded-l-[40px]">
          <h2 className="font-bold font-mono text-lg">EasyCare</h2>
          <p className="text-white">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores
            totam, magnam veniam similique temporibus nostrum! Nobis rem
            consequatur rerum. Cupiditate porro sit aspernatur hic quis, facere
            pariatur doloribus doloremque minus.
          </p>
          <div className="flex justify-center pt-20">
            <img src={imageFile} alt="illustration" className="w-[50%]" />
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-white flex-1 p-8 rounded-r-[40px]">
          <div className="px-20 py-2">
            {/* Tab Navigation */}
            <div className="mb-8">
              <ul className="flex justify-center gap-4 font-lg">
                <li
                  className={`font-semibold cursor-pointer font-lg ${
                    activeTab === "Signup"
                      ? "text-[#573fd7] underline"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("Signup")}
                >
                  Sign Up
                </li>
                <li
                  className={`font-semibold cursor-pointer font-lg ${
                    activeTab === "Signin"
                      ? "text-[#573fd7] underline"
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
