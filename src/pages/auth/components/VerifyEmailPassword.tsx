import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Icon } from "@iconify/react";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormData {
  password: string;
  confirmPassword: string;
}

const VerifyEmailPassword = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [isVerified, setIsVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;

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

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Password Updated:", data);
  };

  return (
    <div className="">
      <Card className="w-full shadow-none border-none">
        <div className="">
          {isVerified ? (
            // Success Message
            <div className="mt-8">
              <h2 className="text-lg font-bold">Create a Password</h2>
              <p className="text-sm text-gray-500 mb-4">
                Set a new password to regain access.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Password Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="relative mt-1">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                      <Icon icon="mdi:lock-outline" width="20" />
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                      className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
                    >
                      <Icon
                        icon={showPassword ? "mdi:eye-off" : "mdi:eye"}
                        width="20"
                      />
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <div className="relative mt-1">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                      <Icon icon="mdi:lock-outline" width="20" />
                    </span>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      {...register("confirmPassword", {
                        required: "Confirm password is required",
                        validate: (value) =>
                          value === watch("password") ||
                          "Passwords do not match",
                      })}
                      className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
                    >
                      <Icon
                        icon={showConfirmPassword ? "mdi:eye-off" : "mdi:eye"}
                        width="20"
                      />
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-3 rounded-md font-bold hover:bg-purple-700 transition"
                >
                  Update Password
                </button>
              </form>
            </div>
          ) : (
            // OTP Input Form
            <>
              <h3 className="text-lg font-semibold text-gray-800">
                Two-Factor Authentication
              </h3>
              <p className="text-gray-500 mb-10">
                A code was sent to your email. Enter it below to complete your
                signup.
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
  );
};

export default VerifyEmailPassword;
