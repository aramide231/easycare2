import { useEffect, useRef, useState } from "react";
import { Calendar, Range } from "react-date-range";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export type DateRangeValue = {
  startDate: Date;
  endDate: Date;
};

type Preset = {
  label: string;
  getRange: () => DateRangeValue;
};

const PRESETS: Preset[] = [
  {
    label: "Today",
    getRange: () => {
      const today = startOfDay(new Date());
      return { startDate: today, endDate: today };
    },
  },
  {
    label: "Yesterday",
    getRange: () => {
      const day = startOfDay(new Date());
      day.setDate(day.getDate() - 1);
      return { startDate: day, endDate: day };
    },
  },
  {
    label: "Last Week",
    getRange: () => {
      const end = startOfDay(new Date());
      const start = startOfDay(new Date());
      start.setDate(end.getDate() - 6);
      return { startDate: start, endDate: end };
    },
  },
  {
    label: "Last Month",
    getRange: () => {
      const end = startOfDay(new Date());
      const start = startOfDay(new Date());
      start.setDate(end.getDate() - 29);
      return { startDate: start, endDate: end };
    },
  },
  {
    label: "Last Year",
    getRange: () => {
      const end = startOfDay(new Date());
      const start = startOfDay(new Date());
      start.setFullYear(end.getFullYear() - 1);
      return { startDate: start, endDate: end };
    },
  },
  {
    label: "All Time",
    getRange: () => ({
      startDate: new Date(2000, 0, 1),
      endDate: startOfDay(new Date()),
    }),
  },
];

function startOfDay(date: Date) {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

export function formatRangeDate(date: Date) {
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function formatMonthYear(date: Date) {
  return date.toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });
}

function shiftMonth(date: Date, delta: number) {
  const next = new Date(date);
  next.setMonth(next.getMonth() + delta);
  return next;
}

function toRange(value: DateRangeValue): Range[] {
  return [
    {
      startDate: value.startDate,
      endDate: value.endDate,
      key: "selection",
    },
  ];
}

type MonthHeaderProps = {
  label: "From" | "To";
  monthView: Date;
  onMonthChange: (month: Date) => void;
};

function MonthHeader({ label, monthView, onMonthChange }: MonthHeaderProps) {
  return (
    <div className="flex min-h-[48px] items-center px-4 py-3">
      <span className="shrink-0 text-sm font-semibold text-gray-900">
        {label}:
      </span>
      <div className="flex flex-1 items-center justify-center gap-1">
        <button
          type="button"
          onClick={() => onMonthChange(shiftMonth(monthView, -1))}
          className="flex h-7 w-7 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100"
          aria-label={`Previous month for ${label}`}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="min-w-[120px] text-center text-sm font-medium text-gray-900">
          {formatMonthYear(monthView)}
        </span>
        <button
          type="button"
          onClick={() => onMonthChange(shiftMonth(monthView, 1))}
          className="flex h-7 w-7 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100"
          aria-label={`Next month for ${label}`}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

type Props = {
  value: DateRangeValue;
  onChange: (value: DateRangeValue) => void;
  align?: "left" | "right";
  maxDate?: Date;
};

const DateRangeFilter = ({
  value,
  onChange,
  align = "right",
  maxDate = new Date(),
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [tempRange, setTempRange] = useState(toRange(value));
  const [fromMonth, setFromMonth] = useState(value.startDate);
  const [toMonth, setToMonth] = useState(value.endDate);

  const startDate = tempRange[0].startDate ?? new Date();
  const endDate = tempRange[0].endDate ?? new Date();

  const syncDraftFromRange = (range: DateRangeValue) => {
    setFromMonth(range.startDate);
    setToMonth(range.endDate);
  };

  useEffect(() => {
    if (!isOpen) {
      setTempRange(toRange(value));
      syncDraftFromRange(value);
    }
  }, [value, isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setTempRange(toRange(value));
        syncDraftFromRange(value);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, value]);

  const applyTempRange = (nextStart: Date, nextEnd: Date) => {
    const start = startOfDay(nextStart);
    const end = startOfDay(nextEnd);
    const normalizedStart = start <= end ? start : end;
    const normalizedEnd = start <= end ? end : start;

    setActivePreset(null);
    setTempRange(
      toRange({ startDate: normalizedStart, endDate: normalizedEnd }),
    );
    setFromMonth(normalizedStart);
    setToMonth(normalizedEnd);
  };

  const handlePreset = (preset: Preset) => {
    const range = preset.getRange();
    setActivePreset(preset.label);
    setTempRange(toRange(range));
    syncDraftFromRange(range);
  };

  const handleFromDatePick = (date: Date) => {
    applyTempRange(date, endDate);
  };

  const handleToDatePick = (date: Date) => {
    applyTempRange(startDate, date);
  };

  const handleApply = () => {
    onChange({ startDate, endDate });
    setIsOpen(false);
  };

  const handleCancel = () => {
    setTempRange(toRange(value));
    syncDraftFromRange(value);
    setIsOpen(false);
  };

  const rangeHighlight = [
    {
      startDate,
      endDate,
      key: "selection",
      color: "#573FD1",
    },
  ];

  return (
    <div ref={containerRef} className="relative w-fit">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="flex items-center rounded-full border border-[#573FD1] px-3 py-1.5 text-sm font-medium text-[#573FD1]"
      >
        <svg
          className="mr-2 h-4 w-4 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 7V3m8 4V3m-9 4h10M5 10h14M5 14h14M5 18h14"
          />
        </svg>
        {formatRangeDate(value.startDate)} - {formatRangeDate(value.endDate)}
      </button>

      {isOpen && (
        <div
          className={`date-range-filter absolute top-12 z-50 flex overflow-hidden rounded-[10px] border border-[#D4D4D4] bg-white shadow-lg ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          <aside className="flex w-36 shrink-0 flex-col gap-1 border-r border-[#D4D4D4] p-4">
            {PRESETS.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => handlePreset(preset)}
                className={`rounded-lg px-3 py-2 text-left text-sm transition ${
                  activePreset === preset.label
                    ? "bg-[#EDE9FE] font-semibold text-[#573FD1]"
                    : "text-gray-800 hover:bg-gray-50"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </aside>

          <div className="flex min-w-[620px] flex-1 flex-col">
            <div className="grid grid-cols-2">
              <div className="flex flex-col border-r border-[#D4D4D4]">
                <MonthHeader
                  label="From"
                  monthView={fromMonth}
                  onMonthChange={setFromMonth}
                />
                <div className="date-range-filter__column">
                  <Calendar
                    date={startDate}
                    onChange={handleFromDatePick}
                    shownDate={fromMonth}
                    onShownDateChange={setFromMonth}
                    ranges={rangeHighlight}
                    maxDate={maxDate}
                    months={1}
                    direction="horizontal"
                    showDateDisplay={false}
                    showMonthAndYearPickers={false}
                    rangeColors={["#573FD1"]}
                    color="#573FD1"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <MonthHeader
                  label="To"
                  monthView={toMonth}
                  onMonthChange={setToMonth}
                />
                <div className="date-range-filter__column">
                  <Calendar
                    date={endDate}
                    onChange={handleToDatePick}
                    shownDate={toMonth}
                    onShownDateChange={setToMonth}
                    ranges={rangeHighlight}
                    maxDate={maxDate}
                    months={1}
                    direction="horizontal"
                    showDateDisplay={false}
                    showMonthAndYearPickers={false}
                    rangeColors={["#573FD1"]}
                    color="#573FD1"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-[#D4D4D4] px-4 py-4">
              <button
                type="button"
                onClick={handleCancel}
                className="rounded-lg border border-[#573FD1] bg-[#EDE9FE] px-5 py-2 text-sm font-medium text-[#573FD1] hover:bg-purple-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleApply}
                className="rounded-lg bg-[#573FD1] px-5 py-2 text-sm font-medium text-white hover:bg-purple-700"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangeFilter;
