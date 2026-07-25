import { formatPatientId } from "@/lib/dateTime";
import type { IncomingType } from "@hmo/pages/shared/lib/incomingTagStyles";
import { MOCK_HMO_LIST_TOTAL } from "@hmo/pages/shared/lib/pagination";

export type HmoDashboardPatient = {
  id: number;
  name: string;
  patientId: string;
  phoneNumber: string;
  incoming: IncomingType;
  requestDate: string;
  requestTime: string;
  patientType: "COMPANY" | "HMO" | "PRIVATE";
  clinicianName: string;
  gender: string;
  address: string;
  relationship: string;
  medicationGuide: string;
  lastVisitDate: string;
  nextAppointment: string;
  bloodPressure: string;
  heartRate: string;
  weight: string;
  height: string;
};

const SEED: Omit<HmoDashboardPatient, "patientId">[] = [
  {
    id: 1,
    name: "Abiola Adebayo",
    phoneNumber: "09012345678",
    incoming: "GEN. CONSULT",
    requestDate: "12-Mar-2025",
    requestTime: "11:15 AM",
    patientType: "COMPANY",
    clinicianName: "Titilayo Olayinka",
    gender: "Male",
    address: "Lagos, Nigeria",
    relationship: "Married",
    medicationGuide: "Fee for Service",
    lastVisitDate: "21/02/2022",
    nextAppointment: "01/03/2025",
    bloodPressure: "120/80 mmHg",
    heartRate: "75 bpm",
    weight: "85 kg",
    height: "170cm",
  },
  {
    id: 2,
    name: "Chinonso Eze",
    phoneNumber: "08023456789",
    incoming: "FAMILY PLAN",
    requestDate: "15-Mar-2025",
    requestTime: "9:30 AM",
    patientType: "PRIVATE",
    clinicianName: "Bayo Hammed",
    gender: "Male",
    address: "Abuja, Nigeria",
    relationship: "Single",
    medicationGuide: "Capitated",
    lastVisitDate: "10/01/2025",
    nextAppointment: "20/03/2025",
    bloodPressure: "118/76 mmHg",
    heartRate: "72 bpm",
    weight: "78 kg",
    height: "175cm",
  },
  {
    id: 3,
    name: "Damilola Ogunleye",
    phoneNumber: "07034567890",
    incoming: "ANTE. NATAL",
    requestDate: "18-Mar-2025",
    requestTime: "2:00 PM",
    patientType: "HMO",
    clinicianName: "Titilayo Olayinka",
    gender: "Female",
    address: "Ibadan, Nigeria",
    relationship: "Married",
    medicationGuide: "Fee for Service",
    lastVisitDate: "05/02/2025",
    nextAppointment: "25/03/2025",
    bloodPressure: "115/70 mmHg",
    heartRate: "80 bpm",
    weight: "68 kg",
    height: "165cm",
  },
  {
    id: 4,
    name: "Emeka Okafor",
    phoneNumber: "06056789012",
    incoming: "CHILDBIRTH",
    requestDate: "25-Apr-2025",
    requestTime: "7:00 AM",
    patientType: "HMO",
    clinicianName: "Titilayo Olayinka",
    gender: "Female",
    address: "Enugu, Nigeria",
    relationship: "Married",
    medicationGuide: "Private",
    lastVisitDate: "12/03/2025",
    nextAppointment: "10/05/2025",
    bloodPressure: "122/82 mmHg",
    heartRate: "78 bpm",
    weight: "72 kg",
    height: "168cm",
  },
  {
    id: 5,
    name: "Ifeanyi Okoro",
    phoneNumber: "05067890123",
    incoming: "POST NATAL",
    requestDate: "30-Mar-2025",
    requestTime: "10:00 AM",
    patientType: "COMPANY",
    clinicianName: "Titilayo Olayinka",
    gender: "Female",
    address: "Port Harcourt, Nigeria",
    relationship: "Married",
    medicationGuide: "Fee for Service",
    lastVisitDate: "18/02/2025",
    nextAppointment: "15/04/2025",
    bloodPressure: "119/77 mmHg",
    heartRate: "74 bpm",
    weight: "70 kg",
    height: "162cm",
  },
  {
    id: 6,
    name: "Kehinde Afolabi",
    phoneNumber: "04078901234",
    incoming: "GEN. CONSULT",
    requestDate: "02-Apr-2025",
    requestTime: "1:45 PM",
    patientType: "PRIVATE",
    clinicianName: "Bayo Hammed",
    gender: "Male",
    address: "Lagos, Nigeria",
    relationship: "Single",
    medicationGuide: "Capitated",
    lastVisitDate: "22/01/2025",
    nextAppointment: "12/04/2025",
    bloodPressure: "121/79 mmHg",
    heartRate: "76 bpm",
    weight: "82 kg",
    height: "178cm",
  },
  {
    id: 7,
    name: "Grace Okonkwo",
    phoneNumber: "03089012345",
    incoming: "ANTE. NATAL",
    requestDate: "08-Apr-2025",
    requestTime: "8:20 AM",
    patientType: "HMO",
    clinicianName: "Titilayo Olayinka",
    gender: "Female",
    address: "Onitsha, Nigeria",
    relationship: "Married",
    medicationGuide: "Fee for Service",
    lastVisitDate: "01/03/2025",
    nextAppointment: "22/04/2025",
    bloodPressure: "117/75 mmHg",
    heartRate: "79 bpm",
    weight: "66 kg",
    height: "160cm",
  },
  {
    id: 8,
    name: "Toluwa Afolabi",
    phoneNumber: "02090123456",
    incoming: "FAMILY PLAN",
    requestDate: "14-Apr-2025",
    requestTime: "3:30 PM",
    patientType: "COMPANY",
    clinicianName: "Bayo Hammed",
    gender: "Female",
    address: "Lagos, Nigeria",
    relationship: "Single",
    medicationGuide: "Private",
    lastVisitDate: "28/02/2025",
    nextAppointment: "05/05/2025",
    bloodPressure: "116/74 mmHg",
    heartRate: "73 bpm",
    weight: "64 kg",
    height: "158cm",
  },
];

export function buildMockHmoDashboardPatients(): HmoDashboardPatient[] {
  const rows: HmoDashboardPatient[] = SEED.map((row) => ({
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
