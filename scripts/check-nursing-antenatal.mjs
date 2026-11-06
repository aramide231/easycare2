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
import { antenatalEntryRestriction } from './src/pages/nurse/patient-profile/lib/antenatalEligibility';
import { buildMockPatients } from './src/pages/nurse/dashboard/data/mockPatients';
import NewAntenatalBooking from './src/pages/nurse/patient-profile/nurse-categories/NewAntenatalBooking';

for (const patient of buildMockPatients().filter(patient => patient.visitType === 'ANTE. NATAL')) {
  assert.equal(antenatalEntryRestriction(patient), null, 'Demo ANC patients must allow nursing entry');
}
assert.ok(antenatalEntryRestriction({ gender: ' Male ', age: 31 }));
assert.ok(antenatalEntryRestriction({ gender: 'F', age: 9 }));
assert.equal(antenatalEntryRestriction({ gender: 'Female', age: 10 }), null);
for (const age of [undefined, null, '', ' ', 'unknown']) {
  assert.equal(antenatalEntryRestriction({ gender: 'F', age }), null, 'Missing age must not be treated as zero');
}
const bookingHtml = renderToStaticMarkup(<NewAntenatalBooking nurse />);
assert.ok(bookingHtml.includes('<select') && bookingHtml.includes('<input'));
assert.ok(!bookingHtml.includes('disabled=""'), 'Nursing booking controls must be enabled');
console.log('PASS: ANC demo eligibility, restriction messages, missing ages, and enabled nursing booking controls');
` },
    bundle: true, platform: 'node', format: 'cjs', write: false,
    loader: { '.css': 'empty' },
    tsconfig: 'tsconfig.app.json', logLevel: 'silent',
  });
  const output = join(directory, 'checks.cjs');
  await writeFile(output, result.outputFiles[0].contents);
  await import(pathToFileURL(output).href);
} finally {
  await rm(directory, { recursive: true, force: true });
}
