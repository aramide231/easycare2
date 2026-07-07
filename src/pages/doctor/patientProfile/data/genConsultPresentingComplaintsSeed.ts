import { mockDateTimeDaysAgo, formatSlashDate, dateAtDaysAgo } from "@/lib/dateTime";
import { CLINICIAN_COMPLAINT_HISTORY } from "../components/categories/genConsult/genConsultFieldOptions";

export const GEN_CONSULT_PRESENTING_COMPLAINTS_SEED = [
  {
    sn: 1,
    dateTime: mockDateTimeDaysAgo(3),
    patientType: "IN-PATIENT",
    complaintHistory: CLINICIAN_COMPLAINT_HISTORY,
    nurseComment: "Patient appears stable. Vitals within acceptable range.",
    enteredBy: "Nurse Titilayo",
  },
];
