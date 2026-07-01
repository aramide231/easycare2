import { getTreatmentCategoryForAdmission } from "./mockTreatmentReview";

export type AdmissionVitalSigns = {
  temperature: string;
  bloodPressure: string;
  weight: string;
  height: string;
  bloodSugar: string;
  pulseRate: string;
  respiration: string;
  bmi: string;
  urinalysis: string;
  spo2: string;
  fetalHeartRate: string;
  comments: string;
};

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
  assignedBedId: string | null;
  admittedBy: string;
  vitalSigns: AdmissionVitalSigns;
  treatmentCategory: string;
};

const PATIENT_TYPES = ["HMO", "PRIVATE", "COMPANY", "STAFF"];
const FIRST = ["Oluwakemi", "Ada", "Chioma", "Fatima", "Blessing", "Grace"];
const LAST = ["Adebayo", "Okafor", "Bello", "Musa", "Eze", "Nwankwo"];

export const DEFAULT_ADMISSION_VITALS: AdmissionVitalSigns = {
  temperature: "36",
  bloodPressure: "140/40",
  weight: "75",
  height: "16",
  bloodSugar: "98",
  pulseRate: "90",
  respiration: "180",
  bmi: "200",
  urinalysis: "60",
  spo2: "24.5",
  fetalHeartRate: "98",
  comments: "Normal Stage",
};

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
    ward: "General Male Ward 1",
    assignedBedId: null,
    admittedBy: "Dr. Easy Test",
    vitalSigns: DEFAULT_ADMISSION_VITALS,
    treatmentCategory: getTreatmentCategoryForAdmission(1),
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
    assignedBedId: null,
    admittedBy: "Dr. Easy Test",
    vitalSigns: {
      ...DEFAULT_ADMISSION_VITALS,
      temperature: "37.1",
      bloodPressure: "118/76",
      weight: "55",
      height: "158",
    },
    treatmentCategory: getTreatmentCategoryForAdmission(2),
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
    assignedBedId: null,
    admittedBy: "Dr. Jane Doe",
    vitalSigns: {
      ...DEFAULT_ADMISSION_VITALS,
      temperature: "36.5",
      bloodPressure: "110/70",
      weight: "62",
      height: "170",
    },
    treatmentCategory: getTreatmentCategoryForAdmission(3),
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
      ward: "Not Yet Assigned",
      assignedBedId: null,
      admittedBy: id % 2 === 0 ? "Dr. Easy Test" : "Dr. Jane Doe",
      vitalSigns: {
        ...DEFAULT_ADMISSION_VITALS,
        bloodPressure: `${110 + (id % 20)}/${70 + (id % 15)}`,
        pulseRate: `${68 + (id % 25)}`,
        weight: `${55 + (id % 30)}`,
        height: `${155 + (id % 25)}`,
      },
      treatmentCategory: getTreatmentCategoryForAdmission(id),
    });
  }

  return rows;
}
