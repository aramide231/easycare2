import { useEffect, useState } from "react";

function getOrdinalSuffix(day: number): string {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

export default function Clock() {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const day = now.getDate();
      const month = now.toLocaleString("en-US", { month: "long" });
      const year = now.getFullYear();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");

      setCurrentTime(
        `${day}${getOrdinalSuffix(day)} ${month} ${year}, ${hours}:${minutes}`,
      );
    };

    updateTime();
    const timer = setInterval(updateTime, 1000 * 60);
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
        ) : (
          "Loading..."
        )}
      </p>
    </div>
  );
}
