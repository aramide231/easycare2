 import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Icon } from "@iconify/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

interface FormData {
  password: string;
  confirmPassword: string;
}

const VerifyEmailPassword = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [isVerified, setIsVerified] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && e.target.nextElementSibling) {
      (e.target.nextElementSibling as HTMLInputElement).focus();
    }
  };

  const handleVerify = () => {
    const code = otp.join("");
    if (code.length === 6 && /^\d{6}$/.test(code)) {
      setIsVerified(true);
    } else {
      toast.error("Please enter a valid 6-digit OTP.");
    }
  };

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Password Updated:", data);
    toast.success("Password updated successfully!");
    setPasswordUpdated(true);

    // Redirect after 3 seconds
    setTimeout(() => {
      navigate("/?tab=signin");
    }, 3000);
  };

  const handleResend = () => {
    toast("OTP resent!", { icon: "🔄" });
  };

  return (
    <>
      <Toaster position="top-center" />

      <div>
        <Card className="w-full shadow-none border-none">
          <div>
            {!isVerified && !passwordUpdated && (
              <>
                <h3 className="text-lg mt-10 font-semibold text-gray-800">One Time Password</h3>
                <p className="text-gray-500 text-sm mb-4">
                  A code was sent to your administrator. Enter it below to reset your password.
                </p>

                <div className="flex justify-center my-6">
                  <img src="/src/assets/reset password.svg" alt="OTP Illustration" className="w-40 h-auto" />
                </div>

                <div className="mb-2">
                  <p className="font-medium">OTP</p>
                </div>

                <div className="flex justify-center gap-5 mb-8">
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

                <p className="text-sm text-center text-gray-500 mt-4">
                  Didn't receive the code?{" "}
                  <button
                    className="text-[#573fd1] hover:underline"
                    onClick={handleResend}
                  >
                    Resend
                  </button>
                </p>
              </>
            )}

            {isVerified && !passwordUpdated && (
              <div className="mt-8">
                <h2 className="text-lg font-bold">Create a Password</h2>
                <p className="text-sm text-gray-500 mb-4">Set a new password to regain access.</p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <div className="relative mt-1">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <Icon icon="mdi:lock-outline" width="20" />
                      </span>
                      <input
                        type={showPassword ? "text" : "password"}
                        {...register("password", {
                          required: "Password is required",
                          minLength: { value: 6, message: "Password must be at least 6 characters" },
                        })}
                        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
                      >
                        <Icon icon={showPassword ? "mdi:eye-off" : "mdi:eye"} width="20" />
                      </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <div className="relative mt-1">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <Icon icon="mdi:lock-outline" width="20" />
                      </span>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        {...register("confirmPassword", {
                          required: "Confirm password is required",
                          validate: (value) => value === watch("password") || "Passwords do not match",
                        })}
                        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
                      >
                        <Icon icon={showConfirmPassword ? "mdi:eye-off" : "mdi:eye"} width="20" />
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-purple-600 text-white py-3 rounded-md font-bold hover:bg-purple-700 transition"
                  >
                    Update Password
                  </button>
                </form>
              </div>
            )}

            {passwordUpdated && (
              <div className="text-center py-16">
                <Icon icon="mdi:check-circle-outline" width={60} className="mx-auto mb-4 text-green-600" />
                <h2 className="text-2xl font-semibold mb-2">Password Updated Successfully!</h2>
                <p className="text-gray-600 mb-6">Redirecting you to sign in...</p>
                <Button
                  className="bg-purple-600"
                  onClick={() => navigate("/?tab=signin")}
                >
                  Go to Sign In Now
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </>
  );
};

export default VerifyEmailPassword;