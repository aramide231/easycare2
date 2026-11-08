import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";

interface Props {
  onConfirm: (dateTime: Date) => void;
  onCancel: () => void;
  initialDate?: Date;
}

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function padTwo(n: number) {
  return String(n).padStart(2, "0");
}

export default function AppointmentCalendar({
  onConfirm,
  onCancel,
  initialDate,
}: Props) {
  const base = initialDate ?? new Date();

  const [viewDate, setViewDate] = useState(
    new Date(base.getFullYear(), base.getMonth(), 1),
  );
  const [selectedDay, setSelectedDay] = useState<number>(base.getDate());
  const [hour, setHour] = useState(padTwo(base.getHours() % 12 || 12));
  const [minute, setMinute] = useState(padTwo(base.getMinutes()));
  const [meridiem, setMeridiem] = useState<"AM" | "PM">(
    base.getHours() >= 12 ? "PM" : "AM",
  );

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const monthName = viewDate.toLocaleString("default", { month: "long" });

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  const calendarCells = Array.from({ length: 42 }, (_, i) => {
    const day = i - firstDayOfMonth + 1;
    return day > 0 && day <= daysInMonth ? day : null;
  });

  const isToday = (day: number) =>
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  const isPast = (day: number) => {
    const d = new Date(year, month, day);
    d.setHours(0, 0, 0, 0);
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return d < t;
  };

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const handleConfirm = () => {
    let h = parseInt(hour, 10);
    const m = parseInt(minute, 10);
    if (meridiem === "PM" && h < 12) h += 12;
    if (meridiem === "AM" && h === 12) h = 0;
    const result = new Date(year, month, selectedDay, h, m);
    onConfirm(result);
  };

  const clampHour = (val: string) => {
    const n = parseInt(val, 10);
    if (isNaN(n)) return "01";
    return padTwo(Math.min(12, Math.max(1, n)));
  };

  const clampMinute = (val: string) => {
    const n = parseInt(val, 10);
    if (isNaN(n)) return "00";
    return padTwo(Math.min(59, Math.max(0, n)));
  };

  return (
    <div className="w-[340px] rounded-2xl border border-gray-200 bg-white p-5 shadow-xl">
      {/* Month navigation */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-900">
          {monthName}&nbsp;
          <span className="font-normal text-gray-500">{year}</span>
        </h2>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={prevMonth}
            className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-gray-100"
          >
            <ChevronLeft className="h-4 w-4 text-gray-500" />
          </button>
          <button
            type="button"
            onClick={nextMonth}
            className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-gray-100"
          >
            <ChevronRight className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Day labels */}
      <div className="mb-1 grid grid-cols-7 text-center text-xs font-medium text-gray-400">
        {DAYS.map((d) => (
          <div key={d} className="py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Date cells */}
      <div className="grid grid-cols-7 text-center text-sm">
        {calendarCells.map((day, idx) =>
          day ? (
            <button
              key={idx}
              type="button"
              disabled={isPast(day)}
              onClick={() => setSelectedDay(day)}
              className={`relative mx-auto flex h-9 w-9 items-center justify-center rounded-full font-medium transition
                ${
                  isPast(day)
                    ? "cursor-not-allowed text-gray-300"
                    : day === selectedDay
                      ? "bg-[#573FD1] text-white shadow-md"
                      : isToday(day)
                        ? "font-bold text-[#573FD1]"
                        : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              {day}
              {/* Today dot */}
              {isToday(day) && day !== selectedDay && (
                <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#573FD1]" />
              )}
            </button>
          ) : (
            <div key={idx} />
          ),
        )}
      </div>

      {/* Divider */}
      <div className="my-4 border-t border-gray-100" />

      {/* Time picker */}
      <div className="flex items-center gap-3">
        <Clock className="h-5 w-5 shrink-0 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">Time</span>
        <div className="ml-auto flex items-center gap-2">
          {/* Hour */}
          <input
            type="text"
            inputMode="numeric"
            maxLength={2}
            value={hour}
            onChange={(e) => setHour(e.target.value.replace(/\D/, ""))}
            onBlur={(e) => setHour(clampHour(e.target.value))}
            className="h-9 w-12 rounded-lg border border-gray-300 text-center text-sm font-semibold text-gray-800 focus:border-[#573FD1] focus:outline-none focus:ring-1 focus:ring-[#573FD1]"
          />
          <span className="text-lg font-bold text-gray-500">:</span>
          {/* Minute */}
          <input
            type="text"
            inputMode="numeric"
            maxLength={2}
            value={minute}
            onChange={(e) => setMinute(e.target.value.replace(/\D/, ""))}
            onBlur={(e) => setMinute(clampMinute(e.target.value))}
            className="h-9 w-12 rounded-lg border border-gray-300 text-center text-sm font-semibold text-gray-800 focus:border-[#573FD1] focus:outline-none focus:ring-1 focus:ring-[#573FD1]"
          />
          {/* AM/PM toggle */}
          <button
            type="button"
            onClick={() => setMeridiem((p) => (p === "AM" ? "PM" : "AM"))}
            className="h-9 w-14 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none"
          >
            {meridiem}
          </button>
        </div>
      </div>

      {/* Action buttons */}
      <div className="mt-5 flex gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 rounded-xl border border-[#573FD1] py-2.5 text-sm font-semibold text-[#573FD1] transition hover:bg-purple-50"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          className="flex-1 rounded-xl bg-[#573FD1] py-2.5 text-sm font-semibold text-white transition hover:bg-[#4a35b8]"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
