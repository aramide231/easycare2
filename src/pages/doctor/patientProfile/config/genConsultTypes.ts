export type GenConsultConsultationType = {
  id: string;
  label: string;
  price: number;
};

export const GEN_CONSULT_CONSULTATION_TYPES: GenConsultConsultationType[] = [
  {
    id: "family-physician-first",
    label: "Family Physician (First Visit)",
    price: 5000,
  },
  {
    id: "family-physician-follow-up",
    label: "Family Physician (Follow Up)",
    price: 3000,
  },
  {
    id: "general-practice-review",
    label: "General Practice Review",
    price: 2500,
  },
  {
    id: "internal-medicine-first",
    label: "Internal Medicine (First Visit)",
    price: 7500,
  },
];

export function getGenConsultTypeById(
  id: string | null
): GenConsultConsultationType | null {
  if (!id) return null;
  return GEN_CONSULT_CONSULTATION_TYPES.find((type) => type.id === id) ?? null;
}
