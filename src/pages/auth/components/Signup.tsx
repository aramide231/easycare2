// import { useForm, SubmitHandler } from "react-hook-form";
// import { useState } from "react";
// import { FiEye, FiEyeOff } from "react-icons/fi";
// // import { Router } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// // form data structure
// interface FormData {
//   firstName: string;
//   lastName: string;
//   phoneNumber: string;
//   email: string;
//   homeAddress: string;
//   username: string;
//   userRole: string;
//   userDesignation: string;
//   securityQuestions: string;
//   password: string;
//   confirmPassword: string;
//   countryCode: number;
//   gender: string;
//   userGender: string;
// }

// const Signup = () => {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm<FormData>();
//   // Submit handler with typed form data
//   const onSubmit: SubmitHandler<FormData> = (data) => {
//     console.log("Form Data", data);

//     navigate("/auth/Verification");
//   };
//   const password = watch("password");
//   // User roles and designations
//   const userRoles = [
//     "Accounts Officer",
//     "Cashier",
//     "Clinician",
//     "Consultant",
//     "Diagnostics Officer",
//     "Director",
//     "Front Desk Officer",
//     "Health Maintenance Officer (HMO)",
//     "Human Resource Manager (HRM)",
//     "IT",
//     "Nursing Officer",
//     "Pharm Officer",
//     "Protocol Officer",
//   ].sort();

//   const userDesignations = [
//     "Accountant",
//     "Admin",
//     "Cashier",
//     "HMO",
//     "IT",
//     "Laboratory",
//     "Matron",
//     "Nursing",
//     "Pharmacist",
//     "Physician",
//     "Protocols",
//     "Receptionist",
//     "Scan",
//     "Specialist",
//     "X-ray",
//   ].sort();

//   // Gender

//   const userGender = ["Male", "Female"];
//   return (
//     <div>
//       <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
//         <div className="flex  items-center gap-4">
//           {/* First Name */}
//           <div className="w-1/2">
//             <label className="block text-lg font-medium">First Name</label>
//             <input
//               type="text"
//               {...register("firstName", { required: true })}
//               className="w-full border-b-2 focus:outline-none focus:border-blue-500"
//             />
//             {errors.firstName && (
//               <span className="text-red-500">First Name is required</span>
//             )}
//           </div>

//           {/* Last Name */}
//           <div className="w-1/2">
//             <label className="block text-lg font-medium">Last Name</label>
//             <input
//               type="text"
//               {...register("lastName", { required: true })}
//               className="w-full  border-b-2 focus:outline-none focus:border-blue-500"
//             />
//             {errors.lastName && (
//               <span className="text-red-500">Last Name is required</span>
//             )}
//           </div>
//         </div>

//         {/* Phone Number */}
//         <div>
//           <label className="block text-lg font-medium">Phone Number</label>
//           <div className="flex gap-2">
//             {/* Country Code Dropdown */}
//             <select
//               {...register("countryCode", { required: true })}
//               className="w-1/4 p-2 border-b-2 focus:outline-none focus:border-blue-500"
//             >
//               <option value="+1">+1 </option>
//               <option value="+44">+44 </option>
//               <option value="+91">+91 </option>
//               <option value="+234">+234</option>
//               <option value="+61">+61 </option>
//             </select>

//             {/* Phone Number Input */}
//             <input
//               type="text"
//               {...register("phoneNumber", { required: true })}
//               className="w-2/4 border-b-2 focus:outline-none focus:border-blue-500"
//             />
//           </div>

//           {/* Error Message */}
//           {errors.phoneNumber && (
//             <span className="text-red-500">Phone Number is required</span>
//           )}
//         </div>

//         {/* Email */}
//         <div>
//           <label className="block text-lg font-medium">Email Address</label>
//           <input
//             type="email"
//             {...register("email", { required: true })}
//             className="w-full  border-b-2 focus:outline-none focus:border-blue-500"
//           />
//           {errors.email && (
//             <span className="text-red-500">Email Address is required</span>
//           )}
//         </div>

//         {/* Gender */}
//         <div className="flex gap-4">
//           <div className="w-1/2">
//             {/* Username */}

//             <label className="block text-lg font-medium">Username</label>
//             <input
//               type="text"
//               {...register("username", { required: true })}
//               className="w-full  border-b-2 focus:outline-none focus:border-blue-500"
//             />
//             {errors.username && (
//               <span className="text-red-500">Username is required</span>
//             )}
//           </div>

//           <div className="w-1/2">
//             <label className="block text-lg font-medium">Gender</label>
//             <select
//               {...register("userGender", { required: true })}
//               className="w-full border-b-2 focus:outline-none focus:border-blue-500"
//             >
//               {userGender.map((gender) => (
//                 <option key={gender} value={gender}>
//                   {gender}
//                 </option>
//               ))}
//             </select>
//             {errors.userGender && (
//               <span className="text-red-500">Gender is required</span>
//             )}
//           </div>
//         </div>

//         {/* User Role and Designation */}
//         <div className="flex gap-4">
//           <div className="w-1/2">
//             <label className="block text-lg font-medium">User Role</label>
//             <select
//               {...register("userRole", { required: true })}
//               className="w-full p-2 border-b-2 focus:outline-none focus:border-blue-500"
//             >
//               {userRoles.map((role) => (
//                 <option key={role} value={role}>
//                   {role}
//                 </option>
//               ))}
//             </select>
//             {errors.userRole && (
//               <span className="text-red-500">User Role is required</span>
//             )}
//           </div>

//           <div className="w-1/2">
//             <label className="block text-lg font-medium">
//               User Designation
//             </label>
//             <select
//               {...register("userDesignation", { required: true })}
//               className="w-full p-2 border-b-2 focus:outline-none focus:border-blue-500"
//             >
//               {userDesignations.map((designation) => (
//                 <option key={designation} value={designation}>
//                   {designation}
//                 </option>
//               ))}
//             </select>
//             {errors.userDesignation && (
//               <span className="text-red-500">User Designation is required</span>
//             )}
//           </div>
//         </div>

//         {/* Security Questions */}

//         <div className="">
//           <label className="block text-lg font-medium">
//             Security Questions
//           </label>
//           <input
//             type="text"
//             {...register("securityQuestions", { required: true })}
//             className="w-full  border-b-2 focus:outline-none focus:border-blue-500"
//           />
//           {errors.securityQuestions && (
//             <span className="text-red-500">
//               Security Questions are required
//             </span>
//           )}
//         </div>

//         <div className="flex gap-x-3">
//           {/* Password */}
//           <div className="w-1/2">
//             <label className="block text-lg font-medium">Password</label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 {...register("password", {
//                   required: "Password is required",
//                 })}
//                 className="w-full p-2 border-b-2 focus:outline-none focus:border-blue-500"
//               />
//               <span
//                 className="absolute right-2 top-2 text-xl cursor-pointer"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <FiEyeOff /> : <FiEye />}
//               </span>
//             </div>
//             {errors.password && (
//               <span className="text-red-500">{errors.password.message}</span>
//             )}
//           </div>

//           {/* Confirm Password */}
//           <div className="w-1/2">
//             <label className="block text-lg font-medium">
//               Confirm Password
//             </label>
//             <div className="relative">
//               <input
//                 type={showConfirmPassword ? "text" : "password"}
//                 {...register("confirmPassword", {
//                   required: "Confirm Password is required",
//                   validate: (value) =>
//                     value === password || "Passwords do not match",
//                 })}
//                 className="w-full p-2 border-b-2 focus:outline-none focus:border-blue-500"
//               />
//               <span
//                 className="absolute right-2 top-2 text-xl cursor-pointer"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               >
//                 {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
//               </span>
//             </div>
//             {errors.confirmPassword && (
//               <span className="text-red-500">
//                 {errors.confirmPassword.message}
//               </span>
//             )}
//           </div>
//         </div>
//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full bg-[#573fd7] text-white py-4 rounded font-bold"
//         >
//           Sign Up
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Signup;

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

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

const SignupForm = () => {
  const navigate = useNavigate();
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
    navigate("/auth/Verification");
  };

  const password = watch("password");

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
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              {/* Country Code Dropdown */}
              <select
                {...register("countryCode", {
                  required: "Country Code is required",
                })}
                className="flex-shrink-0 py-2 border border-gray-300 rounded-l-md bg-gray-50 text-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="+1">+1 (US)</option>
                <option value="+44">+44 (UK)</option>
                <option value="+91">+91 (IN)</option>
                <option value="+234">+234 (NG)</option>
                <option value="+61">+61 (AU)</option>
              </select>
              {/* Phone Number Input */}
              <input
                id="phoneNumber"
                type="text"
                {...register("phoneNumber", {
                  required: "Phone Number is required",
                })}
                className="flex-1 block w-full px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="8012345678"
              />
            </div>
            {errors.phoneNumber && (
              <p className="text-sm text-red-500">
                {errors.phoneNumber.message}
              </p>
            )}
            {errors.countryCode && (
              <p className="text-sm text-red-500">
                {errors.countryCode.message}
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
