import { formatPatientId, mockVisitAt } from "@/lib/dateTime";

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

type SeedRow = Omit<NotificationRow, "lastSeen" | "time" | "patientId">;

const SEED: SeedRow[] = [
  {
    id: 1,
    name: "Abiola Adebayo",
    phoneNumber: "09012345678",
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
    phoneNumber: "09012345678",
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
    phoneNumber: "09012345678",
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
    phoneNumber: "09012345678",
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
    phoneNumber: "09012345678",
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
    phoneNumber: "09012345678",
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
    phoneNumber: "09012345678",
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
    phoneNumber: "09012345678",
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
    phoneNumber: "09012345678",
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

function withVisitTiming(row: SeedRow): NotificationRow {
  const visit = mockVisitAt(row.id % 14, row.id);
  return {
    ...row,
    patientId: formatPatientId(row.id),
    lastSeen: visit.lastSeen,
    time: visit.time,
  };
}

export function buildMockNotifications(): NotificationRow[] {
  const rows: NotificationRow[] = SEED.map(withVisitTiming);

  for (let id = SEED.length + 1; id <= MOCK_NOTIFICATIONS_TOTAL; id++) {
    const [first, last] = NAMES[id % NAMES.length];
    const visit = mockVisitAt(id % 14, id);
    rows.push({
      id,
      name: `${first} ${last}`,
      patientId: formatPatientId(id),
      phoneNumber: `090${String(10000000 + id).slice(-8)}`,
      lastSeen: visit.lastSeen,
      time: visit.time,
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
