import { useMemo, useState } from "react";
import { format } from "date-fns";
import { usePaginatedList } from "@/hooks/usePaginatedList";
import TablePagination from "@/pages/nurse/shared/components/TablePagination";
import { Search } from "lucide-react";
import type { BookingFormData } from "./CreateBooking";

export type Appointment = BookingFormData & {
  id: number;
  name: string;
  phone: string;
};

/* ── Mock seed data matching the design ── */
const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 1, name: "Alade Abiodun", phone: "09060253 11",
    dateTime: new Date("2025-03-12T11:15"),
    firstName: "Alade", lastName: "Abiodun",
    bookingType: "VOICE CALL", visitationType: "Surgical Consultation",
    bookedBy: "John Doe", bookedFor: "Dr Sanusi Agbabiaka",
    specialistEmail: "drsanusi@hospital.com",
  },
  {
    id: 2, name: "Tolu Adebayo", phone: "08012345678",
    dateTime: new Date("2026-04-15T14:30"),
    firstName: "Tolu", lastName: "Adebayo",
    bookingType: "SOCIAL MEDIA", visitationType: "Follow-Up Appointment",
    bookedBy: "John Doe", bookedFor: "Dr Sanusi Agbabiaka",
    specialistEmail: "drsanusi@hospital.com",
  },
  {
    id: 3, name: "Chinelo Okafor", phone: "07098765432",
    dateTime: new Date("2027-05-20T09:45"),
    firstName: "Chinelo", lastName: "Okafor",
    bookingType: "EMAIL", visitationType: "Emergency Care Visit",
    bookedBy: "John Doe", bookedFor: "Dr Sanusi Agbabiaka",
    specialistEmail: "drsanusi@hospital.com",
  },
  {
    id: 4, name: "Ngozi Nwosu", phone: "08123456789",
    dateTime: new Date("2028-06-30T16:00"),
    firstName: "Ngozi", lastName: "Nwosu",
    bookingType: "REFERRAL", visitationType: "Routine Check-Up",
    bookedBy: "John Doe", bookedFor: "Dr Sanusi Agbabiaka",
    specialistEmail: "drsanusi@hospital.com",
  },
  {
    id: 5, name: "Uche Eze", phone: "09012345678",
    dateTime: new Date("2029-08-05T13:15"),
    firstName: "Uche", lastName: "Eze",
    bookingType: "IN-HOUSE", visitationType: "Specialist Referral",
    bookedBy: "John Doe", bookedFor: "Dr Sanusi Agbabiaka",
    specialistEmail: "drsanusi@hospital.com",
  },
  {
    id: 6, name: "Amara Ibe", phone: "08098765432",
    dateTime: new Date("2030-09-10T15:50"),
    firstName: "Amara", lastName: "Ibe",
    bookingType: "VOICE CALL", visitationType: "Telehealth Session",
    bookedBy: "John Doe", bookedFor: "Dr Sanusi Agbabiaka",
    specialistEmail: "drsanusi@hospital.com",
  },
  {
    id: 7, name: "Amara Ibe", phone: "08098765432",
    dateTime: new Date("2030-09-10T15:50"),
    firstName: "Amara", lastName: "Ibe",
    bookingType: "VOICE CALL", visitationType: "Telehealth Session",
    bookedBy: "John Doe", bookedFor: "Dr Sanusi Agbabiaka",
    specialistEmail: "drsanusi@hospital.com",
  },
  {
    id: 8, name: "Amara Ibe", phone: "08098765432",
    dateTime: new Date("2030-09-10T15:50"),
    firstName: "Amara", lastName: "Ibe",
    bookingType: "VOICE CALL", visitationType: "Telehealth Session",
    bookedBy: "John Doe", bookedFor: "Dr Sanusi Agbabiaka",
    specialistEmail: "drsanusi@hospital.com",
  },
  {
    id: 9, name: "Amara Ibe", phone: "08098765432",
    dateTime: new Date("2030-09-10T15:50"),
    firstName: "Amara", lastName: "Ibe",
    bookingType: "VOICE CALL", visitationType: "Telehealth Session",
    bookedBy: "John Doe", bookedFor: "Dr Sanusi Agbabiaka",
    specialistEmail: "drsanusi@hospital.com",
  },
];

interface Props {
  newAppointments?: Appointment[];
}

const COLS = [
  "S/N", "NAME", "DATE | TIME", "BOOKING TYPE",
  "VISITATION TYPE", "BOOKED BY", "BOOKED FOR", "EMAIL",
];

export default function ViewAppointments({ newAppointments = [] }: Props) {
  const [search, setSearch] = useState("");

  const all = useMemo(
    () => [...newAppointments, ...MOCK_APPOINTMENTS],
    [newAppointments],
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return all;
    return all.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.phone.includes(q) ||
        a.bookingType.toLowerCase().includes(q) ||
        a.visitationType.toLowerCase().includes(q) ||
        a.bookedFor.toLowerCase().includes(q),
    );
  }, [all, search]);

  const { currentPage, setCurrentPage, totalPages, paginatedItems } =
    usePaginatedList(filtered, 10);

  return (
    <div className="flex flex-col gap-4">
      {/* Search bar */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search appointments…"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-4 text-sm text-gray-800 placeholder:text-gray-400 focus:border-[#573FD1] focus:outline-none focus:ring-1 focus:ring-[#573FD1]"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              {COLS.map((col) => (
                <th
                  key={col}
                  className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedItems.length > 0 ? (
              paginatedItems.map((appt, idx) => {
                const serial = (currentPage - 1) * 10 + idx + 1;
                const dateStr = appt.dateTime
                  ? format(appt.dateTime, "d-MMM-yyyy")
                  : "—";
                const timeStr = appt.dateTime
                  ? format(appt.dateTime, "h:mm aa")
                  : "—";
                return (
                  <tr
                    key={appt.id}
                    className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-4 py-3 text-gray-700">{serial}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">{appt.name}</p>
                      <p className="text-xs text-gray-500">{appt.phone}</p>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <p className="text-gray-800">{dateStr}</p>
                      <p className="text-xs text-gray-500">{timeStr}</p>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-700">
                      {appt.bookingType.toUpperCase()}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {appt.visitationType}
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-gray-800">{appt.bookedBy}</p>
                      <p className="text-xs text-gray-500">Admin</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-gray-800">{appt.bookedFor}</p>
                      <p className="text-xs text-gray-500">Oncologist</p>
                    </td>
                    <td className="max-w-[120px] truncate px-4 py-3 text-gray-500 text-xs">
                      {appt.specialistEmail}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={COLS.length}
                  className="py-12 text-center text-sm text-gray-400"
                >
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
