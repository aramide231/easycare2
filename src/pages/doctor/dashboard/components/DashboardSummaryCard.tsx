import type { ReactNode } from "react";
import { cn } from "@doctor-shared/lib/utils";
import cardPattern from "@doctor-shared/assets/image/dashboard-card-pattern.png";
import notificationPattern from "@doctor-shared/assets/image/dashboard-card-pattern-notification.png";

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
        "relative flex min-h-[96px] w-1/3 flex-1 min-w-0 items-center justify-between overflow-hidden rounded-lg p-5 text-left shadow-md transition hover:brightness-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#573FD1] focus-visible:ring-offset-2",
        isNotification
          ? "border border-[#FA7401] bg-gradient-to-br from-[#FFF5EE] via-white to-white"
          : "bg-[#0c1628] text-white"
      )}
    >
      <div className="relative z-10 flex items-center gap-3.5">
        <div
          className={cn(
            "shrink-0 rounded-full p-3",
            isNotification ? "bg-orange-100" : "bg-white/10"
          )}
        >
          {icon}
        </div>
        <div className="min-w-0">
          <h3
            className={cn(
              "text-lg font-semibold leading-snug",
              isNotification ? "text-gray-900" : "text-white"
            )}
          >
            {title}
          </h3>
          <p
            className={cn(
              "mt-0.5 text-sm",
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
        className="pointer-events-none absolute bottom-0 right-0 h-16 w-auto max-w-[42%] object-contain object-bottom-right"
      />
    </button>
  );
};

export default DashboardSummaryCard;
