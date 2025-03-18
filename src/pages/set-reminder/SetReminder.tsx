import Sidebar from "@/constant/sidebar";
import Topbar from "@/constant/topbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useState } from "react";
// import { Calendar as CalendarIcon, Clock } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
  const [date, setDate] = useState<Date | null>(null);

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

                {/* Updated Calendar with Time Selection */}
                <div>
                  <label>Reminder Time</label>
                  <div className="relative">
                    <DatePicker
                      selected={date}
                      onChange={(d) => {
                        setDate(d);
                        setValue("reminderTime", d);
                      }}
                      showTimeSelect
                      dateFormat="MMMM d, yyyy h:mm aa"
                      placeholderText="Select Reminder Date & Time"
                      className="w-full px-3 py-2 border rounded-md focus:outline-none"
                    />
                    {/* <CalendarIcon className="w-5 h-5 absolute right-10 top-1/2 transform -translate-y-1/2 cursor-pointer" />
                    <Clock className="w-5 h-5 absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer" /> */}
                  </div>
                  {errors.reminderTime && (
                    <p className="text-red-500 text-sm">
                      Reminder Time is required.
                    </p>
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

              <Button
                type="submit"
                className="mt-4 w-full bg-[#6c5ce7] text-white"
              >
                Save Reminder
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default SetReminder;
