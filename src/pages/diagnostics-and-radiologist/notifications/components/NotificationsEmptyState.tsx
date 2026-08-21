import emptyNotificationImage from "@/pages/doctor/shared/assets/image/empty-notification.png";

export default function NotificationsEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <img
        src={emptyNotificationImage}
        alt=""
        className="mb-6 h-auto w-[200px] max-w-full"
      />
      <p className="text-[15px] font-medium tracking-[-0.3px] text-[#626262]">
        No notifications found
      </p>
      <p className="mt-1 text-[13px] tracking-[-0.26px] text-[#A5A5A5]">
        Try adjusting your search criteria
      </p>
    </div>
  );
}
