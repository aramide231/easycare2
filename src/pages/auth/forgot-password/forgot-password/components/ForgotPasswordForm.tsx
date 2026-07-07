import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";

import { InputField } from "@/components/ui/InputField";
import StJamesHospitalLogo from "@/constant/logo/StJamesHospitalLogo";
import AuthBtn from "../../components/AuthBtn";

export const ForgotPasswordForm: React.FC = () => {
  // const location = useLocation();
  const navigate = useNavigate();
  // const from = location.state?.from?.pathname;

  const [emailOrUsername, setEmailOrUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailOrUsername) {
      return toast.error("Please input your email or username");
    }

    navigate("/auth/password-reset");
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Hospital Header */}
      <StJamesHospitalLogo text="Let's reset your password" />

      <div className="mb-8">
        <h3 className="text-xl font-medium text-txt mb-1">Forgot Password?</h3>
        <p className="text-sm text-muted">
          Type your email or username to reset your password
        </p>
      </div>

      {/* Backend Error Display */}
      {/* {loginMutation.isError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
          <p>{loginMutation.error.message}</p>
        </div>
      )} */}

      {/* Form */}
      <form className="w-full" onSubmit={handleSubmit}>
        <InputField
          label="Email / Username"
          type="text"
          placeholder="johndoe@gmail.com"
          value={emailOrUsername}
          onChange={(e) => setEmailOrUsername(e.target.value)}
          leftIcon={<Mail className="w-4 h-4" />}
          required
          // disabled={loginMutation.isPending}
        />
        <div className="mt-20">
          <AuthBtn>Send</AuthBtn>
        </div>
      </form>

      <p className="mt-6 text-center text-sm text-txt-muted">
        Remember Password?{" "}
        <Link to="/" className="font-bold text-primary hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};
