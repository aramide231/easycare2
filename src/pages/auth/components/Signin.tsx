import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

// Define the form data structure
interface FormData {
  username: string;
  password: string;
}

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Sign In Data", data);
  };

  return (
    <div>
      <div className="my-5">
        <h4 className="text-lg font-bold">
          Log in to your hospital’s dashboard
        </h4>
        <p className="text-sm">Enter your username and password to continue</p>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Username
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
            <input
              id="username"
              type="username"
              {...register("username", { required: true })}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.username && (
              <span className="text-red-500">Username is required</span>
            )}
          </div>
        </div>
        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="relative mt-1">
            {/* Profile Icon */}
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
              {...register("password", { required: "Password is required" })}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
        <Link
          to="/forgot-password"
          className="text-sm text-[#573fd1] font-bold"
        >
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
