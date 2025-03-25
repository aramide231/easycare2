import Sidebar from "@/constant/sidebar";
import Topbar from "@/constant/topbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import calendartime from "@/assets/icon/calendar_clock.png";
import "@/styles/datepicker.css";
import { FaClock } from "react-icons/fa";
import TimePicker from "react-time-picker";

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
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const [date, setDate] = useState<Date | null>(new Date());
  const [open, setOpen] = useState(false);
  const datepickerRef = useRef<any>(null);
  const [time, setTime] = useState<string>("13:30");

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
  };

  const handleTimeChange = (newTime: string | null) => {
    if (newTime) {
      setTime(newTime);
    }
  };
  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <main className="flex-1 p-6 ml-72">
        <Topbar />
        <Card className="my-10 border-2 rounded p-5 w-[80%] mx-auto">
          <CardContent>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-lg">Set Reminder</h3>
              <Button className="bg-[#eeecfa] border-2 border-[#9080e0] text-[#9080e0] rounded-lg font-medium">
                Create Schedule
              </Button>
            </div>
            <hr className="mb-4" />
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label>Patient ID Number</label>
                  <Input
                    placeholder="Type the Patient ID Number here"
                    {...register("patientId", { required: true })}
                  />
                  {errors.patientId && (
                    <p className="text-red-500 text-sm">
                      Patient ID is required.
                    </p>
                  )}
                </div>

                {/* Calendar with Time Selection */}
                <div>
                  <label className="block text-sm font-medium">
                    Reminder Time
                  </label>

                  {/* Clickable Input Box */}
                  <div className="relative mt-2">
                    <input
                      type="text"
                      value={
                        date ? format(date, "dd-MM-yyyy / hh : mm aa") : ""
                      }
                      placeholder="dd-mm-yyyy / hh : mm A"
                      readOnly
                      className="w-full px-3 py-3 border rounded-md bg-gray-100 text-gray-400 cursor-pointer"
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
                    <div className="absolute z-50 bg-white shadow-lg p-6 rounded-md border mt-2 w-[300px]">
                      <DatePicker
                        ref={datepickerRef}
                        selected={date}
                        onChange={(d) => {
                          setDate(d);
                          setOpen(false);
                        }}
                        dateFormat="MMMM dd, yyyy"
                        minDate={new Date()}
                        inline
                      />

                      <div className="flex items-center space-x-3 border px-3 py-2 rounded-md w-fit bg-white">
                        <FaClock className="text-gray-800" size={20} />
                        <span className="text-gray-800 font-medium">Time</span>
                        {/* Time Input */}
                        <TimePicker
                          onChange={handleTimeChange}
                          value={time}
                          disableClock={true}
                          format="hh:mm a"
                          className="border p-2 rounded-md w-24 text-center"
                        />
                      </div>

                      {/* Buttons Inside DatePicker */}
                      <div className="flex justify-between mt-3">
                        <button
                          className="border border-purple-500 text-purple-500 px-4 py-2 rounded-lg w-1/2 mr-2"
                          onClick={() => setOpen(false)}
                        >
                          Cancel
                        </button>
                        <button
                          className="bg-purple-600 text-white px-4 py-2 rounded-lg w-1/2"
                          onClick={() => setOpen(false)}
                        >
                          Schedule
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label>Reminder Note</label>
                  <Input
                    placeholder="Type in the description here"
                    {...register("reminderNote", { required: true })}
                  />
                  {errors.reminderNote && (
                    <p className="text-red-500 text-sm">
                      Reminder Note is required.
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-6 text-center">
                <Button
                  className="px-8 py-3 rounded bg-[#6c5ce7] text-white"
                  type="submit"
                >
                  Save Reminder
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default SetReminder;
