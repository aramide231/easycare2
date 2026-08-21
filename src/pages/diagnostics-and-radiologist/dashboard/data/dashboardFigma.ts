import type { DiagnosticsPatientRow, TreatmentType } from "./mockPatients";

export const DASHBOARD_SUMMARY = {
  outPatient: "50 new patients",
  inPatient: "15 patients",
  notifications: "10 messages",
} as const;

export const DASHBOARD_PATIENTS_LOG_TOTAL_PAGES = 70;

/** Side-panel overrides for Abiola (Figma Dashboard-001). */
export const PANEL_PATIENT_OVERRIDES = {
  patientId: 7,
  displayName: "Abiola Adebayo",
  displayPatientId: "P-2025001",
  gender: "Male",
  treatmentType: "COMPANY" as TreatmentType,
  address: "Lagos, Nigeria",
  medicationGuide: "Fee for Service",
  lastVisitDate: "21/02/2022",
  nextAppointment: "01/03/2025",
};

export type DashboardPanelPatient = DiagnosticsPatientRow & {
  panelDisplayName: string;
  panelPatientId: string;
};

export function getDashboardPanelPatient(
  patient: DiagnosticsPatientRow,
): DashboardPanelPatient {
  if (patient.id !== PANEL_PATIENT_OVERRIDES.patientId) {
    return {
      ...patient,
      panelDisplayName: `${patient.firstName} ${patient.lastName}`,
      panelPatientId: patient.patientId,
    };
  }

  return {
    ...patient,
    gender: PANEL_PATIENT_OVERRIDES.gender,
    treatmentType: PANEL_PATIENT_OVERRIDES.treatmentType,
    address: PANEL_PATIENT_OVERRIDES.address,
    medicationGuide: PANEL_PATIENT_OVERRIDES.medicationGuide,
    lastVisitDate: PANEL_PATIENT_OVERRIDES.lastVisitDate,
    nextAppointment: PANEL_PATIENT_OVERRIDES.nextAppointment,
    panelDisplayName: PANEL_PATIENT_OVERRIDES.displayName,
    panelPatientId: PANEL_PATIENT_OVERRIDES.displayPatientId,
  };
}
