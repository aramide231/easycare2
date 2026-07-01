import { mockDateTimeDaysAgo, formatSlashDate, dateAtDaysAgo } from "@/lib/dateTime";
export const NEO_NATAL_VITAL_SIGNS_SEED = [
  {
    sn: 1,
    dateTime: mockDateTimeDaysAgo(3),
    patientType: "IN-PATIENT",
    temperature: "25",
    weight: "120",
    pulseRate: "72",
    respiratory: "12",
    spo2: "182",
  },
  {
    sn: 2,
    dateTime: mockDateTimeDaysAgo(30),
    patientType: "OUT-PATIENT",
    temperature: "30",
    weight: "130",
    pulseRate: "75",
    respiratory: "12",
    spo2: "182",
  },
  {
    sn: 3,
    dateTime: mockDateTimeDaysAgo(60),
    patientType: "OUT-PATIENT",
    temperature: "36",
    weight: "90",
    pulseRate: "73",
    respiratory: "12",
    spo2: "182",
  },
];

export const NEO_NATAL_DIAGNOSIS_SEED = [
  {
    sn: 1,
    dateTime: mockDateTimeDaysAgo(3),
    patientType: "OUT-PATIENT",
    diagnosis: "?Malaria R/O Sepsis",
    doctor: "Dr. Chibuzo Alen",
  },
];

export const NEO_NATAL_INVESTIGATION_SEED = [
  {
    sn: 1,
    dateTime: mockDateTimeDaysAgo(3),
    patientType: "OUT-PATIENT",
    investigationNames: "HVS",
    total: 4000,
    results: "Pending",
  },
];

export const NEO_NATAL_PROCEDURE_SEED = [
  {
    sn: 1,
    dateTime: mockDateTimeDaysAgo(3),
    patientType: "IN-PATIENT",
    procedureNames: "OXYGEN THERAPY",
    total: 3000,
    remarks: "Completed",
    doctor: "Dr. Chibuzo Alen",
  },
];

export const NEO_NATAL_MEDICATION_SEED = [
  {
    sn: 1,
    dateTime: mockDateTimeDaysAgo(3),
    patientType: "IN-PATIENT",
    medication: "VITAMIN A",
    drugForm: "TAB",
    dosage: "DLY",
    duration: "3",
    period: "DAYS",
  },
];
