import { mockDateTimeDaysAgo, formatSlashDate, dateAtDaysAgo } from "@/lib/dateTime";
export const CHILD_BIRTH_STAGE1_SEED = [
  {
    sn: 1,
    dateTime: "15-Feb-2022",
    patientType: "Booked",
    intensity: "Mild",
    cervicalDilatation: "120",
    presentation: "Transverse",
  },
  {
    sn: 2,
    dateTime: "16-Feb-2022",
    patientType: "UnBooked",
    intensity: "Moderate",
    cervicalDilatation: "130",
    presentation: "Cephalic",
  },
];

export const CHILD_BIRTH_STAGE2_SEED = [
  {
    sn: 1,
    dateTime: mockDateTimeDaysAgo(3),
    cervicalDilatation: "120",
    deliveryMode: "AVD",
    apgarScore: "4",
    babyGender: "Male",
  },
  {
    sn: 2,
    dateTime: mockDateTimeDaysAgo(3),
    cervicalDilatation: "130",
    deliveryMode: "Vacumm Delivery",
    apgarScore: "10",
    babyGender: "Female",
  },
];

export const CHILD_BIRTH_STAGE3_SEED = [
  {
    sn: 1,
    placentaDelivery: "Controlled Cord Traction",
    placentaComplications: "No",
    estimatedBloodLoss: "100",
  },
  {
    sn: 2,
    placentaDelivery: "Manual Removal of Placenta",
    placentaComplications: "Yes, Retained Placenta",
    estimatedBloodLoss: "150",
  },
];

export const CHILD_BIRTH_STAGE4_SEED = [
  {
    sn: 1,
    dateTime: mockDateTimeDaysAgo(3),
    deliveryMode: "Vaginal Delivery: Home Delivery",
    noOfBaby: "1 Baby",
    babyWeights: "3.5",
  },
  {
    sn: 2,
    dateTime: mockDateTimeDaysAgo(3),
    deliveryMode: "Cesarean Section (C/S): Emergency (Classical)",
    noOfBaby: "Triplets (3 babies)",
    babyWeights: "4.5, 3.2, 3.0",
  },
];
