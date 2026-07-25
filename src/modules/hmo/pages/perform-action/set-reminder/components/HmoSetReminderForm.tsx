import { useForm } from "react-hook-form";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { CalendarClock, ChevronDown } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";
import "@/styles/datepicker.css";
import successIcon from "@hmo/assets/image/Succes 2 (1).png";
import { useNavigate } from "react-router-dom";
import { SNOOZE_OPTIONS } from "../data/mockHmoReminderRecords";

type FormData = {
  patientId: string;
  snoozeFrequency: string;
  reminderNote: string;
};

type Props = {
  onSaved?: () => void;
};

const fieldClass =
  "h-11 w-full rounded-lg border-[0.5px] border-black bg-[#FAFAFA] px-4 text-[15px] text-black outline-none placeholder:italic placeholder:text-[#808080] focus:border-[#573FD1]";

const selectClass =
  "h-11 w-full appearance-none rounded-lg border-[0.5px] border-black bg-[#FAFAFA] px-4 pr-10 text-[15px] text-black outline-none focus:border-[#573FD1]";

const HmoSetReminderForm = ({ onSaved }: Props) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [date, setDate] = useState<Date | null>(new Date());
  const [pickerOpen, setPickerOpen] = useState(false);
  const [time, setTime] = useState(() => {
    const now = new Date();
    return now.toTimeString().slice(0, 5);
  });
  const [reminder, setReminder] = useState(() => {
    const now = new Date();
    return format(now, "dd-MM-yyyy / hh : mm aa");
  });
  const [success, setSuccess] = useState(false);
  const [patientLabel, setPatientLabel] = useState("");

  const onSubmit = (data: FormData) => {
    setPatientLabel(data.patientId);
    setSuccess(true);
    onSaved?.();
  };

  if (success) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
        <div className="flex w-full max-w-[454px] flex-col items-center rounded-[15px] bg-white p-8 shadow-xl">
          <img
            src={successIcon}
            alt="Success"
            className="mb-6 h-[150px] w-[150px] object-contain"
          />
          <p className="mb-8 max-w-[258px] text-center text-base leading-normal text-black">
            You have successfully Set a Reminder for{" "}
            <span className="font-semibold">{patientLabel}</span>
          </p>
          <button
            type="button"
            className="h-[35px] min-w-[258px] rounded-[10px] bg-[#573FD1] px-6 text-sm font-medium text-white"
            onClick={() => navigate("/hmo/dashboard")}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-[15px] tracking-[-0.3px] text-black">
            Patient ID Number
          </label>
          <input
            className={fieldClass}
            placeholder="Type the Patient ID Number here"
            {...register("patientId", { required: true })}
          />
          {errors.patientId && (
            <p className="mt-1 text-sm text-red-500">Patient ID is required.</p>
          )}
        </div>

        <div className="relative">
          <label className="mb-1.5 block text-[15px] tracking-[-0.3px] text-black">
            Reminder Time
          </label>
          <div className="relative">
            <input
              type="text"
              value={reminder}
              placeholder="dd-mm-yyyy / hh : mm A"
              readOnly
              className={`${fieldClass} cursor-pointer pr-12`}
              onClick={() => setPickerOpen(true)}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center"
              onClick={() => setPickerOpen(true)}
              aria-label="Open date and time picker"
            >
              <CalendarClock className="h-6 w-6 text-[#573FD1]" />
            </button>
          </div>

          {pickerOpen && (
            <div className="absolute z-50 mt-2 rounded-lg border border-[#D4D4D4] bg-white p-6 shadow-lg">
              <DatePicker
                selected={date}
                onChange={(nextDate) => setDate(nextDate)}
                dateFormat="MMMM dd, yyyy"
                minDate={new Date()}
                inline
              />
              <div className="mt-3">
                <input
                  type="time"
                  value={time}
                  onChange={(event) => setTime(event.target.value)}
                  className="w-full rounded-lg border border-[#D4D4D4] p-2"
                />
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  className="flex-1 rounded-lg border border-[#573FD1] px-4 py-2 text-[#573FD1]"
                  onClick={() => setPickerOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="flex-1 rounded-lg bg-[#573FD1] px-4 py-2 text-white"
                  onClick={() => {
                    if (date && time) {
                      const [hours, minutes] = time.split(":");
                      const updated = new Date(date);
                      updated.setHours(Number(hours));
                      updated.setMinutes(Number(minutes));
                      setReminder(format(updated, "dd-MM-yyyy / hh : mm aa"));
                    }
                    setPickerOpen(false);
                  }}
                >
                  Schedule
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-[15px] tracking-[-0.3px] text-black">
            Snooze Frequency
          </label>
          <div className="relative">
            <select
              {...register("snoozeFrequency", { required: true })}
              className={selectClass}
              defaultValue=""
            >
              <option value="" disabled>
                Select the time frame
              </option>
              {SNOOZE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-6 w-6 -translate-y-1/2 text-black" />
          </div>
          {errors.snoozeFrequency && (
            <p className="mt-1 text-sm text-red-500">
              Snooze frequency is required.
            </p>
          )}
        </div>

        <div>
          <label className="mb-1.5 block text-[15px] tracking-[-0.3px] text-black">
            Reminder Note
          </label>
          <input
            className={fieldClass}
            placeholder="Type in the description here"
            {...register("reminderNote", { required: true })}
          />
          {errors.reminderNote && (
            <p className="mt-1 text-sm text-red-500">Reminder note is required.</p>
          )}
        </div>
      </div>

      <div className="flex justify-center pt-2">
        <button
          type="submit"
          className="h-10 min-w-[218px] rounded-[10px] bg-[#573FD1] px-6 text-sm font-medium text-white"
        >
          Save Reminder
        </button>
      </div>
    </form>
  );
};

export default HmoSetReminderForm;
