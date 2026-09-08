import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { Calendar } from "lucide-react";
import { parseLogDateTime } from "@/lib/dateTime";
import "react-datepicker/dist/react-datepicker.css";
import "@/styles/datepicker.css";

const DISPLAY_FORMAT = "dd-MM-yyyy / hh : mm aa";

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  defaultDate?: string;
  defaultTime?: string;
  hintText?: string;
};

function formatDisplayDateTime(date: Date): string {
  return format(date, DISPLAY_FORMAT);
}

function parseDisplayDateTime(value: string): { date: Date; time: string } | null {
  const match =
    /^(\d{2})-(\d{2})-(\d{4})\s*\/\s*(\d{1,2})\s*:\s*(\d{2})\s*(AM|PM)$/i.exec(
      value.trim(),
    );
  if (!match) return null;

  const day = Number.parseInt(match[1], 10);
  const month = Number.parseInt(match[2], 10) - 1;
  const year = Number.parseInt(match[3], 10);
  let hours = Number.parseInt(match[4], 10);
  const minutes = Number.parseInt(match[5], 10);
  const meridiem = match[6].toUpperCase();

  if (meridiem === "PM" && hours < 12) hours += 12;
  if (meridiem === "AM" && hours === 12) hours = 0;

  const date = new Date(year, month, day, hours, minutes, 0, 0);
  const time = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;

  return { date, time };
}

function buildInitialValue(defaultDate?: string, defaultTime?: string): string {
  if (!defaultDate?.trim() || !defaultTime?.trim()) return "";
  const parsed = parseLogDateTime(defaultDate, defaultTime);
  return parsed ? formatDisplayDateTime(parsed) : "";
}

export default function InvestigationDateTimePicker({
  label,
  value,
  onChange,
  placeholder = "dd-mm-yyyy / hh : mm A",
  defaultDate,
  defaultTime,
  hintText,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [draftDate, setDraftDate] = useState<Date | null>(() => {
    const initial = buildInitialValue(defaultDate, defaultTime);
    if (value.trim()) return parseDisplayDateTime(value)?.date ?? new Date();
    if (initial) return parseDisplayDateTime(initial)?.date ?? new Date();
    return new Date();
  });
  const [draftTime, setDraftTime] = useState(() => {
    const initial = buildInitialValue(defaultDate, defaultTime);
    if (value.trim()) return parseDisplayDateTime(value)?.time ?? "00:00";
    if (initial) return parseDisplayDateTime(initial)?.time ?? "00:00";
    return format(new Date(), "HH:mm");
  });

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [open]);

  const openPicker = () => {
    const parsed = value.trim()
      ? parseDisplayDateTime(value)
      : parseDisplayDateTime(buildInitialValue(defaultDate, defaultTime));

    if (parsed) {
      setDraftDate(parsed.date);
      setDraftTime(parsed.time);
    } else {
      const now = new Date();
      setDraftDate(now);
      setDraftTime(format(now, "HH:mm"));
    }

    setOpen(true);
  };

  const applySelection = () => {
    if (!draftDate || !draftTime) return;

    const [hours, minutes] = draftTime.split(":");
    const updated = new Date(draftDate);
    updated.setHours(Number(hours));
    updated.setMinutes(Number(minutes));
    updated.setSeconds(0, 0);

    onChange(formatDisplayDateTime(updated));
    setOpen(false);
  };

  return (
    <div ref={containerRef} className="relative min-w-0 flex-1">
      <label className="mb-2 block text-[13px] font-medium uppercase tracking-wide text-gray-800">
        {label}
      </label>

      <div className="relative">
        <input
          type="text"
          value={value}
          readOnly
          placeholder={placeholder}
          onClick={openPicker}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              openPicker();
            }
          }}
          className="h-11 w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-4 pr-11 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#573FD1] focus:outline-none focus:ring-1 focus:ring-[#573FD1]/20"
          aria-label={label}
        />
        <button
          type="button"
          onClick={openPicker}
          className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-[#573FD1]"
          aria-label={`Open calendar for ${label}`}
        >
          <Calendar className="h-5 w-5" />
        </button>
      </div>

      {hintText ? (
        <span className="mt-1 block text-[10px] italic leading-snug text-gray-500 sm:text-xs">
          {hintText}
        </span>
      ) : null}

      {open ? (
        <div className="absolute left-0 top-full z-50 mt-2 w-full min-w-[18rem] max-w-sm rounded-lg border border-gray-200 bg-white p-4 shadow-lg sm:min-w-[20rem]">
          <DatePicker
            selected={draftDate}
            onChange={(date) => setDraftDate(date)}
            inline
            calendarClassName="custom-datepicker !border-0 !shadow-none"
          />

          <div className="mt-3">
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-gray-600">
              Time
            </label>
            <input
              type="time"
              value={draftTime}
              onChange={(event) => setDraftTime(event.target.value)}
              className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm text-gray-900 focus:border-[#573FD1] focus:outline-none focus:ring-1 focus:ring-[#573FD1]/20"
            />
          </div>

          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-lg border border-[#573FD1] px-4 py-2 text-sm font-medium text-[#573FD1] hover:bg-purple-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={applySelection}
              className="flex-1 rounded-lg bg-[#573FD1] px-4 py-2 text-sm font-medium text-white hover:bg-[#4a35b8]"
            >
              Apply
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export { buildInitialValue as buildInvestigationDateTimeDefault };
