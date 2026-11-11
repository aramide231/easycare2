import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { apiFetch } from "@/api/client/apClient";
import { LoginResponse } from "@/pages/auth/types/auth";

interface VerifyOtpPayload {
  email_or_username: string;
  otp: string;
}

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: (data: VerifyOtpPayload) =>
      apiFetch<LoginResponse>("/auth/verify_otp", {
        data,
      }),
    onSuccess: (response) => {
      toast.success(response.message || "Account verified successfully!");

    },
    onError: (error: Error) => {
      toast.error(error.message || "Invalid OTP. Please try again.");
    },
  });
};
