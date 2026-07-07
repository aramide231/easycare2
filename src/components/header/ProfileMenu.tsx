import { useEffect, useRef, useState } from "react";
import { ChevronDown, LogOut, Pencil, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
import { AUTH_SIGNIN_PATH } from "@/lib/authRoutes";
import EditProfileModal from "./EditProfileModal";
import { formatOrdinalDate } from "@/lib/dateTime";
import clientimage from "@/assets/image/haywhy.jpg";

const ProfileMenu = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [helpdeskMessage, setHelpdeskMessage] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);

  const roleLabel =
    user?.userRole && user.userRole.length > 0
      ? user.userRole.charAt(0).toUpperCase() + user.userRole.slice(1)
      : "";

  const registrationDate = formatOrdinalDate(new Date(2025, 0, 31));
  const lastLoginDate = formatOrdinalDate(new Date(2025, 6, 15));

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEdit = () => {
    setOpen(false);
    setEditProfileOpen(true);
  };

  const handleHelpdeskSubmit = () => {
    if (!helpdeskMessage.trim()) {
      toast.error("Please enter your message before submitting.");
      return;
    }
    toast.success("Your message has been sent to the help desk.");
    setHelpdeskMessage("");
    setOpen(false);
  };

  const handleLogout = () => {
    signOut();
    setOpen(false);
    navigate(AUTH_SIGNIN_PATH);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-3 rounded-xl px-1 py-1 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#573FD1]/20"
        aria-label="Profile menu"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full border border-gray-200">
          <img
            src={clientimage}
            alt={user?.fullName ?? "User"}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="hidden min-w-0 text-left sm:block">
          <p className="truncate text-sm font-semibold text-gray-900">
            {user?.fullName}
          </p>
          <p className="text-xs text-gray-500">{roleLabel}</p>
        </div>
        <ChevronDown
          className={`hidden h-4 w-4 shrink-0 text-gray-500 transition-transform sm:block ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-[min(100vw-2rem,22rem)] rounded-xl border border-gray-200 bg-white p-4 shadow-xl">
          {/* Account info */}
          <div className="mb-4">
            <div className="relative mb-2 flex items-start justify-between gap-2">
              <p className="text-sm text-gray-800">
                Reg Date: {registrationDate}
              </p>
              <button
                type="button"
                onClick={handleEdit}
                className="flex shrink-0 items-center gap-1 rounded-md border border-[#573FD1] px-2.5 py-1 text-xs font-medium text-[#573FD1] hover:bg-purple-50"
              >
                <Pencil className="h-3.5 w-3.5" aria-hidden />
                Edit
              </button>
            </div>
            <p className="mb-2 text-sm text-gray-800">
              Last Login: {lastLoginDate}
            </p>
            <p className="text-sm text-gray-800">
              Account Completion:{" "}
              <span className="font-semibold text-gray-900">Not Completed</span>
            </p>
          </div>

          {/* Help desk */}
          <div className="mb-4 border-t border-gray-100 pt-4">
            <h4 className="mb-1 text-sm font-semibold text-gray-900">
              Help Desk
            </h4>
            <p className="mb-3 text-xs text-gray-600">
              Do You Have Questions, Reports Or Concerns
            </p>
            <textarea
              placeholder="Enter your text..."
              value={helpdeskMessage}
              onChange={(e) => setHelpdeskMessage(e.target.value)}
              rows={4}
              className="mb-3 w-full resize-none rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#573FD1] focus:outline-none focus:ring-2 focus:ring-[#573FD1]/20"
            />
            <button
              type="button"
              onClick={handleHelpdeskSubmit}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#573FD1] py-2.5 text-sm font-medium text-white hover:bg-[#4a35b8]"
            >
              <Send className="h-4 w-4" aria-hidden />
              Submit
            </button>
          </div>

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-600 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-5 w-5" aria-hidden />
            Logout
          </button>
        </div>
      )}

      <EditProfileModal
        open={editProfileOpen}
        onClose={() => setEditProfileOpen(false)}
      />
    </div>
  );
};

export default ProfileMenu;
