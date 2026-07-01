import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { apiFetch } from "@/api/client/apClient";
import { useAuthStore } from "@/store/useAuthStore";
import { LoginResponse } from "@/pages/auth/types/auth";

interface VerifyOtpPayload {
  email_or_username: string;
  otp: string;
}

export const useVerifyOtp = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (data: VerifyOtpPayload) =>
      apiFetch<LoginResponse>("/auth/verify_otp", {
        data,
      }),
    onSuccess: (response) => {
      toast.success(response.message || "Account verified successfully!");

      // Auto-login the user after successful verification
      if (response.data?.token && response.data?.user) {
        setAuth(response.data.token, response.data.user);
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "Invalid OTP. Please try again.");
    },
  });
};
