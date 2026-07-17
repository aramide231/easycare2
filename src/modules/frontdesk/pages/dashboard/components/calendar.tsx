import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarProps {
  onRangeSelect?: (range: { start: Date; end: Date }) => void;
}

export default function Calendar({ onRangeSelect }: CalendarProps) {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedRange, setSelectedRange] = useState<{
    start?: Date;
    end?: Date;
  }>({});

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleString("default", { month: "long" });
  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Su"];

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
    if (isCurrentMonth) return; // disable moving beyond present month
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const isFutureDate = (d: Date) => d > today;

  const handleDateClick = (day: number) => {
    const selectedDate = new Date(year, month, day);
    if (isFutureDate(selectedDate)) return;

    if (!selectedRange.start) {
      setSelectedRange({ start: selectedDate });
    } else if (!selectedRange.end) {
      // Ensure proper order
      if (selectedDate >= selectedRange.start) {
        const range = { start: selectedRange.start, end: selectedDate };
        setSelectedRange(range);
        onRangeSelect?.(range);
      } else {
        setSelectedRange({ start: selectedDate });
      }
    } else {
      // Reset on third click
      setSelectedRange({ start: selectedDate, end: undefined });
    }
  };

  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  const isSelected = (day: number) => {
    const date = new Date(year, month, day);
    return (
      (selectedRange.start &&
        date.toDateString() === selectedRange.start.toDateString()) ||
      (selectedRange.end &&
        date.toDateString() === selectedRange.end.toDateString())
    );
  };

  const isInRange = (day: number) => {
    if (!selectedRange.start || !selectedRange.end) return false;
    const date = new Date(year, month, day);
    return date > selectedRange.start && date < selectedRange.end;
  };

  return (
    <div className="hidden lg:block bg-background rounded-2xl border border-border/50 p-4 max-w-70 min-h-65">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-txt">
          {monthName} {year}
        </h2>
        <div className="flex items-center gap-1">
          <button
            onClick={goToPreviousMonth}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronLeft size={20} className="text-txt-muted" />
          </button>
          <button
            onClick={goToNextMonth}
            disabled={isCurrentMonth}
            className={`p-1 rounded ${
              isCurrentMonth
                ? "opacity-30 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
          >
            <ChevronRight size={20} className="text-txt-muted" />
          </button>
        </div>
      </div>

      {/* Days of week */}
      <div className="grid grid-cols-7 text-center text-xs text-[#808080] mb-1">
        {days.map((d) => (
          <div key={d} className="py-1 font-medium">
            {d}
          </div>
        ))}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-7 text-center text-sm font-medium py-2">
        {calendarDays.map((day, idx) =>
          day ? (
            <div
              key={idx}
              onClick={() => handleDateClick(day)}
              className={`py-2 mx-auto w-6 h-6 flex items-center justify-center rounded-full
                ${
                  isFutureDate(new Date(year, month, day))
                    ? "text-gray-300 cursor-not-allowed"
                    : isToday(day)
                      ? "bg-primary text-white font-semibold"
                      : isSelected(day)
                        ? "bg-primary/80 text-white font-semibold"
                        : isInRange(day)
                          ? "bg-primary/10 w-full h-6 rounded-none text-primary font-medium"
                          : "text-txt-muted hover:bg-gray-100 cursor-pointer"
                } `}
            >
              {day}
            </div>
          ) : (
            <div key={idx}></div>
          ),
        )}
      </div>
    </div>
  );
}

// import * as React from "react"
// import { ChevronLeft, ChevronRight } from "lucide-react"
// import { DayPicker } from "react-day-picker"

// import { cn } from "@/lib/utils"
// import { buttonVariants } from "./variants"

// export type CalendarProps = React.ComponentProps<typeof DayPicker>

// function Calendar({
//   className,
//   classNames,
//   showOutsideDays = true,
//   ...props
// }: CalendarProps) {
//   return (
//     <DayPicker
//       showOutsideDays={showOutsideDays}
//       className={cn("p-3", className)}
//       classNames={{
//         months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
//         month: "space-y-4",
//         caption: "flex justify-center pt-1 relative items-center",
//         caption_label: "text-sm font-medium",
//         nav: "space-x-1 flex items-center",
//         nav_button: cn(
//           buttonVariants({ variant: "outline" }),
//           "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
//         ),
//         nav_button_previous: "absolute left-1",
//         nav_button_next: "absolute right-1",
//         table: "w-full border-collapse space-y-1",
//         head_row: "flex",
//         head_cell:
//           "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
//         row: "flex w-full mt-2",
//         cell: cn(
//           "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
//           props.mode === "range"
//             ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
//             : "[&:has([aria-selected])]:rounded-md"
//         ),
//         day: cn(
//           buttonVariants({ variant: "ghost" }),
//           "h-8 w-8 p-0 font-normal aria-selected:opacity-100"
//         ),
//         day_range_start: "day-range-start",
//         day_range_end: "day-range-end",
//         day_selected:
//           "bg-danger text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
//         day_today: "bg-accent text-accent-foreground",
//         day_outside:
//           "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
//         day_disabled: "text-muted-foreground opacity-50",
//         day_range_middle:
//           "aria-selected:bg-accent aria-selected:text-accent-foreground",
//         day_hidden: "invisible",
//         ...classNames,
//       }}
//       components={{
//         IconLeft: ({ className, ...props }) => (
//           <ChevronLeft className={cn("h-4 w-4", className)} {...props} />
//         ),
//         IconRight: ({ className, ...props }) => (
//           <ChevronRight className={cn("h-4 w-4", className)} {...props} />
//         ),
//       }}
//       {...props}
//     />
//   )
// }
// Calendar.displayName = "Calendar"

// export { Calendar }
