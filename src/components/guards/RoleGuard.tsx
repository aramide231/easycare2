// // The Role Guard (RBAC)
// // In clinical software, access control is critical. This guard sits inside the AuthGuard and checks if the authenticated user's role matches the required roles for that specific route.

// import { Navigate, Outlet } from "react-router-dom";
// import { useAuthStore } from "@/store/useAuthStore";

// interface RoleGuardProps {
//   allowedRoles: string[];
// }

// export const RoleGuard = ({ allowedRoles }: RoleGuardProps) => {
//   const user = useAuthStore((state) => state.user);

//   // If no user object or their role isn't in the allowed list, bounce them
//   if (!user || !user.user_role || !allowedRoles.includes(user.user_role)) {
//     // Redirect to a generic unauthorized page or standard dashboard
//     return <Navigate to="/unauthorized" replace />;
//   }

//   return <Outlet />;
// };
