import DatePicker from "react-datepicker";
import { Calendar } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";
import {
  DATE_PLACEHOLDER,
  formatDateToDDMMYY,
  parseDDMMYY,
} from "../../lib/dateFormat";
import { formFieldInputClass } from "../../lib/formFieldStyles";

type Props = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  /** When true, only today and future dates are selectable. */
  allowFutureOnly?: boolean;
};

function startOfToday(): Date {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

const FormDatePicker = ({
  value,
  onChange,
  className,
  allowFutureOnly = false,
}: Props) => {
  const selected = parseDDMMYY(value);

  return (
    <div className={`relative w-full ${className ?? ""}`}>
      <DatePicker
        selected={selected}
        onChange={(date: Date | null) =>
          onChange(date ? formatDateToDDMMYY(date) : "")
        }
        placeholderText={DATE_PLACEHOLDER}
        dateFormat="dd/MM/yy"
        minDate={allowFutureOnly ? startOfToday() : undefined}
        maxDate={allowFutureOnly ? undefined : new Date()}
        showPopperArrow={false}
        calendarClassName="!rounded-lg !border !border-gray-200 !shadow-lg"
        className={`${formFieldInputClass} !pr-10`}
        wrapperClassName="w-full"
      />
      <Calendar
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
        aria-hidden
      />
    </div>
  );
};

export default FormDatePicker;
