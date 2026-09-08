export type BloodGlucoseTest = {
  key: string;
  label: string;
  refValues: string;
};

export type OgttRow = {
  key: string;
  label: string;
};

/** Blood Glucose tests from investigation PDF. */
export const BLOOD_GLUCOSE_TESTS: BloodGlucoseTest[] = [
  {
    key: "twoHrPp",
    label: "2hr.p.p",
    refValues: "Ref. Values {80 - 150mg/dl}",
  },
  {
    key: "fasting",
    label: "Fasting",
    refValues: "Ref. Values {70 - 110mg/dl}",
  },
  {
    key: "random",
    label: "Random",
    refValues: "Ref. Values {80 - 150mg/dl}",
  },
  {
    key: "hbaic",
    label: "HBAIC",
    refValues: "Ref. Values {Up to 6.5%}",
  },
];

export const OGTT_ROWS: OgttRow[] = [
  { key: "fasting", label: "Fasting" },
  { key: "oneHr", label: "1Hr" },
  { key: "twoHr", label: "2Hr" },
];

export const BLOOD_GLUCOSE_SPECIMEN_OPTIONS = [
  "Whole Blood (Fluoride)",
  "Plasma (Fluoride)",
  "Serum",
  "Capillary Blood",
];

export const BLOOD_GLUCOSE_PARAMETER_OPTIONS = [
  "Fasting Blood Glucose",
  "Random Blood Glucose",
  "2hr Post-Prandial",
  "HBA1C",
  "OGTT",
  "Full Blood Glucose Panel",
];

export const BLOOD_GLUCOSE_INVESTIGATION_NAME = "Blood Glucose";

export function isBloodGlucoseInvestigation(name: string): boolean {
  const key = name.trim().toLowerCase();
  return (
    key.includes("blood glucose") ||
    key.includes("blood sugar") ||
    key === "fbs" ||
    key === "rbs" ||
    key === "ogtt" ||
    key === "hba1c" ||
    key === "hbaic"
  );
}

export type BloodGlucoseResultValues = Record<string, string>;

export const EMPTY_BLOOD_GLUCOSE_VALUES: BloodGlucoseResultValues = {
  twoHrPp: "",
  fasting: "",
  random: "",
  hbaic: "",
  ogttFastingTime: "",
  ogttFastingResult: "",
  ogttOneHrTime: "",
  ogttOneHrResult: "",
  ogttTwoHrTime: "",
  ogttTwoHrResult: "",
};
