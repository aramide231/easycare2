/** Fixed dropdown options for categorical vital sign fields. */

export type VitalFieldOption = { value: string; label: string };

export const VITAL_COMMENT_OPTIONS: VitalFieldOption[] = [
  { value: "HYPERTENSION", label: "Hypertension" },
  { value: "HYPOTENSION", label: "Hypotension" },
];

export const BLOOD_SUGAR_OPTIONS: VitalFieldOption[] = [
  { value: "NORMAL", label: "Normal" },
  { value: "HIGH", label: "High" },
  { value: "LOW", label: "Low" },
  { value: "NOT_DONE", label: "Not Done" },
];

export const PULSE_RATE_OPTIONS: VitalFieldOption[] = [
  { value: "40", label: "40 bpm" },
  { value: "45", label: "45 bpm" },
  { value: "50", label: "50 bpm" },
  { value: "55", label: "55 bpm" },
  { value: "60", label: "60 bpm" },
  { value: "65", label: "65 bpm" },
  { value: "70", label: "70 bpm" },
  { value: "72", label: "72 bpm" },
  { value: "75", label: "75 bpm" },
  { value: "80", label: "80 bpm" },
  { value: "85", label: "85 bpm" },
  { value: "90", label: "90 bpm" },
  { value: "95", label: "95 bpm" },
  { value: "100", label: "100 bpm" },
  { value: "105", label: "105 bpm" },
  { value: "110", label: "110 bpm" },
  { value: "120", label: "120 bpm" },
  { value: "130", label: "130 bpm" },
  { value: "140", label: "140 bpm" },
  { value: "150", label: "150 bpm" },
  { value: "NOT_RECORDED", label: "Not Recorded" },
];

export const RESPIRATION_OPTIONS: VitalFieldOption[] = [
  { value: "BRADYPNEA", label: "Bradypnea (<12 bpm)" },
  { value: "NORMAL", label: "Normal (12–20 bpm)" },
  { value: "TACHYPNEA", label: "Tachypnea (>20 bpm)" },
  { value: "NOT_RECORDED", label: "Not Recorded" },
];

export const URINALYSIS_OPTIONS: VitalFieldOption[] = [
  { value: "NEGATIVE", label: "Negative" },
  { value: "TRACE", label: "Trace" },
  { value: "ONE_PLUS", label: "+ (1+)" },
  { value: "TWO_PLUS", label: "++ (2+)" },
  { value: "THREE_PLUS", label: "+++ (3+)" },
  { value: "NOT_DONE", label: "Not Done" },
];

export const SPO2_OPTIONS: VitalFieldOption[] = [
  { value: "GE_98", label: "≥98%" },
  { value: "95_97", label: "95–97%" },
  { value: "90_94", label: "90–94%" },
  { value: "LT_90", label: "<90%" },
  { value: "NOT_RECORDED", label: "Not Recorded" },
];

export const FHR_OPTIONS: VitalFieldOption[] = [
  { value: "NORMAL", label: "Normal (110–160 bpm)" },
  { value: "BRADYCARDIA", label: "Bradycardia (<110 bpm)" },
  { value: "TACHYCARDIA", label: "Tachycardia (>160 bpm)" },
  { value: "NOT_DETECTED", label: "Not Detected" },
  { value: "NOT_RECORDED", label: "Not Recorded" },
];

/** Only Comments uses a dropdown in vital signs. */
export const VITAL_DROPDOWN_FIELD_OPTIONS: Record<string, VitalFieldOption[]> =
  {
    comment: VITAL_COMMENT_OPTIONS,
  };

