import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import cardPattern from "@/assets/image/dashboard-card-pattern.png";
import notificationPattern from "@/assets/image/dashboard-card-pattern-notification.png";

type Variant = "dark" | "notification";

type Props = {
  title: string;
  subtitle: string;
  icon: ReactNode;
  variant: Variant;
  onClick?: () => void;
};

const DashboardSummaryCard = ({
  title,
  subtitle,
  icon,
  variant,
  onClick,
}: Props) => {
  const isNotification = variant === "notification";

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative flex h-[105px] w-1/3 items-center overflow-hidden rounded-lg px-6 py-4 text-left shadow-sm transition-transform duration-200 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#573FD1] focus-visible:ring-offset-2",
        isNotification
          ? "border border-[#FA7401] bg-gradient-to-br from-[#FFF5EE] via-white to-white"
          : "bg-[#0c1628] text-white"
      )}
    >
      <div className="relative z-10 flex items-center gap-4">
        <div
          className={cn(
            "flex shrink-0 items-center justify-center rounded-full p-2.5",
            isNotification ? "bg-orange-100" : "bg-white/10"
          )}
        >
          {icon}
        </div>
        <div className="min-w-0">
          <h3
            className={cn(
              "text-lg font-semibold tracking-wide leading-tight",
              isNotification ? "text-gray-900" : "text-white"
            )}
          >
            {title}
          </h3>
          <p
            className={cn(
              "mt-0.5 text-sm font-medium",
              isNotification ? "text-gray-600" : "text-white/85"
            )}
          >
            {subtitle}
          </p>
        </div>
      </div>

      <img
        src={isNotification ? notificationPattern : cardPattern}
        alt=""
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-full w-auto object-cover"
      />
    </button>
  );
};

export default DashboardSummaryCard;
