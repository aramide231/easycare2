// src/types/patient.ts

export type PatientData = {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  email?: string;
  phone?: string;
  maritalStatus?: string;
  dob?: string;
  age?: string;
  religion?: string;
  picture?: File | null;
  patientType?: string;
  insuranceProvider?: string;
  insuranceGroupNumber?: string;
  patientId?: string;
  insurancePolicyNumber?: string;
  employerName?: string;
  treatmentGuide?: string;
  planType?: string;
  eligibility?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelationship?: string;
};
