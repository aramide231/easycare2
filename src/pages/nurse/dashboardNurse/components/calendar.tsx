import { useState } from "react";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaUserCircle } from "react-icons/fa";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface CustomCalendarProps {
  width?: string; // e.g., "400px"
  height?: string; // e.g., "300px"
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({
  width = "100%",
  height = "250px",
}) => {
  const [date, setDate] = useState<Value>(new Date());

  const markedDates = [18, 25, 28];

  return (
    <div className="flex flex-col items-center p-4">
      <div
        className="border-2 border-[#573FD1] rounded-lg shadow-lg p-2 hide-scrollbar"
        style={{
          width,
          height,
          overflow: "auto",
          scrollBehavior: "smooth",
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE 10+
        }}
        // Hide scrollbar in Webkit browsers
      >
        <div className="w-full min-h-full">
          <Calendar
            onChange={setDate}
            value={date}
            tileContent={({ date, view }) =>
              view === "month" && markedDates.includes(date.getDate()) ? (
                <div className="flex justify-center mt-1">
                  <FaUserCircle className="text-black text-lg" />
                </div>
              ) : null
            }
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default CustomCalendar;
