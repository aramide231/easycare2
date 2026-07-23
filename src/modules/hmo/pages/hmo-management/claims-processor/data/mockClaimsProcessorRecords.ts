import { formatPatientId, mockVisitAtCurrentMonth } from "@/lib/dateTime";
import { MOCK_HMO_LIST_TOTAL } from "@hmo/pages/shared/lib/pagination";

export type ClaimsProcessorRecord = {
  id: number;
  name: string;
  patientId: string;
  phoneNumber: string;
  gender: string;
  age: number;
  patientType: string;
  treatmentGuide: string;
  claimDate: string;
  time: string;
};

type SeedRow = Omit<
  ClaimsProcessorRecord,
  "patientId" | "claimDate" | "time"
>;

const SEED: SeedRow[] = [
  {
    id: 1,
    name: "Abiola Adebayo",
    phoneNumber: "09012345678",
    gender: "M",
    age: 31,
    patientType: "HMO",
    treatmentGuide: "FEE FOR SERVICE",
  },
  {
    id: 2,
    name: "Chinonso Eze",
    phoneNumber: "08023456789",
    gender: "M",
    age: 28,
    patientType: "COMPANY",
    treatmentGuide: "CAPITATED",
  },
  {
    id: 3,
    name: "Damilola Ogunleye",
    phoneNumber: "07034567890",
    gender: "F",
    age: 35,
    patientType: "HMO",
    treatmentGuide: "PRIVATE",
  },
  {
    id: 4,
    name: "Emeka Nwankwo",
    phoneNumber: "08145678901",
    gender: "M",
    age: 42,
    patientType: "NHIS",
    treatmentGuide: "FEE FOR SERVICE",
  },
  {
    id: 5,
    name: "Ifeoma Okeke",
    phoneNumber: "09056789012",
    gender: "F",
    age: 29,
    patientType: "HMO",
    treatmentGuide: "CAPITATED",
  },
  {
    id: 6,
    name: "Toluwa Afolabi",
    phoneNumber: "08067890123",
    gender: "M",
    age: 33,
    patientType: "PRIVATE",
    treatmentGuide: "PRIVATE",
  },
  {
    id: 7,
    name: "Grace Okonkwo",
    phoneNumber: "07078901234",
    gender: "F",
    age: 26,
    patientType: "HMO",
    treatmentGuide: "FEE FOR SERVICE",
  },
  {
    id: 8,
    name: "Bayo Hammed",
    phoneNumber: "08189012345",
    gender: "M",
    age: 38,
    patientType: "COMPANY",
    treatmentGuide: "CAPITATED",
  },
  {
    id: 9,
    name: "Titilayo Olayinka",
    phoneNumber: "09090123456",
    gender: "F",
    age: 45,
    patientType: "HMO",
    treatmentGuide: "FEE FOR SERVICE",
  },
  {
    id: 10,
    name: "Kunle Adeyemi",
    phoneNumber: "08001234567",
    gender: "M",
    age: 52,
    patientType: "STAFF",
    treatmentGuide: "PRIVATE",
  },
];

export function buildMockClaimsProcessorRecords(): ClaimsProcessorRecord[] {
  const rows: ClaimsProcessorRecord[] = SEED.map((row, index) => {
    const { date, time } = mockVisitAtCurrentMonth(index);
    return {
      ...row,
      patientId: formatPatientId(row.id),
      claimDate: date,
      time,
    };
  });

  for (let id = SEED.length + 1; id <= MOCK_HMO_LIST_TOTAL; id++) {
    const base = SEED[(id - 1) % SEED.length];
    const { date, time } = mockVisitAtCurrentMonth(id);
    rows.push({
      ...base,
      id,
      patientId: formatPatientId(id),
      phoneNumber: `090${String(10000000 + id).slice(-8)}`,
      claimDate: date,
      time,
    });
  }

  return rows;
}

export function parseClaimDate(dateStr: string): Date {
  return new Date(dateStr.replace(/-/g, " "));
}
