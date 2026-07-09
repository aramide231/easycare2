import investigationSampleListCsv from "./investigationSampleList.csv?raw";

export type InvestigationLookupOption = {
  id: string;
  name: string;
  amount: number;
};

function slugifyInvestigationId(name: string, index: number): string {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return slug || `investigation-${index + 1}`;
}

function parseInvestigationCsv(raw: string): InvestigationLookupOption[] {
  return raw
    .trim()
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      const separatorIndex = line.lastIndexOf(',"');
      if (separatorIndex === -1) {
        throw new Error(`Invalid investigation CSV row: ${line}`);
      }

      const name = line.slice(0, separatorIndex).trim();
      const amountText = line
        .slice(separatorIndex + 2, -1)
        .replace(/,/g, "")
        .trim();
      const amount = Number(amountText);

      if (!name || !Number.isFinite(amount)) {
        throw new Error(`Invalid investigation CSV row: ${line}`);
      }

      return {
        id: slugifyInvestigationId(name, index),
        name,
        amount,
      };
    });
}

/** Pre-installed investigation catalogue from Investigation Sample List.csv */
export const INVESTIGATION_LOOKUP: InvestigationLookupOption[] =
  parseInvestigationCsv(investigationSampleListCsv);

export function formatInvestigationAmountValue(amount: number): string {
  return amount.toLocaleString();
}

export function formatInvestigationNaira(amount: number): string {
  return `N ${amount.toLocaleString()}.00`;
}
