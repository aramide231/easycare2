import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { apiFetch } from "@/api/client/apClient";
import { useAuthStore } from "@/store/useAuthStore";
import { LoginPayload, LoginResponse } from "@/pages/auth/types/auth";

export const useLogin = () => {
  // Grab the setter from Zustand
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (credentials: LoginPayload) =>
      apiFetch<LoginResponse>("/auth/login", {
        data: credentials,
      }),
    onSuccess: (response) => {
      setAuth(response.data.token, response.data.user);

      toast.success(response.message || "Logged in successfully!");

      console.log("User logged in:", response.data.user.username);
    },

    onError: (error: Error) => {
      if (!error.message.includes("Account yet to be activated")) {
        toast.error(error.message || "Failed to login. Please try again.");
      }
    },
  });
};
