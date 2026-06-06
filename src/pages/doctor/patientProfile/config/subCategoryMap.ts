export type SubCategory = { label: string };

export const subCategoryMap: Record<string, SubCategory[]> = {
  "Ante Natal Care": [
    { label: "VITAL SIGNS" },
    { label: "PREVIOUS MEDICAL HISTORY" },
    { label: "FAMILY MEDICAL HISTORY" },
    { label: "NEW ANTENATAL BOOKING" },
    { label: "PREVIOUS PREGNANCY HISTORY" },
    { label: "PRESENTING COMPLAINTS" },
    { label: "PHYSICAL EXAMINATION" },
    { label: "DIAGNOSIS" },
    { label: "INVESTIGATION" },
    { label: "PROCEDURE" },
    { label: "MEDICATION" },
    { label: "FOLLOW-UP VISIT" },
  ],

  "Child Birth": [
    { label: "STAGE 1: LABOUR" },
    { label: "STAGE 2: PUSHING & BIRTHING" },
    { label: "STAGE 3: DELIVERY OF PLACENTA" },
    { label: "STAGE 4: DELIVERY NOTE" },
  ],

  "Family Planning": [],

  "Fertility Clinics": [],

  "Immunization": [
    { label: "VITAL SIGNS" },
    { label: "VACCINE ADMINISTRATION" },
    { label: "MEDICATION" },
    { label: "FOLLOW-UP" },
    { label: "CLINICAL NOTES" },
  ],

  "Gen Consult": [
    { label: "VITAL SIGNS" },
    { label: "PRESENTING COMPLAINTS" },
    { label: "PHYSICAL EXAMINATION" },
    { label: "DIAGNOSIS" },
    { label: "INVESTIGATION" },
    { label: "MEDICATION" },
    { label: "PROCEDURE" },
    { label: "REPORT WRITING" },
    { label: "IN-TAKE CHART" },
    { label: "OUTPUT CHART" },
    { label: "NURSING DISPENSES" },
    { label: "PHARMACY DISPENSE" },
  ],

  "Neo Natal Care": [
    { label: "VITAL SIGNS" },
    { label: "DIAGNOSIS" },
    { label: "INVESTIGATION" },
    { label: "PROCEDURE" },
    { label: "MEDICATION" },
  ],

  "Post Natal Care": [
    { label: "VITAL SIGNS" },
    { label: "PRESENTING COMPLAINTS" },
    { label: "PHYSICAL EXAMINATION" },
    { label: "INVESTIGATION" },
    { label: "MEDICATION" },
  ],

  "Specialist Consult": [
    { label: "PRESENTING COMPLAINTS" },
    { label: "PREVIOUS DENTAL HISTORY" },
    { label: "PREVIOUS DENTAL MEDICATION" },
  ],

  Surgical: [
    { label: "PRE-OPERATION NOTE" },
    { label: "POST-OPERATION NOTE" },
    { label: "POST-OPERATION ORDERS" },
  ],
};

export function getSubCategories(category: string | null): SubCategory[] {
  if (!category) return [];
  return subCategoryMap[category] ?? [];
}
