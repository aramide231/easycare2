export const AGE_GRADE_OPTIONS = [
  { value: "AT_BIRTH", label: "At Birth" },
  { value: "6_WEEKS", label: "6 Weeks" },
  { value: "10_WEEKS", label: "10 Weeks" },
  { value: "14_WEEKS", label: "14 Weeks" },
  { value: "9_MONTHS", label: "9 Months" },
  { value: "12_MONTHS", label: "12 Months" },
  { value: "18_MONTHS", label: "18 Months" },
];

export const PERIOD_OPTIONS = [
  { value: "MORNING", label: "Morning" },
  { value: "AFTERNOON", label: "Afternoon" },
  { value: "EVENING", label: "Evening" },
];

export const VACCINE_TYPE_OPTIONS: Record<
  string,
  { dosage: string; route: string; site: string; price: number }
> = {
  PENTAVALENT: {
    dosage: "0.5 ml",
    route: "Intramuscular",
    site: "Left thigh",
    price: 700,
  },
  ROTAVIRUS: {
    dosage: "0.5 ml",
    route: "Intramuscular",
    site: "Left thigh",
    price: 2000,
  },
  "OPV 1": {
    dosage: "2 drops",
    route: "Oral",
    site: "Mouth",
    price: 1000,
  },
  BCG: {
    dosage: "0.05 ml",
    route: "Intradermal",
    site: "Left arm",
    price: 500,
  },
  MEASLES: {
    dosage: "0.5 ml",
    route: "Subcutaneous",
    site: "Right arm",
    price: 800,
  },
  "YELLOW FEVER": {
    dosage: "0.5 ml",
    route: "Subcutaneous",
    site: "Left arm",
    price: 1500,
  },
};

export const DOSAGE_OPTIONS = [
  { value: "0.5 ml", label: "0.5 ml" },
  { value: "2 drops", label: "2 drops" },
  { value: "0.05 ml", label: "0.05 ml" },
  { value: "1 ml", label: "1 ml" },
];

export const ROUTE_OPTIONS = [
  { value: "Intramuscular", label: "Intramuscular" },
  { value: "Oral", label: "Oral" },
  { value: "Intradermal", label: "Intradermal" },
  { value: "Subcutaneous", label: "Subcutaneous" },
];

export const SITE_OPTIONS = [
  { value: "Left thigh", label: "Left thigh" },
  { value: "Right thigh", label: "Right thigh" },
  { value: "Left arm", label: "Left arm" },
  { value: "Right arm", label: "Right arm" },
  { value: "Mouth", label: "Mouth" },
];

export const COMMENT_OPTIONS = [
  { value: "NORMAL", label: "Normal" },
  { value: "MILD_REACTION", label: "Mild reaction" },
  { value: "OBSERVATION", label: "Requires observation" },
  { value: "NONE", label: "None" },
];
