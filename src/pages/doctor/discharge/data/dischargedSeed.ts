import type { DischargedPatientRecord } from "@doctor-shared/discharge/data/mockDischargedPatients";
import { calculateAdmissionDays } from "@doctor-shared/admission/lib/calculateAdmissionDays";

const RAW_DISCHARGED_SEED: Omit<DischargedPatientRecord, "noOfDays">[] = [
  {
    id: 9001,
    name: "Alade Abiodun Area",
    patientId: "MSH/1088",
    phoneNumber: "08012345678",
    gender: "Female",
    patientType: "HMO",
    age: 25,
    dateOfAdmission: "01-Oct-2026",
    timeOfAdmission: "08:00 AM",
    remark: "Discharged",
    dischargeDate: "03-Oct-2026",
    dischargeTime: "02:00 PM",
    dischargedBy: "Dr. Easy Test",
  },
  {
    id: 9002,
    name: "Ada Okafor",
    patientId: "MSH/1089",
    phoneNumber: "08023456789",
    gender: "Female",
    patientType: "PRIVATE",
    age: 22,
    dateOfAdmission: "18-Feb-2026",
    timeOfAdmission: "11:45 AM",
    remark: "Discharged",
    dischargeDate: "24-Feb-2026",
    dischargeTime: "09:15 AM",
    dischargedBy: "Dr. Easy Test",
  },
  {
    id: 9003,
    name: "Chioma Bello",
    patientId: "MSH/1090",
    phoneNumber: "08034567890",
    gender: "Female",
    patientType: "COMPANY",
    age: 20,
    dateOfAdmission: "19-Feb-2026",
    timeOfAdmission: "3:30 PM",
    remark: "DAMA",
    dischargeDate: "23-Feb-2026",
    dischargeTime: "2:10 PM",
    dischargedBy: "Dr. Jane Doe",
  },
  {
    id: 9004,
    name: "Fatima Musa",
    patientId: "MSH/1091",
    phoneNumber: "08045678901",
    gender: "Female",
    patientType: "STAFF",
    age: 32,
    dateOfAdmission: "15-Feb-2026",
    timeOfAdmission: "9:00 AM",
    remark: "Referred",
    dischargeDate: "22-Feb-2026",
    dischargeTime: "4:30 PM",
    dischargedBy: "Dr. Easy Test",
  },
];

export const DOCTOR_DISCHARGED_SEED: DischargedPatientRecord[] =
  RAW_DISCHARGED_SEED.map((row) => ({
    ...row,
    noOfDays: calculateAdmissionDays(
      row.dateOfAdmission,
      row.dischargeDate,
      row.timeOfAdmission,
      row.dischargeTime
    ),
  }));
