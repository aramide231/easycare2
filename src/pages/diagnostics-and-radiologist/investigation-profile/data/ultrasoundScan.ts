export const ULTRASOUND_SCAN_TYPES = [
  "ABDOMINAL",
  "ABDOMINO-PELVIC",
  "BREAST",
  "CARDIAC",
  "CHEST THORACIC",
  "CRANIA",
  "DOPPLER",
  "ECHOCARDIOGRAM",
  "EARLY OBSTETRICS",
  "NUCHAL TRANSLUCENCY",
  "SOFT TISSUE",
  "OBSTETRICS",
  "PELVIC",
  "PROSTRATE (TRANSRECTAL/TRANSABDOMINAL)",
  "RENAL",
  "TESTICULAR",
  "THYROID (NECK)",
  "TRANSCRANIA DOPPLER (TCD)",
  "TRANSVAGINAL",
  "VASCULAR",
] as const;

export type UltrasoundScanType = (typeof ULTRASOUND_SCAN_TYPES)[number];

export const ULTRASOUND_INVESTIGATION_NAME = "Ultrasound Scan";

export const OBSTETRIC_SCAN_TYPES = ["OBSTETRICS"] as const;

export const OBSTETRICS_ULTRASOUND_TITLE = "OBSTETRICS ULTRASOUND SCAN (USS)";

export function isObstetricUltrasoundType(scanType: string): boolean {
  return OBSTETRIC_SCAN_TYPES.includes(
    scanType as (typeof OBSTETRIC_SCAN_TYPES)[number],
  );
}

export const OBSTETRIC_SCAN_IMAGES = [
  {
    key: "cephalic",
    label: "CEPHALIC Presentation (Head-First)",
    shortLabel: "Cephalic",
    headerTitle: "CEPHALIC PRESENTATION (HEAD-FIRST)",
  },
  {
    key: "breech",
    label: "BREECH Presentation (Pelvis-First)",
    shortLabel: "Breech",
    headerTitle: "BREECH PRESENTATION (PELVIS-FIRST)",
  },
  {
    key: "transverse",
    label: "TRANSVERSE / OBLIQUE PRESENTATION (Shoulder)",
    shortLabel: "Transverse / Oblique",
    headerTitle: "TRANSVERSE / OBLIQUE PRESENTATION (SHOULDER)",
  },
] as const;

export type ObstetricScanImageKey = (typeof OBSTETRIC_SCAN_IMAGES)[number]["key"];

export function isBreastUltrasoundType(scanType: string): boolean {
  return scanType.trim().toUpperCase() === "BREAST";
}

export type BreastUltrasoundReport = {
  comment: string;
  impression: string;
  recommendation: string;
};

export const EMPTY_BREAST_ULTRASOUND_REPORT: BreastUltrasoundReport = {
  comment: "",
  impression: "",
  recommendation: "",
};

export const BREAST_ULTRASOUND_TITLE = "BREAST ULTRASOUND SCAN (USS)";

export function isScrotalUltrasoundType(scanType: string): boolean {
  const key = scanType.trim().toUpperCase();
  return key === "TESTICULAR" || key.includes("SCROTAL");
}

export type ScrotalUltrasoundReport = {
  leftTesticleMm: string;
  rightTesticleMm: string;
  comment: string;
  impression: string;
  recommendation: string;
};

export const EMPTY_SCROTAL_ULTRASOUND_REPORT: ScrotalUltrasoundReport = {
  leftTesticleMm: "",
  rightTesticleMm: "",
  comment: "",
  impression: "",
  recommendation: "",
};

export const SCROTAL_ULTRASOUND_TITLE = "SCROTAL ULTRASOUND SCAN (USS)";

export function isTransvaginalUltrasoundType(scanType: string): boolean {
  return scanType.trim().toUpperCase() === "TRANSVAGINAL";
}

export type TransvaginalUltrasoundReport = {
  comment: string;
  impression: string;
  recommendation: string;
};

export const EMPTY_TRANSVAGINAL_ULTRASOUND_REPORT: TransvaginalUltrasoundReport =
  {
    comment: "",
    impression: "",
    recommendation: "",
  };

export const TRANSVAGINAL_ULTRASOUND_TITLE =
  "TRANSVAGINAL ULTRASOUND SCAN (USS)";

export function isEarlyObstetricsUltrasoundType(scanType: string): boolean {
  return scanType.trim().toUpperCase() === "EARLY OBSTETRICS";
}

export const EARLY_OBSTETRICS_FETUS_OPTIONS = [
  "Singleton (1)",
  "Twins (2)",
  "Triplets (3)",
  "Deceplet (10)",
] as const;

export const EARLY_OBSTETRICS_PLACENTATION_OPTIONS = [
  "Cephalic",
  "Breech",
  "Transverse",
] as const;

export const EARLY_OBSTETRICS_GENDER_OPTIONS = ["Male", "Female"] as const;

export const EARLY_OBSTETRICS_EGA_OPTIONS = [
  "Alive",
  "No Cardiac Activity",
] as const;

export type EarlyObstetricsUltrasoundReport = {
  noOfFetuses: string;
  placentation: string;
  cardiacActivity: string;
  fetalBodyMovement: string;
  fetalLie: string;
  bpd: string;
  headCircumference: string;
  fetalHeartRate: string;
  femurLength: string;
  estimatedFetalWeight: string;
  abdominalCircumference: string;
  amnioticFluidIndex: string;
  estimatedDeliveryDate: string;
  estimatedGestationalAge: string;
  gender: string;
  liquorVolume: string;
  cervix: string;
  impression: string;
  recommendation: string;
};

export const EMPTY_EARLY_OBSTETRICS_REPORT: EarlyObstetricsUltrasoundReport = {
  noOfFetuses: "",
  placentation: "",
  cardiacActivity: "",
  fetalBodyMovement: "",
  fetalLie: "",
  bpd: "",
  headCircumference: "",
  fetalHeartRate: "",
  femurLength: "",
  estimatedFetalWeight: "",
  abdominalCircumference: "",
  amnioticFluidIndex: "",
  estimatedDeliveryDate: "",
  estimatedGestationalAge: "",
  gender: "",
  liquorVolume: "",
  cervix: "",
  impression: "",
  recommendation: "",
};

export const EARLY_OBSTETRICS_ULTRASOUND_TITLE =
  "EARLY OBSTETRICS ULTRASOUND SCAN (USS)";

export function isUltrasoundInvestigation(name: string): boolean {
  const key = name.trim().toLowerCase();
  return (
    key.includes("ultrasound") ||
    key.includes("ultra sound") ||
    key.includes("uss") ||
    ULTRASOUND_SCAN_TYPES.some((type) => type.toLowerCase() === key)
  );
}
