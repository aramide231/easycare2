export type SpecialistConsultType = {
  id: string;
  label: string;
  price: number;
};

export const SPECIALIST_CONSULT_TYPES: SpecialistConsultType[] = [
  { id: "dental", label: "Dental Consultation", price: 15000 },
];

export function formatConsultPrice(amount: number): string {
  return `N${amount.toLocaleString()}.00`;
}

export function getConsultTypeById(id: string | null): SpecialistConsultType | null {
  if (!id) return null;
  return SPECIALIST_CONSULT_TYPES.find((type) => type.id === id) ?? null;
}
