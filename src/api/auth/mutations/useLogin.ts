import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { loginStaff } from "@/api/auth/session";
import type { LoginPayload } from "@/pages/auth/types/auth";

export const useLogin = () => {
  return useMutation({
    mutationFn: (credentials: LoginPayload) =>
      loginStaff(credentials.email_or_username || credentials.email || "", credentials.password),
    onSuccess: () => {
      toast.success("Logged in successfully!");
    },

    onError: (error: Error) => {
      if (!error.message.includes("Account yet to be activated")) {
        toast.error(error.message || "Failed to login. Please try again.");
      }
    },
  });
};
