// import { useState } from "react";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { Icon } from "@iconify/react";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "@/context/AuthContext";

// // Define the form data structure
// interface FormData {
//   username: string;
//   password: string;
// }

// const Signin = () => {
//   const navigate = useNavigate();
//   const { signIn } = useAuth();
//   const [showPassword, setShowPassword] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormData>();

//   const onSubmit: SubmitHandler<FormData> = async (data) => {
//     const success = await signIn(data.username, data.password); // 👈 Call signIn

//     if (success) {
//       navigate("/nurse/dashboard"); // 👈 Only navigate if login is successful
//     } else {
//       alert("Invalid username or password"); // Or display an inline error
//     }
//   };

//   return (
//     <div>
//       <div className="my-5">
//         <h4 className="text-[20px] font-bold">
//           Log in to your hospital’s dashboard
//         </h4>
//         <p className="text-sm">Enter your username and password to continue</p>
//       </div>
//       <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
//         {/* Email */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Username/Email
//           </label>
//           <div className="relative mt-1">
//             {/* Profile Icon */}
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Icon
//                 icon="iconamoon:profile-thin"
//                 width="24"
//                 height="24"
//                 className="text-gray-400"
//               />
//             </div>
//             <input
//               id="username"
//               type="text"
//               {...register("username", { required: true })}
//               className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             />
//             {errors.username && (
//               <span className="text-red-500">Username is required</span>
//             )}
//           </div>
//         </div>
//         {/* Password */}
//         <div>
//           <label
//             htmlFor="password"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Password
//           </label>
//           <div className="relative mt-1">
//             {/* Profile Icon */}
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Icon
//                 icon="solar:lock-password-linear"
//                 width="24"
//                 height="24"
//                 className="text-gray-400"
//               />
//             </div>
//             <input
//               id="password"
//               type={showPassword ? "text" : "password"}
//               {...register("password", { required: "Password is required" })}
//               className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute inset-y-0 right-0 pr-3 flex items-center"
//             >
//               <Icon
//                 icon={showPassword ? "mdi:eye-off" : "mdi:eye"}
//                 className="h-5 w-5 text-gray-500"
//               />
//             </button>
//           </div>
//           {errors.password && (
//             <p className="text-sm text-red-500">{errors.password.message}</p>
//           )}
//         </div>
//         <Link
//           to="/forgot-password"
//           className="text-sm text-[#573fd1] font-bold"
//         >
//           Forgot password?
//         </Link>
//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full bg-[#573fd1] text-white py-4 rounded font-bold"
//         >
//           Sign In
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Signin;
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface FormData {
  identifier: string; // username or email
  password: string;
}

const Signin = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const success = await signIn(data.identifier, data.password);

    if (success) {
      navigate("/nurse/dashboard");
    } else {
      alert("Invalid username/email or password");
    }
  };

  return (
    <div>
      <div className="my-5">
        <h4 className="text-[20px] font-bold">
          Log in to your hospital’s dashboard
        </h4>
        <p className="text-sm">Enter your username or email and password to continue</p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {/* Username/Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Username or Email
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
              id="identifier"
              type="text"
              {...register("identifier", {
                required: "Username or email is required",
                minLength: {
                  value: 3,
                  message: "Must be at least 3 characters",
                },
              })}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.identifier && (
              <p className="text-red-500 text-sm mt-1">
                {errors.identifier.message}
              </p>
            )}
          </div>
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon
                icon="solar:lock-password-linear"
                width="24"
                height="24"
                className="text-gray-400"
              />
            </div>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d).{6,}$/,
                  message: "Must contain at least one letter and one number",
                },
              })}
              className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
            <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Forgot Password */}
        <Link to="/forgot-password" className="text-sm text-[#573fd1] font-bold">
          Forgot password?
        </Link>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#573fd1] text-white py-4 rounded font-bold"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Signin;
