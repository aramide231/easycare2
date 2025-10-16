import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useAuth } from "@/context/AuthContext";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  userRole: "frontdesk" | "nurse" | "doctor" | "admin";
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
  countryCode: number;
  userDesignations: string;
  userGender: string;
}

const countryPhoneLength: { [key: string]: number } = {
  us: 10,
  uk: 10,
  in: 10,
  ng: 10,
  au: 9,
};
interface CountryData {
  name: string;
  dialCode: string;
  countryCode: string;
  format?: string;
}

const SignupForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const { signup } = useAuth();

  const [signupError, setSignupError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setSignupError(null);
    try {
      await signup(data);
      navigate("/auth/Verification");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Signup failed", error);
        setSignupError(error.message);
      } else {
        console.error("Signup failed", error);
        setSignupError("Signup failed. Please try again.");
      }
    }
  };

  const password = watch("password");

  const handlePhoneChange = (value: string, country: CountryData) => {
    const maxLength = countryPhoneLength[country?.countryCode] || 10;
    const numericValue = value.replace(/\D/g, "");
    const trimmedValue = numericValue.slice(0, maxLength);

    setValue("phoneNumber", trimmedValue, { shouldValidate: true });
  };

  const userRoles = ["frontdesk", "nurse", "doctor", "admin"];

  const userDesignations = [
    "Accountant",
    "Admin",
    "Cashier",
    "HMO",
    "IT",
    "Laboratory",
    "Matron",
    "Nursing",
    "Pharmacist",
    "Physician",
    "Protocols",
    "Receptionist",
    "Scan",
    "Specialist",
    "X-ray",
  ].sort();

  const userGender = ["Male", "Female"];

  return (
    <div>
      <div className="my-5">
        <h2 className="text-lg font-bold">
          Enter your details to create an account.
        </h2>
        <p className="text-sm">
          Join now to streamline patient care effortlessly.
        </p>
      </div>
      
      {/* Display submission error if any */}
      {signupError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          <p>{signupError}</p>
        </div>
      )}
      
  <form className="space-y-6 pb-24" onSubmit={handleSubmit(onSubmit)}>
        {/* First Name and Last Name */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon
                  icon="iconamoon:profile-thin"
                  width="24"
                  height="24"
                  className="text-gray-400"
                />
              </div>
              <input
                id="firstName"
                type="text"
                {...register("firstName", {
                  required: "First Name is required",
                  minLength: {
                    value: 2,
                    message: "First Name must be at least 2 characters",
                  },
                  maxLength: {
                    value: 30,
                    message: "First Name cannot exceed 30 characters",
                  },
                })}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            {errors.firstName && (
              <p className="text-sm text-red-500">{errors.firstName.message}</p>
            )}
          </div>
          <div className="w-1/2">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon
                  icon="iconamoon:profile-thin"
                  width="24"
                  height="24"
                  className="text-gray-400"
                />
              </div>
              <input
                id="lastName"
                type="text"
                {...register("lastName", {
                  required: "Last Name is required",
                  minLength: {
                    value: 2,
                    message: "Last Name must be at least 2 characters",
                  },
                  maxLength: {
                    value: 30,
                    message: "Last Name cannot exceed 30 characters",
                  },
                })}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            {errors.lastName && (
              <p className="text-sm text-red-500">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          {/* Email */}
          <div className="w-1/2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon
                  icon="mdi:email-outline"
                  width="24"
                  height="24"
                  className="text-gray-400"
                />
              </div>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          {/* Username */}
          <div className="w-1/2">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Create a Username
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon
                  icon="ci:user-01"
                  width="24"
                  height="24"
                  className="text-gray-400"
                />
              </div>
              <input
                id="username"
                type="text"
                {...register("username", {
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Username must be at least 3 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "Username cannot exceed 20 characters",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9_]+$/,
                    message:
                      "Username can only contain letters, numbers, and underscores",
                  },
                })}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username.message}</p>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          {/* Gender */}
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon
                  icon="iconamoon:profile-thin"
                  width="24"
                  height="24"
                  className="text-gray-400"
                />
              </div>
              <select
                {...register("userGender", { required: "Gender is required" })}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                defaultValue=""
              >
                <option value="">Select Gender</option>

                {userGender.map((gender) => (
                  <option key={gender} value={gender}>
                    {gender}
                  </option>
                ))}
              </select>
              {errors.userGender && (
                <span className="text-red-500">
                  {errors.userGender.message}
                </span>
              )}
            </div>
          </div>
          {/* User Designation */}
          <div className="w-1/2">
            <label
              htmlFor="userDesignations"
              className="block text-sm font-medium text-gray-700"
            >
              User Designation
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon
                  icon="iconamoon:profile-thin"
                  width="24"
                  height="24"
                  className="text-gray-400"
                />
              </div>
              <select
                id="userDesignations"
                {...register("userDesignations", {
                  required: "User Designation is required",
                })}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                defaultValue=""
              >
                <option value="">Select Designation</option>

                {userDesignations.map((designation) => (
                  <option key={designation} value={designation}>
                    {designation}
                  </option>
                ))}
              </select>
              {errors.userDesignations && (
                <p className="text-sm text-red-500">
                  {errors.userDesignations.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          {/* User Role */}
          <div className="w-1/2">
            <label
              htmlFor="userRole"
              className="block text-sm font-medium text-gray-700"
            >
              User Role
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon
                  icon="iconamoon:profile-thin"
                  width="24"
                  height="24"
                  className="text-gray-400"
                />
              </div>
              <select
                id="userRole"
                {...register("userRole", { required: "User Role is required" })}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                defaultValue=""
              >
                <option value="">Select your role</option>
                {userRoles.map((role) => (
                  <option key={role} value={role}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </option>
                ))}
              </select>
              {errors.userRole && (
                <span className="text-red-500">{errors.userRole.message}</span>
              )}
            </div>
          </div>

          {/* Phone Number */}
          <div className="w-1/2">
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <PhoneInput
              country={"ng"}
              value={watch("phoneNumber")}
              onChange={handlePhoneChange}
              inputProps={{
                name: "phoneNumber",
                required: true,
                className:
                  "block w-full pl-14 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500",
              }}
            />
            {errors.phoneNumber && (
              <p className="text-sm text-red-500">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>
        </div>

        {/* Password and Confirm Password */}
        <div className="flex gap-4">
          {/* Password */}
          <div className="w-1/2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative mt-1">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="block w-full pr-10 py-2 pl-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                <Icon
                  icon={showPassword ? "mdi:eye-off" : "mdi:eye"}
                  width="24"
                  height="24"
                  className="text-gray-400"
                />
              </div>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="w-1/2">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <div className="relative mt-1">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="block w-full pr-10 py-2 pl-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Icon
                  icon={showConfirmPassword ? "mdi:eye-off" : "mdi:eye"}
                  width="24"
                  height="24"
                  className="text-gray-400"
                />
              </div>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-center">
          <input
            id="agreeTerms"
            type="checkbox"
            {...register("agreeTerms", {
              required:
                "You must agree to the terms and conditions of EasyCare & St. James Hospital.",
            })}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label
            htmlFor="agreeTerms"
            className="ml-2 block text-sm text-gray-900"
          >
            I agree to the Terms & Conditions of EasyCare & St. James Hospital.
          </label>
        </div>
        {errors.agreeTerms && (
          <p className="text-sm text-red-500">{errors.agreeTerms.message}</p>
        )}

        {/* Error message */}
        {signupError && <p className="text-sm text-red-500">{signupError}</p>}

        {/* <button
      type="submit"
      className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
    >
       Register
               <span>
                 <Icon
                   icon="material-symbols-light:arrow-forward-rounded"
                   width="24"
                   height="24"
                 />
               </span>
    </button> */}
        {/* Desktop / tablet submit button */}
        <button
          type="submit"
          className="hidden md:flex w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 justify-center items-center gap-2"
        >
          Register
          <Icon
            icon="material-symbols-light:arrow-forward-rounded"
            width="24"
            height="24"
          />
        </button>

        {/* Mobile sticky submit bar (inside form so it submits) */}
        <div className="md:hidden sticky bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm py-3 border-t">
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700"
          >
            <div className="flex justify-center items-center gap-2">
              Register
              <Icon
                icon="material-symbols-light:arrow-forward-rounded"
                width="24"
                height="24"
              />
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;

