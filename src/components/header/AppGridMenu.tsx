import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
import { AUTH_SIGNIN_PATH } from "@/lib/authRoutes";

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

const AppGridMenu = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [helpdeskMessage, setHelpdeskMessage] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    signOut();
    setOpen(false);
    navigate(AUTH_SIGNIN_PATH);
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

  const handleEdit = () => {
    setOpen(false);
    if (user?.userRole === "frontdesk") {
      navigate("/frontdesk");
      return;
    }
    toast.info("Profile edit is available from the front desk module.");
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
          {/* Account info */}
          <div className="mb-4 rounded-lg border border-gray-100 bg-gray-50/80 p-4">
            <div className="mb-3 flex items-start justify-between gap-2">
              <p className="text-xs text-gray-500">Reg Date: 31st Jan 2025</p>
              <button
                type="button"
                onClick={handleEdit}
                className="flex items-center gap-1 rounded-md border border-gray-200 bg-white px-2 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50"
              >
                <svg
                  className="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                </svg>
                Edit
              </button>
            </div>
            <p className="mb-2 text-xs text-gray-500">
              Last Login: 15th July 2025
            </p>
            <p className="text-xs text-gray-600">
              Account Completion:{" "}
              <span className="font-medium text-orange-600">
                Not Completed
              </span>
            </p>
          </div>

          {/* Help desk */}
          <div className="mb-4 rounded-lg border border-gray-100 p-4">
            <h4 className="mb-1 text-sm font-semibold text-gray-900">
              Help Desk
            </h4>
            <p className="mb-3 text-xs text-gray-500">
              Do you have Questions, reports or concerns
            </p>
            <textarea
              placeholder="Enter your text..."
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#ffffff"
                viewBox="0 0 24 24"
                stroke="#ffffff"
                width="16"
                height="16"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
                />
              </svg>
              Submit
            </button>
          </div>

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-md border border-red-600 py-2 font-semibold text-red-600 hover:bg-red-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              width="20"
              height="20"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1"
              />
            </svg>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default AppGridMenu;
