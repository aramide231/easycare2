import { formatPatientId } from "@/lib/dateTime";
import type { IncomingType } from "@hmo/pages/shared/lib/incomingTagStyles";
import { MOCK_HMO_LIST_TOTAL } from "@hmo/pages/shared/lib/pagination";

export type HmoNotificationRecord = {
  id: number;
  name: string;
  patientId: string;
  phoneNumber: string;
  incoming: IncomingType;
  requestDate: string;
  requestTime: string;
  patientType: "COMPANY" | "HMO" | "PRIVATE";
  sendersName: string;
};

type SeedRow = Omit<HmoNotificationRecord, "patientId">;

const SEED: SeedRow[] = [
  {
    id: 1,
    name: "Adeola Abimbola",
    phoneNumber: "08023456789",
    incoming: "GEN. CONSULT",
    requestDate: "12-Mar-2025",
    requestTime: "11:15 AM",
    patientType: "COMPANY",
    sendersName: "Titilayo Olayinka",
  },
  {
    id: 2,
    name: "Chinonso Eze",
    phoneNumber: "09012345678",
    incoming: "FAMILY PLAN",
    requestDate: "15-Mar-2025",
    requestTime: "9:30 AM",
    patientType: "PRIVATE",
    sendersName: "Bayo Hammed",
  },
  {
    id: 3,
    name: "Damilola Ogunleye",
    phoneNumber: "07034567890",
    incoming: "ANTE. NATAL",
    requestDate: "18-Mar-2025",
    requestTime: "2:00 PM",
    patientType: "HMO",
    sendersName: "Titilayo Olayinka",
  },
  {
    id: 4,
    name: "Emeka Okafor",
    phoneNumber: "06056789012",
    incoming: "CHILDBIRTH",
    requestDate: "25-Apr-2025",
    requestTime: "7:00 AM",
    patientType: "HMO",
    sendersName: "Titilayo Olayinka",
  },
  {
    id: 5,
    name: "Ifeanyi Okoro",
    phoneNumber: "05067890123",
    incoming: "POST NATAL",
    requestDate: "30-Mar-2025",
    requestTime: "10:00 AM",
    patientType: "COMPANY",
    sendersName: "Titilayo Olayinka",
  },
  {
    id: 6,
    name: "Kehinde Afolabi",
    phoneNumber: "04078901234",
    incoming: "GEN. CONSULT",
    requestDate: "02-Apr-2025",
    requestTime: "1:45 PM",
    patientType: "PRIVATE",
    sendersName: "Bayo Hammed",
  },
  {
    id: 7,
    name: "Grace Okonkwo",
    phoneNumber: "03089012345",
    incoming: "ANTE. NATAL",
    requestDate: "08-Apr-2025",
    requestTime: "8:20 AM",
    patientType: "HMO",
    sendersName: "Titilayo Olayinka",
  },
  {
    id: 8,
    name: "Toluwa Afolabi",
    phoneNumber: "02090123456",
    incoming: "FAMILY PLAN",
    requestDate: "14-Apr-2025",
    requestTime: "3:30 PM",
    patientType: "COMPANY",
    sendersName: "Bayo Hammed",
  },
  {
    id: 9,
    name: "Abiola Adebayo",
    phoneNumber: "09012345678",
    incoming: "GEN. CONSULT",
    requestDate: "20-Apr-2025",
    requestTime: "4:10 PM",
    patientType: "HMO",
    sendersName: "Titilayo Olayinka",
  },
];

export function buildMockHmoNotificationRecords(): HmoNotificationRecord[] {
  const rows: HmoNotificationRecord[] = SEED.map((row) => ({
    ...row,
    patientId: formatPatientId(row.id),
  }));

  for (let id = SEED.length + 1; id <= MOCK_HMO_LIST_TOTAL; id++) {
    const base = SEED[(id - 1) % SEED.length];
    rows.push({
      ...base,
      id,
      patientId: formatPatientId(id),
      phoneNumber: `090${String(10000000 + id).slice(-8)}`,
    });
  }

  return rows;
}
