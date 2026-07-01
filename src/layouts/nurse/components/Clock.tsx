import { useEffect, useState } from "react";
import { formatClockDateTime } from "@/lib/dateTime";

export default function Clock() {
  const [currentTime, setCurrentTime] = useState(() =>
    formatClockDateTime(new Date()),
  );

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(formatClockDateTime(new Date()));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-center whitespace-nowrap">
      <p className="text-center text-sm font-medium text-gray-600">
        {currentTime ? (
          <>
            {currentTime.split(",")[0]},
            <span className="ml-1 text-gray-500">
              {currentTime.split(",")[1]}
            </span>
          </>
        ) : null}
      </p>
    </div>
  );
}
