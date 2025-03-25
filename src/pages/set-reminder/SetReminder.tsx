import Sidebar from "@/constant/sidebar";
import Topbar from "@/constant/topbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import calendartime from "@/assets/icon/calendar_clock.png";
import "@/styles/datepicker.css";

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
  const datepickerRef = useRef<any>(null);

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
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
                  <div className="relative mt-2">
                    {/* Clickable Input Field */}
                    <input
                      type="text"
                      value={date ? format(date, "dd-MM-yyyy / hh:mm a") : ""}
                      placeholder="dd-mm-yyyy / hh:mm A"
                      readOnly
                      className="w-full px-3 py-3 border rounded-md focus:outline-none bg-gray-100 text-gray-400 cursor-pointer"
                      onClick={() => datepickerRef.current?.setOpen(true)} // Open DatePicker when clicked
                    />

                    {/* Clickable Calendar/Clock Image */}
                    <div
                      className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                      onClick={() => datepickerRef.current?.setOpen(true)}
                    >
                      <img
                        src={calendartime}
                        alt="Calendar"
                        className="h-6 w-6"
                      />
                    </div>

                    {/* Custom Styled DatePicker */}
                    <DatePicker
                      ref={datepickerRef}
                      selected={date}
                      onChange={(d) => setDate(d)}
                      showTimeSelect
                      dateFormat="dd-MM-yyyy / hh:mm a"
                      minDate={new Date()} // Disable past dates
                      timeIntervals={30} // Time interval selection
                      customInput={<></>} // Hide default input
                      popperClassName="custom-datepicker" // Apply custom styles
                    />
                  </div>
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
