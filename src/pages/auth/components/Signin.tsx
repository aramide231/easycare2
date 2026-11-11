import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { getRoleHomePath } from "@/lib/authRoutes";

// Define the form data structure
interface FormData {
  username: string;
  password: string;
}

const Signin = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setServerError(null);
    try {
      const loggedInUser = await signIn(data.username.trim(), data.password);
      if (loggedInUser) navigate(getRoleHomePath(loggedInUser.userRole), { replace: true });
    } catch (error) {
      setServerError(error instanceof Error ? error.message : "Unable to sign in. Please try again.");
    }
  };

  return (
    <div>
      <div className="my-5">
        <h4 className="text-[20px] font-bold">
          Log in to your hospital’s dashboard
        </h4>
        <p className="text-sm">Enter your username and password to continue</p>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {serverError && <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-700">{serverError}</p>}
        {/* Email */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username/Email
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
              type="text"
              autoComplete="username"
              disabled={isSubmitting}
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
              autoComplete="current-password"
              disabled={isSubmitting}
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
          disabled={isSubmitting}
          className="w-full bg-[#573fd1] text-white py-4 rounded font-bold"
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default Signin;
