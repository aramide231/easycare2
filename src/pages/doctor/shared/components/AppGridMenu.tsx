import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Pencil } from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "@doctor-shared/context/useAuth";
import clientimage from "@doctor-shared/assets/image/haywhy.jpg";
import { useDoctorProfile } from "../../account/useDoctorProfile";

export const AppGridIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <circle cx="5" cy="5" r="2" fill="#573FD1" />
    <circle cx="12" cy="5" r="2" fill="#573FD1" />
    <circle cx="19" cy="5" r="2" fill="#573FD1" />
    <circle cx="5" cy="12" r="2" fill="#573FD1" />
    <circle cx="12" cy="12" r="2" fill="#573FD1" />
    <circle cx="19" cy="12" r="2" fill="#573FD1" />
    <circle cx="5" cy="19" r="2" fill="#573FD1" />
    <circle cx="12" cy="19" r="2" fill="#573FD1" />
    <circle cx="19" cy="19" r="2" fill="#573FD1" />
  </svg>
);

const MODULE_OPTIONS = [
  { role: "doctor", label: "Clinician", path: "/doctor" },
  { role: "nurse", label: "Nurse", path: "/nurse" },
  { role: "diagnostics", label: "Diagnostics", path: "/diagnostics" },
  { role: "frontdesk", label: "Front Desk", path: "/frontdesk" },
] as const;

function getAccountPaths(role?: string) {
  if (role === "doctor" || !role) {
    return {
      profile: "/doctor/account/profile",
      settings: "/doctor/account?tab=account",
      helpdesk: "/doctor/account?tab=helpdesk",
      logout: "/doctor/account?tab=logout",
    };
  }
  if (role === "nurse") {
    return {
      profile: "/nurse",
      settings: "/nurse",
      helpdesk: "/nurse",
      logout: "/auth",
    };
  }
  if (role === "diagnostics") {
    return {
      profile: "/diagnostics",
      settings: "/diagnostics",
      helpdesk: "/diagnostics",
      logout: "/auth",
    };
  }
  return {
    profile: "/frontdesk",
    settings: "/frontdesk",
    helpdesk: "/frontdesk",
    logout: "/auth",
  };
}

const AppGridMenu = () => {
  const { user, signOut, signIn } = useAuth();
  const { profile } = useDoctorProfile();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [helpdeskMessage, setHelpdeskMessage] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);

  const roleLabel =
    user?.userRole && user.userRole.length > 0
      ? user.userRole.charAt(0).toUpperCase() + user.userRole.slice(1)
      : "Doctor";

  const displayName = user?.fullName ?? profile.username ?? "John Doe";
  const paths = getAccountPaths(user?.userRole);
  const profileImage = profile.profileImageUrl || clientimage;
  const isDoctorModule = user?.userRole === "doctor" || !user?.userRole;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeMenu = () => setOpen(false);

  const handleLogout = () => {
    if (isDoctorModule) {
      closeMenu();
      navigate(paths.logout);
      return;
    }
    signOut();
    closeMenu();
    navigate("/auth");
  };

  const handleHelpdeskSubmit = () => {
    if (!helpdeskMessage.trim()) {
      toast.error("Please enter your message before submitting.");
      return;
    }
    toast.success("Your message has been sent to the help desk.");
    setHelpdeskMessage("");
    closeMenu();
  };

  const handleEdit = () => {
    closeMenu();
    navigate(isDoctorModule ? paths.profile : paths.settings);
  };

  const openFullHelpDesk = () => {
    closeMenu();
    if (isDoctorModule) {
      navigate(paths.helpdesk);
    }
  };

  const switchModule = async (role: string, path: string) => {
    if (!user || user.userRole === role) {
      closeMenu();
      navigate(path);
      return;
    }
    await signIn(user.fullName, "module-switch", role);
    closeMenu();
    navigate(path);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-xl p-2 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#573FD1]/20"
        aria-label="Applications menu"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <AppGridIcon />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-[min(100vw-2rem,22rem)] rounded-xl border border-gray-200 bg-white p-4 shadow-xl">
          <div className="mb-4 flex items-start gap-3 border-b border-gray-100 pb-4">
            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border border-gray-200">
              <img
                src={profileImage}
                alt={displayName}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-gray-900">
                    {displayName}
                  </p>
                  <p className="text-xs text-gray-500">{roleLabel}</p>
                </div>
                <button
                  type="button"
                  onClick={handleEdit}
                  className="flex shrink-0 items-center gap-1 rounded-md border border-[#573FD1]/30 bg-purple-50 px-2 py-1 text-xs font-medium text-[#573FD1] hover:bg-purple-100"
                >
                  <Pencil className="h-3 w-3" />
                  Edit
                </button>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Switch module
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {MODULE_OPTIONS.map((module) => {
                const isActive = user?.userRole === module.role;
                return (
                  <button
                    key={module.role}
                    type="button"
                    onClick={() => switchModule(module.role, module.path)}
                    className={`rounded-lg border px-3 py-2 text-left text-xs font-medium transition-colors ${
                      isActive
                        ? "border-[#573FD1] bg-purple-50 text-[#573FD1]"
                        : "border-gray-200 text-gray-700 hover:border-[#573FD1]/40 hover:bg-purple-50/50"
                    }`}
                  >
                    {module.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mb-4 space-y-2 text-xs text-gray-600">
            <p>
              <span className="font-medium text-gray-700">Reg Date:</span>{" "}
              {profile.registrationDate}
            </p>
            <p>
              <span className="font-medium text-gray-700">Last Login:</span>{" "}
              {profile.lastLogin}
            </p>
            <p>
              <span className="font-medium text-gray-700">
                Account Completion:
              </span>{" "}
              <span className="font-medium text-orange-600">Not Completed</span>
            </p>
          </div>

          <div className="mb-4 rounded-lg border-2 border-[#573FD1]/40 bg-white p-4">
            <div className="mb-1 flex items-center justify-between gap-2">
              <h4 className="text-sm font-semibold text-gray-900">Help Desk</h4>
              {isDoctorModule && (
                <button
                  type="button"
                  onClick={openFullHelpDesk}
                  className="text-[10px] font-medium text-[#573FD1] hover:underline"
                >
                  Open full page
                </button>
              )}
            </div>
            <p className="mb-3 text-xs text-gray-500">
              Do You Have Questions, Reports Or Concerns?
            </p>
            <textarea
              placeholder="Enter Your Text..."
              value={helpdeskMessage}
              onChange={(e) => setHelpdeskMessage(e.target.value)}
              rows={3}
              className="mb-3 w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#573FD1] focus:outline-none focus:ring-2 focus:ring-[#573FD1]/20"
            />
            <button
              type="button"
              onClick={handleHelpdeskSubmit}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#573FD1] py-2.5 text-sm font-medium text-white hover:bg-[#4a35b8]"
            >
              Submit
            </button>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-md border border-red-600 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default AppGridMenu;
