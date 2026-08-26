import { useEffect, useRef, useState } from "react";
import {
  BarChart3,
  Bell,
  Brain,
  CircleHelp,
  CreditCard,
  FolderOpen,
  HandHeart,
  MessageCircle,
  Newspaper,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import { toast } from "react-toastify";

export const AppGridIcon = () => (
  <svg
    width="20"
    height="20"
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

type AppLauncherItem = {
  id: string;
  label: string;
  Icon: LucideIcon;
};

const APP_LAUNCHER_ITEMS: AppLauncherItem[] = [
  { id: "ai", label: "EasyCare AI", Icon: Sparkles },
  { id: "bi", label: "EasyCare BI", Icon: BarChart3 },
  { id: "ci", label: "EasyCare CI", Icon: Brain },
  { id: "chats", label: "Chats", Icon: MessageCircle },
  { id: "alerts", label: "Alerts", Icon: Bell },
  { id: "giver", label: "EasyCare Giver", Icon: HandHeart },
  { id: "hr", label: "EasyCare HR", Icon: Users },
  { id: "finances", label: "EasyCare Finances", Icon: CreditCard },
  { id: "news", label: "News", Icon: Newspaper },
  { id: "faq", label: "FAQ", Icon: CircleHelp },
  { id: "logs", label: "Logs", Icon: FolderOpen },
];

const AppGridMenu = () => {
  const [open, setOpen] = useState(false);
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

  const handleAppClick = (label: string) => {
    setOpen(false);
    toast.info(`${label} will be available soon.`);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#573FD1]/25 bg-[#EEEAFB] transition-colors hover:bg-[#E4DDF8] focus:outline-none focus:ring-2 focus:ring-[#573FD1]/20"
        aria-label="Applications menu"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <AppGridIcon />
      </button>

      {open ? (
        <div className="absolute right-0 top-full z-50 mt-2 w-[min(100vw-2rem,22rem)] rounded-2xl border border-gray-100 bg-white p-5 shadow-xl">
          <div className="grid grid-cols-3 gap-x-3 gap-y-5">
            {APP_LAUNCHER_ITEMS.map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => handleAppClick(label)}
                className="flex flex-col items-center gap-2 rounded-xl p-1 text-center transition-colors hover:bg-purple-50/60 focus:outline-none focus:ring-2 focus:ring-[#573FD1]/20"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#573FD1] text-white shadow-sm">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <span className="max-w-[5.5rem] text-[11px] font-medium leading-tight text-gray-900">
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AppGridMenu;
