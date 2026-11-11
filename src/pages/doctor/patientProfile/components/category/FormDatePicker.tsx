import { useRef } from "react";
import DatePicker, { type ReactDatePickerCustomHeaderProps } from "react-datepicker";
import { Calendar, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";
import "@/styles/datepicker.css";
import {
  DATE_PLACEHOLDER,
  formatDateInput,
  formatDateToDDMMYY,
  formatDateToDDMMYYYY,
  parseDDMMYY,
  parseDDMMYYYY,
} from "../../lib/dateFormat";
import { formFieldInputClass } from "../../lib/formFieldStyles";

type Props = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  /** When true, only today and future dates are selectable. */
  allowFutureOnly?: boolean;
  /** Use full year format DD/MM/YYYY (Figma expiry fields). */
  fullYear?: boolean;
};

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function startOfToday(): Date {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

function buildYearRange(allowFutureOnly: boolean): number[] {
  const currentYear = new Date().getFullYear();
  const minYear = allowFutureOnly ? currentYear : currentYear - 100;
  const maxYear = allowFutureOnly ? currentYear + 15 : currentYear;
  const years: number[] = [];
  for (let year = maxYear; year >= minYear; year -= 1) {
    years.push(year);
  }
  return years;
}

const FormDatePicker = ({
  value,
  onChange,
  className,
  allowFutureOnly = false,
  fullYear = false,
}: Props) => {
  const datePickerRef = useRef<DatePicker | null>(null);
  const selected = fullYear ? parseDDMMYYYY(value) : parseDDMMYY(value);
  const years = buildYearRange(allowFutureOnly);

  const formatSelectedDate = (date: Date) =>
    fullYear ? formatDateToDDMMYYYY(date) : formatDateToDDMMYY(date);

  return (
    <div className={`relative w-full ${className ?? ""}`}>
      <DatePicker
        ref={datePickerRef}
        selected={selected}
        value={value}
        onChange={(date: Date | null) =>
          onChange(date ? formatSelectedDate(date) : "")
        }
        onChangeRaw={(event) => {
          const target = event?.target as HTMLInputElement | undefined;
          if (!target || typeof target.value !== "string") return;
          const raw = target.value;
          if (!raw.trim()) {
            onChange("");
            return;
          }
          if (/^[0-9/]*$/.test(raw) && !fullYear) {
            onChange(formatDateInput(raw));
          } else {
            onChange(raw);
          }
        }}
        placeholderText={fullYear ? "DD/MM/YYYY" : DATE_PLACEHOLDER}
        dateFormat={fullYear ? "dd/MM/yyyy" : "dd/MM/yy"}
        minDate={allowFutureOnly ? startOfToday() : undefined}
        maxDate={allowFutureOnly ? undefined : new Date()}
        showPopperArrow={false}
        calendarClassName="easycare-datepicker !rounded-xl !border !border-gray-200 !bg-white !shadow-xl"
        popperClassName="!z-[300]"
        className={`${formFieldInputClass} !pr-16 cursor-pointer`}
        wrapperClassName="w-full"
        popperProps={{ strategy: "fixed" }}
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }: ReactDatePickerCustomHeaderProps) => (
          <div className="flex items-center justify-between gap-1.5 border-b border-gray-100 bg-purple-50/60 px-3 py-2.5">
            <button
              type="button"
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
              className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-600 transition hover:border-[#573FD1] hover:text-[#573FD1] disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Previous Month"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-1.5">
              <select
                value={MONTHS[date.getMonth()]}
                onChange={({ target: { value: monthName } }) =>
                  changeMonth(MONTHS.indexOf(monthName))
                }
                className="cursor-pointer rounded-md border border-gray-200 bg-white px-2 py-1 text-xs font-semibold text-gray-800 outline-none focus:border-[#573FD1]"
              >
                {MONTHS.map((option) => (
                  <option key={option} value={option}>
                    {option.slice(0, 3)}
                  </option>
                ))}
              </select>

              <select
                value={date.getFullYear()}
                onChange={({ target: { value: yr } }) => changeYear(Number(yr))}
                className="cursor-pointer rounded-md border border-gray-200 bg-white px-2 py-1 text-xs font-semibold text-gray-800 outline-none focus:border-[#573FD1]"
              >
                {years.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
              className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-600 transition hover:border-[#573FD1] hover:text-[#573FD1] disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Next Month"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      >
        <div className="flex items-center justify-between border-t border-gray-100 px-3 py-2">
          <button
            type="button"
            onClick={() => {
              onChange("");
              datePickerRef.current?.setOpen(false);
            }}
            className="rounded-md px-2.5 py-1 text-xs font-medium text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={() => {
              onChange(formatSelectedDate(new Date()));
              datePickerRef.current?.setOpen(false);
            }}
            className="rounded-md bg-[#573FD1]/10 px-3 py-1 text-xs font-semibold text-[#573FD1] transition hover:bg-[#573FD1] hover:text-white"
          >
            Today
          </button>
        </div>
      </DatePicker>
      <button
        type="button"
        onClick={() => datePickerRef.current?.setOpen(true)}
        className="absolute right-2.5 top-1/2 flex -translate-y-1/2 items-center gap-1 rounded-md px-1.5 py-1 text-[#573FD1] transition hover:bg-purple-50"
        tabIndex={-1}
        aria-label="Open calendar"
      >
        <Calendar className="h-4 w-4" />
        <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
      </button>
    </div>
  );
};

export default FormDatePicker;
