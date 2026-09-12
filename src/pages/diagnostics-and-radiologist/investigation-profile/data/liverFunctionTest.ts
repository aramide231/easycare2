export type LftParameter = {
  key: string;
  label: string;
  refValues: string;
};

export type LftParameterRow = {
  left: LftParameter;
  right: LftParameter;
};

export const LFT_PARAMETER_ROWS: LftParameterRow[] = [
  {
    left: {
      key: "totalBilirubin",
      label: "Total Bilirubin",
      refValues: "Ref. Values {0.4 - 1.0mg/dl}",
    },
    right: {
      key: "alkPhosphatase",
      label: "ALK. Phosphatase",
      refValues: "Ref. Values {60 - 170u/l}",
    },
  },
  {
    left: {
      key: "directBilirubin",
      label: "Direct Bilirubin",
      refValues: "Ref. Values {0.2 - 0.5mg/dl}",
    },
    right: {
      key: "serumAlbumin",
      label: "Serum Albumin",
      refValues: "Ref. Values {3.5 - 5.5g/l}",
    },
  },
  {
    left: {
      key: "indirectBilirubin",
      label: "Indirect Bilirubin",
      refValues: "Ref. Values {0.2 - 1.0 mg/dl}",
    },
    right: {
      key: "serumTotalProtein",
      label: "Serum Total Protein",
      refValues: "Ref. Values {6.3 - 8.0g/dl}",
    },
  },
  {
    left: {
      key: "astSgot",
      label: "(AST) SGOT",
      refValues: "Ref. Values {Up to 30u/l}",
    },
    right: {
      key: "ggt",
      label: "GGT",
      refValues: "Ref. Values {6 - 30U/L}",
    },
  },
  {
    left: {
      key: "altSgpt",
      label: "(ALT) SGPT",
      refValues: "Ref. Values {Up to 35u/l}",
    },
    right: {
      key: "acidPhos",
      label: "Acid Phos",
      refValues: "Ref. Values {4.6 - 12.8g/l}",
    },
  },
  {
    left: {
      key: "amylase",
      label: "Amylase",
      refValues: "Ref. Values {70 - 300U/L}",
    },
    right: {
      key: "_spacer",
      label: "",
      refValues: "",
    },
  },
];

export const LFT_PARAMETERS: LftParameter[] = LFT_PARAMETER_ROWS.flatMap(
  (row) => [row.left, row.right].filter((item) => item.key !== "_spacer"),
);

export type UrinaryProteinRow = {
  key: string;
  label: string;
  timeKey: string;
  rangeKey: string;
};

export const URINARY_PROTEIN_ROWS: UrinaryProteinRow[] = [
  {
    key: "volume",
    label: "Volume of Urine",
    timeKey: "urinaryVolumeTime",
    rangeKey: "urinaryVolumeRange",
  },
  {
    key: "result",
    label: "Result",
    timeKey: "urinaryResultTime",
    rangeKey: "urinaryResultRange",
  },
];

export type CardiacMarker = {
  key: string;
  label: string;
  refValues: string;
};

export type CardiacMarkerRow = {
  left: CardiacMarker;
  right: CardiacMarker;
};

export const CARDIAC_MARKER_ROWS: CardiacMarkerRow[] = [
  {
    left: {
      key: "cpk",
      label: "CPK",
      refValues: "Ref. Values {24 - 195 U/L}",
    },
    right: {
      key: "dDimer",
      label: "D-DIMER",
      refValues: "Ref. Values {dimer}",
    },
  },
  {
    left: {
      key: "ldh",
      label: "LDH",
      refValues: "Ref. Values {70 - 240 U/L}",
    },
    right: {
      key: "troponinT",
      label: "TROPONIN-T",
      refValues: "Ref. Values {trp}",
    },
  },
  {
    left: {
      key: "crp",
      label: "CRP",
      refValues: "Ref. Values {crp}",
    },
    right: {
      key: "troponinI",
      label: "TROPONIN-I",
      refValues: "Ref. Values {trp}",
    },
  },
];

export const CARDIAC_MARKERS: CardiacMarker[] = CARDIAC_MARKER_ROWS.flatMap(
  (row) => [row.left, row.right],
);

export const LFT_SPECIMEN_OPTIONS = [
  "Serum",
  "Plasma",
  "Whole Blood",
  "24hr Urine Collection",
];

export const LFT_PARAMETER_OPTIONS = [
  "Full Liver Function Panel",
  "Bilirubin Profile",
  "Transaminases (AST/ALT)",
  "Protein Profile",
  "Cardiac Markers",
  "24hr Urinary Protein",
];

export const LFT_INVESTIGATION_NAME = "Liver Function Test (LFT)";

export function isLiverFunctionTestInvestigation(name: string): boolean {
  const key = name.trim().toLowerCase();
  return (
    key.includes("liver function") ||
    key === "lft" ||
    key.includes("liver function test")
  );
}

export type LftResultValues = Record<string, string>;

export const EMPTY_LFT_VALUES: LftResultValues = Object.fromEntries([
  ...LFT_PARAMETERS.map((item) => [item.key, ""]),
  ...URINARY_PROTEIN_ROWS.flatMap((row) => [
    [row.timeKey, ""],
    [row.rangeKey, ""],
  ]),
  ...CARDIAC_MARKERS.map((item) => [item.key, ""]),
]);
