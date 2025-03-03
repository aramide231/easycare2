import { useState } from "react";
import { FaHospital, FaTachometerAlt, FaUserPlus, FaCalendarCheck, FaUserLock, FaBell, FaIdCard, FaUserMd, FaSyringe, FaBaby, FaChild, FaSmile, FaUsers } from "react-icons/fa";

const Sidebar = () => {
  const [active, setActive] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt /> },
    { name: "Registration", icon: <FaUserPlus /> },
    { name: "Visitation Log", icon: <FaCalendarCheck /> },
  ];

  const performActions = [
    { name: "Manage Access", icon: <FaUserLock /> },
    { name: "Set Reminder", icon: <FaBell /> },
    { name: "Manage Card", icon: <FaIdCard /> },
  ];

  const reports = [
    { name: "Doctor Assignments", icon: <FaUserMd /> },
    { name: "Immunization", icon: <FaSyringe /> },
    { name: "Ante natal", icon: <FaBaby /> },
    { name: "Child Birth", icon: <FaChild /> },
    { name: "Post Natal", icon: <FaSmile /> },
    { name: "Family Planning", icon: <FaUsers /> },
  ];

  return (
    <div className="w-72 h-screen bg-white shadow-lg p-5 flex flex-col">
      <div className="flex items-center gap-3 text-purple-700 font-bold text-xl mb-5">
        <FaHospital size={24} /> <span>EasyCare™</span>
      </div>
      <div className="bg-gray-100 p-3 rounded-lg flex gap-3 items-center mb-5">
        <FaHospital className="text-red-500" size={20} />
        <div>
          <h3 className="text-sm font-semibold">St James Hospital</h3>
          <p className="text-xs text-gray-500">Front Desk Personnel</p>
        </div>
      </div>
      <div>
        <h3 className="text-gray-700 font-semibold text-xs mb-2">MAIN MENU</h3>
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setActive(item.name)}
            className={`w-full flex items-center gap-3 p-2 rounded-lg text-sm transition ${active === item.name ? "bg-purple-100 text-purple-700" : "text-gray-700 hover:bg-gray-100"}`}
          >
            {item.icon} {item.name}
          </button>
        ))}
      </div>
      <div className="mt-5">
        <h3 className="text-gray-700 font-semibold text-xs mb-2">PERFORM ACTION</h3>
        {performActions.map((item) => (
          <button
            key={item.name}
            className="w-full flex items-center gap-3 p-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition"
          >
            {item.icon} {item.name}
          </button>
        ))}
      </div>
      <div className="mt-5">
        <h3 className="text-gray-700 font-semibold text-xs mb-2">REPORTS</h3>
        {reports.map((item) => (
          <button
            key={item.name}
            className="w-full flex items-center gap-3 p-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition"
          >
            {item.icon} {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
