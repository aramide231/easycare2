export type NotificationRow = {
  id: number;
  name: string;
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
};

const SEED: NotificationRow[] = [
  {
    id: 1,
    name: "Abiola Adebayo",
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
  },
  {
    id: 2,
    name: "Chinonso Eze",
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
  },
  {
    id: 3,
    name: "Damilola Ogunleye",
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
  },
  {
    id: 4,
    name: "Emeka Nwankwo",
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
  },
  {
    id: 5,
    name: "Ifeoma Okeke",
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
  },
  {
    id: 6,
    name: "Toluwa Afolabi",
    patientId: "P-2025006",
    phoneNumber: "09012345678",
    lastSeen: "15-Feb-2020",
    time: "10:25 AM",
    gender: "M",
    age: 31,
    patientType: "HMO",
    visitType: "POST NATAL",
    staffName: "Titilayo Olayinka",
    flagged: false,
  },
  {
    id: 7,
    name: "Fatima Zara",
    patientId: "P-2025007",
    phoneNumber: "09012345678",
    lastSeen: "15-Feb-2020",
    time: "10:25 AM",
    gender: "F",
    age: 31,
    patientType: "COMPANY",
    visitType: "CHILDBIRTH",
    staffName: "Titilayo Olayinka",
    flagged: false,
  },
  {
    id: 8,
    name: "Deola Kadir",
    patientId: "P-2025008",
    phoneNumber: "09012345678",
    lastSeen: "15-Feb-2020",
    time: "10:25 AM",
    gender: "M",
    age: 31,
    patientType: "HMO",
    visitType: "FAMILY PLAN",
    staffName: "Titilayo Olayinka",
    flagged: false,
  },
  {
    id: 9,
    name: "Chioma Okeke",
    patientId: "P-2025009",
    phoneNumber: "09012345678",
    lastSeen: "15-Feb-2020",
    time: "10:25 AM",
    gender: "F",
    age: 31,
    patientType: "COMPANY",
    visitType: "GEN. CONSULT",
    staffName: "Titilayo Olayinka",
    flagged: false,
  },
];

const NAMES = [
  ["Grace", "Okonkwo"],
  ["Michael", "Bello"],
  ["Sarah", "Ibrahim"],
  ["David", "Musa"],
];
const VISIT_TYPES = [
  "GEN. CONSULT",
  "ANTE. NATAL",
  "POST NATAL",
  "CHILDBIRTH",
  "FAMILY PLAN",
];
const PATIENT_TYPES = ["COMPANY", "HMO", "PRIVATE"];
const STAFF = ["Titilayo Olayinka", "Bayo Hammed", "Dr. Jane Doe"];

export const MOCK_NOTIFICATIONS_TOTAL = 160;

export function buildMockNotifications(): NotificationRow[] {
  const rows: NotificationRow[] = [...SEED];

  for (let id = SEED.length + 1; id <= MOCK_NOTIFICATIONS_TOTAL; id++) {
    const [first, last] = NAMES[id % NAMES.length];
    rows.push({
      id,
      name: `${first} ${last}`,
      patientId: `P-2025${String(id).padStart(3, "0")}`,
      phoneNumber: `090${String(10000000 + id).slice(-8)}`,
      lastSeen: "15-Feb-2020",
      time: "10:25 AM",
      gender: id % 2 === 0 ? "F" : "M",
      age: 22 + (id % 40),
      patientType: PATIENT_TYPES[id % PATIENT_TYPES.length],
      visitType: VISIT_TYPES[id % VISIT_TYPES.length],
      staffName: STAFF[id % STAFF.length],
      flagged: false,
    });
  }

  return rows;
}
