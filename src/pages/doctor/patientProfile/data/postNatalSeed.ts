import { mockDateTimeDaysAgo, formatSlashDate, dateAtDaysAgo } from "@/lib/dateTime";
export const POST_NATAL_VITAL_SIGNS_SEED = [
  {
    sn: 1,
    dateTime: mockDateTimeDaysAgo(3),
    patientType: "IN-PATIENT",
    temperature: "25",
    bloodPressure: "120/80",
    bloodSugar: "125",
    weight: "120",
  },
  {
    sn: 2,
    dateTime: mockDateTimeDaysAgo(30),
    patientType: "OUT-PATIENT",
    temperature: "30",
    bloodPressure: "140/60",
    bloodSugar: "129",
    weight: "130",
  },
  {
    sn: 3,
    dateTime: mockDateTimeDaysAgo(60),
    patientType: "OUT-PATIENT",
    temperature: "36",
    bloodPressure: "130/45",
    bloodSugar: "137",
    weight: "90",
  },
];

export const POST_NATAL_COMPLAINTS_SEED = [
  {
    sn: 1,
    dateTime: mockDateTimeDaysAgo(3),
    patientType: "IN-PATIENT",
    complaint: "Normal blood pressure, Big Body.",
  },
  {
    sn: 2,
    dateTime: mockDateTimeDaysAgo(30),
    patientType: "OUT-PATIENT",
    complaint: "Normal blood pressure, Average heart size",
  },
  {
    sn: 3,
    dateTime: mockDateTimeDaysAgo(60),
    patientType: "OUT-PATIENT",
    complaint: "Normal blood pressure, Average kidney size.",
  },
];

export const POST_NATAL_PHYSICAL_EXAM_SEED = [
  {
    sn: 1,
    dateTime: mockDateTimeDaysAgo(3),
    patientType: "IN-PATIENT",
    general: "Normal blood pressure, Big Body.",
  },
  {
    sn: 2,
    dateTime: mockDateTimeDaysAgo(30),
    patientType: "OUT-PATIENT",
    general: "Normal blood pressure, Average heart size",
  },
  {
    sn: 3,
    dateTime: mockDateTimeDaysAgo(60),
    patientType: "OUT-PATIENT",
    general: "Normal blood pressure, Average kidney size.",
  },
];

export const POST_NATAL_INVESTIGATION_SEED = [
  {
    sn: 1,
    dateTime: mockDateTimeDaysAgo(3),
    patientType: "IN-PATIENT",
    investigationNames: "HVS",
    total: 4000,
    results: "Pending",
  },
];

export const POST_NATAL_MEDICATION_SEED = [
  {
    sn: 1,
    dateTime: mockDateTimeDaysAgo(3),
    patientType: "IN-PATIENT",
    medication: "VITAMIN A",
    drugForm: "TAB",
    dosage: "DLY",
  },
  {
    sn: 2,
    dateTime: mockDateTimeDaysAgo(30),
    patientType: "IN-PATIENT",
    medication: "VITAMIN A",
    drugForm: "TAB",
    dosage: "DLY",
  },
  {
    sn: 3,
    dateTime: mockDateTimeDaysAgo(60),
    patientType: "IN-PATIENT",
    medication: "VITAMIN A",
    drugForm: "TAB",
    dosage: "DLY",
  },
];
