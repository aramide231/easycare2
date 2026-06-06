export const BOOKED_PATIENT_OPTIONS = [
  { value: "Booked", label: "Booked" },
  { value: "UnBooked", label: "UnBooked" },
];

export const CONTRACTION_INTENSITY_OPTIONS = [
  { value: "Mild", label: "Mild" },
  { value: "Moderate", label: "Moderate" },
  { value: "Severe", label: "Severe" },
];

export const PRESENTATION_OPTIONS = [
  {
    value: "Breech",
    label: "Breech - (Buttocks or Feet First)",
  },
  { value: "Cephalic", label: "Cephalic - (Head first)" },
  { value: "Transverse", label: "Transverse" },
];

export const DELIVERY_MODE_OPTIONS = [
  { value: "AVD", label: "Assisted Vaginal Delivery (AVD)" },
  { value: "C/S", label: "Cesarean Section (C/S)" },
  { value: "VD", label: "Vaginal Delivery (VD)" },
  { value: "VBAC", label: "Vaginal Birth After Cesarean (VBAC)" },
  { value: "Vacumm Delivery", label: "Vacumm Delivery" },
];

export const DELIVERY_MODE_STAGE4_OPTIONS = [
  { value: "Vaginal Delivery: Home Delivery", label: "Vaginal Delivery: Home Delivery" },
  {
    value: "Vaginal Delivery: Painless or Epidural-Assisted Delivery",
    label: "Vaginal Delivery: Painless or Epidural-Assisted Delivery",
  },
  { value: "Vaginal Delivery: Water Birth Delivery", label: "Vaginal Delivery: Water Birth Delivery" },
  { value: "Vaginal Delivery: VBAC", label: "Vaginal Delivery: VBAC" },
  { value: "Assisted Delivery: Forceps", label: "Assisted Delivery: Forceps" },
  { value: "Assisted Delivery: Vacuum Birth", label: "Assisted Delivery: Vacuum Birth" },
  {
    value: "Cesarean Section (C/S): Elective (Lower Segment)",
    label: "Cesarean Section (C/S): Elective (Lower Segment)",
  },
  {
    value: "Cesarean Section (C/S): Elective (Classical)",
    label: "Cesarean Section (C/S): Elective (Classical)",
  },
  {
    value: "Cesarean Section (C/S): Emergency (Lower Segment)",
    label: "Cesarean Section (C/S): Emergency (Lower Segment)",
  },
  {
    value: "Cesarean Section (C/S): Emergency (Classical)",
    label: "Cesarean Section (C/S): Emergency (Classical)",
  },
];

export const APGAR_OPTIONS = Array.from({ length: 11 }, (_, i) => ({
  value: String(i),
  label: String(i),
}));

export const GENDER_OPTIONS = [
  { value: "Female", label: "Female" },
  { value: "Male", label: "Male" },
];

export const PLACENTA_DELIVERY_OPTIONS = [
  { value: "Controlled Cord Traction", label: "Controlled Cord Traction" },
  { value: "Manual Removal of Placenta", label: "Manual Removal of Placenta" },
];

export const YES_NO_OPTIONS = [
  { value: "Yes", label: "Yes" },
  { value: "No", label: "No" },
];

export const PLACENTA_COMPLICATION_DETAIL_OPTIONS = [
  { value: "Partially Separated", label: "Partially Separated" },
  { value: "Retained Placenta", label: "Retained Placenta" },
];

export const HEMORRHAGE_INTERVENTION_OPTIONS = [
  { value: "Uterine Massage", label: "Uterine Massage" },
  { value: "Medications", label: "Medications" },
  { value: "IV fluids", label: "IV fluids" },
  { value: "Other", label: "Other" },
];

export const NO_OF_BABY_OPTIONS = [
  { value: "1 Baby", label: "1 Baby", count: 1 },
  { value: "Twins (2 babies)", label: "Twins (2 babies)", count: 2 },
  { value: "Triplets (3 babies)", label: "Triplets (3 babies)", count: 3 },
  { value: "Quadruplets (4 babies)", label: "Quadruplets (4 babies)", count: 4 },
  { value: "Quintuplets (5 babies)", label: "Quintuplets (5 babies)", count: 5 },
  { value: "Sextuplets (6 babies)", label: "Sextuplets (6 babies)", count: 6 },
  { value: "Septuplets (7 babies)", label: "Septuplets (7 babies)", count: 7 },
  { value: "Octuplets (8 babies)", label: "Octuplets (8 babies)", count: 8 },
  { value: "Nonuplets (9 babies)", label: "Nonuplets (9 babies)", count: 9 },
  { value: "Decaplets (10 babies)", label: "Decaplets (10 babies)", count: 10 },
];

export const IMMUNIZATION_AT_BIRTH_OPTIONS = [
  { value: "Yes", label: "Yes" },
  { value: "No", label: "No" },
];

export function babyCountFromSelection(value: string): number {
  return NO_OF_BABY_OPTIONS.find((o) => o.value === value)?.count ?? 1;
}
