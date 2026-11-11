// The Auth Guard (Protected Routes)
// This component protects private routes. It captures the user's intended destination (location.pathname) before booting them to the login page, allowing for a seamless redirect after they successfully authenticate.

import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { AUTH_SIGNIN_PATH, getRoleHomePath, isModuleAllowed } from "@/lib/authRoutes";

export const AuthGuard = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Redirect to login, but save the attempted URL in route state
    return <Navigate to={AUTH_SIGNIN_PATH} replace />;
  }

  if (!isModuleAllowed(location.pathname, user.roles || [], user.permissions || [])) {
    return <main className="mx-auto max-w-lg p-10 text-center">
      <h1 className="text-xl font-bold">Access denied</h1>
      <p className="my-4">Your staff account does not have access to this module.</p>
      <Link className="text-purple-700 underline" to={getRoleHomePath(user.userRole)}>Return to your dashboard</Link>
    </main>;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};
