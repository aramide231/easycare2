import { mockDateTimeDaysAgo, formatSlashDate, dateAtDaysAgo } from "@/lib/dateTime";
export const SURGICAL_PRE_OP_SEED = [
  {
    sn: 1,
    dateTime: mockDateTimeDaysAgo(3),
    patientType: "IN-PATIENT",
    preOpHB: "12.5",
    genotype: "AA",
    hiv: "Negative (-)",
    hepatitis: "Negative (-)",
  },
];

export const SURGICAL_POST_OP_NOTE_SEED = [
  {
    sn: 1,
    dateTime: mockDateTimeDaysAgo(3),
    patientType: "IN-PATIENT",
    surgeon: "Dr. Chibuzo Alen",
    assistant: "Dr. Adebayo",
    circulatingNurse: "Nurse Toba",
    anaesthetist: "Dr. Smith",
  },
];

export const SURGICAL_POST_OP_ORDERS_SEED = [
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
