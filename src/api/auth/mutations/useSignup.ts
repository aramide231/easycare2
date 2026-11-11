// src/features/auth/api/useSignup.ts
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { SignupPayload, SignupResponse } from "@/pages/auth/types/auth";

export const useSignup = () => {
  return useMutation({
    mutationFn: async (userData: SignupPayload): Promise<SignupResponse> => {
      void userData;
      throw new Error("Contact your hospital administrator to create a staff account.");
    },

    onSuccess: (response) => {
      toast.success(response.message || "Account created successfully!");

    },

    onError: (error: Error) => {
      toast.error(
        error.message || "Failed to create account. Please try again.",
      );
    },
  });
};
