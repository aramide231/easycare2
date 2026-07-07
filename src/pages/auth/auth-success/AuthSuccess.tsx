// import { useEffect } from "react";
import stJamesHospitalLogo from "@/assets/logos/st-peter-hospital.png";
import successPopper from "@/assets/auth/succes-popper.png";
import { Carousel } from "../components/Carousel";
import { AuthHeader } from "../components/AuthHeader";
import AuthBtn from "../components/AuthBtn";
import { AuthFooter } from "../components/AuthFooter";
// import { useNavigate } from "react-router-dom";

export const AuthSuccess: React.FC = () => {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     navigate("/frontdesk");
  //   }, 3000);
  //   return () => clearTimeout(timer);
  // }, [navigate]);

  return (
    <div className="flex h-screen bg-background text-txt overflow-hidden">
      <Carousel />
      <div className="w-full lg:w-1/2 pt-20 flex flex-col justify-between bg-background">
        <div className="max-w-md mx-auto w-full">
          {/* Header Row */}
          <div className="flex items-start justify-between mb-14">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10">
                <img
                  className="w-full h-full object-contain"
                  src={stJamesHospitalLogo}
                  alt=""
                />
              </div>
              <div>
                <h2 className="text- font-semibold font-hanken text-txt">
                  St James Hospital
                </h2>
                <p className="text-xs text-[#333333]">
                  Optimize Patient Care with St. James—Sign Up in Minutes
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col animate-in fade-in duration-300">
            <AuthHeader
              className="mb-15"
              title="Account Created Successfully"
              description="You can access your dashboard and manage patient care"
            />
            {/* Lock image */}
            <div className="flex justify-center mb-1">
              <div className="w-27 h-27">
                <img
                  src={successPopper}
                  alt="Security Lock"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            {/* Submit */}
            <div className="mt-10">
              <AuthBtn>Go To Dashboard</AuthBtn>
            </div>
          </div>
        </div>
        {/* Footer */}
        <AuthFooter />
      </div>
    </div>
  );
};
