export type TreatmentType = "PRIVATE" | "STAFF" | "HMO" | "COMPANY";

export type DiagnosticsPatientRow = {
  id: number;
  regName: string;
  firstName: string;
  lastName: string;
  patientId: string;
  phoneNumber: string;
  date: string;
  time: string;
  gender: string;
  treatmentType: TreatmentType;
  age: number;
  invName: string;
  invAmount: string;
  bloodPressure: string;
  heartRate: string;
  weight: string;
  height: string;
  address: string;
  relationship: string;
  medicationGuide: string;
  lastVisitDate: string;
  nextAppointment: string;
};

/** Dashboard-001 — 7 rows from Figma. */
export const PATIENTS_LOG_ROWS: DiagnosticsPatientRow[] = [
  {
    id: 1,
    regName: "Alade Abiodun",
    firstName: "Alade",
    lastName: "Abiodun",
    patientId: "MSH/1088",
    phoneNumber: "0908025311",
    date: "18-Aug-2026",
    time: "11:15 AM",
    gender: "Female",
    treatmentType: "PRIVATE",
    age: 25,
    invName: "MP",
    invAmount: "N 2,000.00",
    bloodPressure: "116/74",
    heartRate: "72",
    weight: "62",
    height: "165cm",
    address: "14 Adeniyi Jones, Ikeja, Lagos",
    relationship: "Single",
    medicationGuide: "Fee for Service",
    lastVisitDate: "08/01/2025",
    nextAppointment: "15/04/2025",
  },
  {
    id: 2,
    regName: "Bola Oriyomi",
    firstName: "Bola",
    lastName: "Oriyomi",
    patientId: "MSH/1089",
    phoneNumber: "0908025312",
    date: "18-Aug-2026",
    time: "11:15 AM",
    gender: "Male",
    treatmentType: "STAFF",
    age: 22,
    invName: "PCV",
    invAmount: "N 3,000.00",
    bloodPressure: "118/76",
    heartRate: "78",
    weight: "78",
    height: "178cm",
    address: "22 Oba Akran Ave, Ikeja, Lagos",
    relationship: "Married",
    medicationGuide: "Staff Welfare",
    lastVisitDate: "02/02/2025",
    nextAppointment: "20/04/2025",
  },
  {
    id: 3,
    regName: "Kemi Bankole",
    firstName: "Kemi",
    lastName: "Bankole",
    patientId: "MSH/1090",
    phoneNumber: "0908025313",
    date: "19-Aug-2026",
    time: "11:15 AM",
    gender: "Female",
    treatmentType: "HMO",
    age: 20,
    invName: "URINE MCS",
    invAmount: "N 2,000.00",
    bloodPressure: "122/78",
    heartRate: "70",
    weight: "58",
    height: "162cm",
    address: "12 Garki Area 11, Abuja",
    relationship: "Married",
    medicationGuide: "HMO Covered",
    lastVisitDate: "18/02/2025",
    nextAppointment: "10/05/2025",
  },
  {
    id: 4,
    regName: "Yemisi Ayuba",
    firstName: "Yemisi",
    lastName: "Ayuba",
    patientId: "MSH/1091",
    phoneNumber: "0908025314",
    date: "19-Aug-2026",
    time: "11:15 AM",
    gender: "Male",
    treatmentType: "COMPANY",
    age: 32,
    invName: "URINALYSIS",
    invAmount: "N 5,000.00",
    bloodPressure: "130/85",
    heartRate: "82",
    weight: "90",
    height: "175cm",
    address: "45 Aba Rd, Port Harcourt",
    relationship: "Married",
    medicationGuide: "Company Scheme",
    lastVisitDate: "25/01/2025",
    nextAppointment: "05/04/2025",
  },
  {
    id: 5,
    regName: "Chinwe Eze",
    firstName: "Chinwe",
    lastName: "Eze",
    patientId: "MSH/1092",
    phoneNumber: "0908025315",
    date: "20-Aug-2026",
    time: "11:15 AM",
    gender: "Male",
    treatmentType: "PRIVATE",
    age: 32,
    invName: "MP",
    invAmount: "N 6,000.00",
    bloodPressure: "117/75",
    heartRate: "74",
    weight: "70",
    height: "172cm",
    address: "3 Ahmadu Bello Way, Kaduna",
    relationship: "Single",
    medicationGuide: "Fee for Service",
    lastVisitDate: "10/02/2025",
    nextAppointment: "22/03/2025",
  },
  {
    id: 6,
    regName: "Adeola Abimbola",
    firstName: "Adeola",
    lastName: "Abimbola",
    patientId: "MSH/1093",
    phoneNumber: "0908025316",
    date: "21-Aug-2026",
    time: "11:15 AM",
    gender: "Female",
    treatmentType: "COMPANY",
    age: 30,
    invName: "PCV",
    invAmount: "N 2,000.00",
    bloodPressure: "119/77",
    heartRate: "68",
    weight: "65",
    height: "168cm",
    address: "7 Ring Rd, Ibadan",
    relationship: "Married",
    medicationGuide: "Company Scheme",
    lastVisitDate: "05/03/2025",
    nextAppointment: "12/04/2025",
  },
  {
    id: 7,
    regName: "Abiola Adebayo A.",
    firstName: "Abiola",
    lastName: "Adebayo",
    patientId: "P-2025001",
    phoneNumber: "09045678901",
    date: "21-Aug-2026",
    time: "11:15 AM",
    gender: "Female",
    treatmentType: "HMO",
    age: 30,
    invName: "URINE MCS",
    invAmount: "N 3,000.00",
    bloodPressure: "120/80",
    heartRate: "75",
    weight: "85",
    height: "170cm",
    address: "Lagos, Nigeria",
    relationship: "Married",
    medicationGuide: "Fee for Service",
    lastVisitDate: "21/02/2022",
    nextAppointment: "01/03/2025",
  },
];

export function getPatientById(id: number): DiagnosticsPatientRow | undefined {
  return PATIENTS_LOG_ROWS.find((row) => row.id === id);
}
