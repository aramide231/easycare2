import { useEffect, useState } from "react";

function formatClockParts(now: Date): { datePart: string; timePart: string } {
  const day = now.getDate().toString().padStart(2, "0");
  const month = now.toLocaleString("en-US", { month: "long" });
  const year = now.getFullYear();

  const rawHours = now.getHours();
  const period = rawHours >= 12 ? "PM" : "AM";
  const hours12 = (rawHours % 12 || 12).toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  return {
    datePart: `${day}-${month}-${year}`,
    timePart: `${hours12}:${minutes}:${seconds} ${period}`,
  };
}

export default function Clock() {
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const { datePart, timePart } = formatClockParts(now);

  return (
    <div className="flex items-center justify-center whitespace-nowrap">
      <p className="text-center text-sm font-medium text-gray-600 tabular-nums">
        <span>{datePart}</span>
        <span className="mx-1.5 text-gray-400">|</span>
        <span className="text-gray-500">{timePart}</span>
      </p>
    </div>
  );
}
