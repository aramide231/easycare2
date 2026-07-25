import {
  WARD_BED_PRICING,
  WARD_DEFINITIONS,
} from "@hmo/vendor/admission/data/mockWards";

export type WardBed = {
  id: string;
  wardName: string;
  bedNumber: string;
  amount: number;
  occupiedByAdmissionId: number | null;
};

export function buildMockWardBeds(): WardBed[] {
  const beds: WardBed[] = [];

  for (const ward of WARD_DEFINITIONS) {
    const amount = WARD_BED_PRICING[ward.name] ?? 7500;

    for (let index = 1; index <= ward.totalBeds; index += 1) {
      beds.push({
        id: `${ward.id}-bed-${index}`,
        wardName: ward.name,
        bedNumber: `Bed ${index}`,
        amount,
        occupiedByAdmissionId: null,
      });
    }
  }

  return beds;
}

export function formatWardBedAmount(amount: number): string {
  return `N ${amount.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function getWardBedSearchLabel(bed: WardBed): string {
  return `${bed.wardName} ${bed.bedNumber}`.toLowerCase();
}
