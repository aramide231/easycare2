import { build } from 'esbuild';
import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

// Run the existing TypeScript modules with Node's assertions, without adding a test framework.
const directory = await mkdtemp(join(tmpdir(), 'easycare-nursing-'));
try {
  const result = await build({
    stdin: { resolveDir: process.cwd(), loader: 'tsx', contents: `
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import * as records from './src/pages/doctor/patientProfile/hooks/useMedicalTable';
import { categoryStorageKey } from './src/pages/doctor/patientProfile/lib/categoryStorage';
import { calculateEddFromLmp, calculateEgaFromLmp } from './src/pages/doctor/patientProfile/lib/pregnancyDates';
import NurseMedicationServe from './src/pages/doctor/patientProfile/components/categories/genConsult/NurseMedicationServe';
import NurseDispenseHistory from './src/pages/doctor/patientProfile/components/categories/genConsult/NurseDispenseHistory';

records.openPatientRecord('TEST-A');
const stage = 'STAGE 1: LABOUR';
records.setPendingSectionEntry(stage, { presentation: 'Cephalic' });
assert.equal(records.getPendingSectionRows(stage)[0].presentation, 'Cephalic');
assert.equal(records.getSectionEntryCount(stage), 0, 'Preview must not commit');
records.setPendingSectionEntry('REPORT WRITING', { notes: 'Another category draft' });
records.commitPendingCategoryEntries('Ara', 'Clinician', [stage]);
assert.equal(records.getSectionEntryCount(stage), 1);
assert.equal(records.getPendingSectionRows(stage).length, 0);
assert.equal(records.getSectionEntryCount('REPORT WRITING'), 0, 'Confirm must be category-scoped');
records.commitPendingCategoryEntries('Ara', 'Clinician', [stage]);
assert.equal(records.getSectionEntryCount(stage), 1, 'Repeated confirm must not duplicate');

const neonatal = categoryStorageKey('Neo Natal Care', 'DIAGNOSIS');
records.setPendingDiagnosis({ diagnosis: 'Neonatal test', icdDiagnosis: 'NO' }, neonatal);
records.commitPendingCategoryEntries('Doctor One', 'Doctor One', [neonatal]);
assert.equal(records.getSectionTableRows(neonatal)[0].diagnosis, 'Neonatal test');
assert.ok(!records.getSectionTableRows('DIAGNOSIS').some(row => row.diagnosis === 'Neonatal test'));
records.setPendingDiagnosis({ diagnosis: 'Second finding', icdDiagnosis: 'NO' }, neonatal);
records.commitPendingCategoryEntries('Doctor One', 'Doctor One', [neonatal]);
assert.equal(records.getSectionTableRows(neonatal)[0].diagnosis, 'Neonatal test; Second finding');
assert.equal(categoryStorageKey('Neo Natal Care', 'MEDICATION'), 'MEDICATION');

records.setPendingSectionEntry('MEDICATION', { __payload__: JSON.stringify({ medications: [{ medication: 'Test drug A', dosage: 'Test dose', lineTotal: 1250 }, { medication: 'Test drug B', lineTotal: 500 }] }) });
records.commitPendingCategoryEntries('Doctor One', 'Doctor One', ['MEDICATION']);
const medicationHtml = renderToStaticMarkup(<NurseMedicationServe />);
assert.ok(medicationHtml.includes('Test drug A') && medicationHtml.includes('Test drug B'), 'Nurse must see individual drugs in prescription batches');
assert.ok(medicationHtml.includes('1st Dose') && medicationHtml.includes('Not Available'));
records.setPendingSectionEntry('NURSING DISPENSES', { medication: 'Test drug A', amount: '1250', remark: 'Given', dispensedBy: 'Ara' });
records.commitPendingCategoryEntries('Ara', 'Clinician', ['NURSING DISPENSES']);
const dispenseHtml = renderToStaticMarkup(<NurseDispenseHistory />);
assert.ok(dispenseHtml.includes('1,250.00') && dispenseHtml.includes('Given') && dispenseHtml.includes('Ara'));
assert.ok(!dispenseHtml.includes('<input'), 'Dispense history is read-only');

records.openPatientRecord('TEST-B');
assert.equal(records.getSectionEntryCount(stage), 0, 'Patient records must be isolated');
assert.equal(records.getSectionEntryCount('MEDICATION'), 0);
assert.equal(records.getPendingSectionRows('REPORT WRITING').length, 0, 'Drafts must not follow another patient');
records.openPatientRecord('TEST-A');
assert.equal(records.getSectionEntryCount(stage), 1, 'Returning to a patient retains confirmed entries');
assert.equal(records.getSectionEntryCount('MEDICATION'), 1);
assert.equal(calculateEddFromLmp('01/01/26'), '08/10/26');
assert.equal(calculateEgaFromLmp('01/01/26', new Date(2026, 0, 16)), '2 weeks 1 day');
console.log('PASS: preview, scoped confirmation, duplicate prevention, neonatal separation, prescription batches, dispense totals, patient isolation, and pregnancy dates');
` },
    bundle: true, platform: 'node', format: 'cjs', write: false,
    tsconfig: 'tsconfig.app.json', logLevel: 'silent',
  });
  const output = join(directory, 'checks.cjs');
  await writeFile(output, result.outputFiles[0].contents);
  await import(pathToFileURL(output).href);
} finally {
  await rm(directory, { recursive: true, force: true });
}
