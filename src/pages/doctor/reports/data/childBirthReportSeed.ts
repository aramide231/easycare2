export type PatientType = "COMPANY" | "PRIVATE" | "HMO";

export type ChildBirthReportRow = {
  id: string;
  name: string;
  patientId: string;
  phoneNumber: string;
  gender: "M" | "F";
  age: number;
  patientType: PatientType;
  deliveryDate: string;
  deliveryTime: string;
  babyId: "M" | "F";
  attendantDoctor: string;
  attendantNurse: string;
};

const MOTHERS = [
  "Abiola Adebayo",
  "Chinonso Eze",
  "Damilola Ogunleye",
  "Emeka Nwankwo",
  "Ifeoma Okeke",
  "Kemi Balogun",
  "Lanre Akintola",
  "Ngozi Eze",
  "Oluwaseun Fashola",
];

const PATIENT_TYPES: PatientType[] = ["COMPANY", "PRIVATE", "HMO"];
const DOCTORS = ["Dr. Sam Ibe", "Dr. Mike Adeyemi", "Dr. Chidi Obi"];
const NURSES = ["Nurse Sam Ibe", "Nurse Mike Adeyemi", "Nurse Pelumi Ade"];

/** Delivery dates spread across March 2025 so the calendar filter is meaningful. */
const DELIVERY_DATES = [
  { date: "26-Mar-2025", time: "11:15 AM" },
  { date: "27-Mar-2025", time: "09:30 AM" },
  { date: "25-Mar-2025", time: "02:45 PM" },
  { date: "28-Mar-2025", time: "08:00 AM" },
  { date: "12-Mar-2025", time: "11:15 AM" },
  { date: "10-Mar-2025", time: "03:20 PM" },
  { date: "01-Apr-2025", time: "10:10 AM" },
];

export const CHILD_BIRTH_REPORT_SEED: ChildBirthReportRow[] = Array.from(
  { length: 70 },
  (_, index) => {
    const rowNum = index + 1;
    const delivery = DELIVERY_DATES[index % DELIVERY_DATES.length];
    const gender = index % 2 === 0 ? "F" : "M";

    return {
      id: String(rowNum),
      name: MOTHERS[index % MOTHERS.length],
      patientId: `P-2025${String(rowNum + 1).padStart(3, "0")}`,
      phoneNumber: `080${String(31000000 + rowNum).slice(1)}`,
      gender,
      age: 26 + (index % 12),
      patientType: PATIENT_TYPES[index % PATIENT_TYPES.length],
      deliveryDate: delivery.date,
      deliveryTime: delivery.time,
      babyId: index % 3 === 0 ? "M" : "F",
      attendantDoctor: DOCTORS[index % DOCTORS.length],
      attendantNurse: NURSES[index % NURSES.length],
    };
  }
);
