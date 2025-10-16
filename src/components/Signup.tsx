import { motion } from "framer-motion";
import { useState, ChangeEvent, FormEvent } from "react";

interface SignupFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35 }}
      className="w-full h-full bg-white px-8 py-6 flex flex-col justify-center"
    >
      {/* Header */}
      <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
        Create your account ✨
      </h2>

      {/* Input Fields */}
      <div className="flex flex-col gap-5">
        {/* Full Name */}
        <div>
          <label className="text-sm text-gray-600 font-medium mb-1 block">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 
                       focus:outline-none focus:ring-2 focus:ring-[#573FD1]/40 
                       focus:border-[#573FD1] transition placeholder-gray-400 text-base"
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-sm text-gray-600 font-medium mb-1 block">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 
                       focus:outline-none focus:ring-2 focus:ring-[#573FD1]/40 
                       focus:border-[#573FD1] transition placeholder-gray-400 text-base"
          />
        </div>

        {/* Password Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="text-sm text-gray-600 font-medium mb-1 block">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 
                         focus:outline-none focus:ring-2 focus:ring-[#573FD1]/40 
                         focus:border-[#573FD1] transition placeholder-gray-400 text-base"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 font-medium mb-1 block">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="********"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 
                         focus:outline-none focus:ring-2 focus:ring-[#573FD1]/40 
                         focus:border-[#573FD1] transition placeholder-gray-400 text-base"
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-8 bg-[#573FD1] hover:bg-[#4b37bb] text-white font-semibold 
                   py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-base"
      >
        Sign Up
      </motion.button>

      {/* Footer */}
      <p className="text-sm text-center text-gray-500 mt-6">
        Already have an account?{" "}
        <span className="text-[#573FD1] font-medium cursor-pointer hover:underline">
          Sign in instead
        </span>
      </p>
    </motion.form>
  );
};

export default Signup;
