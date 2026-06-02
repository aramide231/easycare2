export type Patient = {
  id: number;
  firstName: string;
  lastName: string;
  patientId: string;
  phoneNumber: string;
  lastSeen: string;
  time: string;
  gender: string;
  age: number;
  patientType: string;
  visitType: string;
  staffName: string;
  flagged: boolean;
  bloodPressure: string;
  name: string;
};

const SEED_PATIENTS: Patient[] = [
  {
    id: 1,
    name: "Abiola Adebayo",
    firstName: "Abiola",
    lastName: "Adebayo",
    patientId: "P-2025001",
    phoneNumber: "09012345678",
    lastSeen: "15-Feb-2020",
    time: "10:25 AM",
    gender: "M",
    age: 31,
    patientType: "COMPANY",
    visitType: "GEN. CONSULT",
    staffName: "Titilayo Olayinka",
    flagged: false,
    bloodPressure: "120/80",
  },
  {
    id: 2,
    name: "Chinonso Eze",
    firstName: "Chinonso",
    lastName: "Eze",
    patientId: "P-2025002",
    phoneNumber: "09012345678",
    lastSeen: "15-Feb-2020",
    time: "10:25 AM",
    gender: "M",
    age: 31,
    patientType: "PRIVATE",
    visitType: "GEN. CONSULT",
    staffName: "Bayo Hammed",
    flagged: false,
    bloodPressure: "130/85",
  },
  {
    id: 3,
    name: "Damilola Ogunleye",
    firstName: "Damilola",
    lastName: "Ogunleye",
    patientId: "P-2025003",
    phoneNumber: "09012345678",
    lastSeen: "15-Feb-2020",
    time: "10:25 AM",
    gender: "F",
    age: 31,
    patientType: "COMPANY",
    visitType: "ANTE. NATAL",
    staffName: "Titilayo Olayinka",
    flagged: false,
    bloodPressure: "118/78",
  },
  {
    id: 4,
    name: "Emeka Nwankwo",
    firstName: "Emeka",
    lastName: "Nwankwo",
    patientId: "P-2025004",
    phoneNumber: "09012345678",
    lastSeen: "15-Feb-2020",
    time: "10:25 AM",
    gender: "M",
    age: 31,
    patientType: "HMO",
    visitType: "POST NATAL",
    staffName: "Titilayo Olayinka",
    flagged: false,
    bloodPressure: "135/90",
  },
  {
    id: 5,
    name: "Ifeoma Okeke",
    firstName: "Ifeoma",
    lastName: "Okeke",
    patientId: "P-2025005",
    phoneNumber: "09012345678",
    lastSeen: "15-Feb-2020",
    time: "10:25 AM",
    gender: "F",
    age: 31,
    patientType: "COMPANY",
    visitType: "CHILDBIRTH",
    staffName: "Titilayo Olayinka",
    flagged: false,
    bloodPressure: "122/79",
  },
  {
    id: 6,
    name: "Toluwa Afolabi",
    firstName: "Toluwa",
    lastName: "Afolabi",
    patientId: "P-2025006",
    phoneNumber: "09012345678",
    lastSeen: "15-Feb-2020",
    time: "10:25 AM",
    gender: "M",
    age: 31,
    patientType: "COMPANY",
    visitType: "ANTE. NATAL",
    staffName: "Titilayo Olayinka",
    flagged: false,
    bloodPressure: "125/82",
  },
];

const FIRST_NAMES = [
  "Grace",
  "Michael",
  "Sarah",
  "David",
  "Amina",
  "Kelvin",
  "Blessing",
  "Samuel",
];
const LAST_NAMES = [
  "Okonkwo",
  "Bello",
  "Ibrahim",
  "Musa",
  "Adeyemi",
  "Chukwu",
  "Okafor",
  "Yusuf",
];
const VISIT_TYPES = [
  "GEN. CONSULT",
  "ANTE. NATAL",
  "POST NATAL",
  "CHILDBIRTH",
  "FAMILY PLAN",
  "SPECIALIST CONSULT",
  "WOUND DRESSING",
];
const PATIENT_TYPES = ["COMPANY", "HMO", "PRIVATE", "STAFF"];
const STAFF = ["Titilayo Olayinka", "Bayo Hammed", "Dr. Jane Doe"];

/** Enough rows for multi-page pagination (8 per page → 20 pages). */
export const MOCK_PATIENTS_TOTAL = 160;

export function buildMockPatients(): Patient[] {
  const patients: Patient[] = [...SEED_PATIENTS];

  for (let id = SEED_PATIENTS.length + 1; id <= MOCK_PATIENTS_TOTAL; id++) {
    const firstName = FIRST_NAMES[id % FIRST_NAMES.length];
    const lastName = LAST_NAMES[(id + 2) % LAST_NAMES.length];
    const visitType = VISIT_TYPES[id % VISIT_TYPES.length];
    const patientType = PATIENT_TYPES[id % PATIENT_TYPES.length];

    patients.push({
      id,
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
      patientId: `P-2025${String(id).padStart(3, "0")}`,
      phoneNumber: `090${String(10000000 + id).slice(-8)}`,
      lastSeen: "15-Feb-2020",
      time: "10:25 AM",
      gender: id % 2 === 0 ? "F" : "M",
      age: 22 + (id % 40),
      patientType,
      visitType,
      staffName: STAFF[id % STAFF.length],
      flagged: false,
      bloodPressure: `${110 + (id % 30)}/${70 + (id % 20)}`,
    });
  }

  return patients;
}
