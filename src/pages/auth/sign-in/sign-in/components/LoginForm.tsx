import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Mail, Lock, EyeOff, Eye, ArrowUpRight, Loader2 } from "lucide-react";

import { InputField } from "@/components/ui/InputField";
import { useLogin } from "@/api/auth/mutations/useLogin";
import StJamesHospitalLogo from "@/constant/logo/StJamesHospitalLogo";

export const LoginForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname;
  const loginMutation = useLogin();

  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent submission if fields are empty
    if (!emailOrUsername || !password) return;
    loginMutation.mutate(
      {
        email_or_username: emailOrUsername,
        password,
      },
      {
        onSuccess: () => {
          // Redirect to dashboard upon successful login
          navigate(from, { replace: true });
        },
        onError: (error) => {
          if (error.message.includes("Account yet to be activated")) {
            toast("Account not activated yet. Redirecting to verification...", {
              icon: "⚠️",

              style: {
                background: "#FFFBEB",
                borderColor: "#FEF3C7",
                color: "#78350F",
              },
              className:
                "font-hanken text-sm font-medium rounded-xl border px-4 py-3 shadow-lg",
            });

            setTimeout(() => {
              navigate("/signup/otp", {
                state: { email: emailOrUsername, from: "login" },
              });
            }, 3000);
          }
        },
      },
    );
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Hospital Header */}
      <StJamesHospitalLogo />

      <div className="mb-8">
        <h3 className="text-xl font-medium text-txt mb-1">
          Log in to your hospital's dashboard
        </h3>
        <p className="text-sm text-muted">
          Enter your username and password to continue
        </p>
      </div>

      {/* Backend Error Display */}
      {loginMutation.isError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
          <p>{loginMutation.error.message}</p>
        </div>
      )}

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
          disabled={loginMutation.isPending}
        />

        <InputField
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          leftIcon={<Lock className="w-4 h-4" />}
          rightIcon={
            showPassword ? (
              <Eye className="w-4 h-4 cursor-pointer" />
            ) : (
              <EyeOff className="w-4 h-4 cursor-pointer" />
            )
          }
          onRightIconClick={() => setShowPassword(!showPassword)}
          required
          disabled={loginMutation.isPending}
        />

        <div className="flex justify-start mb-6">
          <Link
            to="/auth/forgot-password"
            className="text-xs font-medium text-txt hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/95 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
        >
          {loginMutation.isPending ? (
            <>
              Logging in... <Loader2 className="w-4 h-4 animate-spin" />
            </>
          ) : (
            <>
              Login <ArrowUpRight strokeWidth={3.0} className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-txt-muted">
        Need an account?{" "}
        <Link to="/signup" className="font-bold text-primary hover:underline">
          Sign up here
        </Link>
      </p>
    </div>
  );
};
