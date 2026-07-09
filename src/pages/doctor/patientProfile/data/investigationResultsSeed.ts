export type InvestigationResultLine = {
  parameter: string;
  value: string;
  unit?: string;
  reference?: string;
};

export type InvestigationResultReport = {
  investigation: string;
  reportedAt?: string;
  reportedBy?: string;
  lines: InvestigationResultLine[];
};

/** Placeholder lab results until the Laboratory module is wired. */
export const INVESTIGATION_RESULT_REPORTS: InvestigationResultReport[] = [
  {
    investigation: "HVS",
    reportedAt: "15-Feb-2020 02:40 PM",
    reportedBy: "Lab — Grace Okon",
    lines: [
      { parameter: "Appearance", value: "Clear", reference: "Clear" },
      { parameter: "WBC", value: "2–5", unit: "/hpf", reference: "0–5 /hpf" },
      { parameter: "Epithelial Cells", value: "Few", reference: "Few" },
      { parameter: "Culture", value: "No growth", reference: "No growth" },
    ],
  },
  {
    investigation: "FBC",
    reportedAt: "16-Feb-2021 11:10 AM",
    reportedBy: "Lab — Ibrahim Musa",
    lines: [
      { parameter: "Haemoglobin", value: "12.8", unit: "g/dL", reference: "12.0–16.0" },
      { parameter: "WBC", value: "7.2", unit: "×10⁹/L", reference: "4.0–11.0" },
      { parameter: "Platelets", value: "245", unit: "×10⁹/L", reference: "150–400" },
      { parameter: "PCV", value: "38", unit: "%", reference: "36–46" },
    ],
  },
  {
    investigation: "Urinalysis",
    reportedAt: "17-Feb-2022 01:15 PM",
    reportedBy: "Lab — Grace Okon",
    lines: [
      { parameter: "Colour", value: "Straw", reference: "Straw / Yellow" },
      { parameter: "Protein", value: "Negative", reference: "Negative" },
      { parameter: "Glucose", value: "Negative", reference: "Negative" },
      { parameter: "Nitrites", value: "Negative", reference: "Negative" },
    ],
  },
];

export function getInvestigationResultReport(
  investigationName: string
): InvestigationResultReport | null {
  const key = investigationName.trim().toLowerCase();
  return (
    INVESTIGATION_RESULT_REPORTS.find(
      (report) => report.investigation.toLowerCase() === key
    ) ?? null
  );
}
