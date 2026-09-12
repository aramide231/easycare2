export type TreatmentType = "PRIVATE" | "STAFF" | "HMO" | "COMPANY";
export type PatientCategory = "OUT-PATIENT" | "IN-PATIENT";

export type DiagnosticsPatientsLogRow = {
  id: number;
  regName: string;
  patientId: string;
  phoneNumber: string;
  date: string;
  time: string;
  gender: string;
  treatmentType: TreatmentType;
  age: number;
  invName: string;
  invAmount: string;
  staffName: string;
  patientCategory: PatientCategory;
  firstName: string;
  lastName: string;
  bloodPressure: string;
  heartRate: string;
  weight: string;
  height: string;
  address: string;
  relationship: string;
  treatmentGuide: string;
  lastVisitDate: string;
  nextAppointment: string;
};

export type DiagnosticsNotificationRow = {
  id: number;
  incoming: string;
  regName: string;
  patientId: string;
  phoneNumber: string;
  date: string;
  time: string;
  gender: string;
  patientCategory: PatientCategory;
  treatmentType: TreatmentType;
  invAmount: string;
  staffName: string;
};

export type InvestigationRequest = {
  id: number;
  patientId: string;
  patientName: string;
  gender: string;
  age: number;
  investigation: string;
  requestedBy: string;
  date: string;
  time: string;
  status: "Pending" | "In Progress" | "Completed";
  hasResult: boolean;
  treatmentType: TreatmentType;
  patientCategory: PatientCategory;
  invAmount: string;
  phoneNumber: string;
};

export type DiagnosticsPatient = {
  id: number;
  patientId: string;
  name: string;
  gender: string;
  age: number;
  phoneNumber: string;
  patientType: TreatmentType;
  isInPatient: boolean;
};

export type NurseRecordEntry = {
  id: number;
  time: string;
  report: string;
  signedBy: string;
};

export type PrescribedInvestigationItem = {
  id: string;
  name: string;
  quantity: number;
  amount: string;
};

/** Dashboard — Patients Log (includes laboratory form seed patients). */
export const PATIENTS_LOG_ROWS: DiagnosticsPatientsLogRow[] = [
  {
    id: 12,
    regName: "Chinedu Okeke",
    firstName: "Chinedu",
    lastName: "Okeke",
    patientId: "PVT-200",
    phoneNumber: "0908025324",
    date: "03-Sep-2026",
    time: "09:20 AM",
    gender: "Male",
    treatmentType: "HMO",
    age: 31,
    invName: "Ultrasound Scan",
    invAmount: "N 15,000.00",
    staffName: "Titilayo Olayinka",
    patientCategory: "OUT-PATIENT",
    bloodPressure: "120/78",
    heartRate: "72",
    weight: "79",
    height: "178cm",
    address: "2 Omega Lane, Lekki, Lagos",
    relationship: "Single",
    treatmentGuide: "HMO Covered",
    lastVisitDate: "18/08/2026",
    nextAppointment: "20/09/2026",
  },
  {
    id: 11,
    regName: "Ibrahim Suleiman",
    firstName: "Ibrahim",
    lastName: "Suleiman",
    patientId: "MSH/1099",
    phoneNumber: "0908025323",
    date: "03-Sep-2026",
    time: "08:50 AM",
    gender: "Male",
    treatmentType: "COMPANY",
    age: 52,
    invName: "Electrolytes & UREA",
    invAmount: "N 8,500.00",
    staffName: "Titilayo Olayinka",
    patientCategory: "OUT-PATIENT",
    bloodPressure: "134/86",
    heartRate: "78",
    weight: "88",
    height: "174cm",
    address: "21 Ahmadu Bello Way, Victoria Island, Lagos",
    relationship: "Married",
    treatmentGuide: "Company Scheme",
    lastVisitDate: "20/08/2026",
    nextAppointment: "17/09/2026",
  },
  {
    id: 10,
    regName: "Ngozi Okonkwo",
    firstName: "Ngozi",
    lastName: "Okonkwo",
    patientId: "MSH/1098",
    phoneNumber: "0908025322",
    date: "29-Aug-2026",
    time: "11:30 AM",
    gender: "Female",
    treatmentType: "PRIVATE",
    age: 38,
    invName: "Liver Function Test (LFT)",
    invAmount: "N 12,500.00",
    staffName: "Titilayo Olayinka",
    patientCategory: "OUT-PATIENT",
    bloodPressure: "122/80",
    heartRate: "74",
    weight: "72",
    height: "168cm",
    address: "9 Bourdillon Rd, Ikoyi, Lagos",
    relationship: "Married",
    treatmentGuide: "Fee for Service",
    lastVisitDate: "15/08/2026",
    nextAppointment: "12/09/2026",
  },
  {
    id: 9,
    regName: "Tunde Bakare",
    firstName: "Tunde",
    lastName: "Bakare",
    patientId: "MSH/1097",
    phoneNumber: "0908025321",
    date: "29-Aug-2026",
    time: "10:15 AM",
    gender: "Male",
    treatmentType: "HMO",
    age: 45,
    invName: "Blood Glucose",
    invAmount: "N 4,500.00",
    staffName: "Titilayo Olayinka",
    patientCategory: "OUT-PATIENT",
    bloodPressure: "128/82",
    heartRate: "80",
    weight: "82",
    height: "176cm",
    address: "5 Ozumba Mbadiwe Ave, Victoria Island, Lagos",
    relationship: "Married",
    treatmentGuide: "HMO Covered",
    lastVisitDate: "22/08/2026",
    nextAppointment: "05/09/2026",
  },
  {
    id: 8,
    regName: "Funke Adeyemi",
    firstName: "Funke",
    lastName: "Adeyemi",
    patientId: "MSH/1096",
    phoneNumber: "0908025320",
    date: "27-Aug-2026",
    time: "09:40 AM",
    gender: "Female",
    treatmentType: "PRIVATE",
    age: 34,
    invName: "Haematology /CBC",
    invAmount: "N 7,500.00",
    staffName: "Titilayo Olayinka",
    patientCategory: "OUT-PATIENT",
    bloodPressure: "118/76",
    heartRate: "76",
    weight: "68",
    height: "164cm",
    address: "18 Admiralty Way, Lekki, Lagos",
    relationship: "Married",
    treatmentGuide: "Fee for Service",
    lastVisitDate: "20/08/2026",
    nextAppointment: "03/09/2026",
  },
  {
    id: 1,
    regName: "Alade Abiodun",
    firstName: "Alade",
    lastName: "Abiodun",
    patientId: "MSH/1088",
    phoneNumber: "0908025311",
    date: "12-Mar-2025",
    time: "11:15 AM",
    gender: "Female",
    treatmentType: "PRIVATE",
    age: 28,
    invName: "MP",
    invAmount: "N 2,000.00",
    staffName: "Titilayo Olayinka",
    patientCategory: "OUT-PATIENT",
    bloodPressure: "116/74",
    heartRate: "72",
    weight: "62",
    height: "165cm",
    address: "14 Adeniyi Jones, Ikeja, Lagos",
    relationship: "Single",
    treatmentGuide: "Fee for Ser.",
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
    date: "12-Mar-2025",
    time: "11:15 AM",
    gender: "Male",
    treatmentType: "STAFF",
    age: 34,
    invName: "PCV",
    invAmount: "N 3,000.00",
    staffName: "Titilayo Olayinka",
    patientCategory: "OUT-PATIENT",
    bloodPressure: "118/76",
    heartRate: "78",
    weight: "78",
    height: "178cm",
    address: "22 Oba Akran Ave, Ikeja, Lagos",
    relationship: "Married",
    treatmentGuide: "Staff Welfare",
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
    date: "12-Mar-2025",
    time: "11:15 AM",
    gender: "Female",
    treatmentType: "HMO",
    age: 26,
    invName: "URINE MCS",
    invAmount: "N 2,000.00",
    staffName: "Titilayo Olayinka",
    patientCategory: "IN-PATIENT",
    bloodPressure: "122/78",
    heartRate: "70",
    weight: "58",
    height: "162cm",
    address: "12 Garki Area 11, Abuja",
    relationship: "Married",
    treatmentGuide: "HMO Covered",
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
    date: "12-Mar-2025",
    time: "11:15 AM",
    gender: "Male",
    treatmentType: "COMPANY",
    age: 41,
    invName: "URINALYSIS",
    invAmount: "N 5,000.00",
    staffName: "Titilayo Olayinka",
    patientCategory: "OUT-PATIENT",
    bloodPressure: "130/85",
    heartRate: "82",
    weight: "90",
    height: "175cm",
    address: "45 Aba Rd, Port Harcourt",
    relationship: "Married",
    treatmentGuide: "Company Scheme",
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
    date: "12-Mar-2025",
    time: "11:15 AM",
    gender: "Male",
    treatmentType: "PRIVATE",
    age: 29,
    invName: "MP",
    invAmount: "N 6,000.00",
    staffName: "Titilayo Olayinka",
    patientCategory: "OUT-PATIENT",
    bloodPressure: "125/82",
    heartRate: "74",
    weight: "70",
    height: "172cm",
    address: "3 Toyin St, Ikeja, Lagos",
    relationship: "Single",
    treatmentGuide: "Fee for Ser.",
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
    date: "12-Mar-2025",
    time: "11:15 AM",
    gender: "Female",
    treatmentType: "COMPANY",
    age: 33,
    invName: "PCV",
    invAmount: "N 2,000.00",
    staffName: "Titilayo Olayinka",
    patientCategory: "IN-PATIENT",
    bloodPressure: "119/77",
    heartRate: "68",
    weight: "65",
    height: "168cm",
    address: "7 Ring Rd, Ibadan",
    relationship: "Married",
    treatmentGuide: "Company Scheme",
    lastVisitDate: "05/03/2025",
    nextAppointment: "12/04/2025",
  },
  {
    id: 7,
    regName: "Abiola Adebayo A.",
    firstName: "Abiola",
    lastName: "Adebayo",
    patientId: "P-2025001",
    phoneNumber: "0908025317",
    date: "12-Mar-2025",
    time: "11:15 AM",
    gender: "Female",
    treatmentType: "HMO",
    age: 31,
    invName: "URINE MCS",
    invAmount: "N 3,000.00",
    staffName: "Titilayo Olayinka",
    patientCategory: "OUT-PATIENT",
    bloodPressure: "120/80",
    heartRate: "75",
    weight: "85",
    height: "170cm",
    address: "12 Allen Avenue, Ikeja, Lagos",
    relationship: "Married",
    treatmentGuide: "HMO Covered",
    lastVisitDate: "21/02/2025",
    nextAppointment: "01/04/2025",
  },
];

/** Notification page (9 rows, Figma Notification frame). */
export const NOTIFICATION_ROWS: DiagnosticsNotificationRow[] = [
  {
    id: 1,
    incoming: "MP",
    regName: "Alade Abiodun",
    patientId: "MSH/1088",
    phoneNumber: "0908025311",
    date: "12-Mar-2025",
    time: "11:15 AM",
    gender: "Female",
    patientCategory: "OUT-PATIENT",
    treatmentType: "PRIVATE",
    invAmount: "N 2,000.00",
    staffName: "Titilayo Olayinka",
  },
  {
    id: 2,
    incoming: "PCV",
    regName: "Bola Oriyomi",
    patientId: "MSH/1089",
    phoneNumber: "0908025312",
    date: "12-Mar-2025",
    time: "11:15 AM",
    gender: "Male",
    patientCategory: "OUT-PATIENT",
    treatmentType: "STAFF",
    invAmount: "N 3,000.00",
    staffName: "Titilayo Olayinka",
  },
  {
    id: 3,
    incoming: "FBC",
    regName: "Kemi Bankole",
    patientId: "MSH/1090",
    phoneNumber: "0908025313",
    date: "12-Mar-2025",
    time: "11:15 AM",
    gender: "Female",
    patientCategory: "IN-PATIENT",
    treatmentType: "HMO",
    invAmount: "N 2,000.00",
    staffName: "Titilayo Olayinka",
  },
  {
    id: 4,
    incoming: "GENOTYPE",
    regName: "Yemisi Ayuba",
    patientId: "MSH/1091",
    phoneNumber: "0908025314",
    date: "12-Mar-2025",
    time: "11:15 AM",
    gender: "Male",
    patientCategory: "OUT-PATIENT",
    treatmentType: "COMPANY",
    invAmount: "N 5,000.00",
    staffName: "Titilayo Olayinka",
  },
  {
    id: 5,
    incoming: "LIPID PROFILE",
    regName: "Chinwe Eze",
    patientId: "MSH/1092",
    phoneNumber: "0908025315",
    date: "12-Mar-2025",
    time: "11:15 AM",
    gender: "Male",
    patientCategory: "OUT-PATIENT",
    treatmentType: "PRIVATE",
    invAmount: "N 6,000.00",
    staffName: "Titilayo Olayinka",
  },
  {
    id: 6,
    incoming: "URINE MCS",
    regName: "Adeola Abimbola",
    patientId: "MSH/1093",
    phoneNumber: "0908025316",
    date: "12-Mar-2025",
    time: "11:15 AM",
    gender: "Female",
    patientCategory: "IN-PATIENT",
    treatmentType: "COMPANY",
    invAmount: "N 2,000.00",
    staffName: "Titilayo Olayinka",
  },
  {
    id: 7,
    incoming: "MP",
    regName: "Abiola Adebayo A.",
    patientId: "P-2025001",
    phoneNumber: "0908025317",
    date: "12-Mar-2025",
    time: "11:15 AM",
    gender: "Female",
    patientCategory: "OUT-PATIENT",
    treatmentType: "HMO",
    invAmount: "N 3,000.00",
    staffName: "Titilayo Olayinka",
  },
  {
    id: 8,
    incoming: "FBC",
    regName: "Funke Balogun",
    patientId: "MSH/1094",
    phoneNumber: "0908025318",
    date: "12-Mar-2025",
    time: "11:15 AM",
    gender: "Female",
    patientCategory: "OUT-PATIENT",
    treatmentType: "PRIVATE",
    invAmount: "N 4,000.00",
    staffName: "Titilayo Olayinka",
  },
  {
    id: 9,
    incoming: "PCV",
    regName: "Segun Olatunde",
    patientId: "MSH/1095",
    phoneNumber: "0908025319",
    date: "12-Mar-2025",
    time: "11:15 AM",
    gender: "Male",
    patientCategory: "IN-PATIENT",
    treatmentType: "STAFF",
    invAmount: "N 3,500.00",
    staffName: "Titilayo Olayinka",
  },
];

export const INVESTIGATION_REQUESTS: InvestigationRequest[] =
  PATIENTS_LOG_ROWS.map((row, index) => {
    const invKey = row.invName.toLowerCase();
    const isLabFormEntry =
      invKey.includes("haematology") ||
      invKey.includes("blood glucose") ||
      invKey.includes("liver function") ||
      invKey === "lft" ||
      invKey.includes("electrolyte") ||
      invKey.includes("urea") ||
      invKey.includes("ultrasound");
    return {
      id: row.id,
      patientId: row.patientId,
      patientName: row.regName,
      gender: row.gender,
      age: row.age,
      investigation: row.invName,
      requestedBy: row.staffName,
      date: row.date,
      time: row.time,
      status: isLabFormEntry
        ? "Pending"
        : index % 3 === 0
          ? "Completed"
          : index % 3 === 1
            ? "Pending"
            : "In Progress",
      hasResult: isLabFormEntry ? false : index % 3 === 0,
      treatmentType: row.treatmentType,
      patientCategory: row.patientCategory,
      invAmount: row.invAmount,
      phoneNumber: row.phoneNumber,
    };
  });

export const DIAGNOSTICS_PATIENTS: DiagnosticsPatient[] = [
  ...PATIENTS_LOG_ROWS.map((row) => ({
    id: row.id,
    patientId: row.patientId,
    name: row.regName,
    gender: row.gender,
    age: row.age,
    phoneNumber: row.phoneNumber,
    patientType: row.treatmentType,
    isInPatient: row.patientCategory === "IN-PATIENT",
  })),
  {
    id: 901,
    patientId: "LDWY-200",
    name: "Adebayo Chiemeka",
    gender: "Male",
    age: 26,
    phoneNumber: "01234567890",
    patientType: "PRIVATE",
    isInPatient: true,
  },
];

export function getInvestigationById(id: number): InvestigationRequest | null {
  return INVESTIGATION_REQUESTS.find((row) => row.id === id) ?? null;
}

export function getPatientByPatientId(
  patientId: string
): DiagnosticsPatient | null {
  return (
    DIAGNOSTICS_PATIENTS.find((patient) => patient.patientId === patientId) ??
    null
  );
}

export function getPatientsLogRowById(
  id: number
): DiagnosticsPatientsLogRow | null {
  return PATIENTS_LOG_ROWS.find((row) => row.id === id) ?? null;
}

export function getPatientsLogRowByPatientId(
  patientId: string
): DiagnosticsPatientsLogRow | null {
  const normalized = patientId.trim().toUpperCase();
  return (
    PATIENTS_LOG_ROWS.find(
      (row) => row.patientId.trim().toUpperCase() === normalized
    ) ?? null
  );
}

export function resolveDiagnosticsPatient(
  idParam: string | undefined,
  statePatient?: DiagnosticsPatientsLogRow | null
): DiagnosticsPatientsLogRow | null {
  if (statePatient) return statePatient;

  if (!idParam) return null;

  const numericId = Number(idParam);
  if (!Number.isNaN(numericId)) {
    return getPatientsLogRowById(numericId);
  }

  return getPatientsLogRowByPatientId(idParam);
}

export type DiagnosticsUploadedDocumentSeed = {
  id: string;
  displayName: string;
  fileName: string;
  fileType: string;
  uploadDate: string;
  uploadTime: string;
  uploadedBy: string;
};

export const PATIENT_UPLOADED_DOCUMENTS: Record<
  string,
  DiagnosticsUploadedDocumentSeed[]
> = {
  "MSH/1088": [
    {
      id: "doc-alade-1",
      displayName: "Alade Abiodun MP Result",
      fileName: "alade-mp-result.pdf",
      fileType: "application/pdf",
      uploadDate: "08-Jan-2025",
      uploadTime: "09:15 AM",
      uploadedBy: "Titilayo Olayinka",
    },
  ],
  "MSH/1089": [
    {
      id: "doc-bola-1",
      displayName: "Bola Oriyomi PCV Report",
      fileName: "bola-pcv.pdf",
      fileType: "application/pdf",
      uploadDate: "02-Feb-2025",
      uploadTime: "10:40 AM",
      uploadedBy: "Titilayo Olayinka",
    },
  ],
  "MSH/1090": [
    {
      id: "doc-kemi-1",
      displayName: "Kemi Bankole Urine MCS",
      fileName: "kemi-urine-mcs.pdf",
      fileType: "application/pdf",
      uploadDate: "18-Feb-2025",
      uploadTime: "02:05 PM",
      uploadedBy: "Titilayo Olayinka",
    },
  ],
  "MSH/1091": [
    {
      id: "doc-yemisi-1",
      displayName: "Yemisi Ayuba Urinalysis",
      fileName: "yemisi-urinalysis.pdf",
      fileType: "application/pdf",
      uploadDate: "25-Jan-2025",
      uploadTime: "11:20 AM",
      uploadedBy: "Titilayo Olayinka",
    },
  ],
  "MSH/1092": [
    {
      id: "doc-chinwe-1",
      displayName: "Chinwe Eze Malaria Test",
      fileName: "chinwe-mp.pdf",
      fileType: "application/pdf",
      uploadDate: "10-Feb-2025",
      uploadTime: "08:50 AM",
      uploadedBy: "Titilayo Olayinka",
    },
  ],
  "MSH/1093": [
    {
      id: "doc-adeola-1",
      displayName: "Adeola Abimbola PCV",
      fileName: "adeola-pcv.pdf",
      fileType: "application/pdf",
      uploadDate: "05-Mar-2025",
      uploadTime: "03:30 PM",
      uploadedBy: "Titilayo Olayinka",
    },
  ],
  "P-2025001": [
    {
      id: "doc-abiola-1",
      displayName: "Abiola Adebayo Pelvic Scan",
      fileName: "pelvic-scan.pdf",
      fileType: "application/pdf",
      uploadDate: "15-Feb-2025",
      uploadTime: "10:24 AM",
      uploadedBy: "Titilayo Oluyinka",
    },
  ],
};

export const PRESCRIBED_ITEMS_BY_PATIENT: Record<
  string,
  PrescribedInvestigationItem[]
> = {
  "P-2025001": [
    { id: "1", name: "Normal Saline", quantity: 2, amount: "N 400.00" },
    { id: "2", name: "Injection — Ceftriaxone", quantity: 3, amount: "N 2,100.00" },
  ],
  "MSH/1088": [
    { id: "1", name: "MP", quantity: 1, amount: "N 2,000.00" },
  ],
  "MSH/1090": [
    { id: "1", name: "URINE MCS", quantity: 1, amount: "N 2,000.00" },
  ],
  "MSH/1096": [
    { id: "1", name: "Haematology /CBC", quantity: 1, amount: "N 7,500.00" },
  ],
  "MSH/1097": [
    { id: "1", name: "Blood Glucose", quantity: 1, amount: "N 4,500.00" },
  ],
  "MSH/1098": [
    {
      id: "1",
      name: "Liver Function Test (LFT)",
      quantity: 1,
      amount: "N 12,500.00",
    },
  ],
  "MSH/1099": [
    {
      id: "1",
      name: "Electrolytes & UREA",
      quantity: 1,
      amount: "N 8,500.00",
    },
  ],
  "PVT-200": [
    {
      id: "1",
      name: "Ultrasound Scan",
      quantity: 1,
      amount: "N 15,000.00",
    },
  ],
};

export const NURSE_RECORDS_BY_PATIENT: Record<string, NurseRecordEntry[]> = {
  "P-2025001": [
    {
      id: 1,
      time: "08:30 AM",
      report: "Patient stable. Samples collected for laboratory tests.",
      signedBy: "Nurse Titilayo",
    },
  ],
  "MSH/1090": [
    {
      id: 1,
      time: "07:15 AM",
      report: "Morning ward round completed. Urine sample pending.",
      signedBy: "Nurse Grace",
    },
  ],
};

export const INVESTIGATION_LOOKUP_OPTIONS = [
  "Haematology /CBC",
  "Blood Glucose",
  "Liver Function Test (LFT)",
  "Electrolytes & UREA",
  "Ultrasound Scan",
  "MP",
  "PCV",
  "FBC",
  "GENOTYPE",
  "LIPID PROFILE",
  "URINE MCS",
  "URINALYSIS",
  "HVS",
  "Chest X-Ray",
];
