export type PreviewSectionLine = {
  text: string;
  meta?: string;
};

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : null;
}

const IGNORED_PREVIEW_KEYS = new Set([
  "id",
  "sn",
  "dateTime",
  "createdAtMs",
  "patientType",
  "enteredBy",
  "doctor",
  "hasResult",
  "__payload__",
]);

/** Numbered lines for preview on all sub-category sections. */
export function buildPreviewSectionLines(
  sectionLabel: string,
  rows: Record<string, unknown>[]
): PreviewSectionLine[] {
  if (rows.length === 0) return [];

  if (sectionLabel === "INVESTIGATION" || sectionLabel.endsWith(":INVESTIGATION")) {
    return rows.map((row) => ({
      text: String(row.investigation ?? "—"),
      meta: row.amount ? String(row.amount) : undefined,
    }));
  }

  if (sectionLabel === "PROCEDURE" || sectionLabel.endsWith(":PROCEDURE")) {
    return rows.map((row) => ({
      text: String(row.procedure ?? "—"),
      meta: row.price ? String(row.price) : undefined,
    }));
  }

  if (sectionLabel === "MEDICATION" || sectionLabel === "NURSING DISPENSES") {
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
              item.amount
                ? String(item.amount)
                : qty !== undefined && qty !== null && qty !== ""
                  ? `Qty ${qty}`
                  : undefined,
          };
        });
      }

      const medName = String(row.medication ?? "—");
      const remark = row.remark ? ` (${String(row.remark)})` : "";
      const metaText = row.amount
        ? String(row.amount)
        : row.dosage
          ? String(row.dosage)
          : undefined;

      return [
        {
          text: `${medName}${remark}`,
          meta: metaText,
        },
      ];
    });
  }

  if (sectionLabel === "DIAGNOSIS" || sectionLabel.endsWith(":DIAGNOSIS")) {
    return rows.map((row) => ({
      text: String(row.diagnosis ?? "—"),
      meta: row.doctor ? String(row.doctor) : undefined,
    }));
  }

  if (sectionLabel === "PRESENTING COMPLAINTS") {
    return rows.map((row) => ({
      text: String(row.complaint ?? row.complaints ?? "—"),
      meta: row.dateTime ? String(row.dateTime) : undefined,
    }));
  }

  if (sectionLabel === "VITAL SIGNS") {
    return rows.map((row) => {
      const parts = [
        row.temperature ? `Temp: ${row.temperature}°C` : null,
        row.bloodPressure ? `BP: ${row.bloodPressure}` : null,
        row.weight ? `Wt: ${row.weight}kg` : null,
        row.pulseRate ? `Pulse: ${row.pulseRate}` : null,
        row.spo2 ? `SPO2: ${row.spo2}%` : null,
      ].filter(Boolean);
      return {
        text: parts.length > 0 ? parts.join(" | ") : "Vital signs recorded",
        meta: row.bmi ? `BMI ${row.bmi}` : row.dateTime ? String(row.dateTime) : undefined,
      };
    });
  }

  // Generic summary line builder for any other section
  return rows.map((row) => {
    const entries = Object.entries(row)
      .filter(
        ([key, val]) =>
          !IGNORED_PREVIEW_KEYS.has(key) &&
          val !== undefined &&
          val !== null &&
          String(val).trim() !== "" &&
          typeof val !== "object"
      )
      .slice(0, 4)
      .map(([key, val]) => {
        const readableKey = key
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (c) => c.toUpperCase());
        return `${readableKey}: ${String(val)}`;
      });

    return {
      text: entries.length > 0 ? entries.join(" • ") : "Entry documented",
      meta: row.dateTime ? String(row.dateTime) : undefined,
    };
  });
}

export function sectionSupportsNumberedPreview(_sectionLabel: string): boolean {
  return true;
}
