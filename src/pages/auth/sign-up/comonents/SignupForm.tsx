import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { Icon } from "@iconify/react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { useSignup } from "@/api/auth/mutations/useSignup";
import stJamesHospitalLogo from "../../../../assets/logos/st-peter-hospital.png";
import { InputField } from "@/components/ui/InputField";
import { CountryData } from "../../types/auth";
import { COUNTRY_PHONE_LENGTH, USER_ROLES } from "../../utils/constants";

const SignupForm = () => {
  const navigate = useNavigate();
  const signupMutation = useSignup();

  // Unified Form State
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    phone_no: "",
    user_role: "",
    password: "",
    password_confirmation: "",
    terms_agreed: false,
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

  // Dedicated phone handler
  const handlePhoneChange = (value: string, country: CountryData) => {
    const maxLength = COUNTRY_PHONE_LENGTH[country?.countryCode] || 10;
    const numericValue = value.replace(/\D/g, "");
    const trimmedValue = numericValue.slice(0, maxLength);

    // Sync directly into formData
    setFormData({ ...formData, phone_no: trimmedValue });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Frontend validations
    if (formData.password !== formData.password_confirmation) {
      return toast.error("Passwords do not match!");
    }

    if (!formData.terms_agreed) {
      return toast.error("You must agree to the Terms & Conditions.");
    }
    signupMutation.mutate(formData, {
      onSuccess: () => {
        // Navigate to OTP page and securely pass the email in memory
        navigate("/signup/otp", {
          state: { email: formData.email, from: "signup" },
          replace: true,
        });
      },
    });
    // signupMutation.mutate(formData, {
    //   onSuccess: (response) => {
    //     if (response.data?.token) {
    //       navigate("/frontdesk");
    //     } else {
    //       navigate("/login");
    //     }
    //   },
    // });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex justify-between">
        <div className="mb-8">
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
          </div>
          <h2 className="text-xl font-medium text-txt mb-1">
            Enter your details to create an account.
          </h2>
          <p className="text-sm text-muted">
            Join now to streamline patient care effortlessly.
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

      <form className="space-y-2 pb-3" onSubmit={handleSubmit}>
        {/* Row 1: Names */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="First Name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="John"
            leftIcon={<Icon icon="iconamoon:profile-thin" width="20" />}
            required
            disabled={signupMutation.isPending}
          />
          <InputField
            label="Last Name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Doe"
            leftIcon={<Icon icon="iconamoon:profile-thin" width="20" />}
            required
            disabled={signupMutation.isPending}
          />
        </div>

        {/* Row 2: Contact & Username */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="yourmail@gmail.com"
            leftIcon={<Icon icon="mdi:email-outline" width="20" />}
            required
            disabled={signupMutation.isPending}
          />
          <InputField
            label="Enter a Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="yourusername"
            leftIcon={<Icon icon="ci:user-01" width="20" />}
            required
            disabled={signupMutation.isPending}
          />
        </div>

        {/* Row 3: Role & Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Custom Select styling to match InputField */}
          <div className="flex flex-col w-full mb-4">
            <label className="mb-2 text-txt text-sm font-medium">
              User Role
            </label>
            <div className="relative flex items-center">
              <select
                name="user_role"
                value={formData.user_role}
                onChange={handleChange}
                required
                disabled={signupMutation.isPending}
                className="peer w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition-all focus:ring-1 focus:ring-primary focus:border-primary pl-10 appearance-none text-gray-600 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <option value="" disabled>
                  Select your role
                </option>
                {USER_ROLES.map((role) => (
                  <option key={role} value={role}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </option>
                ))}
              </select>
              <div className="absolute left-3 flex items-center justify-center text-gray-400 transition-colors peer-focus:text-gray-800 pointer-events-none">
                <Icon icon="iconamoon:profile-thin" width="20" />
              </div>
              <div className="absolute right-3 flex items-center justify-center text-gray-400 pointer-events-none">
                <Icon icon="mdi:chevron-down" width="20" />
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full mb-4">
            <label className="mb-2 text-txt text-sm font-medium">
              Phone Number
            </label>
            <PhoneInput
              country={"ng"}
              value={formData.phone_no}
              onChange={handlePhoneChange}
              disabled={signupMutation.isPending}
              containerClass="w-full"
              inputProps={{
                name: "phone_no",
                required: true,
              }}
              inputClass={`!w-full !h-[46px] !rounded-lg !border !border-gray-300 !bg-white !text-sm !outline-none focus:!border-primary focus:!ring-1 focus:!ring-primary disabled:!opacity-70 disabled:!cursor-not-allowed`}
              buttonClass="!border-gray-300 !bg-transparent !rounded-l-lg"
            />
          </div>
        </div>

        {/* Row 4: Passwords */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            disabled={signupMutation.isPending}
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
            disabled={signupMutation.isPending}
          />
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-start mt-2">
          <div className="flex items-center h-5">
            <input
              id="agreeTerms"
              name="terms_agreed"
              checked={formData.terms_agreed}
              onChange={handleChange}
              disabled={signupMutation.isPending}
              type="checkbox"
              className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary cursor-pointer disabled:opacity-70"
            />
          </div>
          <label
            htmlFor="agreeTerms"
            className="ml-2 text-sm text-gray-700 cursor-pointer"
          >
            I agree to the Terms & Conditions of EasyCare & St. James Hospital.
          </label>
        </div>

        {/* Submit Buttons */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={signupMutation.isPending}
            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/95 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
          >
            {signupMutation.isPending ? (
              <>
                Registering... <Loader2 className="w-4 h-4 animate-spin" />
              </>
            ) : (
              <>
                Register <ArrowRight strokeWidth={3.0} className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
