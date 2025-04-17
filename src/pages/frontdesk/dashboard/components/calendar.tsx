import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaUserCircle } from "react-icons/fa";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const CustomCalendar: React.FC = () => {
  const [date, setDate] = useState<Value>(new Date());

  // Dates with user icons
  const markedDates = [18, 25, 28];

  return (
    <div className="flex flex-col items-center p-4">
      <div className="border-2 border-blue-500 rounded-lg shadow-lg p-2">
        <Calendar
          onChange={setDate}
          value={date}
          tileContent={({ date, view }) => {
            if (view === "month" && markedDates.includes(date.getDate())) {
              return (
                <div className="flex justify-center mt-1">
                  <FaUserCircle className="text-black text-lg" />
                </div>
              );
            }
          }}
          className="p-2"
        />
      </div>
    </div>
  );
};

export default CustomCalendar;
