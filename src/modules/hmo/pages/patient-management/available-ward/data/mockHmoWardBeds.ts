import {
  expandMockRecords,
  MOCK_HMO_LIST_TOTAL,
} from "@hmo/pages/shared/lib/pagination";

export type HmoWardBed = {
  id: string;
  wardName: string;
  bedNumber: string;
  amount: number;
  status: "AVAILABLE" | "OCCUPIED";
};

const WARD_NAMES = [
  "Children Ward",
  "General Male Ward 1",
  "General Female Ward",
  "Executive Room",
  "ICU Ward",
  "Maternity Ward",
];

const SEED: HmoWardBed[] = WARD_NAMES.flatMap((wardName, wardIndex) =>
  Array.from({ length: 4 }, (_, bedIndex) => ({
    id: `ward-${wardIndex + 1}-bed-${bedIndex + 1}`,
    wardName,
    bedNumber: `Bed ${bedIndex + 1}`,
    amount: 7500 + wardIndex * 2500,
    status: (bedIndex + wardIndex) % 3 === 0 ? "OCCUPIED" : "AVAILABLE",
  })),
) as HmoWardBed[];

export function buildMockHmoWardBeds(): HmoWardBed[] {
  return expandMockRecords(SEED, MOCK_HMO_LIST_TOTAL, (base, index) => ({
    ...base,
    id: `${base.id}-${index + 1}`,
    bedNumber: `Bed ${(index % 8) + 1}`,
    amount: base.amount + (index % 4) * 500,
    status: index % 3 === 0 ? "OCCUPIED" : "AVAILABLE",
  }));
}

export function formatHmoWardBedAmount(amount: number): string {
  return `N ${amount.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function getHmoWardBedStatusClass(
  status: HmoWardBed["status"],
): string {
  if (status === "AVAILABLE") {
    return "border border-[#00C851] bg-[#E6FAEE] text-[#00C851]";
  }
  return "border border-[#FA7401] bg-[#FFF1E6] text-[#FA7401]";
}
