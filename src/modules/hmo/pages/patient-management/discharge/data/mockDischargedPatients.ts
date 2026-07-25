import { formatPatientId } from "@/lib/dateTime";
import type {
  DischargeRemark,
  DischargedPatientRecord,
} from "@hmo/vendor/discharge/data/mockDischargedPatients";
import { MOCK_HMO_LIST_TOTAL } from "@hmo/pages/shared/lib/pagination";

export type HmoDischargedPatientRecord = DischargedPatientRecord;

const PATIENT_TYPES = ["HMO", "COMPANY", "PRIVATE"];
const REMARKS: DischargeRemark[] = [
  "Discharged",
  "DAMA",
  "Absconded",
  "Referred",
  "Deceased",
];
const CLINICIANS = ["Dr. Easy Test", "Dr. Jane Doe", "Titilayo Olayinka"];
const FIRST = ["Adeola", "Chinonso", "Damilola", "Emeka", "Grace", "Kehinde"];
const LAST = ["Abimbola", "Eze", "Ogunleye", "Okafor", "Okonkwo", "Afolabi"];

const SEED: Omit<HmoDischargedPatientRecord, "patientId">[] = [
  {
    id: 1,
    name: "Adeola Abimbola",
    phoneNumber: "08023456789",
    gender: "Female",
    patientType: "HMO",
    age: 31,
    dateOfAdmission: "05-Mar-2025",
    timeOfAdmission: "9:15 AM",
    remark: "Discharged",
    dischargeDate: "12-Mar-2025",
    dischargeTime: "11:15 AM",
    noOfDays: "7 days",
    dischargedBy: "Dr. Easy Test",
  },
  {
    id: 2,
    name: "Chinonso Eze",
    phoneNumber: "09012345678",
    gender: "Male",
    patientType: "COMPANY",
    age: 28,
    dateOfAdmission: "10-Mar-2025",
    timeOfAdmission: "8:30 AM",
    remark: "DAMA",
    dischargeDate: "14-Mar-2025",
    dischargeTime: "4:45 PM",
    noOfDays: "4 days",
    dischargedBy: "Dr. Jane Doe",
  },
  {
    id: 3,
    name: "Damilola Ogunleye",
    phoneNumber: "07034567890",
    gender: "Female",
    patientType: "HMO",
    age: 35,
    dateOfAdmission: "01-Mar-2025",
    timeOfAdmission: "2:00 PM",
    remark: "Referred",
    dischargeDate: "18-Mar-2025",
    dischargeTime: "10:20 AM",
    noOfDays: "17 days",
    dischargedBy: "Titilayo Olayinka",
  },
  {
    id: 4,
    name: "Emeka Okafor",
    phoneNumber: "06056789012",
    gender: "Male",
    patientType: "PRIVATE",
    age: 42,
    dateOfAdmission: "08-Mar-2025",
    timeOfAdmission: "7:00 AM",
    remark: "Absconded",
    dischargeDate: "16-Mar-2025",
    dischargeTime: "6:10 PM",
    noOfDays: "8 days",
    dischargedBy: "Dr. Easy Test",
  },
  {
    id: 5,
    name: "Grace Okonkwo",
    phoneNumber: "03089012345",
    gender: "Female",
    patientType: "HMO",
    age: 26,
    dateOfAdmission: "12-Mar-2025",
    timeOfAdmission: "11:00 AM",
    remark: "Discharged",
    dischargeDate: "20-Mar-2025",
    dischargeTime: "1:30 PM",
    noOfDays: "8 days",
    dischargedBy: "Dr. Jane Doe",
  },
];

export function buildMockHmoDischargedPatients(): HmoDischargedPatientRecord[] {
  const rows: HmoDischargedPatientRecord[] = SEED.map((row) => ({
    ...row,
    patientId: formatPatientId(row.id),
  }));

  for (let id = SEED.length + 1; id <= MOCK_HMO_LIST_TOTAL; id++) {
    const base = SEED[(id - 1) % SEED.length];
    rows.push({
      ...base,
      id,
      name: `${FIRST[id % FIRST.length]} ${LAST[(id + 2) % LAST.length]}`,
      patientId: formatPatientId(id),
      phoneNumber: `090${String(10000000 + id).slice(-8)}`,
      gender: id % 2 === 0 ? "Male" : "Female",
      patientType: PATIENT_TYPES[id % PATIENT_TYPES.length],
      age: 22 + (id % 40),
      remark: REMARKS[id % REMARKS.length],
      dischargedBy: CLINICIANS[id % CLINICIANS.length],
      noOfDays: `${3 + (id % 12)} days`,
    });
  }

  return rows;
}
