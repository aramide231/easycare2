export type WardDefinition = {
  id: string;
  name: string;
  totalBeds: number;
};

export const WARD_DEFINITIONS: WardDefinition[] = [
  { id: "children-ward", name: "Children Ward", totalBeds: 8 },
  { id: "executive-room-1", name: "Executive Room 1", totalBeds: 4 },
  { id: "general-male-ward-1", name: "General Male Ward 1", totalBeds: 8 },
  { id: "semi-private-ward-1", name: "Semi Private Ward 1", totalBeds: 6 },
  { id: "female-ward", name: "Female Ward", totalBeds: 6 },
  { id: "icu", name: "ICU", totalBeds: 4 },
];

/** Wards nurses can assign during admission. */
export const ASSIGNABLE_WARDS = WARD_DEFINITIONS;

export const WARD_BED_PRICING: Record<string, number> = {
  "Children Ward": 7500,
  "Executive Room 1": 30000,
  "General Male Ward 1": 7500,
  "Semi Private Ward 1": 10000,
  "Female Ward": 8000,
  ICU: 50000,
};
