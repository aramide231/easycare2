export type AdmissionRecord = {
  id: number;
  name: string;
  patientId: string;
  phoneNumber: string;
  gender: string;
  patientType: string;
  age: number;
  dateOfAdmission: string;
  timeOfAdmission: string;
  ward: string;
  admittedBy: string;
};

const WARDS = [
  "Male Ward",
  "Children Ward",
  "Female Ward",
  "ICU",
  "Not Yet Assigned",
];
const PATIENT_TYPES = ["HMO", "PRIVATE", "COMPANY", "STAFF"];
const FIRST = ["Oluwakemi", "Ada", "Chioma", "Fatima", "Blessing", "Grace"];
const LAST = ["Adebayo", "Okafor", "Bello", "Musa", "Eze", "Nwankwo"];

const SEED: AdmissionRecord[] = [
  {
    id: 1,
    name: "Oluwakemi Adebayo",
    patientId: "MSH/1088",
    phoneNumber: "08012345678",
    gender: "Female",
    patientType: "HMO",
    age: 25,
    dateOfAdmission: "20-Feb-2025",
    timeOfAdmission: "12:20 PM",
    ward: "Male Ward",
    admittedBy: "Dr. Easy Test",
  },
  {
    id: 2,
    name: "Ada Okafor",
    patientId: "MSH/1089",
    phoneNumber: "08023456789",
    gender: "Female",
    patientType: "PRIVATE",
    age: 22,
    dateOfAdmission: "20-Feb-2025",
    timeOfAdmission: "11:45 AM",
    ward: "Children Ward",
    admittedBy: "Dr. Easy Test",
  },
  {
    id: 3,
    name: "Chioma Bello",
    patientId: "MSH/1090",
    phoneNumber: "08034567890",
    gender: "Female",
    patientType: "COMPANY",
    age: 20,
    dateOfAdmission: "19-Feb-2025",
    timeOfAdmission: "3:30 PM",
    ward: "Not Yet Assigned",
    admittedBy: "Dr. Jane Doe",
  },
];

export const MOCK_ADMISSIONS_TOTAL = 160;

export function buildMockAdmissions(): AdmissionRecord[] {
  const rows: AdmissionRecord[] = [...SEED];

  for (let id = SEED.length + 1; id <= MOCK_ADMISSIONS_TOTAL; id++) {
    const first = FIRST[id % FIRST.length];
    const last = LAST[(id + 2) % LAST.length];
    rows.push({
      id,
      name: `${first} ${last}`,
      patientId: `MSH/${1088 + id}`,
      phoneNumber: `080${String(10000000 + id).slice(-8)}`,
      gender: id % 3 === 0 ? "Male" : "Female",
      patientType: PATIENT_TYPES[id % PATIENT_TYPES.length],
      age: 18 + (id % 50),
      dateOfAdmission: "20-Feb-2025",
      timeOfAdmission: "12:20 PM",
      ward: WARDS[id % WARDS.length],
      admittedBy: id % 2 === 0 ? "Dr. Easy Test" : "Dr. Jane Doe",
    });
  }

  return rows;
}
