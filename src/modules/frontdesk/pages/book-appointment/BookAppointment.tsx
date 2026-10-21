import { useState } from "react";
import CreateBooking, { type BookingFormData } from "./components/CreateBooking";
import ViewAppointments, { type Appointment } from "./components/ViewAppointments";

type Tab = "create" | "view";

export default function BookAppointment() {
  const [activeTab, setActiveTab] = useState<Tab>("create");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [nextId, setNextId] = useState(100);

  const handleBookingConfirm = (data: BookingFormData) => {
    const appt: Appointment = {
      ...data,
      id: nextId,
      name: `${data.firstName} ${data.lastName}`.trim() || "Unknown",
      phone: data.phone,
    };
    setAppointments((prev) => [appt, ...prev]);
    setNextId((n) => n + 1);
    setActiveTab("view");
  };

  return (
    <div className="w-full px-4 py-6 sm:px-6 lg:px-8">
      {/* Tab toggle — matches the design's pill-style switcher */}
      <div className="mx-auto mb-8 flex max-w-md overflow-hidden rounded-xl border border-gray-200 shadow-sm">
        <button
          type="button"
          onClick={() => setActiveTab("create")}
          className={`flex-1 py-3 text-sm font-semibold transition-colors ${
            activeTab === "create"
              ? "bg-[#573FD1] text-white"
              : "bg-white text-gray-500 hover:bg-gray-50"
          }`}
        >
          Create Bookings
        </button>
        {/* Connector line between tabs */}
        <div className="flex items-center">
          <div className="h-px w-6 bg-gray-300" />
        </div>
        <button
          type="button"
          onClick={() => setActiveTab("view")}
          className={`flex-1 py-3 text-sm font-semibold transition-colors ${
            activeTab === "view"
              ? "bg-[#573FD1] text-white"
              : "bg-white text-gray-500 hover:bg-gray-50"
          }`}
        >
          View Appointment(s)
        </button>
      </div>

      {/* Content card */}
      <div className="mx-auto max-w-4xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        {activeTab === "create" ? (
          <CreateBooking onConfirm={handleBookingConfirm} />
        ) : (
          <ViewAppointments newAppointments={appointments} />
        )}
      </div>
    </div>
  );
}
