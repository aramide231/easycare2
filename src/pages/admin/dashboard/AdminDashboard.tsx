import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

export default function AdminDashboard() {
  const { user } = useAuth();
  return <Navigate to={user?.permissions?.includes("staff.manage") ? "/admin/users" : "/admin/audit"} replace />;
}
