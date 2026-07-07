export const CONSULTATION_TYPE_OPTIONS = [
  { value: "Dental Consultation", label: "Dental Consultation", price: 15000 },
  {
    value: "Dental Consultation (Review)",
    label: "Dental Consultation (Review)",
    price: 7500,
  },
  { value: "ENT Consultation", label: "ENT Consultation", price: 7000 },
  {
    value: "ENT Consultation (Review)",
    label: "ENT Consultation (Review)",
    price: 4500,
  },
];

export const YES_NO_OPTIONS = [
  { value: "Yes", label: "Yes" },
  { value: "No", label: "No" },
];

export function consultationPrice(type: string): number {
  return (
    CONSULTATION_TYPE_OPTIONS.find((o) => o.value === type)?.price ?? 0
  );
}
