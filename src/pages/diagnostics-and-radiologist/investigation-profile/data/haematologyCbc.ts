export type HaematologyParameter = {
  key: string;
  label: string;
  /** Exact placeholder text from Haematology wireframe */
  refValues: string;
};

export type HaematologyParameterRow = {
  left: HaematologyParameter;
  right: HaematologyParameter;
  /** Visual gap after this row (wireframe spacing before Retics / MPV block) */
  gapAfter?: boolean;
};

/** Row pairs — left column | right column, matching wireframe order. */
export const HAEMATOLOGY_CBC_PARAMETER_ROWS: HaematologyParameterRow[] = [
  {
    left: {
      key: "haemoglobin",
      label: "Haemoglobin",
      refValues:
        "Ref. Values {13.0 - 18.0g/dl for Male 12.0 - 16.5 for Female}",
    },
    right: {
      key: "eosinophils",
      label: "Eosinophils",
      refValues: "Ref. Values {0 - 2%}",
    },
  },
  {
    left: {
      key: "haematocritPcv",
      label: "Haematocrit, PCV",
      refValues: "Ref. Values {35.0 - 45.0%}",
    },
    right: {
      key: "monocytes",
      label: "Monocytes",
      refValues: "Ref. Values {1 - 8%}",
    },
  },
  {
    left: {
      key: "wbcCount",
      label: "WBC Count",
      refValues: "Ref. Values {4.0 - 11.0*10^9/L}",
    },
    right: {
      key: "basophils",
      label: "Basophils",
      refValues: "Ref. Values {0 - 1%}",
    },
  },
  {
    left: {
      key: "neutrophils",
      label: "Neutrophils",
      refValues: "Ref. Values {40 - 70%}",
    },
    right: {
      key: "esr",
      label: "ESR",
      refValues: "Ref. Values {0 - 20mm/hr 0 - 7F mm/hr}",
    },
  },
  {
    left: {
      key: "lymphocytes",
      label: "Lymphocytes",
      refValues: "Ref. Values {20 - 50%}",
    },
    right: {
      key: "rbcCount",
      label: "RBC Count",
      refValues: "Ref. Values {3.50 - 5.50g/dl}",
    },
    gapAfter: true,
  },
  {
    left: {
      key: "retics",
      label: "Retics",
      refValues: "Ref. Values {0 - 2%}",
    },
    right: {
      key: "mpv",
      label: "MPV",
      refValues: "Ref. Values {7.0 - 11.0UL}",
    },
  },
  {
    left: {
      key: "plateletCount",
      label: "Platelet Count",
      refValues: "Ref. Values {150 - 400*10^9/L}",
    },
    right: {
      key: "pdw",
      label: "PDW",
      refValues: "Ref. Values {15.0 - 17.0}",
    },
  },
  {
    left: {
      key: "mcv",
      label: "MCV",
      refValues: "Ref. Values {80.0 - 100FL}",
    },
    right: {
      key: "pct",
      label: "PCT",
      refValues: "Ref. Values {0.108 - 0.280%}",
    },
  },
  {
    left: {
      key: "mch",
      label: "MCH",
      refValues: "Ref. Values {27.0 - 31.0PG}",
    },
    right: {
      key: "rdwCv",
      label: "RDW-CV",
      refValues: "Ref. Values {11.5 - 14.5%}",
    },
  },
  {
    left: {
      key: "mchc",
      label: "MCHC",
      refValues: "Ref. Values {32.0 - 36.0G/Dl}",
    },
    right: {
      key: "rdwSd",
      label: "RDW-SD",
      refValues: "Ref. Values {30.0 - 50.0FL}",
    },
  },
];

/** Flat list for result display panels. */
export const HAEMATOLOGY_CBC_PARAMETERS: HaematologyParameter[] =
  HAEMATOLOGY_CBC_PARAMETER_ROWS.flatMap((row) => [row.left, row.right]);

export const HAEMATOLOGY_SPECIMEN_OPTIONS = [
  "Whole Blood (EDTA)",
  "Venous Blood",
  "Capillary Blood",
  "Plasma",
];

export const HAEMATOLOGY_PARAMETER_OPTIONS = [
  "CBC",
  "Haemoglobin",
  "Haematocrit, PCV",
  "WBC Count",
  "Differential Count",
  "Platelet Count",
  "ESR",
  "Full Haematology /CBC",
];

export const HAEMATOLOGY_INVESTIGATION_NAME = "Haematology /CBC";

export function isHaematologyInvestigation(name: string): boolean {
  const key = name.trim().toLowerCase();
  return (
    key.includes("haematology") ||
    key.includes("hematology") ||
    key === "cbc" ||
    key === "fbc"
  );
}

export type HaematologyResultValues = Record<string, string>;

export const EMPTY_HAEMATOLOGY_VALUES: HaematologyResultValues =
  Object.fromEntries(HAEMATOLOGY_CBC_PARAMETERS.map((item) => [item.key, ""]));
