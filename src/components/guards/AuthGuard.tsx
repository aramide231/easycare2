// The Auth Guard (Protected Routes)
// This component protects private routes. It captures the user's intended destination (location.pathname) before booting them to the login page, allowing for a seamless redirect after they successfully authenticate.

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";

export const AuthGuard = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login, but save the attempted URL in route state
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};
