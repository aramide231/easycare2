import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { SummaryCard } from "./sub-components/SummaryCard";

import { FaUserCheck, FaProcedures, FaBell } from "react-icons/fa";
import purpleWave from "@frontdesk/assets/purple-wave.png";
import orangeWave from "@frontdesk/assets/orange-wave.png";

// Custom Hook for Real-Time Data
const useDashboardMetrics = () => {
  const [metrics, setMetrics] = useState({
    newRegistrations: 50,
    visitationPatients: 1119,
    notifications: 0,
  });

  useEffect(() => {
    // MOCK REAL-TIME POLLING
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        // Simulating incoming data (e.g., occasionally adding a new registration)
        newRegistrations: prev.newRegistrations + (Math.random() > 0.7 ? 1 : 0),
      }));
    }, 10000); // Polls every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return metrics;
};

// Main Dashboard Component
const DashboardSummary = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const metrics = useDashboardMetrics();

  // Configuration for the cards
  const summaryItems = [
    {
      title: "New Registration",
      countText: `${metrics.newRegistrations} new patients`,
      icon: <FaUserCheck size={27} className="text-white" />,
      bgClass: "bg-[#071639]", // Dark navy/slate from mockup
      titleClass: "text-white",
      subtitleClass: "text-gray-200",
      overlayImg: purpleWave,
      path: "/frontdesk/registration",
    },
    {
      title: "Patients for visitation",
      countText: `${metrics.visitationPatients.toLocaleString()} patients`,
      icon: <FaProcedures size={27} className="text-white" />,
      bgClass: "bg-[#071639]",
      titleClass: "text-white",
      subtitleClass: "text-gray-200",
      overlayImg: purpleWave,
      path: "/frontdesk/visitation-log",
    },
    {
      title: "Notifications",
      countText:
        metrics.notifications === 0
          ? "No Messages"
          : `${metrics.notifications} New Messages`,
      icon: <FaBell size={24} className="text-[#F97316]" />, // Orange beacon icon
      bgClass: "bg-[#FFF1E6]", // Light orange tinted background
      titleClass: "text-black",
      subtitleClass: "text-gray-500",
      overlayImg: orangeWave,
      path: "/frontdesk/notifications",
    },
  ];

  const currentHour = new Date().getHours();

  const getGreeting = () => {
    if (currentHour < 12) return "Good Morning";
    if (currentHour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const getSubtitle = () => {
    if (currentHour < 12) return "Start your day with a positive note!";
    return "Have a wonderful day at work";
  };

  return (
    <div className="flex flex-col w-full">
      {/* Header Section */}
      <div className="p-4 mb-2">
        <h2 className="text-3xl font-bold text-gray-800">
          {getGreeting()}, {user?.fullName || "User"}
        </h2>
        <p className="text-gray-500 text-lg mt-1">{getSubtitle()}</p>
      </div>

      {/* Grids Section */}
      <div className="flex gap-6 w-full p-4">
        {summaryItems.map((item, index) => (
          <SummaryCard
            key={index}
            title={item.title}
            countText={item.countText}
            icon={item.icon}
            bgClass={item.bgClass}
            titleClass={item.titleClass}
            subtitleClass={item.subtitleClass}
            overlayImg={item.overlayImg}
            onClick={() => navigate(item.path)}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardSummary;

// import { useAuthStore } from "@/store/useAuthStore";
// import { FaUserPlus, FaProcedures, FaBell } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const DashboardSummary = () => {
//   const navigate = useNavigate();
//   const { user } = useAuthStore();

//   const summaryItems = [
//     {
//       title: "New Registration",
//       count: "50 new patients",
//       icon: <FaUserPlus size={24} className="text-white" />,
//       bgColor: "bg-[#573FD1]",
//       textColor: "text-white",
//       path: "/frontdesk/registration",
//     },
//     {
//       title: "Patients for visitation",
//       count: "1,119 patients",
//       icon: <FaProcedures size={24} className="text-white" />,
//       bgColor: "bg-[#573FD1]",
//       textColor: "text-white",
//       path: "/frontdesk/visitation-log",
//     },
//     {
//       title: "Notifications",
//       count: "No new notification",
//       icon: <FaBell size={24} className="text-orange-500(" />,
//       bgColor: "bg-white border border-orange-500",
//       textColor: "text-gray-700",
//       path: "/frontdesk/notifications",
//     },
//   ];

//   const handleItemClick = (path: string) => {
//     navigate(path);
//   };

//   return (
//     <div>
//       <div className="p-4">
//         <h2 className="text-3xl font-semibold">
//           Good Afternoon, {user?.first_name}
//         </h2>
//         <p>Have a wonderful day at work</p>
//       </div>
//       <div className="flex gap-4 w-full p-4">
//         {summaryItems.map((item, index) => (
//           <div
//             key={index}
//             className={`flex items-center justify-between p-5 rounded-lg w-1/3 shadow-md cursor-pointer ${item.bgColor}`}
//             onClick={() => handleItemClick(item.path)}
//           >
//             <div className="flex items-center gap-3">
//               <div className="p-3 rounded-full bg-opacity-20">{item.icon}</div>
//               <div>
//                 <h3 className={`font-semibold text-lg ${item.textColor}`}>
//                   {item.title}
//                 </h3>
//                 <p className={`text-sm ${item.textColor}`}>{item.count}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DashboardSummary;
