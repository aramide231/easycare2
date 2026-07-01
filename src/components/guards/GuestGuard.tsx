import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { getRoleHomePath } from "@/lib/authRoutes";

export const GuestGuard = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const apiUser = useAuthStore((state) => state.user);
  const location = useLocation();

  const from =
    location.state?.from?.pathname ||
    getRoleHomePath(apiUser?.user_role ?? "frontdesk");

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  return <Outlet />;
};
