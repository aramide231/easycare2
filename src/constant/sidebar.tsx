import { useEffect, useState } from "react";
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
  FaHome,
  FaTablets,
  FaBook,
  FaProcedures,
} from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import easyCareLogo from "@/assets/icon/Frame 121.svg";
import hospitalLogo from "@/assets/icon/Frame 5.svg";

type SectionsState = {
  mainMenu: boolean;
  patientManagement: boolean;
  performActions: boolean;
  reports: boolean;
};

type SectionKey = keyof SectionsState;

type RouteItem = {
  name: string;
  icon: JSX.Element;
  path: string;
};

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();
  const isNurse = user?.userRole === "nurse";

  const roleLabel =
    user?.userRole && user.userRole.length > 0
      ? user.userRole.charAt(0).toUpperCase() + user.userRole.slice(1)
      : "";

  const [openSections, setOpenSections] = useState<SectionsState>({
    mainMenu: true,
    patientManagement: isNurse,
    performActions: false,
    reports: false,
  });

  const toggleSection = (section: SectionKey) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // All routes grouped by roles
  const roleBasedRoutes: Record<string, { [key in SectionKey]?: RouteItem[] }> = {
    frontdesk: {
      mainMenu: [
        {
          name: "Dashboard",
          icon: <FaTachometerAlt />,
          path: "/frontdesk",
        },
        {
          name: "Visitation Log",
          icon: <FaCalendarCheck />,
          path: "/frontdesk/visitation-log",
        },
      ],
      performActions: [
        {
          name: "Manage Access",
          icon: <FaUserLock />,
          path: "/frontdesk/manage-access",
        },
        {
          name: "Manage Card",
          icon: <FaIdCard />,
          path: "/frontdesk/manage-card",
        },
        { name: "Set Reminder", icon: <FaBell />, path: "/frontdesk/reminder" },
      ],
      reports: [
        {
          name: "Doctor Logs",
          icon: <FaUserMd />,
          path: "/frontdesk/doctor-assignments",
        },
        {
          name: "Immunization",
          icon: <FaSyringe />,
          path: "/frontdesk/immunization",
        },
        { name: "Ante Natal", icon: <FaBaby />, path: "/frontdesk/ante-natal" },
        {
          name: "Child Birth",
          icon: <FaChild />,
          path: "/frontdesk/child-birth",
        },
        {
          name: "Post Natal",
          icon: <FaSmile />,
          path: "/frontdesk/post-natal",
        },
        {
          name: "RegistrationLog",
          icon: <FaUserPlus />,
          path: "/frontdesk/registration-log",
        },
        {
          name: "Family Planning",
          icon: <FaUsers />,
          path: "/frontdesk/family-planning",
        },
      ],
    },
    nurse: {
      mainMenu: [
        {
          name: "Dashboard",
          icon: <FaTachometerAlt />,
          path: "/nurse",
        },
      ],
      patientManagement: [
        {
          name: "Admission",
          icon: <FaHospital />,
          path: "/nurse/admission",
        },
        {
          name: "Available Ward",
          icon: <FaProcedures />,
          path: "/nurse/available-ward",
        },
        {
          name: "Discharge",
          icon: <FaHome />,
          path: "/nurse/discharge",
        },
      ],
      performActions: [
        {
          name: "Make Request",
          icon: <FaUserLock />,
          path: "/nurse/make-request",
        },
        { name: "Set Reminder", icon: <FaBell />, path: "/nurse/reminder" },
      ],
      reports: [
        {
          name: "Admission",
          icon: <FaHospital />,
          path: "/nurse/reports/admission",
        },
        {
          name: "Discharge",
          icon: <FaHome />,
          path: "/nurse/reports/discharge",
        },
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
      ],
    },

    doctor: {
      mainMenu: [
        {
          name: "Dashboard",
          icon: <FaTachometerAlt />,
          path: "/nurse/dashboard",
        },
      ],
      patientManagement: [
        {
          name: "Admission",
          icon: <FaHospital />,
          path: "/nurse/admission",
        },
        {
          name: "Available Ward",
          icon: <FaProcedures />,
          path: "/nurse/available-ward",
        },
        {
          name: "Discharge",
          icon: <FaHome />,
          path: "/nurse/discharge",
        },
      ],
      performActions: [
        {
          name: "Make Request",
          icon: <FaUserLock />,
          path: "/nurse/make-request",
        },
        { name: "Set Reminder", icon: <FaBell />, path: "/nurse/reminder" },
      ],
      reports: [
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
      ],
    },

    // Add more roles as needed
  };

  const routesForUser =
    user?.userRole && roleBasedRoutes[user.userRole]
      ? roleBasedRoutes[user.userRole]
      : {};

  const isNavActive = (path: string) => {
    if (path === "/nurse") {
      return location.pathname === "/nurse" || location.pathname === "/nurse/dashboard";
    }
    return (
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    );
  };

  useEffect(() => {
    if (!isNurse) return;
    const patientMgmtPaths = [
      "/nurse/admission",
      "/nurse/available-ward",
      "/nurse/discharge",
    ];
    if (patientMgmtPaths.some((p) => location.pathname.startsWith(p))) {
      setOpenSections((prev) => ({ ...prev, patientManagement: true }));
    }
  }, [location.pathname, isNurse]);

  return (
    <div className="fixed left-0 top-0 h-screen w-72 bg-white border-r border-gray-300 p-5 flex flex-col shadow-md">
      {/* Logo & Hospital Info */}
      <div className="mb-5">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="rounded-md transition hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-[#573FD1]/30"
          aria-label="Reload page"
          title="Reload page"
        >
          <img
            src={easyCareLogo}
            alt="EasyCare"
            className="h-8 w-auto max-w-full"
          />
        </button>
      </div>
      <div className="bg-gray-100 p-3 rounded-lg flex gap-3 items-center mb-5">
        <img
          src={hospitalLogo}
          alt="St James Hospital"
          className="h-10 w-10 shrink-0 object-contain"
        />
        <div>
          <h3 className="text-sm font-semibold">St James Hospital</h3>
          <p className="text-xs text-gray-500">{roleLabel}</p>
        </div>
      </div>

      {/* Scrollable Sidebar Content */}
      <div
        className="flex-1 overflow-y-auto hide-scrollbar"
        style={{ scrollBehavior: "smooth" }}
      >
        {(
          [
            "mainMenu",
            "patientManagement",
            "performActions",
            "reports",
          ] as SectionKey[]
        ).map((sectionKey) => {
          const sectionItems = routesForUser[sectionKey];
          if (!sectionItems) return null;

          return (
            <div key={sectionKey} className="mt-5">
              <h3
                onClick={() => toggleSection(sectionKey)}
                className="text-gray-700 font-semibold text-xs mb-2 cursor-pointer flex justify-between items-center"
              >
                {sectionKey.replace(/([A-Z])/g, " $1").toUpperCase()}
                {openSections[sectionKey] ? (
                  <FaChevronDown />
                ) : (
                  <FaChevronRight />
                )}
              </h3>
              {openSections[sectionKey] &&
                sectionItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`w-full flex items-center gap-3 p-2 rounded-lg text-sm transition ${
                      isNavActive(item.path)
                        ? "bg-purple-100 text-purple-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {item.icon} {item.name}
                  </Link>
                ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
