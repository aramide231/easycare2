import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import Clock from "./Clock";

import fdAvatar from "@frontdesk/assets/icon-image/Ellipse 2.png";

// Reusable 9-Dot App Grid SVG
const AppGridIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="5" cy="5" r="2" fill="#573FD1" />
    <circle cx="12" cy="5" r="2" fill="#573FD1" />
    <circle cx="19" cy="5" r="2" fill="#573FD1" />
    <circle cx="5" cy="12" r="2" fill="#573FD1" />
    <circle cx="12" cy="12" r="2" fill="#573FD1" />
    <circle cx="19" cy="12" r="2" fill="#573FD1" />
    <circle cx="5" cy="19" r="2" fill="#573FD1" />
    <circle cx="12" cy="19" r="2" fill="#573FD1" />
    <circle cx="19" cy="19" r="2" fill="#573FD1" />
  </svg>
);

const Topbar: React.FC = () => {
  const [dropdownToggle, setDropdownToggle] = useState(false);

  return (
    <header className="w-full h-[76px] bg-white border-b border-border flex items-center justify-between px-8 py-2 transition-all">
      {/* Search Section */}
      <div className="relative w-full max-w-[440px]">
        {/* Left side icons (Search + Pipe separator) */}
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none gap-3">
          <Search
            className="w-[18px] h-[18px] text-gray-500"
            strokeWidth={2.5}
          />
          <span className="text-gray-300 font-light text-lg pb-0.5">|</span>
        </div>

        <input
          type="text"
          placeholder="Search Patients ID"
          className="w-full h-10 pl-14 pr-4 bg-transparent border border-border rounded-lg text-sm text-txt placeholder-txt-muted focus:outline-none focus:border-2 focus:border-primary transition-all"
        />
      </div>

      {/* RealTime Clock */}
      <div className="hidden lg:block">
        <Clock />
      </div>

      {/*  Action & Profile Section */}
      <div className="flex items-center gap-6">
        {/* Apps/Grid Button */}
        <button className="p-2 rounded-xl hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20">
          <AppGridIcon />
        </button>

        {/* Profile Dropdown Toggle */}
        <button
          onClick={() => setDropdownToggle((prev) => !prev)}
          className="flex items-center gap-3 p-1 rounded-xl hover:bg-gray-50 transition-colors text-left focus:outline-none"
        >
          {/* Avatar */}
          <img
            src={fdAvatar}
            alt="User avatar"
            className="w-11 h-11 rounded-full object-cover border border-gray-100 shadow-sm"
          />

          {/* User Details */}
          <div className="flex flex-col justify-center min-w-[120px]">
            <h1 className="text-sm font-semibold text-gray-900 leading-tight">
              John Doe
            </h1>
            <div className="flex items-center justify-between gap-2 mt-0.5">
              <p className="text-[13px] text-gray-500 font-medium">
                Front Desk Personnel
              </p>
              {/* Animated Chevron */}
              <ChevronDown
                size={14}
                strokeWidth={2.5}
                className={`text-gray-400 transition-transform duration-300 ease-in-out ${
                  dropdownToggle ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>
          </div>
        </button>
      </div>

      {/* 
        Note: You would typically place your Absolute positioned 
        Dropdown Menu component right here, conditioned on `dropdownToggle` 
      */}
    </header>
  );
};

export default Topbar;
