import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";

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
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      {/* Email */}
      <div>
        <label className="block text-lg font-medium">Username</label>
        <input
          type="username"
          {...register("username", { required: true })}
          className="w-full border-b-2 focus:outline-none focus:border-blue-500"
        />
        {errors.username && (
          <span className="text-red-500">username Address is required</span>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="block text-lg font-medium">Password</label>
        <div className="relative p-2">
          <input
            type={showPassword ? "text" : "password"}
            {...register("password", { required: true })}
            className="w-full border-b-2 focus:outline-none focus:border-blue-500"
          />
          <span
            className="absolute right-2 top-2 text-xl cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </span>
        </div>
        {errors.password && (
          <span className="text-red-500">Password is required</span>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-[#573fd7] text-white py-4 rounded"
      >
        Sign In
      </button>
    </form>
  );
};

export default Signin;
