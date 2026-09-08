export type ElectrolytesParameter = {
  key: string;
  label: string;
  refValues: string;
};

export type ElectrolytesParameterRow = {
  left: ElectrolytesParameter;
  right: ElectrolytesParameter;
};

export const ELECTROLYTES_UREA_PARAMETER_ROWS: ElectrolytesParameterRow[] = [
  {
    left: {
      key: "sodium",
      label: "Sodium",
      refValues: "Ref. Value {135 - 150meq/L}",
    },
    right: {
      key: "bicarbonate",
      label: "Bicarbonate",
      refValues: "Ref. Value {22 - 31 mmol/L}",
    },
  },
  {
    left: {
      key: "potassium",
      label: "Potassium",
      refValues: "Ref. Value {3.5 - 5.5mmeq/L}",
    },
    right: {
      key: "uricAcid",
      label: "Uric Acid",
      refValues: "Ref. Value {2.5 - 7.0mg/dl}",
    },
  },
  {
    left: {
      key: "chloride",
      label: "Chloride",
      refValues: "Ref. Value {97 - 108meq/L}",
    },
    right: {
      key: "phosphorus",
      label: "Phosphorus",
      refValues: "Ref. Value {2.0 - 4.5mg/dl}",
    },
  },
  {
    left: {
      key: "urea",
      label: "Urea",
      refValues: "Ref. Value {2.1 - 7.1meq/L}",
    },
    right: {
      key: "calcium",
      label: "Calcium",
      refValues: "Ref. Value {9.0 - 11.0g/dl}",
    },
  },
  {
    left: {
      key: "creatinine",
      label: "Creatinine",
      refValues: "Ref. Value {80 - 115meq/L}",
    },
    right: {
      key: "magnesium",
      label: "Magnesium",
      refValues: "",
    },
  },
];

export const ELECTROLYTES_UREA_PARAMETERS: ElectrolytesParameter[] =
  ELECTROLYTES_UREA_PARAMETER_ROWS.flatMap((row) => [row.left, row.right]);

export type MicroAlbiumRow = {
  key: string;
  label: string;
  primaryKey: string;
  rangeKey: string;
  primaryHint: string;
  primaryRefValues?: string;
};

export const MICRO_ALBIUM_ROWS: MicroAlbiumRow[] = [
  {
    key: "volume",
    label: "Volume of Urine",
    primaryKey: "microAlbiumVolumeTime",
    rangeKey: "microAlbiumVolumeRange",
    primaryHint: "Time",
  },
  {
    key: "result",
    label: "Result",
    primaryKey: "microAlbiumResult",
    rangeKey: "microAlbiumResultRange",
    primaryHint: "",
    primaryRefValues: "Ref. Value {80 - 115meq/L}",
  },
];

export const ELECTROLYTES_SPECIMEN_OPTIONS = [
  "Serum",
  "Plasma",
  "Whole Blood",
  "24hr Urine Collection",
];

export const ELECTROLYTES_PARAMETER_OPTIONS = [
  "Full Electrolytes & UREA Panel",
  "Electrolytes",
  "Urea",
  "Creatinine",
  "Micro Albium",
];

export const ELECTROLYTES_UREA_INVESTIGATION_NAME = "Electrolytes & UREA";

export function isElectrolytesUreaInvestigation(name: string): boolean {
  const key = name.trim().toLowerCase();
  return (
    key.includes("electrolyte") ||
    key.includes("urea") ||
    key.includes("micro albium") ||
    key.includes("micro albumin") ||
    key === "e/u/cr" ||
    key === "eucr"
  );
}

export type ElectrolytesUreaResultValues = Record<string, string>;

export const EMPTY_ELECTROLYTES_UREA_VALUES: ElectrolytesUreaResultValues =
  Object.fromEntries([
    ...ELECTROLYTES_UREA_PARAMETERS.map((item) => [item.key, ""]),
    ...MICRO_ALBIUM_ROWS.flatMap((row) => [
      [row.primaryKey, ""],
      [row.rangeKey, ""],
    ]),
  ]);
