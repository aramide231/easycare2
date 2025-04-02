import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHospital,
  FaTachometerAlt,
  FaUserPlus,
  FaCalendarCheck,
  FaUserLock,
  FaBell,
  FaIdCard,
  FaUserMd,
  FaSyringe,
  FaBaby,
  FaChild,
  FaSmile,
  FaUsers,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";

type SectionsState = {
  mainMenu: boolean;
  performActions: boolean;
  reports: boolean;
};

type SectionKey = keyof SectionsState;

const Sidebar = () => {
  const location = useLocation();
  const [openSections, setOpenSections] = useState<SectionsState>({
    mainMenu: true,
    performActions: false,
    reports: false,
  });

  const toggleSection = (section: SectionKey) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/dashboard" },
    {
      name: "Visitation Log",
      icon: <FaCalendarCheck />,
      path: "/visitation-log",
    },
  ];

  const performActions = [
    { name: "Manage Access", icon: <FaUserLock />, path: "/manage-access" },
    { name: "Manage Card", icon: <FaIdCard />, path: "/manage-card" },
    { name: "Set Reminder", icon: <FaBell />, path: "/set-reminder" },
  ];

  const reports = [
    {
      name: "Doctor Assignments",
      icon: <FaUserMd />,
      path: "/doctor-assignments",
    },
    { name: "Immunization", icon: <FaSyringe />, path: "/immunization" },
    { name: "Ante Natal", icon: <FaBaby />, path: "/ante-natal" },
    { name: "Child Birth", icon: <FaChild />, path: "/child-birth" },
    { name: "Post Natal", icon: <FaSmile />, path: "/post-natal" },
    { name: "Registration", icon: <FaUserPlus />, path: "/registration" },
    { name: "Family Planning", icon: <FaUsers />, path: "/family-planning" },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-72 bg-white border-r border-gray-300 p-5 flex flex-col shadow-md">
      {/* Logo & Hospital Info */}
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

      {/* Scrollable Sidebar Content */}
      <div className="flex-1 overflow-y-auto">
        <div>
          <h3
            className="text-gray-700 font-semibold text-xs mb-2 cursor-pointer flex justify-between items-center"
            onClick={() => toggleSection("mainMenu")}
          >
            MAIN MENU{" "}
            {openSections.mainMenu ? <FaChevronDown /> : <FaChevronRight />}
          </h3>
          {openSections.mainMenu &&
            menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`w-full flex items-center gap-3 p-2 rounded-lg text-sm transition ${
                  location.pathname === item.path
                    ? "bg-purple-100 text-purple-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.icon} {item.name}
              </Link>
            ))}
        </div>

        <div className="mt-5">
          <h3
            className="text-gray-700 font-semibold text-xs mb-2 cursor-pointer flex justify-between items-center"
            onClick={() => toggleSection("performActions")}
          >
            PERFORM ACTION{" "}
            {openSections.performActions ? (
              <FaChevronDown />
            ) : (
              <FaChevronRight />
            )}
          </h3>
          {openSections.performActions &&
            performActions.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`w-full flex items-center gap-3 p-2 rounded-lg text-sm transition ${
                  location.pathname === item.path
                    ? "bg-purple-100 text-purple-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.icon} {item.name}
              </Link>
            ))}
        </div>

        <div className="mt-5">
          <h3
            className="text-gray-700 font-semibold text-xs mb-2 cursor-pointer flex justify-between items-center"
            onClick={() => toggleSection("reports")}
          >
            REPORTS{" "}
            {openSections.reports ? <FaChevronDown /> : <FaChevronRight />}
          </h3>
          {openSections.reports &&
            reports.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`w-full flex items-center gap-3 p-2 rounded-lg text-sm transition ${
                  location.pathname === item.path
                    ? "bg-purple-100 text-purple-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.icon} {item.name}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
