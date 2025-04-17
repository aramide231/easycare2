import NotificationTable from "@/components/ui/notificationTable";
import Sidebar from "@/constant/sidebar";
import Topbar from "@/constant/topbar";

const Notifications = () => {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />

      {/* Added `ml-72` to shift the main content to the right */}
      <main className="flex-1 p-6 ml-72">
        <Topbar />

        <NotificationTable />
      </main>
    </div>
  );
};

export default Notifications;
