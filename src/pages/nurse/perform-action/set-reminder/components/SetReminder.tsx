import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { CalendarClock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "@/styles/datepicker.css";
import successIcon from "@/assets/image/Succes 2 (1).png";

type FormData = {
  patientId: string;
  snoozeFrequency: string;
  reminderNote: string;
};

const SetReminder = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [date, setDate] = useState<Date | null>(new Date());
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState(() => {
    const now = new Date();
    return now.toTimeString().slice(0, 5);
  });
  const [reminder, setReminder] = useState(() => {
    const now = new Date();
    return format(now, "dd-MM-yyyy / hh : mm aa");
  });
  const [success, setSuccess] = useState(false);
  const [patientName, setPatientName] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    setPatientName(data.patientId);
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
        <div className="flex h-[400px] w-[500px] flex-col items-center justify-center rounded-2xl bg-white p-8 shadow-xl">
          <img src={successIcon} alt="Success" className="mb-6" />
          <p className="mb-8 text-center text-base font-medium">
            You have successfully set a reminder for{" "}
            <span className="font-semibold">{patientName}</span>
          </p>
          <button
            type="button"
            className="w-full rounded-lg bg-[#573FD1] py-4 text-white"
            onClick={() => navigate("/nurse")}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium">Patient ID Number</label>
          <input
            className="mt-2 w-full rounded-md border bg-gray-100 px-3 py-2 text-gray-400"
            placeholder="Type the Patient ID Number here"
            {...register("patientId", { required: true })}
          />
          {errors.patientId && (
            <p className="text-sm text-red-500">Patient ID is required.</p>
          )}
        </div>

        <div className="relative">
          <label className="block text-sm font-medium">Reminder Time</label>

          <div className="relative mt-2">
            <input
              type="text"
              value={reminder}
              placeholder="dd-mm-yyyy / hh : mm A"
              readOnly
              className="w-full cursor-pointer rounded-md border bg-gray-100 px-3 py-2 pr-10 text-gray-400"
              onClick={() => setOpen(true)}
            />

            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center"
              onClick={() => setOpen(true)}
              aria-label="Open date and time picker"
            >
              <CalendarClock className="h-5 w-5 text-[#573FD1]" />
            </button>
          </div>

          {open && (
            <div className="absolute z-50 mt-2 rounded-md border bg-white p-6 shadow-lg">
              <DatePicker
                selected={date}
                onChange={(d) => setDate(d)}
                dateFormat="MMMM dd, yyyy"
                minDate={new Date()}
                inline
              />

              <div className="mt-3 flex w-full items-center space-x-3 rounded-md border bg-white px-3 py-2">
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="rounded-md border p-2"
                />
              </div>

              <div className="mt-3 flex justify-between">
                <button
                  type="button"
                  className="mr-2 w-1/2 rounded-lg border border-[#573FD1] px-4 py-2 text-[#573FD1]"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="w-1/2 rounded-lg bg-[#573FD1] px-4 py-2 text-white"
                  onClick={() => {
                    if (date && time) {
                      const [hours, minutes] = time.split(":");
                      const updated = new Date(date);
                      updated.setHours(Number(hours));
                      updated.setMinutes(Number(minutes));
                      setReminder(format(updated, "dd-MM-yyyy / hh : mm aa"));
                    }
                    setOpen(false);
                  }}
                >
                  Schedule
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="my-10 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium">Snooze Frequency</label>
          <select
            {...register("snoozeFrequency", { required: true })}
            className="mt-2 w-full rounded-md border bg-gray-100 px-3 py-2 text-gray-400"
            defaultValue=""
          >
            <option value="" disabled>
              Select time frame
            </option>
            <option value="5">5 minutes</option>
            <option value="10">10 minutes</option>
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
          </select>
          {errors.snoozeFrequency && (
            <p className="text-sm text-red-500">Snooze Frequency is required.</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Reminder Note</label>
          <input
            className="mt-2 w-full rounded-md border bg-gray-100 px-3 py-2 text-gray-400"
            placeholder="Type in the description here"
            {...register("reminderNote", { required: true })}
          />
          {errors.reminderNote && (
            <p className="text-sm text-red-500">Reminder Note is required.</p>
          )}
        </div>
      </div>

      <div className="mt-6 text-center">
        <Button
          className="rounded bg-[#573FD1] px-8 py-3 text-white"
          type="submit"
        >
          Save Reminder
        </Button>
      </div>
    </form>
  );
};

export default SetReminder;
