export type PreviewSectionLine = {
  text: string;
  meta?: string;
};

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : null;
}

/** Numbered lines for preview on Investigation / Procedure / Medication sections. */
export function buildPreviewSectionLines(
  sectionLabel: string,
  rows: Record<string, unknown>[]
): PreviewSectionLine[] {
  if (rows.length === 0) return [];

  if (sectionLabel === "INVESTIGATION") {
    return rows.map((row) => ({
      text: String(row.investigation ?? "—"),
      meta: row.amount ? String(row.amount) : undefined,
    }));
  }

  if (sectionLabel === "PROCEDURE") {
    return rows.map((row) => ({
      text: String(row.procedure ?? "—"),
      meta: row.price ? String(row.price) : undefined,
    }));
  }

  if (sectionLabel === "MEDICATION") {
    return rows.flatMap((row) => {
      const meds = row.medications;
      if (Array.isArray(meds)) {
        return meds.map((med) => {
          const item = asRecord(med);
          if (!item) return { text: "—" };
          const qty = item.quantity;
          return {
            text: String(item.medication ?? "—"),
            meta:
              qty !== undefined && qty !== null && qty !== ""
                ? `Qty ${qty}`
                : undefined,
          };
        });
      }

      return [
        {
          text: String(row.medication ?? "—"),
          meta:
            row.quantity !== undefined && row.quantity !== null && row.quantity !== ""
              ? `Qty ${row.quantity}`
              : undefined,
        },
      ];
    });
  }

  return [];
}

export function sectionSupportsNumberedPreview(sectionLabel: string): boolean {
  return (
    sectionLabel === "INVESTIGATION" ||
    sectionLabel === "PROCEDURE" ||
    sectionLabel === "MEDICATION"
  );
}
