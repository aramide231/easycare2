import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { LoginResponse } from "@/pages/auth/types/auth";

interface VerifyOtpPayload {
  email_or_username: string;
  otp: string;
}

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: async (data: VerifyOtpPayload): Promise<LoginResponse> => {
      void data;
      throw new Error("Staff activation and recovery are handled by your hospital administrator.");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Invalid OTP. Please try again.");
    },
  });
};
