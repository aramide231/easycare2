import emptyNotification from "@/assets/image/empty-notification.png";

type Props = {
  searchTerm?: string;
};

export default function DiagnosticsNotificationsEmptyState({
  searchTerm = "",
}: Props) {
  const subtitle = searchTerm.trim()
    ? `No results found for "${searchTerm.trim()}"`
    : "You don't have any notifications yet, Check back later.";

  return (
    <div className="border-t border-gray-200 bg-[#FAFAFA]">
      <div className="flex min-h-[28rem] w-full items-center justify-center px-6 py-16">
        <div className="flex max-w-md flex-col items-center gap-4 text-center">
          <img
            className="h-24 w-24"
            src={emptyNotification}
            alt=""
            aria-hidden
          />
          <p className="text-[32px] font-semibold leading-tight text-gray-900">
            No Notification Yet
          </p>
          <p className="text-2xl font-normal text-gray-700">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}
