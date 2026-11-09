import { useMemo } from "react";
import { useMedicalTable } from "../../../hooks/useMedicalTable";

const MONTH_NAME_MAP: Record<string, { label: string; order: number }> = {
  jan: { label: "January", order: 1 },
  feb: { label: "February", order: 2 },
  mar: { label: "March", order: 3 },
  apr: { label: "April", order: 4 },
  may: { label: "May", order: 5 },
  jun: { label: "June", order: 6 },
  jul: { label: "July", order: 7 },
  aug: { label: "August", order: 8 },
  sep: { label: "September", order: 9 },
  oct: { label: "October", order: 10 },
  nov: { label: "November", order: 11 },
  dec: { label: "December", order: 12 },
};

function parseRowMonthGroup(dateTimeStr: string): {
  key: string;
  label: string;
  sortKey: number;
} {
  // Expected format: "15-Feb-2026 10:25 AM"
  const match = dateTimeStr.match(/\b(\d{1,2})-([A-Za-z]{3})-(\d{4})\b/);
  if (match) {
    const monthCode = match[2].toLowerCase();
    const year = Number(match[3]);
    const monthMeta = MONTH_NAME_MAP[monthCode];
    if (monthMeta) {
      return {
        key: `${year}-${String(monthMeta.order).padStart(2, "0")}`,
        label: `${monthMeta.label} ${year}`,
        sortKey: year * 100 + monthMeta.order,
      };
    }
  }
  const now = new Date();
  const monthLabel = now.toLocaleString("en-GB", { month: "long", year: "numeric" });
  return {
    key: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`,
    label: monthLabel,
    sortKey: now.getFullYear() * 100 + (now.getMonth() + 1),
  };
}

function parseNairaNumeric(row: Record<string, unknown>): number {
  if (typeof row.lineTotal === "number" && Number.isFinite(row.lineTotal)) {
    return row.lineTotal;
  }
  const raw = String(row.amount ?? "0").replace(/[^\d.]/g, "");
  const parsed = Number.parseFloat(raw);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatNairaDisplay(value: number): string {
  return `N ${value.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/**
 * Item 23: Nursing Dispense {DETAILS}
 * Records the task done by the Nurse under MEDICATION + value picked under REMARK,
 * with columns SN | DATE | TIME | PATIENT TYPE | MEDICATION | AMOUNT | REMARK | DISPENSED BY,
 * separated into tables for each month with total amount of Med calculated.
 */
export default function NursingDispenses() {
  const { history } = useMedicalTable("NURSING DISPENSES");

  const monthlyGroups = useMemo(() => {
    const groupsMap = new Map<
      string,
      {
        key: string;
        label: string;
        sortKey: number;
        rows: Record<string, unknown>[];
        totalAmount: number;
      }
    >();

    history.forEach((row) => {
      const monthInfo = parseRowMonthGroup(String(row.dateTime ?? ""));
      const amountVal = parseNairaNumeric(row);
      const existing = groupsMap.get(monthInfo.key);
      if (existing) {
        existing.rows.push(row);
        existing.totalAmount += amountVal;
      } else {
        groupsMap.set(monthInfo.key, {
          ...monthInfo,
          rows: [row],
          totalAmount: amountVal,
        });
      }
    });

    return Array.from(groupsMap.values()).sort((a, b) => b.sortKey - a.sortKey);
  }, [history]);

  const grandTotal = useMemo(
    () => monthlyGroups.reduce((sum, g) => sum + g.totalAmount, 0),
    [monthlyGroups]
  );

  return (
    <div className="min-w-0 w-full space-y-5 text-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-bold uppercase tracking-wide text-gray-800">
          NURSING DISPENSE DETAILS
        </h3>
        {monthlyGroups.length > 0 && (
          <span className="rounded-md bg-purple-50 px-3 py-1 text-xs font-semibold text-[#573FD1]">
            Overall Total: {formatNairaDisplay(grandTotal)}
          </span>
        )}
      </div>

      {monthlyGroups.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white px-4 py-8 text-center text-sm text-gray-500">
          No nursing dispense records yet. Medications marked as served/given under MEDICATION will appear here automatically.
        </div>
      ) : (
        monthlyGroups.map((group) => (
          <div
            key={group.key}
            className="w-full min-w-0 max-w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xs"
          >
            <div className="flex items-center justify-between border-b border-gray-200 bg-[#573FD1]/10 px-4 py-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#573FD1]">
                {group.label}
              </span>
              <span className="text-xs font-semibold text-gray-700">
                {group.rows.length} {group.rows.length === 1 ? "Record" : "Records"}
              </span>
            </div>

            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-max border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-100 text-xs font-semibold uppercase tracking-wide text-gray-600">
                    <th className="whitespace-nowrap px-3 py-2.5">SN</th>
                    <th className="whitespace-nowrap px-3 py-2.5">DATE | TIME</th>
                    <th className="whitespace-nowrap px-3 py-2.5">PATIENT TYPE</th>
                    <th className="whitespace-nowrap px-3 py-2.5">MEDICATION</th>
                    <th className="whitespace-nowrap px-3 py-2.5">AMOUNT</th>
                    <th className="whitespace-nowrap px-3 py-2.5">REMARK</th>
                    <th className="whitespace-nowrap px-3 py-2.5">DISPENSED BY</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {group.rows.map((row, idx) => {
                    const medLabel = [
                      String(row.medication ?? "—"),
                      row.dosage ? `(${String(row.dosage)})` : "",
                    ]
                      .filter(Boolean)
                      .join(" ");
                    return (
                      <tr
                        key={String(row.id ?? `${group.key}-${idx}`)}
                        className="bg-white even:bg-gray-50/80"
                      >
                        <td className="whitespace-nowrap px-3 py-2.5 text-gray-800">
                          {idx + 1}
                        </td>
                        <td className="whitespace-nowrap px-3 py-2.5 text-gray-800">
                          {String(row.dateTime ?? "—")}
                        </td>
                        <td className="whitespace-nowrap px-3 py-2.5 text-gray-800">
                          {String(row.patientType ?? "—")}
                        </td>
                        <td className="px-3 py-2.5 font-medium text-gray-900">
                          {medLabel}
                        </td>
                        <td className="whitespace-nowrap px-3 py-2.5 font-medium text-gray-800">
                          {String(
                            row.amount ?? formatNairaDisplay(parseNairaNumeric(row))
                          )}
                        </td>
                        <td className="whitespace-nowrap px-3 py-2.5">
                          <span className="inline-flex rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-semibold text-[#573FD1]">
                            {String(row.remark || "Served")}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-2.5 text-gray-800">
                          {String(row.dispensedBy || "Titilayo Olayinka")}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-gray-200 bg-gray-50 font-semibold text-gray-900">
                    <td
                      colSpan={4}
                      className="px-3 py-2.5 text-right text-xs uppercase tracking-wide text-gray-600"
                    >
                      Total Medication Amount ({group.label}):
                    </td>
                    <td className="whitespace-nowrap px-3 py-2.5 text-sm font-bold text-[#573FD1]">
                      {formatNairaDisplay(group.totalAmount)}
                    </td>
                    <td colSpan={2} />
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
