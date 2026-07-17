import type { AdmissionRecord } from "../data/mockAdmissions";
import type { WardBed } from "../data/mockWardBeds";

export type WardBedStatus = "AVAILABLE" | "NOT AVAILABLE";

export function getWardBedStatus(bed: WardBed): WardBedStatus {
  return bed.occupiedByPatientId ? "NOT AVAILABLE" : "AVAILABLE";
}

export function syncWardBedsWithAdmissions(
  beds: WardBed[],
  admissions: AdmissionRecord[]
): WardBed[] {
  const occupied = new Map<string, string>();

  for (const admission of admissions) {
    if (!admission.ward || admission.ward === "Not Yet Assigned") continue;

    const exact = beds.find((bed) => {
      if (occupied.has(bed.id)) return false;
      const label = `${bed.wardName} - ${bed.bedNumber}`;
      return label === admission.ward || `${bed.wardName} / ${bed.bedNumber}` === admission.ward;
    });

    if (exact) {
      occupied.set(exact.id, admission.patientId);
      continue;
    }

    const wardBed = beds.find(
      (bed) => !occupied.has(bed.id) && bed.wardName === admission.ward
    );

    if (wardBed) {
      occupied.set(wardBed.id, admission.patientId);
    }
  }

  return beds.map((bed) => ({
    ...bed,
    occupiedByPatientId: occupied.get(bed.id) ?? null,
  }));
}
