import { useState, useRef, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { CalendarClock } from "lucide-react";
import { format } from "date-fns";
import AppointmentCalendar from "./AppointmentCalendar";
import { useAuth } from "@/context/AuthContext";

export type BookingFormData = {
  dateTime: Date | null;
  firstName: string;
  lastName: string;
  phone: string;
  bookingType: string;
  visitationType: string;
  bookedBy: string;
  bookedFor: string;
  specialistEmail: string;
};

interface Props {
  onConfirm: (data: BookingFormData) => void;
}

const BOOKING_TYPES = [
  "Voice Call",
  "Social Media",
  "Email",
  "Referral",
  "In-House",
  "Walk-In",
];

const VISITATION_TYPES = [
  "General Consultation",
  "Surgical Consultation",
  "Follow-Up Appointment",
  "Emergency Care Visit",
  "Routine Check-Up",
  "Specialist Referral",
  "Telehealth Session",
  "Antenatal Care",
  "Post Natal Care",
  "Immunization",
  "Family Planning",
  "Child Birth",
];

const DOCTORS = [
  "Dr Sanusi Agbabiaka",
  "Dr Bayo Hammed",
  "Dr Chinonso Okafor",
  "Dr Adebayo Afolabi",
  "Dr Ngozi Chukwu",
];

const DOCTOR_EMAILS: Record<string, string> = {
  "Dr Sanusi Agbabiaka": "drsanusi@hospital.com",
  "Dr Bayo Hammed": "drbayo@hospital.com",
  "Dr Chinonso Okafor": "drchinonso@hospital.com",
  "Dr Adebayo Afolabi": "dradebayo@hospital.com",
  "Dr Ngozi Chukwu": "drngozi@hospital.com",
};

const empty: BookingFormData = {
  dateTime: null,
  firstName: "",
  lastName: "",
  phone: "",
  bookingType: "",
  visitationType: "",
  bookedBy: "",
  bookedFor: "",
  specialistEmail: "",
};

export default function CreateBooking({ onConfirm }: Props) {
  const { user } = useAuth();
  const [form, setForm] = useState<BookingFormData>({
    ...empty,
    bookedBy: user?.fullName ?? "John Doe",
  });
  const [calendarOpen, setCalendarOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  // Close calendar on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
        setCalendarOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const set = (field: keyof BookingFormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleDoctorChange = (name: string) => {
    setForm((prev) => ({
      ...prev,
      bookedFor: name,
      specialistEmail: DOCTOR_EMAILS[name] ?? "",
    }));
  };

  const handleClear = () =>
    setForm({ ...empty, bookedBy: user?.fullName ?? "John Doe" });

  const handleConfirm = () => {
    onConfirm(form);
  };

  const dateLabel = form.dateTime
    ? format(form.dateTime, "dd-MM-yyyy / hh:mm aa").toUpperCase()
    : "";

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-[#573FD1] focus:outline-none focus:ring-1 focus:ring-[#573FD1]";

  const selectClass =
    "w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-600 focus:border-[#573FD1] focus:outline-none focus:ring-1 focus:ring-[#573FD1] appearance-none bg-white";

  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

  return (
    <div className="flex flex-col gap-6">
      {/* Step heading */}
      <div>
        <p className="text-xs font-medium text-gray-400">Step 1</p>
        <h2 className="mt-0.5 text-base font-bold text-gray-900">
          Patient Information
        </h2>
        <div className="mt-3 border-b border-gray-200" />
      </div>

      {/* Date & Time — full width */}
      <div className="relative" ref={calendarRef}>
        <label className={labelClass}>Select Date &amp; Time</label>
        <button
          type="button"
          onClick={() => setCalendarOpen((p) => !p)}
          className={`${inputClass} flex items-center justify-between text-left ${
            !form.dateTime ? "text-gray-400" : "text-gray-800"
          }`}
        >
          <span>{form.dateTime ? dateLabel : "DD-MM-YYYY / HH:MM AM."}</span>
          <CalendarClock className="h-5 w-5 shrink-0 text-gray-400" />
        </button>

        {calendarOpen && (
          <div className="absolute left-0 top-full z-50 mt-2">
            <AppointmentCalendar
              initialDate={form.dateTime ?? new Date()}
              onConfirm={(dt) => {
                setForm((p) => ({ ...p, dateTime: dt }));
                setCalendarOpen(false);
              }}
              onCancel={() => setCalendarOpen(false)}
            />
          </div>
        )}
      </div>

      {/* Two-column grid */}
      <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
        {/* First Name */}
        <div>
          <label className={labelClass}>First Name</label>
          <input
            className={inputClass}
            placeholder="Eg : John"
            value={form.firstName}
            onChange={(e) => set("firstName", e.target.value)}
          />
        </div>

        {/* Last Name */}
        <div>
          <label className={labelClass}>Last Name</label>
          <input
            className={inputClass}
            placeholder="Eg : Doe"
            value={form.lastName}
            onChange={(e) => set("lastName", e.target.value)}
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className={labelClass}>Phone Number</label>
          <PhoneInput
            country="ng"
            value={form.phone}
            onChange={(val) => set("phone", val)}
            containerClass="!w-full"
            inputClass="!w-full !rounded-lg !border !border-gray-300 !text-sm !py-2.5 focus:!border-[#573FD1] focus:!ring-1 focus:!ring-[#573FD1]"
            enableSearch
          />
        </div>

        {/* Booking Type */}
        <div>
          <label className={labelClass}>Booking Type</label>
          <div className="relative">
            <select
              className={selectClass}
              value={form.bookingType}
              onChange={(e) => set("bookingType", e.target.value)}
            >
              <option value="">-Select a type-</option>
              {BOOKING_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
              ▾
            </span>
          </div>
        </div>

        {/* Visitation Type */}
        <div>
          <label className={labelClass}>Visitation Type</label>
          <div className="relative">
            <select
              className={selectClass}
              value={form.visitationType}
              onChange={(e) => set("visitationType", e.target.value)}
            >
              <option value="">-Select a type-</option>
              {VISITATION_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
              ▾
            </span>
          </div>
        </div>

        {/* Booked By */}
        <div>
          <label className={labelClass}>Booked By</label>
          <input
            className={`${inputClass} bg-gray-50`}
            value={form.bookedBy}
            readOnly
            placeholder="John Doe"
          />
        </div>

        {/* Booked For */}
        <div>
          <label className={labelClass}>Booked For</label>
          <div className="relative">
            <select
              className={selectClass}
              value={form.bookedFor}
              onChange={(e) => handleDoctorChange(e.target.value)}
            >
              <option value="">-Select Specialist's Name-</option>
              {DOCTORS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
              ▾
            </span>
          </div>
        </div>

        {/* Specialist Email */}
        <div>
          <label className={labelClass}>Specialist Email</label>
          <input
            className={`${inputClass} bg-gray-50`}
            placeholder="Drtest@example.com"
            value={form.specialistEmail}
            readOnly
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={handleClear}
          className="rounded-xl border border-gray-300 px-8 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          className="rounded-xl bg-[#573FD1] px-10 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4a35b8]"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
