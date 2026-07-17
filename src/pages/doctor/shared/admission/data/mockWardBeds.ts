import { WARD_DEFINITIONS } from "./mockWards";

export type WardBed = {
  id: string;
  wardName: string;
  bedNumber: string;
  amount: number;
  occupiedByPatientId: string | null;
};

export function formatWardBedAmount(amount: number): string {
  return `₦ ${amount.toLocaleString()}`;
}

export function getWardBedSearchLabel(bed: WardBed): string {
  return `${bed.wardName} ${bed.bedNumber}`.toLowerCase();
}

export function buildInitialWardBeds(): WardBed[] {
  const beds: WardBed[] = [];
  let counter = 1;

  for (const ward of WARD_DEFINITIONS) {
    for (let index = 1; index <= 4; index += 1) {
      beds.push({
        id: `ward-bed-${counter}`,
        wardName: ward.name,
        bedNumber: `Bed ${index}`,
        amount: 7000 + index * 500,
        occupiedByPatientId: null,
      });
      counter += 1;
    }
  }

  return beds;
}
