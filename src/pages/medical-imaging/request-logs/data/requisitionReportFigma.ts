export type RequisitionPatientType = "Out Patient" | "In Patient" | "Department";

export type RequisitionLogRow = {
  id: number;
  dateTime: string;
  name: string;
  phoneNumber: string;
  gender?: string;
  patientType: RequisitionPatientType;
  amount: string;
  staffName: string;
  staffPhone: string;
};

/** Requisition Logs — (Requisition) Report frame (6 rows). */
export const REQUISITION_LOG_ROWS: RequisitionLogRow[] = [
  {
    id: 1,
    dateTime: "15/01/2025 10.00am",
    name: "ALADE ABIODUN",
    phoneNumber: "0806025311",
    gender: "Male",
    patientType: "Out Patient",
    amount: "50,000",
    staffName: "Sample Tester",
    staffPhone: "0802026128",
  },
  {
    id: 2,
    dateTime: "15/01/2025 10.00am",
    name: "ALADE ABIODUN",
    phoneNumber: "0806025311",
    gender: "Male",
    patientType: "Department",
    amount: "3,000",
    staffName: "Sample Tester",
    staffPhone: "0802026128",
  },
  {
    id: 3,
    dateTime: "15/01/2025 10.00am",
    name: "ALADE ABIODUN",
    phoneNumber: "0806025311",
    gender: "Male",
    patientType: "Out Patient",
    amount: "20,000",
    staffName: "Sample Tester",
    staffPhone: "0802026128",
  },
  {
    id: 4,
    dateTime: "15/01/2025 10.00am",
    name: "ALADE ABIODUN",
    phoneNumber: "0806025311",
    gender: "Male",
    patientType: "Department",
    amount: "3,000",
    staffName: "Sample Tester",
    staffPhone: "0802026128",
  },
  {
    id: 5,
    dateTime: "15/01/2025 10.00am",
    name: "ALADE ABIODUN",
    phoneNumber: "0806025311",
    gender: "Male",
    patientType: "In Patient",
    amount: "3,000",
    staffName: "Sample Tester",
    staffPhone: "0802026128",
  },
  {
    id: 6,
    dateTime: "15/01/2025 10.00am",
    name: "ALADE ABIODUN",
    phoneNumber: "0806025311",
    gender: "Male",
    patientType: "Out Patient",
    amount: "50,000",
    staffName: "Sample Tester",
    staffPhone: "0802026128",
  },
];

export const REQUISITION_DEFAULT_RANGE = {
  startDate: new Date(2025, 0, 15),
  endDate: new Date(2025, 0, 15),
};
