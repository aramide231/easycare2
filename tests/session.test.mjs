import test, { afterEach } from "node:test";
import assert from "node:assert/strict";
import { loadSource } from "./source-loader.mjs";

const memoryStorage = () => {
  const data = new Map();
  return {
    getItem: (key) => data.get(key) ?? null,
    setItem: (key, value) => data.set(key, String(value)),
    removeItem: (key) => data.delete(key),
  };
};
globalThis.window = { localStorage: memoryStorage(), sessionStorage: memoryStorage() };
globalThis.localStorage = window.localStorage;
globalThis.sessionStorage = window.sessionStorage;
const originalFetch = globalThis.fetch;
const { useAuthStore: store } = loadSource("src/store/useAuthStore.ts");
const { registerSessionCleanup, createSessionObjectUrl } = loadSource("src/lib/sessionScope.ts");
const { apiFetch, SessionChangedError } = loadSource("src/api/client/apClient.ts");
const staff = (id, patch = {}) => ({
  id, username: "staff-" + id, first_name: "Staff", last_name: String(id), middle_name: null,
  name: "Staff " + id, email: null, staff_code: null, is_active: true, department: null,
  roles: [{ code: "doctor", name: "Medical" }], permissions: ["staff.view_self"],
  created_at: "2026-11-11T00:00:00.000000Z", last_login_at: null, ...patch,
});
const setStaff = (id, patch) => store.getState().setUser(staff(id, patch), Date.now() + 60000);
const deferred = () => {
  let resolve;
  const promise = new Promise((done) => { resolve = done; });
  return { promise, resolve };
};
afterEach(() => {
  store.getState().clearAuth();
  globalThis.fetch = originalFetch;
});

test("routine identity refresh preserves drafts; access changes clear them", () => {
  let draft = "unsaved work";
  const stop = registerSessionCleanup(() => { draft = ""; });
  try {
    setStaff(1);
    draft = "unsaved work";
    const revision = store.getState().revision;
    setStaff(1, { name: "Updated staff", email: "staff@example.test" });
    assert.equal(draft, "unsaved work");
    assert.equal(store.getState().revision, revision);
    setStaff(1, { department: { id: 2, code: "nursing", name: "Nursing" } });
    assert.equal(draft, "");
    assert.ok(store.getState().revision > revision);
  } finally { stop(); }
});

test("role and permission ordering does not clear work; revocation does", () => {
  const roles = [{ code: "doctor", name: "Medical" }, { code: "nurse", name: "Nursing" }];
  setStaff(1, { roles, permissions: ["staff.view_self", "reference-data.view"] });
  const revision = store.getState().revision;
  setStaff(1, { roles: [...roles].reverse(), permissions: ["reference-data.view", "staff.view_self"] });
  assert.equal(store.getState().revision, revision);
  setStaff(1);
  assert.ok(store.getState().revision > revision);
});

test("account changes remove legacy private data while preserving unrelated preferences", () => {
  setStaff(1);
  for (const storage of [window.localStorage, window.sessionStorage]) {
    for (const key of ["mockUser", "easyCareDoctorProfile", "patients", "mockPatients", "easycare-auth", "easyCareSession"]) {
      storage.setItem(key, "private");
    }
    storage.setItem("theme", "dark");
  }
  setStaff(2);
  for (const storage of [window.localStorage, window.sessionStorage]) {
    assert.equal(storage.getItem("mockUser"), null);
    assert.equal(storage.getItem("patients"), null);
    assert.equal(storage.getItem("easyCareDoctorProfile"), null);
    assert.equal(storage.getItem("mockPatients"), null);
    assert.equal(storage.getItem("theme"), "dark");
  }
});

test("disabled browser storage cannot break sign-in or logout", () => {
  const previous = window.localStorage;
  Object.defineProperty(window, "localStorage", { configurable: true, get: () => { throw new Error("Storage disabled"); } });
  try {
    setStaff(1);
    assert.equal(store.getState().user.id, 1);
    store.getState().clearAuth();
    assert.equal(store.getState().user, null);
  } finally { Object.defineProperty(window, "localStorage", { configurable: true, value: previous, writable: true }); }
});

test("late successful responses cannot return the previous staff member's data", async () => {
  setStaff(1);
  const pending = deferred();
  globalThis.fetch = () => pending.promise;
  const request = apiFetch("/private-records");
  setStaff(2);
  pending.resolve(Response.json({ data: { owner: 1, content: "private" } }));
  await assert.rejects(request, SessionChangedError);
  assert.equal(store.getState().user.id, 2);
});

test("a late unauthenticated response cannot sign out the new staff member", async () => {
  setStaff(1);
  const pending = deferred();
  globalThis.fetch = () => pending.promise;
  const request = apiFetch("/private-records");
  setStaff(2);
  pending.resolve(Response.json({ message: "Old session expired" }, { status: 401 }));
  await assert.rejects(request, SessionChangedError);
  assert.equal(store.getState().user.id, 2);
});

test("a write waiting for CSRF is never sent after the account changes", async () => {
  setStaff(1);
  const pending = deferred();
  let calls = 0;
  globalThis.fetch = () => { calls++; return pending.promise; };
  const request = apiFetch("/private-records", { method: "POST", data: { private: "old staff draft" } });
  setStaff(2);
  pending.resolve(Response.json({ data: { csrf_token: "old-csrf" } }));
  await assert.rejects(request, SessionChangedError);
  assert.equal(calls, 1);
});

test("current-session 401 failures clear identity and private drafts", async () => {
  setStaff(1);
  let draft = "private";
  const stop = registerSessionCleanup(() => { draft = ""; });
  try {
    globalThis.fetch = async () => Response.json({ message: "Please sign in" }, { status: 401 });
    await assert.rejects(apiFetch("/private-records"), (error) => error.status === 401);
    assert.equal(store.getState().status, "guest");
    assert.equal(draft, "");
  } finally { stop(); }
});

test("network uncertainty and blocking rechecks remove the active identity", () => {
  setStaff(1);
  store.getState().setError("Connection unavailable");
  assert.equal(store.getState().user, null);
  assert.equal(store.getState().status, "error");
  setStaff(1);
  store.getState().lockAuth();
  assert.equal(store.getState().user, null);
  assert.equal(store.getState().status, "checking");
});

test("uploaded document URLs are revoked when the staff session changes", async () => {
  setStaff(1);
  const url = createSessionObjectUrl(new Blob(["private document"]));
  assert.equal(await (await originalFetch(url)).text(), "private document");
  setStaff(2);
  await assert.rejects(originalFetch(url));
});

test("patient tables and pending clinical work cannot carry over to another staff member", () => {
  const medical = loadSource("src/pages/doctor/patientProfile/hooks/useMedicalTable.ts");
  setStaff(1);
  medical.openPatientRecord("patient-A");
  medical.setPendingSectionEntry("REPORT WRITING", { report: "private staff A note" });
  medical.commitPendingCategoryEntries("Staff A", "Staff A", ["REPORT WRITING"]);
  assert.ok(JSON.stringify(medical.getSectionTableRows("REPORT WRITING")).includes("private staff A note"));
  medical.openPatientRecord("patient-B");
  medical.setPendingSectionEntry("REPORT WRITING", { report: "pending staff A note" });
  setStaff(2);
  assert.deepEqual(medical.getPendingSectionRows("REPORT WRITING"), []);
  medical.openPatientRecord("patient-A");
  assert.equal(JSON.stringify(medical.getSectionTableRows("REPORT WRITING")).includes("private staff A note"), false);
});
