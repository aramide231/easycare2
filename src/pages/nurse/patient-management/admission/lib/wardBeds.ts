import type { AdmissionRecord } from "@/pages/nurse/patient-management/admission/data/mockAdmissions";
import type { WardBed } from "@/pages/nurse/patient-management/admission/data/mockWardBeds";
import { WARD_DEFINITIONS, type WardDefinition } from "@/pages/nurse/patient-management/admission/data/mockWards";

export const UNASSIGNED_WARD = "Not Yet Assigned";

export type WardBedStatus = "AVAILABLE" | "NOT AVAILABLE";

export type WardAvailability = WardDefinition & {
  occupiedBeds: number;
  availableBeds: number;
  patients: AdmissionRecord[];
  isFull: boolean;
};

export function getWardBedStatus(bed: WardBed): WardBedStatus {
  return bed.occupiedByAdmissionId === null ? "AVAILABLE" : "NOT AVAILABLE";
}

export function syncWardBedsWithAdmissions(
  beds: WardBed[],
  admissions: AdmissionRecord[]
): WardBed[] {
  const next = beds.map((bed) => ({ ...bed, occupiedByAdmissionId: null }));

  for (const admission of admissions) {
    if (admission.ward === UNASSIGNED_WARD) continue;

    if (admission.assignedBedId) {
      const assignedBed = next.find((bed) => bed.id === admission.assignedBedId);
      if (assignedBed && assignedBed.wardName === admission.ward) {
        assignedBed.occupiedByAdmissionId = admission.id;
        continue;
      }
    }

    const freeBed = next.find(
      (bed) =>
        bed.wardName === admission.ward && bed.occupiedByAdmissionId === null
    );

    if (freeBed) {
      freeBed.occupiedByAdmissionId = admission.id;
    }
  }

  return next;
}

export function syncAdmissionsWithBeds(
  admissions: AdmissionRecord[],
  beds: WardBed[]
): AdmissionRecord[] {
  return admissions.map((admission) => {
    if (admission.ward === UNASSIGNED_WARD) {
      return { ...admission, assignedBedId: null };
    }

    const occupiedBed = beds.find(
      (bed) => bed.occupiedByAdmissionId === admission.id
    );

    if (!occupiedBed) {
      return { ...admission, ward: UNASSIGNED_WARD, assignedBedId: null };
    }

    return {
      ...admission,
      ward: occupiedBed.wardName,
      assignedBedId: occupiedBed.id,
    };
  });
}

export function findAvailableBedInWard(
  beds: WardBed[],
  wardName: string
): WardBed | undefined {
  return beds.find(
    (bed) => bed.wardName === wardName && bed.occupiedByAdmissionId === null
  );
}

export function canAssignPatientToWard(
  beds: WardBed[],
  admission: AdmissionRecord,
  wardName: string
): boolean {
  if (admission.ward === wardName) return true;
  return Boolean(findAvailableBedInWard(beds, wardName));
}

export function buildWardAvailability(
  beds: WardBed[],
  wards: WardDefinition[],
  admissions: AdmissionRecord[]
): WardAvailability[] {
  const patientsByWard = new Map<string, AdmissionRecord[]>();

  for (const admission of admissions) {
    if (admission.ward === UNASSIGNED_WARD) continue;

    const patients = patientsByWard.get(admission.ward) ?? [];
    patients.push(admission);
    patientsByWard.set(admission.ward, patients);
  }

  return wards.map((ward) => {
    const wardBeds = beds.filter((bed) => bed.wardName === ward.name);
    const occupiedBeds = wardBeds.filter(
      (bed) => bed.occupiedByAdmissionId !== null
    ).length;
    const totalBeds = wardBeds.length;
    const availableBeds = Math.max(0, totalBeds - occupiedBeds);

    return {
      ...ward,
      totalBeds,
      occupiedBeds,
      availableBeds,
      patients: patientsByWard.get(ward.name) ?? [],
      isFull: totalBeds > 0 && availableBeds === 0,
    };
  });
}

export function assignAdmissionToWardBed(
  beds: WardBed[],
  admission: AdmissionRecord,
  wardName: string
): { beds: WardBed[]; assignedBedId: string | null; assigned: boolean } {
  if (!canAssignPatientToWard(beds, admission, wardName)) {
    return { beds, assignedBedId: null, assigned: false };
  }

  let nextBeds = beds.map((bed) =>
    bed.occupiedByAdmissionId === admission.id
      ? { ...bed, occupiedByAdmissionId: null }
      : bed
  );

  if (admission.ward === wardName && admission.assignedBedId) {
    const existingBed = nextBeds.find((bed) => bed.id === admission.assignedBedId);
    if (existingBed) {
      nextBeds = nextBeds.map((bed) =>
        bed.id === existingBed.id
          ? { ...bed, occupiedByAdmissionId: admission.id }
          : bed
      );
      return {
        beds: nextBeds,
        assignedBedId: existingBed.id,
        assigned: true,
      };
    }
  }

  const freeBed = findAvailableBedInWard(nextBeds, wardName);
  if (!freeBed) {
    return { beds, assignedBedId: null, assigned: false };
  }

  nextBeds = nextBeds.map((bed) =>
    bed.id === freeBed.id
      ? { ...bed, occupiedByAdmissionId: admission.id }
      : bed
  );

  return {
    beds: nextBeds,
    assignedBedId: freeBed.id,
    assigned: true,
  };
}

export function releaseAdmissionBed(
  beds: WardBed[],
  admissionId: number
): WardBed[] {
  return beds.map((bed) =>
    bed.occupiedByAdmissionId === admissionId
      ? { ...bed, occupiedByAdmissionId: null }
      : bed
  );
}

function parseBedNumber(bedNumber: string): number {
  const match = bedNumber.match(/\d+/);
  return match ? Number.parseInt(match[0], 10) : 0;
}

function getWardGroupOrder(wardNames: Iterable<string>): string[] {
  const knownOrder = WARD_DEFINITIONS.map((ward) => ward.name);
  const seen = new Set<string>();
  const ordered: string[] = [];

  for (const wardName of knownOrder) {
    seen.add(wardName);
    ordered.push(wardName);
  }

  for (const wardName of wardNames) {
    if (!seen.has(wardName)) {
      seen.add(wardName);
      ordered.push(wardName);
    }
  }

  return ordered;
}

/** Keeps existing ward groups together; beds within each ward sort high → low. */
export function sortWardBedsGrouped(beds: WardBed[]): WardBed[] {
  const byWard = new Map<string, WardBed[]>();

  for (const bed of beds) {
    const group = byWard.get(bed.wardName) ?? [];
    group.push(bed);
    byWard.set(bed.wardName, group);
  }

  const wardOrder = getWardGroupOrder(byWard.keys());
  const sorted: WardBed[] = [];

  for (const wardName of wardOrder) {
    const group = byWard.get(wardName);
    if (!group) continue;

    group.sort(
      (a, b) => parseBedNumber(b.bedNumber) - parseBedNumber(a.bedNumber),
    );
    sorted.push(...group);
  }

  return sorted;
}
