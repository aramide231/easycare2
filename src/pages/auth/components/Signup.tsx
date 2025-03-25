import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  userRole: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
  countryCode: number;
  userDesignations: string;
  userGender: string;
}

const countryPhoneLength: { [key: string]: number } = {
  us: 10, // United States
  uk: 10, // United Kingdom
  in: 10, // India
  ng: 10, // Nigeria
  au: 9, // Australia
};

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

  // Submit handler with typed form data
  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Form Data", data);
    navigate("/auth/Verification");
  };

  const password = watch("password");

  const handlePhoneChange = (value: string, country: any) => {
    const maxLength = countryPhoneLength[country?.countryCode] || 10; // Default length if country not listed
    const numericValue = value.replace(/\D/g, ""); // Remove non-numeric characters
    const trimmedValue = numericValue.slice(0, maxLength); // Limit to max length

    setValue("phoneNumber", trimmedValue, { shouldValidate: true });
  };

  // User roles for the dropdown
  const userRoles = [
    "Accounts Officer",
    "Cashier",
    "Clinician",
    "Consultant",
    "Diagnostics Officer",
    "Director",
    "Front Desk Officer",
    "Health Maintenance Officer (HMO)",
    "Human Resource Manager (HRM)",
    "IT",
    "Nursing Officer",
    "Pharm Officer",
    "Protocol Officer",
  ];
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

  // Gender

  const userGender = ["Male", "Female"];

  return (
    <div>
      <div className=" my-5">
        <h2 className="text-lg font-bold">
          Enter your details to create an account.
        </h2>
        <p className="text-sm">
          Join now to streamline patient care effortlessly.
        </p>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
              {/* Profile Icon */}
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon
                  icon="iconamoon:profile-thin"
                  width="24"
                  height="24"
                  className="text-gray-400"
                />
              </div>
              {/* Input Field */}
              <input
                id="firstName"
                type="text"
                {...register("firstName", {
                  required: "First Name is required",
                })}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                // placeholder="Enter your first name"
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
                {...register("lastName", { required: "Last Name is required" })}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.lastName && (
                <p className="text-sm text-red-500">
                  {errors.lastName.message}
                </p>
              )}
            </div>
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
              {/* Profile Icon */}
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
                {...register("email", { required: "Email is required" })}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
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
              {/* Profile Icon */}
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
                {...register("username", { required: "Username is required" })}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.username && (
                <p className="text-sm text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          {/* Gender */}
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <div className="relative mt-1">
              {/* Profile Icon */}
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
              >
                {" "}
                {userGender.map((gender) => (
                  <option key={gender} value={gender}>
                    {gender}
                  </option>
                ))}
              </select>
              {errors.userGender && (
                <span className="text-red-500">Gender is required</span>
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
              {/* Profile Icon */}
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
              >
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
        {/* User Role */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <label
              htmlFor="userRole"
              className="block text-sm font-medium text-gray-700"
            >
              User Role
            </label>
            <div className="relative mt-1">
              {/* Profile Icon */}
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
              >
                <option value="">Select your role</option>
                {userRoles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              {errors.userRole && (
                <p className="text-sm text-red-500">
                  {errors.userRole.message}
                </p>
              )}
            </div>
          </div>
          {/* Phone Number */}
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <div className="mt-1">
              <PhoneInput
                country={"ng"} // Default country
                enableSearch={true}
                inputClass="!w-full !border-gray-300"
                dropdownClass="!border-gray-300"
                onChange={handlePhoneChange}
              />
            </div>
            {errors.phoneNumber && (
              <p className="text-sm text-red-500">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-4">
          {/* Password */}
          <div className="w-1/2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <Icon
                  icon={showPassword ? "mdi:eye-off" : "mdi:eye"}
                  className="h-5 w-5 text-gray-500"
                />
              </button>
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
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <Icon
                  icon={showConfirmPassword ? "mdi:eye-off" : "mdi:eye"}
                  className="h-5 w-5 text-gray-500"
                />
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>
        {/* Terms and Conditions */}
        <div>
          <div className="flex items-center">
            <input
              id="agreeTerms"
              type="checkbox"
              {...register("agreeTerms", {
                required: "You must agree to the terms",
              })}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label
              htmlFor="agreeTerms"
              className="ml-2 block text-sm text-gray-900"
            >
              I agree to the Terms & Conditions of EasyCare & St. James
              Hospital.
            </label>
          </div>
          {errors.agreeTerms && (
            <p className="text-sm text-red-500">{errors.agreeTerms.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full h-[50px] flex justify-center items-center content-center  border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#573fd1] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <div className="flex gap-2">
              Register
              <span>
                <Icon
                  icon="material-symbols-light:arrow-forward-rounded"
                  width="24"
                  height="24"
                />
              </span>
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
