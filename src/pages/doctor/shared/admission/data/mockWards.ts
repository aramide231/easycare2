export type WardOption = {
  id: string;
  name: string;
  occupiedBeds: number;
  totalBeds: number;
};

export const WARD_DEFINITIONS = [
  { id: "children-ward", name: "Children Ward" },
  { id: "children-ward-2", name: "Children Ward 2" },
  { id: "executive-room-1", name: "Executive Room 1" },
] as const;

export const ASSIGNABLE_WARDS: WardOption[] = [
  {
    id: "children-ward",
    name: "Children Ward",
    occupiedBeds: 3,
    totalBeds: 8,
  },
  {
    id: "children-ward-2",
    name: "Children Ward 2",
    occupiedBeds: 3,
    totalBeds: 8,
  },
  {
    id: "executive-room-1",
    name: "Executive Room 1",
    occupiedBeds: 1,
    totalBeds: 8,
  },
];
