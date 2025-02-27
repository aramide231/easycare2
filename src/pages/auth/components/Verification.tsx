import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Logo from "@/assets/icon/Frame 121.svg";
import ImageScreen from "@/assets/image/Signup Img.png";
import hospitalIcon from "@/assets/icon/Frame 5.svg";

const Verification = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [isVerified, setIsVerified] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return; // Only allow numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Focus next input
    if (value && e.target.nextElementSibling) {
      (e.target.nextElementSibling as HTMLInputElement).focus();
    }
  };

  const handleVerify = () => {
    if (otp.join("").length === 6) {
      setIsVerified(true); // Show success message
    }
  };

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
          <Card className="w-full shadow-none border-none">
            <div className="flex gap-3">
              <div className="icon-imag">
                <img src={hospitalIcon} alt="" />
              </div>
              <div className="">
                <h4 className="text-lg font-bold">St James Hospital</h4>
                <p className="text-sm">
                  Optimize Patient Care with St. James—Sign Up in Minutes
                </p>
              </div>
            </div>

            <div className="mt-10">
              {isVerified ? (
                // Success Message
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-800">
                    Account Created Successfully
                  </h3>
                  <p className="text-gray-500 mb-10">
                    You can now access your dashboard and manage patient care.
                  </p>
                  <div className="flex justify-center">
                    <Button className="w-[80%] h-[50px] bg-[#573fd1] text-white hover:bg-purple-700">
                      Go To Dashboard
                    </Button>
                  </div>
                </div>
              ) : (
                // OTP Input Form
                <>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Two-Factor Authentication
                  </h3>
                  <p className="text-gray-500 mb-10">
                    A code was sent to your email. Enter it below to complete
                    your signup.
                  </p>

                  <div className="flex justify-center gap-5 my-12">
                    {otp.map((digit, index) => (
                      <Input
                        key={index}
                        type="text"
                        maxLength={1}
                        className="w-12 h-12 text-center text-xl border rounded-lg"
                        value={digit}
                        onChange={(e) => handleChange(e, index)}
                        onFocus={(e) => e.target.select()}
                      />
                    ))}
                  </div>

                  <div className="flex justify-center">
                    <Button
                      onClick={handleVerify}
                      className="w-[80%] h-[50px] bg-[#573fd1] text-white hover:bg-purple-700"
                    >
                      Verify
                    </Button>
                  </div>

                  <p className="text-sm text-center text-gray-500">
                    Didn't receive the code?{" "}
                    <button className="text-[#573fd1] hover:underline">
                      Resend
                    </button>
                  </p>
                </>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Verification;
