export const SPECIMEN_TYPE_OPTIONS = [
  "ASPIRATE",
  "BLOOD",
  "C.S.F",
  "FAECES",
  "FNAC",
  "H.V.S/MCS",
  "NONE",
  "PAP SMEAR",
  "SEMEN",
  "STOOL",
  "SWAB (Throat)",
  "SWAB (Ear)",
  "SWAB (Eyes)",
  "SWAB (Urethra)",
  "SWAB (Nose)",
  "SWAB (Endocervical)",
  "TISSUE",
  "URINE (24 Hours)",
  "URINE MCS",
  "PUS",
] as const;

export const PARAMETER_TYPE_OPTIONS = [
  "BLOOD GLUCOSE",
  "CHLAMYDIA & GONORRHEA",
  "CLOTTOLOGY",
  "ELECTROLYTE & UREA",
  "FULL BLOOD COUNT",
  "HAEMATOLOGY / CBC",
  "HAEMATOLOGY SEROLOGY",
  "LIPID PROFILE",
  "LIVER PANCREAS",
  "MALARIA PARASITE",
  "MICROSCOPY",
  "URINALYSIS",
  "SEMENAL FLUID ANALYSIS",
  "STOOL MICROSCOPY",
] as const;

export const MALARIA_PARASITE_ROWS = [
  "S. TYPHI D",
  "S. TYPHI A",
  "S. TYPHI B",
  "S. TYPHI C",
  "MALARIA",
  "TYPHOID SCREENING",
] as const;

export const MAKE_REQUEST_PATIENT = {
  firstName: "Abiola",
  lastName: "Adebayo",
  patientId: "P-2025001",
  phone: "08012345678",
  email: "abiola.adebayo@email.com",
  gender: "Male",
  age: 31,
  maritalStatus: "Married",
  address: "12 Allen Avenue, Ikeja, Lagos",
  insuranceType: "HMO",
  providerName: "Leadway HMO",
  policyNumber: "LHM/2024/8891",
  employer: "7up Bottling Company",
  patientCategory: "Out-Patient",
  eligibility: "ACTIVE",
  facilityName: "St James Hospital",
  facilityAddress: "12 Hospital Road, Lagos",
  facilityPhone: "08012345678",
  facilityEmail: "info@stjameshospital.com",
  admissionDate: "20-May-2023",
  dischargeDate: "25-May-2023",
};

export const INVESTIGATION_FORM_DEFAULTS = {
  investigationType: "Laboratory",
  investigationName: "Malaria Parasite (MP)",
  /** When the investigation was requested (from the originating test request). */
  investigationRequestedAt: new Date("2026-07-16T08:35:00"),
};
