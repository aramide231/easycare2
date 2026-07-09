import procedureSampleListCsv from "./procedureSampleList.csv?raw";

export type ProcedureLookupOption = {
  id: string;
  name: string;
  amount: number;
};

function slugifyProcedureId(name: string, index: number): string {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return slug || `procedure-${index + 1}`;
}

function parseProcedureCsv(raw: string): ProcedureLookupOption[] {
  return raw
    .trim()
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      const separatorIndex = line.lastIndexOf(',"');
      if (separatorIndex === -1) {
        throw new Error(`Invalid procedure CSV row: ${line}`);
      }

      const name = line.slice(0, separatorIndex).trim();
      const amountText = line
        .slice(separatorIndex + 2, -1)
        .replace(/,/g, "")
        .trim();
      const amount = Number(amountText);

      if (!name || !Number.isFinite(amount)) {
        throw new Error(`Invalid procedure CSV row: ${line}`);
      }

      return {
        id: slugifyProcedureId(name, index),
        name,
        amount,
      };
    });
}

/** Pre-installed procedure catalogue from Procedure Sample List.csv */
export const PROCEDURE_LOOKUP: ProcedureLookupOption[] =
  parseProcedureCsv(procedureSampleListCsv);

export function formatProcedureAmountValue(amount: number): string {
  return amount.toLocaleString();
}

export function formatProcedureNaira(amount: number): string {
  return `N ${amount.toLocaleString()}.00`;
}
