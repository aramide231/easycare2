import test from "node:test";
import assert from "node:assert/strict";
import { loadSource } from "./source-loader.mjs";

const { displayText } = loadSource("src/lib/displayText.ts");

test("clinical table values display scalars without rendering objects or inventing values", () => {
  assert.equal(displayText("Scheduled"), "Scheduled");
  assert.equal(displayText(0), "0");
  assert.equal(displayText(12.5), "12.5");
  for (const value of [null, undefined, "", "   ", {}, [], false, NaN, Infinity]) {
    assert.equal(displayText(value), "?");
  }
});

test("every mock payment row, including original seed rows, has a unique stable ID", () => {
  const { buildMockPaymentHistoryRecords } = loadSource("src/modules/hmo/pages/patient-profile/data/mockPaymentHistoryData.ts");
  const rows = buildMockPaymentHistoryRecords();
  assert.equal(rows.length, 40);
  assert.ok(rows.every(row => typeof row.id === "string" && row.id.length > 0));
  assert.equal(new Set(rows.map(row => row.id)).size, rows.length);
  assert.deepEqual(buildMockPaymentHistoryRecords(), rows);
});

test("dispensed medication rows retain their parent visit and their own quantity", () => {
  const { buildMockDispensedVisitRecords, buildMockDispensedMedicationRows } = loadSource("src/pages/nurse/reports/dispensed-drugs/data/mockDispensedDrugRecords.ts");
  const visits = buildMockDispensedVisitRecords();
  const rows = buildMockDispensedMedicationRows();
  assert.equal(rows.length, visits.reduce((total, visit) => total + visit.medications.length, 0));
  for (const row of rows) {
    const visit = visits.find(visit => visit.id === row.id);
    assert.ok(visit);
    assert.ok(row.medicationName);
    assert.ok(row.qtyGiven > 0);
  }
  assert.equal(new Set(rows.map(row => row.rowId)).size, rows.length);
});
