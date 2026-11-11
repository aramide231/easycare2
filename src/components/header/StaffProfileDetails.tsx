import { Link } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";

export default function StaffProfileDetails() {
  const staff = useAuthStore((state) => state.user);
  if (!staff) return null;
  const values = [
    ["First name", staff.first_name], ["Middle name", staff.middle_name],
    ["Last name", staff.last_name], ["Username", staff.username], ["Email", staff.email],
    ["Staff code", staff.staff_code], ["Department", staff.department?.name],
    ["Roles", staff.roles.map((role) => role.name).join(", ")],
    ["Registered", staff.created_at ? new Date(staff.created_at).toLocaleString() : null],
    ["Last sign-in", staff.last_login_at ? new Date(staff.last_login_at).toLocaleString() : null],
  ];
  return <div className="space-y-5">
    <dl className="grid gap-4 sm:grid-cols-2">
      {values.map(([label, value]) => <div key={label}>
        <dt className="text-xs font-medium text-slate-500">{label}</dt>
        <dd className="mt-1 break-words text-sm text-slate-900">{value || "Not recorded"}</dd>
      </div>)}
    </dl>
    <p className="text-sm text-slate-600">For profile or access changes, contact your hospital administrator.</p>
    {staff.permissions.includes("staff.manage") && <Link to="/admin/users" className="inline-block text-sm font-medium text-[#573FD1] underline">Manage staff accounts</Link>}
  </div>;
}
