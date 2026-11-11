// src/features/auth/api/useSignup.ts
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { apiFetch } from "@/api/client/apClient";
import { SignupPayload, SignupResponse } from "@/pages/auth/types/auth";

export const useSignup = () => {
  return useMutation({
    mutationFn: (userData: SignupPayload) =>
      apiFetch<SignupResponse>("/auth/register", {
        data: userData,
      }),

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
