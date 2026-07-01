import { mockDateTimeDaysAgo, formatSlashDate, dateAtDaysAgo } from "@/lib/dateTime";
export const ANTE_NATAL_PMH_SEED = [
  {
    sn: 1,
    dateTime: mockDateTimeDaysAgo(3),
    patientType: "IN-PATIENT",
    heartDisease: "NO",
    hypertension: "NO",
    kidneyDisease: "NO",
  },
  {
    sn: 2,
    dateTime: mockDateTimeDaysAgo(30),
    patientType: "OUT-PATIENT",
    heartDisease: "NO",
    hypertension: "NO",
    kidneyDisease: "NO",
  },
];

export const ANTE_NATAL_FMH_SEED = [
  {
    sn: 1,
    dateTime: mockDateTimeDaysAgo(3),
    patientType: "IN-PATIENT",
    birthDefect: "NO",
    hypertension: "NO",
    geneticDisorder: "NO",
  },
  {
    sn: 2,
    dateTime: mockDateTimeDaysAgo(30),
    patientType: "OUT-PATIENT",
    birthDefect: "NO",
    hypertension: "NO",
    geneticDisorder: "NO",
  },
];

export const ANTE_NATAL_BOOKING_SEED = [
  {
    sn: 1,
    dateTime: mockDateTimeDaysAgo(3),
    patientType: "IN-PATIENT",
    bloodGroup: "AB+",
    genotype: "AA",
    anyDischarge: "NO",
    lastMenstrualPeriod: formatSlashDate(dateAtDaysAgo(90)),
  },
  {
    sn: 2,
    dateTime: mockDateTimeDaysAgo(30),
    patientType: "OUT-PATIENT",
    bloodGroup: "AB-",
    genotype: "AB",
    anyDischarge: "YES",
    lastMenstrualPeriod: "02/02/2021",
  },
];

export const ANTE_NATAL_PREGNANCY_SEED = [
  {
    sn: 1,
    dateTime: mockDateTimeDaysAgo(3),
    patientType: "IN-PATIENT",
    totalGP: "G4P3",
    livingChildren: "3",
    dateOfBirth: "03/05/2010",
  },
  {
    sn: 2,
    dateTime: mockDateTimeDaysAgo(30),
    patientType: "OUT-PATIENT",
    totalGP: "G4P2",
    livingChildren: "1",
    dateOfBirth: "03/05/2011",
  },
  {
    sn: 3,
    dateTime: mockDateTimeDaysAgo(60),
    patientType: "OUT-PATIENT",
    totalGP: "G4P4",
    livingChildren: "2",
    dateOfBirth: "03/05/2012",
  },
];

export const ANTE_NATAL_FOLLOW_UP_SEED = [
  {
    sn: 1,
    dateTime: mockDateTimeDaysAgo(3),
    patientType: "IN-PATIENT",
    ega: "28 weeks",
    heightOfFundus: "120/80",
    presentationPosition: "120",
  },
  {
    sn: 2,
    dateTime: mockDateTimeDaysAgo(30),
    patientType: "OUT-PATIENT",
    ega: "32 weeks",
    heightOfFundus: "140/60",
    presentationPosition: "130",
  },
];

export const ANTE_NATAL_PRESENTING_COMPLAINTS_SEED = [
  {
    sn: 1,
    dateTime: mockDateTimeDaysAgo(3),
    patientType: "IN-PATIENT",
    complaint: "Nausea and mild abdominal discomfort at 12 weeks gestation.",
    enteredBy: "Dr. Adebayo",
  },
  {
    sn: 2,
    dateTime: mockDateTimeDaysAgo(30),
    patientType: "OUT-PATIENT",
    complaint: "Routine antenatal visit — no acute complaints.",
    enteredBy: "Dr. Okafor",
  },
];
