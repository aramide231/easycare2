import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, LogOut, Pencil, Send } from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "@doctor-shared/context/useAuth";
import clientimage from "@doctor-shared/assets/image/haywhy.jpg";
import { useDoctorProfile } from "../../account/useDoctorProfile";

type ProfileMenuProps = {
  editPath?: string;
  logoutPath?: string;
};

export default function ProfileMenu({
  editPath = "/doctor/account/profile",
  logoutPath = "/doctor/account?tab=logout",
}: ProfileMenuProps) {
  const { user } = useAuth();
  const { profile } = useDoctorProfile();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [helpdeskMessage, setHelpdeskMessage] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);

  const displayName = user?.fullName ?? profile.username ?? "User";
  const avatarSrc = profile.profileImageUrl || clientimage;

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

  const handleEdit = () => {
    closeMenu();
    navigate(editPath);
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

  const handleLogout = () => {
    closeMenu();
    navigate(logoutPath);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-lg p-1 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#573FD1]/20"
        aria-label="Account menu"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full border border-gray-200">
          <img
            src={avatarSrc}
            alt={displayName}
            className="h-full w-full object-cover"
          />
        </div>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-gray-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open ? (
        <div className="absolute right-0 top-full z-50 mt-2 w-[min(100vw-2rem,20rem)] rounded-2xl border border-gray-200 bg-white p-4 shadow-xl">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div className="min-w-0 space-y-1 text-sm text-gray-700">
              <p>
                <span className="text-gray-600">Reg Date:</span>{" "}
                {profile.registrationDate}
              </p>
              <p>
                <span className="text-gray-600">Last Login:</span>{" "}
                {profile.lastLogin}
              </p>
              <p>
                <span className="text-gray-600">Account Completion:</span>{" "}
                <span className="font-semibold text-gray-900">Not Completed</span>
              </p>
            </div>
            <button
              type="button"
              onClick={handleEdit}
              className="inline-flex shrink-0 items-center gap-1 rounded-md border border-[#573FD1] px-2.5 py-1 text-xs font-medium text-[#573FD1] hover:bg-purple-50"
            >
              <Pencil className="h-3 w-3" />
              Edit
            </button>
          </div>

          <div className="mb-4 border-t border-gray-200 pt-4">
            <h4 className="text-sm font-semibold text-gray-900">Help Desk</h4>
            <p className="mb-3 text-xs text-gray-500">
              Do You Have Questions, Reports Or Concerns
            </p>
            <textarea
              placeholder="Enter your text..."
              value={helpdeskMessage}
              onChange={(e) => setHelpdeskMessage(e.target.value)}
              rows={3}
              className="mb-3 w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#573FD1] focus:outline-none focus:ring-2 focus:ring-[#573FD1]/20"
            />
            <button
              type="button"
              onClick={handleHelpdeskSubmit}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#573FD1] py-2.5 text-sm font-medium text-white hover:bg-[#4a35b8]"
            >
              <Send className="h-4 w-4" />
              Submit
            </button>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-600 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      ) : null}
    </div>
  );
}
