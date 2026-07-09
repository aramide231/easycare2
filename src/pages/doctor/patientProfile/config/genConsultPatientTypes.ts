export type GenConsultPatientTypeId =
  | "out-patient"
  | "opd-review"
  | "in-patient"
  | "ward-round";

export type GenConsultPatientTypeOption = {
  id: GenConsultPatientTypeId;
  label: string;
  description: string;
};

export const GEN_CONSULT_PATIENT_TYPES: GenConsultPatientTypeOption[] = [
  {
    id: "out-patient",
    label: "Out-Patient",
    description: "queued patients for clinical visit",
  },
  {
    id: "opd-review",
    label: "OPD Review",
    description: "post-diagnostic consultation on investigations",
  },
  {
    id: "in-patient",
    label: "In-Patient",
    description: "officially admitted to the hospital",
  },
  {
    id: "ward-round",
    label: "Ward Round",
    description: "clinical evaluation conducted at patient's bedside",
  },
];

export function getGenConsultPatientTypeById(
  id: GenConsultPatientTypeId | null
): GenConsultPatientTypeOption | null {
  if (!id) return null;
  return GEN_CONSULT_PATIENT_TYPES.find((option) => option.id === id) ?? null;
}

/** Table column value per spec: options 1 & 3 → Out-Patient; 2 & 4 → In-Patient. */
export function resolveGenConsultRecordPatientType(
  patientTypeId: GenConsultPatientTypeId | null
): string {
  if (!patientTypeId) return "IN-PATIENT";
  if (patientTypeId === "out-patient" || patientTypeId === "in-patient") {
    return "Out-Patient";
  }
  return "In-Patient";
}

export function shouldShowGenConsultConsultationType(
  patientTypeId: GenConsultPatientTypeId | null
): boolean {
  return patientTypeId === "out-patient" || patientTypeId === "in-patient";
}

export function isAdmittedInPatientType(
  patientTypeId: GenConsultPatientTypeId | null
): boolean {
  return patientTypeId === "in-patient";
}
