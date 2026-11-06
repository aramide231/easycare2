import { BellPlus } from "lucide-react";

const EmptyNotification = () => {
  return (
    <div className="flex flex-1 items-center justify-center py-24">
      <div className="flex flex-col items-center gap-4 text-center">
        {/* Bell icon with + — purple fill matching the design */}
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#573FD1]">
          <BellPlus className="h-10 w-10 text-white" strokeWidth={2} />
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-gray-900">
            No Notification Yet
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            You don't have any notifications yet,
            <br />
            Check back later.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyNotification;
