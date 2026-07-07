import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

// Assets
import stJamesHospitalLogo from "@/assets/logos/st-peter-hospital.png";
import otpLockImg from "../../../assets/auth/otp-lock.png";

// Components
import { OtpInput } from "./components/OtpInput";
import { Carousel } from "../components/Carousel";
import AuthBtn from "../components/AuthBtn";
import { AuthHeader } from "../components/AuthHeader";
import { AuthFooter } from "../components/AuthFooter";

// Hooks
import { useVerifyOtp } from "@/api/auth/mutations/useVerifyOtp";

const SignupOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const verifyOtpMutation = useVerifyOtp();

  const [otpValue, setOtpValue] = useState("");

  const email_or_username = location.state?.email;
  const from = location.state?.from;

  useEffect(() => {
    if (!email_or_username) {
      toast.error("Unauthorized access. Please sign up first.");
      navigate("/signup", { replace: true });
    }
  }, [email_or_username, navigate]);

  const handleVerify = () => {
    if (otpValue.length !== 6) {
      return toast.error("Please enter the full 6-digit code.");
    }

    if (!email_or_username) return;

    verifyOtpMutation.mutate(
      { email_or_username, otp: otpValue },
      {
        onSuccess: () => {
          navigate("/signup/success", { replace: true });
        },
      },
    );
  };

  if (!email_or_username) return null;

  return (
    <div className="h-screen bg-background flex justify-center items-center lg:p-8">
      <div className="flex w-full max-w-[1440px] bg-background text-txt lg:rounded-2xl lg:shadow-xl overflow-hidden h-screen lg:h-[calc(100vh-4rem)] min-h-[700px]">
        <Carousel />

        {/* Right Section (Action Area) */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between bg-background overflow-y-auto overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex-1 flex flex-col justify-center py-12 px-6 lg:px-16">
            <div className="max-w-md mx-auto w-full">
              {/* Header Row */}
              <div className="flex items-start justify-between mb-14">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10">
                    <img
                      className="w-full h-full object-contain"
                      src={stJamesHospitalLogo}
                      alt="St James Hospital"
                    />
                  </div>
                  <div>
                    <h2 className="font-semibold font-hanken text-txt">
                      St James Hospital
                    </h2>
                    <p className="text-xs text-[#333333]">
                      Optimize Patient Care with St. James—Sign Up in Minutes
                    </p>
                  </div>
                </div>

                <div
                  className="flex items-center justify-center"
                  onClick={() =>
                    from === "login"
                      ? navigate("/", { replace: true })
                      : navigate("/signup", { replace: true })
                  }
                >
                  <ArrowLeft
                    size={30}
                    strokeWidth={2.5}
                    className="p-1.5 bg-surface rounded-lg text-txt cursor-pointer hover:bg-gray-100 transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col animate-in fade-in duration-300">
                <AuthHeader
                  className={`${verifyOtpMutation.isError ? "mb-2" : "mb-15"}`}
                  title="Enter 6 digits OTP"
                  description={`A 6 Digit One-Time-Password was sent to the admin. Enter it below to activate your account.`}
                />

                {/* Backend Error Display */}
                {verifyOtpMutation.isError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
                    <p>Error: {verifyOtpMutation.error.message}</p>
                  </div>
                )}

                {/* Lock image */}
                <div className="flex justify-center mb-10">
                  <div className="w-25 h-25">
                    <img
                      src={otpLockImg}
                      alt="Security Lock"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* OTP inputs */}
                <div className="mb-10">
                  <label className="block text-txt mb-3 font-medium">
                    OTP Code
                  </label>
                  <OtpInput
                    onComplete={(val) => setOtpValue(val)}
                    // disabled={verifyOtpMutation.isPending}
                  />
                </div>

                {/* Submit */}
                <AuthBtn
                  onClick={handleVerify}
                  disabled={
                    otpValue.length !== 6 || verifyOtpMutation.isPending
                  }
                >
                  {verifyOtpMutation.isPending ? (
                    <div className="flex items-center justify-center gap-2">
                      Verifying... <Loader2 className="w-4 h-4 animate-spin" />
                    </div>
                  ) : (
                    "Verify Account"
                  )}
                </AuthBtn>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted">
            <AuthFooter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupOtp;

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ArrowLeft } from "lucide-react";

// // Assets
// import stJamesHospitalLogo from "@/assets/logos/st-peter-hospital.png";
// import otpLockImg from "../../../assets/auth/otp-lock.png";

// // Components
// import { OtpInput } from "./components/OtpInput";
// import { Carousel } from "../components/Carousel";
// import AuthBtn from "../components/AuthBtn";
// import { AuthHeader } from "../components/AuthHeader";
// import { AuthFooter } from "../components/AuthFooter";

// const SignupOtp = () => {
//   const [isVerified, setIsVerified] = useState(false);
//   const [otpValue, setOtpValue] = useState("");
//   const navigate = useNavigate();

//   const handleVerify = () => {
//     if (otpValue.length === 6) {
//       setIsVerified(true);
//     } else {
//       // Consider replacing with a toast notification component
//       alert("Please enter the full 6-digit code.");
//     }
//   };

//   return (
//     <div className="flex h-screen bg-background text-txt overflow-hidden">
//       <Carousel />

//       {/* Right Section (Action Area) */}
//       <div className="w-full lg:w-1/2 pt-20 flex flex-col justify-between bg-background">
//         <div className="max-w-md mx-auto w-full">
//           {/* Header Row */}
//           <div className="flex items-start justify-between mb-14">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10">
//                 <img
//                   className="w-full h-full object-contain"
//                   src={stJamesHospitalLogo}
//                   alt=""
//                 />
//               </div>
//               <div>
//                 <h2 className="text- font-semibold font-hanken text-txt">
//                   St James Hospital
//                 </h2>
//                 <p className="text-xs text-[#333333]">
//                   Optimize Patient Care with St. James—Sign Up in Minutes
//                 </p>
//               </div>
//             </div>
//             {/*  */}
//             <div
//               className="flex items-center justify-center"
//               onClick={() => navigate(-1)}
//             >
//               <ArrowLeft
//                 size={30}
//                 strokeWidth={2.5}
//                 className="p-1.5 bg-surface rounded-lg text-xt cursor-pointer"
//               />
//             </div>
//           </div>

//           <div className="flex flex-col animate-in fade-in duration-300">
//             <AuthHeader
//               className="mb-15"
//               title="Enter 6 digits OTP"
//               description="A 6 Digit One-Time-Password was sent to your Facility
//               Administrator. Enter it below to complete your Password"
//             />
//             {/* Lock image */}
//             <div className="flex justify-center mb-1">
//               <div className="w-25 h-25">
//                 <img
//                   src={otpLockImg}
//                   alt="Security Lock"
//                   className="w-full h-full object-contain"
//                 />
//               </div>
//             </div>
//             {/* OTP inputs */}
//             <div className="mb-10">
//               <label className="block text-txt mb-3">OTP</label>
//               <OtpInput onComplete={(val) => setOtpValue(val)} />
//             </div>
//             {/* Submit */}
//             <AuthBtn disabled={otpValue.length !== 6}>Verify</AuthBtn>
//           </div>
//         </div>
//         {/* Footer */}
//         <AuthFooter />
//       </div>
//     </div>
//   );
// };

// export default SignupOtp;
