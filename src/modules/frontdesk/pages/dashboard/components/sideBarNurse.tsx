import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHospital,
  FaTachometerAlt,
  FaUserPlus,
  FaUserLock,
  FaBell,
  FaSyringe,
  FaBaby,
  FaChild,
  FaUsers,
  FaChevronDown,
  FaChevronRight,
  FaTablets,
  FaBook,
  FaHome,
} from "react-icons/fa";

type SectionsState = {
  mainMenu: boolean;
  patientManagement: boolean;
  performActions: boolean;
  reports: boolean;
};

type SectionKey = keyof SectionsState;

const SideBarNurse = () => {
  const location = useLocation();
  const [openSections, setOpenSections] = useState<SectionsState>({
    mainMenu: true,
    patientManagement: false,
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
    {
      name: "Dashboard",
      icon: <FaTachometerAlt />,
      path: "/nurse/dashboard",
    },
  ];

  const patientManagement = [
    {
      name: "Admission",
      icon: <FaHospital />,
      path: "/nurse/admission",
    },
    {
      name: "Discharge",
      icon: <FaHome />,
      path: "/nurse/discharge",
    },
  ];

  const performActions = [
    {
      name: "Make Request",
      icon: <FaUserLock />,
      path: "/frontdesk/make-request",
    },

    { name: "Set Reminder", icon: <FaBell />, path: "/frontdesk/reminder" },
  ];

  const reports = [
    { name: "Ante Natal", icon: <FaBaby />, path: "/nurse/ante-natal" },
    { name: "Child Birth", icon: <FaChild />, path: "/nurse/child-birth" },
    {
      name: "Dispensed Drugs",
      icon: <FaTablets />,
      path: "/nurse/dispensed-drugs",
    },
    {
      name: "Immunization",
      icon: <FaSyringe />,
      path: "/nurse/immunization",
    },
    {
      name: "Report Writing",
      icon: <FaBook />,
      path: "/nurse/report-writing",
    },
    {
      name: "Requisition",
      icon: <FaUserPlus />,
      path: "/nurse/requisition",
    },
    {
      name: "Family Planning",
      icon: <FaUsers />,
      path: "/nurse/family-planning",
    },
    {
      name: "Post Natal",
      icon: <FaUsers />,
      path: "/nurse/post-natal",
    },
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
          <p className="text-xs text-gray-500">Nurse</p>
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
            onClick={() => toggleSection("patientManagement")}
          >
            PATINET MANAGENT
            {openSections.performActions ? (
              <FaChevronDown />
            ) : (
              <FaChevronRight />
            )}
          </h3>
          {openSections.patientManagement &&
            patientManagement.map((item) => (
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

export default SideBarNurse;
