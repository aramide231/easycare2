import { motion } from "framer-motion";
import { useState, ChangeEvent, FormEvent } from "react";

interface SigninFormData {
  email: string;
  password: string;
}

const Signin = () => {
  const [formData, setFormData] = useState<SigninFormData>({
    email: "",
    password: "",
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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="w-full bg-white"
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
        Welcome Back 👋
      </h2>

      <div className="flex flex-col gap-4">
        {/* Email Field */}
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
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none 
                       focus:ring-2 focus:ring-[#573FD1]/40 focus:border-[#573FD1] 
                       transition placeholder-gray-400 text-sm"
          />
        </div>

        {/* Password Field */}
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
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none 
                       focus:ring-2 focus:ring-[#573FD1]/40 focus:border-[#573FD1] 
                       transition placeholder-gray-400 text-sm"
          />
          <div className="flex justify-end mt-1">
            <a
              href="#"
              className="text-xs text-[#573FD1] hover:underline hover:text-[#4b37bb] transition"
            >
              Forgot Password?
            </a>
          </div>
        </div>
      </div>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="w-full mt-6 bg-[#573FD1] hover:bg-[#4b37bb] text-white font-semibold 
                   py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
      >
        Sign In
      </motion.button>

      <p className="text-xs text-center text-gray-500 mt-4">
        Don’t have an account?{" "}
        <span className="text-[#573FD1] font-medium cursor-pointer hover:underline">
          Create one
        </span>
      </p>
    </motion.form>
  );
};

export default Signin;
