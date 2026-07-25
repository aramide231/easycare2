export type DischargeRemark =
  | "Absconded"
  | "Discharged"
  | "DAMA"
  | "Referred"
  | "Deceased";

export type DischargedPatientRecord = {
  id: number;
  name: string;
  patientId: string;
  phoneNumber: string;
  gender: string;
  patientType: string;
  age: number;
  dateOfAdmission: string;
  timeOfAdmission: string;
  remark: DischargeRemark;
  dischargeDate: string;
  dischargeTime: string;
  noOfDays: string;
  dischargedBy: string;
};
