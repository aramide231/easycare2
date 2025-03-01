import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

const Topbar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = currentTime.toLocaleString("en-GB", {
    day: "2-digit", month: "long", year: "numeric",
    hour: "2-digit", minute: "2-digit", second: "2-digit"
  });

  return (
    <div className="flex justify-between items-center p-4 bg-white ">
      <div className="flex items-center gap-2 border px-3 py-2 rounded-lg w-1/2">
        <FaSearch className="text-gray-500" />
        <input type="text" placeholder="Search Patients ID" className="outline-none w-full" />
      </div>
      <div className="text-gray-600">{formattedTime}</div>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full overflow-hidden">
          <img src="https://via.placeholder.com/40" alt="User" className="w-full h-full object-cover" />
        </div>
        <div>
          <h3 className="text-sm font-semibold">Joseph Adeoye</h3>
          <p className="text-xs text-gray-500">Front Desk Personnel</p>
        </div>
      </div>
    </div>
  );
};

export default Topbar;