import { mockDateTimeDaysAgo } from "@/lib/dateTime";

export const PRESENTING_COMPLAINTS_SEED = [
  {
    sn: 1,
    dateTime: mockDateTimeDaysAgo(3),
    patientType: "IN-PATIENT",
    complaint: "General body pains and slight fever for the past three days.",
    enteredBy: "Dr. Adebayo",
  },
];
