import { useEffect, useState } from "react";

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

      const formatted = `${day}${getOrdinalSuffix(
        day,
      )} ${month} ${year}, ${hours}:${minutes}`;
      setCurrentTime(formatted);
    };

    updateTime(); // initial call
    const timer = setInterval(updateTime, 1000 * 60); // update every 1 minute

    return () => clearInterval(timer);
  }, []);

  // Function to get ordinal suffix (st, nd, rd, th)
  const getOrdinalSuffix = (day: number): string => {
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
  };

  return (
    <div className="flex items-center gap-6">
      <p className="text-muted text-sm font-medium">
        {currentTime ? (
          <>
            {currentTime.split(",")[0]},{" "}
            <span className="text-txt-muted">{currentTime.split(",")[1]}</span>
          </>
        ) : (
          "Loading..."
        )}
      </p>
    </div>
  );
}
