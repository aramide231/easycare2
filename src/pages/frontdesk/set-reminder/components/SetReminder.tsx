import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import calendartime from "@/assets/icon/calendar_clock.png";
import { useNavigate } from "react-router-dom";
import "@/styles/datepicker.css";
import successIcon from "@/assets/image/Succes 2 (1).png";

type FormData = {
  patientId: string;
  reminderTime: Date | null;
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
  const datepickerRef = useRef<any>(null);
  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
    setPatientName(data.patientId);
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="flex flex-col items-center justify-center bg-white shadow-xl rounded-2xl p-8 w-[500px] h-[400px]">
          <img src={successIcon} alt="Success" className=" mb-6" />
          <p className="text-center font-medium text-base mb-8">
            You have successfully set a reminder for{" "}
            <span className="font-semibold">{patientName}</span>
          </p>
          <button
            className="bg-[#573FD1] text-white w-full py-4 rounded-lg"
            onClick={() => navigate("/dashboard")}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">
              Patient ID Number
            </label>
            <input
              className="w-full px-3 py-2 border rounded-md bg-gray-100 text-gray-400 mt-2"
              placeholder="Type the Patient ID Number here"
              {...register("patientId", { required: true })}
            />
            {errors.patientId && (
              <p className="text-red-500 text-sm">Patient ID is required.</p>
            )}
          </div>

          {/* Calendar with Time Selection */}
          <div>
            <label className="block text-sm font-medium">Reminder Time</label>

            {/* Clickable Input Box */}
            <div className="relative mt-2">
              <input
                type="text"
                value={reminder}
                placeholder="dd-mm-yyyy / hh : mm A"
                readOnly
                className="w-full px-3 py-2 border rounded-md bg-gray-100 text-gray-400"
                onClick={() => setOpen(true)}
              />

              {/* Clickable Calendar/Clock Image */}
              <div className="absolute inset-y-0 right-3 flex items-center cursor-pointer">
                <img
                  src={calendartime}
                  alt="Calendar"
                  className="h-6 w-6"
                  onClick={() => setOpen(true)}
                />
              </div>
            </div>

            {/* Date Picker UI (Inside Popup) */}
            {open && (
              <div className="absolute z-50 bg-white shadow-lg p-6 rounded-md border mt-2">
                <DatePicker
                  ref={datepickerRef}
                  selected={date}
                  onChange={(d) => {
                    setDate(d);
                  }}
                  dateFormat="MMMM dd, yyyy"
                  minDate={new Date()}
                  inline
                />

                <div className="flex items-center space-x-3 border px-3 py-2 rounded-md w-full bg-white">
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => {
                      console.log("Native time input:", e.target.value);
                      setTime(e.target.value);
                    }}
                    className="border p-2 rounded-md"
                  />
                </div>

                {/* Buttons Inside DatePicker */}
                <div className="flex justify-between mt-3">
                  <button
                    className="border border-[#573FD1] text-[#573FD1] px-4 py-2 rounded-lg w-1/2 mr-2"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-[#573FD1] text-white px-4 py-2 rounded-lg w-1/2"
                    onClick={() => {
                      if (date && time) {
                        const [hours, minutes] = time.split(":");
                        const updated = new Date(date);
                        updated.setHours(Number(hours));
                        updated.setMinutes(Number(minutes));

                        const formatted = format(
                          updated,
                          "dd-MM-yyyy / hh : mm aa"
                        );
                        setReminder(formatted);
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
        <div className="grid grid-cols-2 gap-4 my-10">
          <div>
            <label className="block text-sm font-medium">
              Snooze Frequency
            </label>
            <select
              {...register("snoozeFrequency", { required: true })}
              className="w-full px-3 py-2 border rounded-md bg-gray-100 text-gray-400 mt-2"
            >
              <option value="">Select time frame</option>
              <option value="5">5 minutes</option>
              <option value="10">10 minutes</option>
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
            </select>
            {errors.snoozeFrequency && (
              <p className="text-red-500 text-sm">
                Snooze Frequency is required.
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Reminder Note</label>
            <input
              className="w-full px-3 py-2 border rounded-md bg-gray-100 text-gray-400 mt-2"
              placeholder="Type in the description here"
              {...register("reminderNote", { required: true })}
            />
            {errors.reminderNote && (
              <p className="text-red-500 text-sm">Reminder Note is required.</p>
            )}
          </div>
        </div>
        <div className="mt-6 text-center">
          <Button
            className="px-8 py-3 rounded bg-[#573FD1] text-white"
            type="submit"
          >
            Save Reminder
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SetReminder;
