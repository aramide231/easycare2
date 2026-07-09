import { useEffect, useRef, useState } from "react";
import { Calendar } from "lucide-react";
import { DateRange, RangeKeyDict } from "react-date-range";
import { cn } from "@/lib/utils";
import {
  DEFAULT_REPORT_DATE_RANGE,
  type ReportDateRange,
} from "../lib/reportDateRange";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

type DateRangeSelection = {
  startDate: Date;
  endDate: Date;
  key: string;
};

const QUICK_RANGES = [
  { label: "Today", start: 0, end: 0 },
  { label: "Yesterday", start: 1, end: 1 },
  { label: "Last Week", start: 7, end: 0 },
  { label: "Last Month", start: 30, end: 0 },
  { label: "Last Year", start: 365, end: 0 },
  { label: "All Time", start: 9999, end: 0 },
] as const;

const formatRangeLabel = (start: Date, end: Date) =>
  `${start.toLocaleDateString("en-GB")} - ${end.toLocaleDateString("en-GB")}`;

const defaultRange = (): DateRangeSelection[] => {
  const { startDate, endDate } = DEFAULT_REPORT_DATE_RANGE;
  return [{ startDate, endDate, key: "selection" }];
};

type Props = {
  /** Called when the user applies a new range — use this to filter report rows. */
  onRangeApply?: (range: ReportDateRange) => void;
};

const ReportDateRangeFilter = ({ onRangeApply }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeQuickRange, setActiveQuickRange] = useState<string | null>(null);
  const [selectedRange, setSelectedRange] =
    useState<DateRangeSelection[]>(defaultRange);
  const [tempRange, setTempRange] = useState<DateRangeSelection[]>(
    defaultRange()
  );

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setTempRange([...selectedRange]);
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, selectedRange]);

  const setQuickDateRange = (
    label: string,
    daysAgoStart: number,
    daysAgoEnd: number
  ) => {
    const today = new Date();
    const startDate = new Date();
    const endDate = new Date();

    if (label === "All Time") {
      startDate.setFullYear(today.getFullYear() - 10);
    } else {
      startDate.setDate(today.getDate() - daysAgoStart);
      endDate.setDate(today.getDate() - daysAgoEnd);
    }

    setActiveQuickRange(label);
    setTempRange([{ startDate, endDate, key: "selection" }]);
  };

  const handleApply = () => {
    const next = [...tempRange];
    setSelectedRange(next);
    onRangeApply?.({
      startDate: next[0].startDate,
      endDate: next[0].endDate,
    });
    setIsOpen(false);
  };

  const handleCancel = () => {
    setTempRange([...selectedRange]);
    setIsOpen(false);
  };

  const handleRangeChange = (ranges: RangeKeyDict) => {
    const selection = ranges.selection as DateRangeSelection;
    setActiveQuickRange(null);
    setTempRange([selection]);
  };

  const { startDate, endDate } = selectedRange[0];

  return (
    <div ref={containerRef} className="relative w-fit">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="flex items-center rounded-full border border-[#573FD1] px-3 py-1.5 text-sm font-medium text-[#573FD1]"
      >
        <Calendar className="mr-2 h-4 w-4 shrink-0" />
        {formatRangeLabel(startDate, endDate)}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 z-50 flex rounded-2xl border border-gray-100 bg-white p-6 shadow-xl">
          <div className="mr-6 flex w-36 flex-col gap-1 border-r border-gray-100 pr-4">
            {QUICK_RANGES.map((item) => (
              <button
                key={item.label}
                type="button"
                className={cn(
                  "rounded-lg px-3 py-2 text-left text-sm transition",
                  activeQuickRange === item.label
                    ? "bg-[#573FD1]/10 font-semibold text-[#573FD1]"
                    : "text-gray-600 hover:bg-gray-50"
                )}
                onClick={() =>
                  setQuickDateRange(item.label, item.start, item.end)
                }
              >
                {item.label}
              </button>
            ))}
          </div>

          <div>
            <div className="mb-3 grid grid-cols-2 gap-8 px-2 text-sm font-medium text-gray-700">
              <span>From:</span>
              <span>To:</span>
            </div>

            <DateRange
              editableDateInputs={false}
              onChange={handleRangeChange}
              moveRangeOnFirstSelection={false}
              ranges={tempRange}
              maxDate={new Date()}
              months={2}
              direction="horizontal"
              showDateDisplay={false}
              rangeColors={["#573FD1"]}
              className="report-date-range"
            />

            <div className="mt-4 flex justify-end gap-3">
              <button
                type="button"
                className="rounded-xl border border-[#573FD1]/30 bg-[#573FD1]/5 px-5 py-2 text-sm font-medium text-[#573FD1] transition hover:bg-[#573FD1]/10"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="button"
                className="rounded-xl bg-[#573FD1] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#4a35b8]"
                onClick={handleApply}
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

export default ReportDateRangeFilter;
