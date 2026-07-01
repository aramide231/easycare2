import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { startOfDay } from "@/lib/dateTime";

export type DashboardDateRange = {
  startDate: Date;
  endDate: Date;
};

type Props = {
  value?: DashboardDateRange;
  onChange?: (range: DashboardDateRange) => void;
  className?: string;
};

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function normalizeDay(date: Date) {
  return startOfDay(date);
}

function isSameDay(a: Date, b: Date) {
  return a.toDateString() === b.toDateString();
}

const NurseDashboardCalendar = ({ value, onChange, className = "" }: Props) => {
  const today = normalizeDay(new Date());
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [selectedRange, setSelectedRange] = useState<{
    start?: Date;
    end?: Date;
  }>(() =>
    value
      ? { start: value.startDate, end: value.endDate }
      : {},
  );

  useEffect(() => {
    if (!value) return;
    setSelectedRange({ start: value.startDate, end: value.endDate });
    setCurrentDate(new Date(value.startDate));
  }, [value]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleString("default", { month: "long" });
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarDays = Array.from({ length: 42 }, (_, i) => {
    const day = i - firstDayOfMonth + 1;
    return day > 0 && day <= daysInMonth ? day : null;
  });

  const isCurrentMonth =
    month === today.getMonth() && year === today.getFullYear();

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    if (isCurrentMonth) return;
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const isFutureDate = (date: Date) => normalizeDay(date) > today;

  const notifyRange = (start: Date, end: Date) => {
    onChange?.({
      startDate: normalizeDay(start),
      endDate: normalizeDay(end),
    });
  };

  const handleDateClick = (day: number) => {
    const selectedDate = normalizeDay(new Date(year, month, day));
    if (isFutureDate(selectedDate)) return;

    if (!selectedRange.start || (selectedRange.start && selectedRange.end)) {
      setSelectedRange({ start: selectedDate, end: undefined });
      return;
    }

    if (selectedDate >= selectedRange.start) {
      const range = { start: selectedRange.start, end: selectedDate };
      setSelectedRange(range);
      notifyRange(range.start, range.end);
      return;
    }

    setSelectedRange({ start: selectedDate, end: undefined });
  };

  const isToday = (day: number) =>
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  const isRangeStart = (day: number) => {
    if (!selectedRange.start) return false;
    return isSameDay(new Date(year, month, day), selectedRange.start);
  };

  const isRangeEnd = (day: number) => {
    if (!selectedRange.end) return false;
    return isSameDay(new Date(year, month, day), selectedRange.end);
  };

  const isInRange = (day: number) => {
    if (!selectedRange.start || !selectedRange.end) return false;
    const date = normalizeDay(new Date(year, month, day));
    return date > selectedRange.start && date < selectedRange.end;
  };

  const getDayClassName = (day: number) => {
    const date = new Date(year, month, day);
    const future = isFutureDate(date);
    const start = isRangeStart(day);
    const end = isRangeEnd(day);
    const inRange = isInRange(day);
    const todayCell = isToday(day);

    if (future) {
      return "text-gray-300 cursor-not-allowed";
    }

    if (start || end) {
      return "bg-[#573FD1] text-white font-semibold rounded-full z-10";
    }

    if (inRange) {
      return "bg-[#EDE9FE] text-[#573FD1] font-medium rounded-none w-full";
    }

    if (todayCell) {
      return "text-[#573FD1] font-semibold hover:bg-gray-100 cursor-pointer rounded-full";
    }

    return "text-gray-600 hover:bg-gray-100 cursor-pointer rounded-full";
  };

  return (
    <div
      className={`w-full rounded-xl border border-gray-200 bg-white p-3.5 shadow-sm ${className}`}
    >
      <div className="mb-2.5 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-900">
          {monthName} {year}
        </h2>
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            onClick={goToPreviousMonth}
            className="flex h-7 w-7 items-center justify-center rounded-md text-gray-600 hover:bg-gray-100"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={goToNextMonth}
            disabled={isCurrentMonth}
            className={`flex h-7 w-7 items-center justify-center rounded-md text-gray-600 ${
              isCurrentMonth
                ? "cursor-not-allowed opacity-30"
                : "hover:bg-gray-100"
            }`}
            aria-label="Next month"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mb-1 grid grid-cols-7 text-center text-[11px] font-medium text-gray-400">
        {DAYS.map((d) => (
          <div key={d} className="py-0.5">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 text-center text-xs font-medium">
        {calendarDays.map((day, idx) =>
          day ? (
            <div key={idx} className="relative flex items-center justify-center py-0.5">
              {isInRange(day) && (
                <span className="pointer-events-none absolute inset-y-0.5 left-0 right-0 bg-[#EDE9FE]" />
              )}
              <button
                type="button"
                onClick={() => handleDateClick(day)}
                disabled={isFutureDate(new Date(year, month, day))}
                className={`relative flex h-8 w-8 items-center justify-center ${getDayClassName(day)}`}
              >
                {day}
              </button>
            </div>
          ) : (
            <div key={idx} className="h-8" />
          ),
        )}
      </div>
    </div>
  );
};

export function parsePatientLastSeen(value: string): Date | null {
  const parts = value.split("-");
  if (parts.length !== 3) return null;

  const day = Number(parts[0]);
  const monthKey = parts[1].slice(0, 3);
  const year = Number(parts[2]);
  const months: Record<string, number> = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };

  const month = months[monthKey];
  if (Number.isNaN(day) || Number.isNaN(year) || month === undefined) {
    return null;
  }

  return new Date(year, month, day);
}

export function startOfDayDate(date: Date) {
  return startOfDay(date);
}

export default NurseDashboardCalendar;
