import test, { afterEach } from "node:test";
import assert from "node:assert/strict";
import { loadSource } from "./source-loader.mjs";

const memoryStorage = () => ({ getItem: () => null, setItem() {}, removeItem() {} });
globalThis.window = { localStorage: memoryStorage(), sessionStorage: memoryStorage() };
const originalFetch = globalThis.fetch;
const { useAuthStore: store } = loadSource("src/store/useAuthStore.ts");
const { setCsrfToken, SessionChangedError } = loadSource("src/api/client/apClient.ts");
const { WriteAttempt } = loadSource("src/api/client/writeAttempt.ts");
const { patientId, getPatient, getPatientAccess, listPatients, savePatient, patientCommand, checkPatientDuplicates } = loadSource("src/api/patients.ts");
const { isModuleAllowed, getActiveModuleRole } = loadSource("src/lib/authRoutes.ts");
function session(id = 1) {
  store.getState().setUser({ id, department: null, is_active: true, roles: [{ code: "frontdesk" }], permissions: ["patients.view", "patients.create"] }, Date.now() + 60000);
  setCsrfToken("synthetic-csrf");
}
afterEach(() => { store.getState().clearAuth(); globalThis.fetch = originalFetch; });

test("patient workspace requires explicit view permission independent of role", () => {
  assert.equal(isModuleAllowed("/patients/12", ["admin"], []), false);
  assert.equal(isModuleAllowed("/patients/register", ["frontdesk"], []), false);
  assert.equal(isModuleAllowed("/patients/12", [], ["patients.view"]), true);
  assert.equal(getActiveModuleRole("/patients/12", ""), "staff");
});
test("patient IDs reject aliases, navigation snapshots, fractions and unsafe integers", () => {
  for (const value of [null, undefined, "", "0", "01", -1, "P-001", "1.5", "1/2", "1e2", Number.MAX_SAFE_INTEGER + 1, { id: 1 }]) assert.equal(patientId(value), null);
  assert.equal(patientId("123"), 123);
  assert.equal(patientId(123), 123);
});
test("search preserves literal filters and pages without caching private data", async () => {
  session();
  globalThis.fetch = async (url, options) => {
    const query = new URL(url, "http://localhost").searchParams;
    assert.equal(query.get("q"), "Name % & _"); assert.equal(query.get("mrn"), "OLD/001"); assert.equal(query.get("page"), "2");
    assert.equal(options.cache, "no-store"); assert.equal(options.credentials, "include");
    return Response.json({ data: [], meta: { total: 0, current_page: 2, last_page: 2 } });
  };
  assert.equal((await listPatients({ q: "Name % & _", mrn: "OLD/001", page: 2 })).data.length, 0);
});
test("canonical lookup requires matching requested ID and surviving ID metadata", async () => {
  session();
  globalThis.fetch = async () => Response.json({ data: { id: 2, version: 4 }, meta: { requested_id: 1, canonical_id: 2 } });
  assert.equal((await getPatient(1)).data.id, 2);
  globalThis.fetch = async () => Response.json({ data: { id: 2, version: 4 }, meta: { requested_id: 8, canonical_id: 2 } });
  await assert.rejects(getPatient(1), (error) => error.code === "invalid_response");
});
test("duplicate review sends only identity fields and the edited patient exclusion", async () => {
  session();
  globalThis.fetch = async (url, options) => {
    assert.equal(url, "/api/v1/patients/duplicate-check");
    assert.deepEqual(JSON.parse(options.body), { first_name: "Synthetic", last_name: "Patient", date_of_birth: null, phone: "+2348000000000", exclude_id: 7 });
    return Response.json({ data: [], meta: { has_more: false } });
  };
  await checkPatientDuplicates({ first_name: "Synthetic", last_name: "Patient", date_of_birth: null, phone: "+2348000000000", address: "Private address", contacts: [{ name: "Private contact" }] }, 7);
});
test("access-state lookup cannot select another patient or accept unknown status/version values", async () => {
  session();
  globalThis.fetch = async () => Response.json({ data: { id: 7, version: 2, access_status: "restricted" } });
  assert.equal((await getPatientAccess(7)).data.access_status, "restricted");
  for (const data of [{ id: 8, version: 2, access_status: "active" }, { id: 7, version: 0, access_status: "restricted" }, { id: 7, version: 2, access_status: "unknown" }]) {
    globalThis.fetch = async () => Response.json({ data });
    await assert.rejects(getPatientAccess(7), (error) => error.code === "invalid_response");
  }
});
test("a lost registration response retains one explicit key and never retries automatically", async () => {
  session();
  const attempt = new WriteAttempt();
  const key = attempt.key();
  let calls = 0;
  globalThis.fetch = async (_url, options) => { calls++; assert.equal(options.headers.get("Idempotency-Key"), key); throw new TypeError("Synthetic lost connection"); };
  const input = { mrn: "SYNTHETIC-001" };
  await assert.rejects(savePatient(null, input, attempt.key()), (error) => error.code === "network_error");
  assert.equal(calls, 1);
  assert.equal(attempt.key(), key);
  globalThis.fetch = async () => Response.json({ data: { id: 7, version: 1, mrn: input.mrn } });
  assert.equal((await savePatient(null, input, attempt.key())).data.id, 7);
});
test("registration cannot confirm an unrelated number or a malformed successful response", async () => {
  session();
  for (const body of [{ data: { id: 7, version: 1, mrn: "OTHER" } }, { data: { id: 7, version: 2, mrn: "SYNTHETIC" } }, { data: { status: "healthy" } }]) {
    globalThis.fetch = async () => Response.json(body);
    await assert.rejects(savePatient(null, { mrn: "SYNTHETIC" }, "synthetic-key-000001"), (error) => error.code === "invalid_response");
  }
});
test("edits must confirm the same patient and exactly the next version", async () => {
  session();
  globalThis.fetch = async (_url, options) => { assert.equal(options.method, "PATCH"); return Response.json({ data: { id: 7, version: 4 } }); };
  assert.equal((await savePatient(7, { version: 3 }, "synthetic-key-000001")).data.version, 4);
  for (const body of [{ id: 8, version: 4 }, { id: 7, version: 3 }, { id: 7, version: 5 }]) {
    globalThis.fetch = async () => Response.json({ data: body });
    await assert.rejects(savePatient(7, { version: 3 }, "synthetic-key-000001"), (error) => error.code === "invalid_response");
  }
});
for (const [action, suffix, recordId] of [["flags.store", "flags"], ["flags.resolve", "flags/4/resolve", 4],
  ["cards.change", "card"], ["access.restrict", "access/restrict"], ["access.restore", "access/restore"],
  ["merges.request", "merge-requests"], ["merges.approve", "merge-requests/4/approve", 4],
  ["merges.reject", "merge-requests/4/reject", 4], ["merges.cancel", "merge-requests/4/cancel", 4]]) {
  test(action + " confirms the precise operation and nested management record", async () => {
    session();
    globalThis.fetch = async (url, options) => {
      assert.equal(url, "/api/v1/patients/7/" + suffix);
      assert.equal(options.headers.get("Idempotency-Key"), "synthetic-key-000001");
      return Response.json({ data: { id: 7, version: 4, record_id: 4, operation: action } });
    };
    assert.equal((await patientCommand(7, action, { version: 3, reason: "Synthetic reason" }, "synthetic-key-000001", recordId)).data.record_id, 4);
    globalThis.fetch = async () => Response.json({ data: { id: 7, version: 4, record_id: 5, operation: "unrelated" } });
    await assert.rejects(patientCommand(7, action, { version: 3, reason: "Synthetic reason" }, "synthetic-key-000001", recordId), (error) => error.code === "invalid_response");
  });
}
test("invalid nested IDs never send a management command", async () => {
  session(); let calls = 0; globalThis.fetch = async () => { calls++; return Response.json({}); };
  await assert.rejects(patientCommand(7, "merges.approve", { version: 1, reason: "Synthetic" }, "synthetic-key-000001", 0));
  assert.equal(calls, 0);
});
test("a patient response finishing after an account change cannot reach the new staff member", async () => {
  session();
  let finish;
  globalThis.fetch = () => new Promise((resolve) => { finish = resolve; });
  const pending = getPatient(7);
  session(2);
  finish(Response.json({ data: { id: 7, version: 1, first_name: "Private sentinel" }, meta: { requested_id: 7, canonical_id: 7 } }));
  await assert.rejects(pending, SessionChangedError);
});
test("late management confirmation cannot update a different staff session", async () => {
  session();
  let finish;
  globalThis.fetch = () => new Promise((resolve) => { finish = resolve; });
  const pending = patientCommand(7, "flags.store", { version: 1, reason: "Private sentinel" }, "synthetic-key-000001");
  session(2);
  finish(Response.json({ data: { id: 7, version: 2, record_id: 4, operation: "flags.store" } }));
  await assert.rejects(pending, SessionChangedError);
});
