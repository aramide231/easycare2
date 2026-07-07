import { useEffect, useRef, useState, type ElementType } from "react";
import {
  Bell,
  CreditCard,
  FolderOpen,
  HandHelping,
  HelpCircle,
  MessageCircleMore,
  Newspaper,
  Sparkles,
  Users,
} from "lucide-react";
import { toast } from "react-toastify";

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

type AppItem = {
  id: string;
  label: string;
  icon: ElementType;
};

const APP_ITEMS: AppItem[] = [
  { id: "ai", label: "EasyCare AI", icon: Sparkles },
  { id: "chats", label: "Chats", icon: MessageCircleMore },
  { id: "alerts", label: "Alerts", icon: Bell },
  { id: "giver", label: "EasyCare Giver", icon: HandHelping },
  { id: "hr", label: "EasyCare HR", icon: Users },
  { id: "finances", label: "EasyCare Finances", icon: CreditCard },
  { id: "news", label: "News", icon: Newspaper },
  { id: "faq", label: "FAQ", icon: HelpCircle },
  { id: "logs", label: "Logs", icon: FolderOpen },
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

  const handleAppClick = (item: AppItem) => {
    setOpen(false);
    toast.info(`${item.label} will be available soon.`);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`rounded-xl border p-2 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#573FD1]/20 ${
          open ? "border-gray-200 bg-gray-50" : "border-transparent"
        }`}
        aria-label="Applications menu"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <AppGridIcon />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-[min(100vw-2rem,20rem)] rounded-2xl border border-gray-200 bg-white p-4 shadow-xl">
          <div className="grid grid-cols-3 gap-x-2 gap-y-4">
            {APP_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleAppClick(item)}
                  className="flex flex-col items-center gap-2 rounded-lg p-1 transition hover:bg-gray-50"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#573FD1] text-white shadow-sm">
                    <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
                  </div>
                  <span className="max-w-[5.5rem] text-center text-[11px] font-medium leading-tight text-gray-800">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AppGridMenu;
