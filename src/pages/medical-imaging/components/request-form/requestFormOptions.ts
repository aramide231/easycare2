export const DEPARTMENT_OPTIONS = [
  { value: "", label: "-- select department --" },
  { value: "IPD", label: "IPD" },
  { value: "OPD", label: "OPD" },
] as const;

export const PATIENT_TYPE_OPTIONS = [
  { value: "", label: "-- select patient type --" },
  { value: "in-patient", label: "In Patient" },
  { value: "out-patient", label: "Out Patient" },
] as const;

export type DepartmentForm = {
  department: string;
  phoneNumber: string;
  name: string;
};

export type PatientRequestForm = {
  patientType: string;
  uniqueId: string;
  name: string;
  phoneNumber: string;
  age: string;
  gender: string;
};

export const EMPTY_DEPARTMENT_FORM: DepartmentForm = {
  department: "",
  phoneNumber: "",
  name: "",
};

export const EMPTY_PATIENT_FORM: PatientRequestForm = {
  patientType: "",
  uniqueId: "",
  name: "",
  phoneNumber: "",
  age: "",
  gender: "",
};
