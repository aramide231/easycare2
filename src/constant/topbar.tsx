import { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import clientimage from "../assets/image/haywhy.jpg";
import { useAuth } from "@/context/AuthContext";

const Topbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = currentTime.toLocaleString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  // NEW BREADCRUMB ROUTE PATTERNS (Dynamic + Static)
  const breadcrumbPages = [
    { pattern: /^\/frontdesk\/edit\/\d+$/ },
    { pattern: /^\/frontdesk\/flag-profile\/\d+$/ },
    { pattern: /^\/frontdesk\/visitation-log$/ },
    { pattern: /^\/frontdesk\/registration$/ },
    { pattern: /^\/frontdesk\/notifications$/ },
    { pattern: /^\/frontdesk\/manage-access$/ },
    { pattern: /^\/frontdesk\/manage-card$/ },
    { pattern: /^\/frontdesk\/reminder$/ },
    { pattern: /^\/frontdesk\/doctor-assignment$/ },
    { pattern: /^\/frontdesk\/immunization$/ },
    { pattern: /^\/frontdesk\/ante-natal$/ },
    { pattern: /^\/frontdesk\/child-birth$/ },
    { pattern: /^\/frontdesk\/post-natal$/ },
    { pattern: /^\/frontdesk\/family-planning$/ },
    { pattern: /^\/nurse\/notifications$/ },
    { pattern: /^\/nurse\/patient-profile\/\d+$/ },
  ];

  // Check if current route should show breadcrumbs
  const isBreadcrumbPage = breadcrumbPages.some((route) =>
    route.pattern.test(location.pathname)
  );

  // Breadcrumb rendering
  const renderBreadcrumbs = () => {
    const pathParts = location.pathname.split("/").filter(Boolean);

    // Made changes to generate breadcrumb items
    const breadcrumbItems = [
      { name: "Dashboard", path: "/" },
      ...pathParts.map((part, index) => {
        const fullPath = `/${pathParts.slice(0, index + 1).join("/")}`;
        const formatted = isNaN(Number(part))
          ? part.replace(/-/g, " ")
          : `ID: ${part}`;
        return { name: formatted, path: fullPath };
      }),
    ];

    return (
      <div className="text-sm text-gray-500 flex gap-1 items-center">
        {breadcrumbItems.map((crumb, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          return (
            <span key={index} className="flex items-center gap-1">
              {!isLast ? (
                <Link
                  to={crumb.path}
                  className="text-blue-500 hover:underline capitalize"
                >
                  {crumb.name}
                </Link>
              ) : (
                <span className="capitalize">{crumb.name}</span>
              )}
              {!isLast && <span className="mx-1">&gt;</span>}
            </span>
          );
        })}
      </div>
    );
  };

  const handleLogout = () => {
    signOut(); // Sign out the user
    navigate("/"); // Redirect to the login page
  };

  return (
    <div className="flex justify-between items-center p-4 bg-white">
      <div className="w-1/2">
        {isBreadcrumbPage ? (
          renderBreadcrumbs()
        ) : (
          <div className="flex items-center gap-2 border px-3 py-2 rounded-lg w-full">
            <FaSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Search Patients ID"
              className="outline-none w-full"
            />
          </div>
        )}
      </div>
      <div className="text-gray-600">{formattedTime}</div>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full overflow-hidden">
          <img
            src={clientimage}
            alt="User"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Routing UserName and Role */}
        <div>
          <h3 className="text-sm font-semibold">{user?.fullName}</h3>
          <p className="text-xs text-gray-500">{user?.userRole}</p>
        </div>
        {/* Log out button */}
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white text-sm px-5 py-2 rounded-full hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Topbar;
