/** Front-desk queue for clinician visit today (mock). */
const QUEUED_FOR_CLINICIAN_TODAY = new Set([
  "P-2025001",
  "P-2025002",
]);

export function isQueuedForClinicianVisitToday(patientId: string): boolean {
  return QUEUED_FOR_CLINICIAN_TODAY.has(patientId);
}
