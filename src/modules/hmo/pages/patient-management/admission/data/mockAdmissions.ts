import { formatPatientId } from "@/lib/dateTime";
import { getTreatmentCategoryForAdmission } from "@hmo/vendor/admission/data/mockTreatmentReview";
import {
  DEFAULT_ADMISSION_VITALS,
  type AdmissionRecord,
  type AdmissionVitalSigns,
} from "@hmo/vendor/admission/data/mockAdmissions";
import { MOCK_HMO_LIST_TOTAL } from "@hmo/pages/shared/lib/pagination";

export type HmoAdmissionRecord = AdmissionRecord;

const PATIENT_TYPES = ["HMO", "COMPANY", "PRIVATE"];
const CLINICIANS = ["Dr. Easy Test", "Dr. Jane Doe", "Titilayo Olayinka"];
const FIRST = ["Adeola", "Chinonso", "Damilola", "Emeka", "Grace", "Kehinde"];
const LAST = ["Abimbola", "Eze", "Ogunleye", "Okafor", "Okonkwo", "Afolabi"];

const SEED: Omit<HmoAdmissionRecord, "patientId">[] = [
  {
    id: 1,
    name: "Adeola Abimbola",
    phoneNumber: "08023456789",
    gender: "Female",
    patientType: "HMO",
    age: 31,
    dateOfAdmission: "12-Mar-2025",
    timeOfAdmission: "11:15 AM",
    ward: "Not Yet Assigned",
    assignedBedId: null,
    admittedBy: "Dr. Easy Test",
    vitalSigns: DEFAULT_ADMISSION_VITALS,
    treatmentCategory: getTreatmentCategoryForAdmission(1),
  },
  {
    id: 2,
    name: "Chinonso Eze",
    phoneNumber: "09012345678",
    gender: "Male",
    patientType: "COMPANY",
    age: 28,
    dateOfAdmission: "15-Mar-2025",
    timeOfAdmission: "9:30 AM",
    ward: "Female Ward",
    assignedBedId: null,
    admittedBy: "Dr. Jane Doe",
    vitalSigns: {
      ...DEFAULT_ADMISSION_VITALS,
      temperature: "37.1",
      bloodPressure: "118/76",
      weight: "78",
      height: "175",
    },
    treatmentCategory: getTreatmentCategoryForAdmission(2),
  },
  {
    id: 3,
    name: "Damilola Ogunleye",
    phoneNumber: "07034567890",
    gender: "Female",
    patientType: "HMO",
    age: 35,
    dateOfAdmission: "18-Mar-2025",
    timeOfAdmission: "2:00 PM",
    ward: "ICU",
    assignedBedId: null,
    admittedBy: "Titilayo Olayinka",
    vitalSigns: {
      ...DEFAULT_ADMISSION_VITALS,
      temperature: "36.5",
      bloodPressure: "110/70",
      weight: "62",
      height: "160",
    },
    treatmentCategory: getTreatmentCategoryForAdmission(3),
  },
  {
    id: 4,
    name: "Emeka Okafor",
    phoneNumber: "06056789012",
    gender: "Male",
    patientType: "PRIVATE",
    age: 42,
    dateOfAdmission: "20-Mar-2025",
    timeOfAdmission: "7:00 AM",
    ward: "General Male Ward 1",
    assignedBedId: null,
    admittedBy: "Dr. Easy Test",
    vitalSigns: DEFAULT_ADMISSION_VITALS,
    treatmentCategory: getTreatmentCategoryForAdmission(4),
  },
  {
    id: 5,
    name: "Grace Okonkwo",
    phoneNumber: "03089012345",
    gender: "Female",
    patientType: "HMO",
    age: 26,
    dateOfAdmission: "22-Mar-2025",
    timeOfAdmission: "10:00 AM",
    ward: "Not Yet Assigned",
    assignedBedId: null,
    admittedBy: "Dr. Jane Doe",
    vitalSigns: DEFAULT_ADMISSION_VITALS,
    treatmentCategory: getTreatmentCategoryForAdmission(5),
  },
];

function buildVitals(id: number): AdmissionVitalSigns {
  return {
    ...DEFAULT_ADMISSION_VITALS,
    bloodPressure: `${110 + (id % 20)}/${70 + (id % 15)}`,
    pulseRate: `${68 + (id % 25)}`,
    weight: `${55 + (id % 30)}`,
    height: `${155 + (id % 25)}`,
  };
}

export function buildMockHmoAdmissions(): HmoAdmissionRecord[] {
  const rows: HmoAdmissionRecord[] = SEED.map((row) => ({
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
      ward: id % 4 === 0 ? "Not Yet Assigned" : base.ward,
      admittedBy: CLINICIANS[id % CLINICIANS.length],
      vitalSigns: buildVitals(id),
      treatmentCategory: getTreatmentCategoryForAdmission(id),
    });
  }

  return rows;
}
