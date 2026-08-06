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

  const [datePart, timePart] = currentTime.split(" | ");

  return (
    <div className="flex items-center justify-center whitespace-nowrap">
      <p className="text-center text-sm font-medium text-gray-600">
        {datePart}
        {timePart ? (
          <>
            <span className="mx-1 text-gray-400">|</span>
            <span className="text-gray-500">{timePart}</span>
          </>
        ) : null}
      </p>
    </div>
  );
}
