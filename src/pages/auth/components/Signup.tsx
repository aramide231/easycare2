import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

// Define the form data structure
interface FormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  homeAddress: string;
  username: string;
  userRole: string;
  userDesignation: string;
  securityQuestions: string;
  password: string;
  confirmPassword: string;
  countryCode: number;
}

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  // Submit handler with typed form data
  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Form Data", data);
  };

  const password = watch("password");

  // User roles and designations
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
  ].sort();

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

  return (
    <div>
      {/* Right Section */}
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex  items-center gap-x-2">
          {/* First Name */}
          <div className="w-1/2">
            <label className="block text-lg font-medium">First Name</label>
            <input
              type="text"
              {...register("firstName", { required: true })}
              className="w-full border-b-2 focus:outline-none focus:border-blue-500"
            />
            {errors.firstName && (
              <span className="text-red-500">First Name is required</span>
            )}
          </div>

          {/* Last Name */}
          <div className="w-1/2">
            <label className="block text-lg font-medium">Last Name</label>
            <input
              type="text"
              {...register("lastName", { required: true })}
              className="w-full  border-b-2 focus:outline-none focus:border-blue-500"
            />
            {errors.lastName && (
              <span className="text-red-500">Last Name is required</span>
            )}
          </div>
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-lg font-medium">Phone Number</label>
          <div className="flex gap-2">
            {/* Country Code Dropdown */}
            <select
              {...register("countryCode", { required: true })}
              className="w-1/4 p-2 border-b-2 focus:outline-none focus:border-blue-500"
            >
              <option value="+1">+1 </option>
              <option value="+44">+44 </option>
              <option value="+91">+91 </option>
              <option value="+234">+234</option>
              <option value="+61">+61 </option>
              {/* Add more country codes as needed */}
            </select>

            {/* Phone Number Input */}
            <input
              type="text"
              {...register("phoneNumber", { required: true })}
              className="w-2/4 border-b-2 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Error Message */}
          {errors.phoneNumber && (
            <span className="text-red-500">Phone Number is required</span>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-lg font-medium">Email Address</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full  border-b-2 focus:outline-none focus:border-blue-500"
          />
          {errors.email && (
            <span className="text-red-500">Email Address is required</span>
          )}
        </div>

        {/* Home Address */}
        <div>
          <label className="block text-lg font-medium">Home Address</label>
          <input
            type="text"
            {...register("homeAddress", { required: true })}
            className="w-full  border-b-2 focus:outline-none focus:border-blue-500"
          />
          {errors.homeAddress && (
            <span className="text-red-500">Home Address is required</span>
          )}
        </div>

        {/* User Role and Designation */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-lg font-medium">User Role</label>
            <select
              {...register("userRole", { required: true })}
              className="w-full p-2 border-b-2 focus:outline-none focus:border-blue-500"
            >
              {userRoles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            {errors.userRole && (
              <span className="text-red-500">User Role is required</span>
            )}
          </div>

          <div className="w-1/2">
            <label className="block text-lg font-medium">
              User Designation
            </label>
            <select
              {...register("userDesignation", { required: true })}
              className="w-full p-2 border-b-2 focus:outline-none focus:border-blue-500"
            >
              {userDesignations.map((designation) => (
                <option key={designation} value={designation}>
                  {designation}
                </option>
              ))}
            </select>
            {errors.userDesignation && (
              <span className="text-red-500">User Designation is required</span>
            )}
          </div>
        </div>

        {/* Security Questions */}
        <div className="flex gap-x-2">
          <div className="w-1/2">
            <label className="block text-lg font-medium">
              Security Questions
            </label>
            <input
              type="text"
              {...register("securityQuestions", { required: true })}
              className="w-full  border-b-2 focus:outline-none focus:border-blue-500"
            />
            {errors.securityQuestions && (
              <span className="text-red-500">
                Security Questions are required
              </span>
            )}
          </div>

          <div className="w-1/2">
            {/* Username */}

            <label className="block text-lg font-medium">Username</label>
            <input
              type="text"
              {...register("username", { required: true })}
              className="w-full  border-b-2 focus:outline-none focus:border-blue-500"
            />
            {errors.username && (
              <span className="text-red-500">Username is required</span>
            )}
          </div>
        </div>

        <div className="flex gap-x-3">
          {/* Password */}
          <div className="w-1/2">
            <label className="block text-lg font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                })}
                className="w-full p-2 border-b-2 focus:outline-none focus:border-blue-500"
              />
              <span
                className="absolute right-2 top-2 text-xl cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>

          {/* Confirm Password */}
          <div className="w-1/2">
            <label className="block text-lg font-medium">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="w-full p-2 border-b-2 focus:outline-none focus:border-blue-500"
              />
              <span
                className="absolute right-2 top-2 text-xl cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
            {errors.confirmPassword && (
              <span className="text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#573fd7] text-white py-4 rounded"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
