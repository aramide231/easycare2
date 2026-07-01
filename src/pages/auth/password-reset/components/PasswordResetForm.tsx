import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Icon } from "@iconify/react";
import "react-phone-input-2/lib/style.css";

import { InputField } from "@/components/ui/InputField";
import StJamesHospitalLogo from "@/constant/logo/StJamesHospitalLogo";
import AuthBtn from "../../components/AuthBtn";

const PasswordResetForm = () => {
  const navigate = useNavigate();

  // Unified Form State
  const [formData, setFormData] = useState({
    password: "",
    password_confirmation: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Standard input handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;

    // Handle checkbox separately
    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.password_confirmation) {
      return toast.error("Passwords do not match!");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex justify-between">
        <div className="mb-8">
          {/* Header Hospital Logo */}
          <StJamesHospitalLogo text="Let's reset your password" />

          <h2 className="text-xl font-medium text-txt mb-1">
            Create a Password
          </h2>
          <p className="text-sm text-muted">
            Set a new password to regain access
          </p>
        </div>

        <div onClick={() => navigate(-1)}>
          <ArrowLeft
            size={30}
            strokeWidth={2.5}
            className="p-1.5 bg-surface rounded-lg text-txt cursor-pointer hover:bg-gray-100 transition-colors"
          />
        </div>
      </div>

      <form className="space-y-2 pb-3 " onSubmit={handleSubmit}>
        {/* Row 4: Passwords */}
        <div className="flex flex-col gap-4">
          <InputField
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            type={showPassword ? "text" : "password"}
            placeholder="*********"
            leftIcon={<Icon icon="mdi:lock-outline" width="20" />}
            rightIcon={
              <Icon
                icon={showPassword ? "mdi:eye-off" : "mdi:eye"}
                width="20"
                className="cursor-pointer"
              />
            }
            onRightIconClick={() => setShowPassword(!showPassword)}
            required
            // disabled={signupMutation.isPending}
          />
          <InputField
            label="Confirm Password"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleChange}
            type={showConfirmPassword ? "text" : "password"}
            placeholder="*********"
            leftIcon={<Icon icon="mdi:lock-outline" width="20" />}
            rightIcon={
              <Icon
                icon={showConfirmPassword ? "mdi:eye-off" : "mdi:eye"}
                width="20"
                className="cursor-pointer"
              />
            }
            onRightIconClick={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
            required
            // disabled={signupMutation.isPending}
          />
        </div>

        {/* Submit Buttons */}
        <div className="pt-6">
          <AuthBtn>Update Password</AuthBtn>
        </div>
      </form>
    </div>
  );
};

export default PasswordResetForm;
