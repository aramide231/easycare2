import { mockDateTimeDaysAgo, formatSlashDate, dateAtDaysAgo } from "@/lib/dateTime";
export const IMMUNIZATION_VITAL_SIGNS_SEED = [
  {
    sn: 1,
    dateTime: mockDateTimeDaysAgo(3),
    patientType: "IN-PATIENT",
    temperature: "25",
    bloodPressure: "120/80",
    weight: "120",
    height: "178",
  },
  {
    sn: 2,
    dateTime: mockDateTimeDaysAgo(30),
    patientType: "OUT-PATIENT",
    temperature: "30",
    bloodPressure: "140/60",
    weight: "130",
    height: "179",
  },
  {
    sn: 3,
    dateTime: mockDateTimeDaysAgo(60),
    patientType: "OUT-PATIENT",
    temperature: "36",
    bloodPressure: "130/45",
    weight: "90",
    height: "180",
  },
];

export const IMMUNIZATION_VACCINE_SEED = [
  {
    sn: 1,
    dateTime: mockDateTimeDaysAgo(3),
    patientType: "OPD",
    ageGrade: "30",
    vaccineType: "PENTAVALENT",
    dosage: "0.5 ML",
  },
  {
    sn: 2,
    dateTime: mockDateTimeDaysAgo(30),
    patientType: "OPD",
    ageGrade: "31",
    vaccineType: "OPV 1",
    dosage: "2 DROP",
  },
];

export const IMMUNIZATION_MEDICATION_SEED = [
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

export const IMMUNIZATION_FOLLOW_UP_SEED = [
  {
    sn: 1,
    dateTime: mockDateTimeDaysAgo(3),
    patientType: "OPD",
    appointmentDate: "02/08/2025",
    nurse: "TOBA AYO",
  },
  {
    sn: 2,
    dateTime: mockDateTimeDaysAgo(30),
    patientType: "IPD",
    appointmentDate: "27/10/2025",
    nurse: "TOBA AYO",
  },
  {
    sn: 3,
    dateTime: mockDateTimeDaysAgo(60),
    patientType: "OPD",
    appointmentDate: "20/01/26",
    nurse: "TOBA AYO",
  },
];

export const IMMUNIZATION_CLINICAL_NOTES_SEED = [
  {
    sn: 1,
    dateTime: mockDateTimeDaysAgo(3),
    patientType: "OPD",
    notes: "Patient tolerated vaccines well. No adverse reactions observed.",
  },
];
