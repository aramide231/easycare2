export type DiagnosisOption = { value: string; label: string };

export const DIAGNOSIS_CATEGORY_OPTIONS: DiagnosisOption[] = [
  { value: "INFECTIOUS", label: "Infectious Disease" },
  { value: "CARDIOVASCULAR", label: "Cardiovascular" },
  { value: "RESPIRATORY", label: "Respiratory" },
  { value: "OBSTETRIC", label: "Obstetric & Gynecological" },
  { value: "ENDOCRINE", label: "Endocrine & Metabolic" },
  { value: "NEUROLOGICAL", label: "Neurological" },
  { value: "OTHER", label: "Other" },
];

export type DiagnosisLookupOption = DiagnosisOption & {
  diagnosisText: string;
};

export const DIAGNOSIS_LOOKUP_BY_CATEGORY: Record<
  string,
  DiagnosisLookupOption[]
> = {
  INFECTIOUS: [
    {
      value: "MALARIA_SEPSIS",
      label: "Malaria / Sepsis",
      diagnosisText: "?Malaria R/O Sepsis",
    },
    {
      value: "TYPHOID",
      label: "Typhoid Fever",
      diagnosisText: "?Typhoid Fever",
    },
    {
      value: "UTI",
      label: "Urinary Tract Infection",
      diagnosisText: "?Urinary Tract Infection",
    },
  ],
  CARDIOVASCULAR: [
    {
      value: "HYPERTENSION",
      label: "Hypertension",
      diagnosisText: "?Essential Hypertension",
    },
    {
      value: "HEART_FAILURE",
      label: "Heart Failure",
      diagnosisText: "?Congestive Heart Failure",
    },
  ],
  RESPIRATORY: [
    {
      value: "PNEUMONIA",
      label: "Pneumonia",
      diagnosisText: "?Community Acquired Pneumonia",
    },
    {
      value: "ASTHMA",
      label: "Asthma",
      diagnosisText: "?Bronchial Asthma",
    },
  ],
  OBSTETRIC: [
    {
      value: "ANTENATAL",
      label: "Antenatal Care",
      diagnosisText: "?Routine Antenatal Care",
    },
    {
      value: "PREECLAMPSIA",
      label: "Pre-eclampsia",
      diagnosisText: "?Pre-eclampsia",
    },
  ],
  ENDOCRINE: [
    {
      value: "DIABETES",
      label: "Diabetes Mellitus",
      diagnosisText: "?Diabetes Mellitus Type 2",
    },
  ],
  NEUROLOGICAL: [
    {
      value: "MIGRAINE",
      label: "Migraine",
      diagnosisText: "?Migraine without Aura",
    },
  ],
  OTHER: [
    {
      value: "UNSPECIFIED",
      label: "Unspecified Condition",
      diagnosisText: "?Unspecified Medical Condition",
    },
  ],
};

export const ICD_DIAGNOSIS_LOOKUP: DiagnosisLookupOption[] = [
  {
    value: "P373",
    label: "P373 Congenital falciparum malaria",
    diagnosisText: "P373 Congenital falciparum malaria",
  },
  {
    value: "B205_1",
    label: "B205 HIV disease clinical stage 1 associated with malaria",
    diagnosisText: "B205 HIV disease clinical stage 1 associated with malaria",
  },
  {
    value: "B205_2",
    label: "B205 HIV disease clinical stage 2 associated with malaria",
    diagnosisText: "B205 HIV disease clinical stage 2 associated with malaria",
  },
  {
    value: "B205_3",
    label: "B205 HIV disease clinical stage 3 associated with malaria",
    diagnosisText: "B205 HIV disease clinical stage 3 associated with malaria",
  },
  {
    value: "B205_4",
    label: "B205 HIV disease clinical stage 4 associated with malaria",
    diagnosisText: "B205 HIV disease clinical stage 4 associated with malaria",
  },
  {
    value: "B84",
    label: "B84 Malaria",
    diagnosisText: "B84 Malaria",
  },
  {
    value: "S823",
    label: "S823 ? Distal Tibial Fracture",
    diagnosisText: "S823 ? Distal Tibial Fracture",
  },
  {
    value: "B54",
    label: "B54 Unspecified malaria",
    diagnosisText: "B54 Unspecified malaria",
  },
  {
    value: "A41.9",
    label: "A41.9 Sepsis, unspecified organism",
    diagnosisText: "A41.9 Sepsis, unspecified organism",
  },
  {
    value: "J18.9",
    label: "J18.9 Pneumonia, unspecified",
    diagnosisText: "J18.9 Pneumonia, unspecified",
  },
  {
    value: "I10",
    label: "I10 Essential hypertension",
    diagnosisText: "I10 Essential hypertension",
  },
  {
    value: "E11.9",
    label: "E11.9 Type 2 diabetes mellitus",
    diagnosisText: "E11.9 Type 2 diabetes mellitus",
  },
];
