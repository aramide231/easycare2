import { FaUserPlus, FaProcedures, FaBell } from "react-icons/fa";

const DashboardSummary = () => {
  const summaryItems = [
    {
      title: "New Registration",
      count: "50 new patients",
      icon: <FaUserPlus size={24} className="text-white" />,
      bgColor: "bg-gradient-to-r from-purple-500 to-blue-600",
      textColor: "text-white"
    },
    {
      title: "Patients for visitation",
      count: "1,119 patients",
      icon: <FaProcedures size={24} className="text-white" />,
      bgColor: "bg-gradient-to-r from-blue-500 to-indigo-600",
      textColor: "text-white"
    },
    {
      title: "Notifications",
      count: "No new notification",
      icon: <FaBell size={24} className="text-orange-500" />,
      bgColor: "bg-white border border-orange-500",
      textColor: "text-gray-700"
    }
  ];

  return (
    <div>
     <div className="p-4">
     <h2 className=" text-2xl font-semibold">Good Afternoon</h2>
     <p>have a wonderful day at work </p>
    </div>
    <div className="flex gap-4 w-full p-4">
      {summaryItems.map((item, index) => (
        <div key={index} className={`flex items-center justify-between p-5 rounded-lg w-1/3 shadow-md ${item.bgColor}`}>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-opacity-20">
              {item.icon}
            </div>
            <div>
              <h3 className={`font-semibold text-lg ${item.textColor}`}>{item.title}</h3>
              <p className={`text-sm ${item.textColor}`}>{item.count}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
   
};

export default DashboardSummary;
