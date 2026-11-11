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


test("audit reviewers and staff managers have separate administration routes", () => {
  const { isModuleAllowed } = loadSource("src/lib/authRoutes.ts");
  assert.equal(isModuleAllowed("/admin/audit", ["doctor"], ["audit.view"]), true);
  assert.equal(isModuleAllowed("/admin/users", ["doctor"], ["audit.view"]), false);
  assert.equal(isModuleAllowed("/admin", [], ["audit.view"]), true);
  assert.equal(isModuleAllowed("/admin/audit", ["admin"], ["staff.manage"]), false);
  assert.equal(isModuleAllowed("/admin/users", [], ["staff.manage"]), true);
  assert.equal(isModuleAllowed("/admin/audit", ["admin"], []), false);
});


test("multipart uploads keep the browser boundary and the session CSRF token", async () => {
  setStaff(1);
  loadSource("src/api/client/apClient.ts").setCsrfToken("private-csrf");
  const data = new FormData();
  data.set("file", new Blob(["private document"], {type: "application/pdf"}), "report.pdf");
  let sent;
  globalThis.fetch = async (_url, options) => { sent = options; return new Response(JSON.stringify({data: {id: 7}})); };
  const result = await apiFetch("/files", {method: "POST", data, headers: {"Content-Type": "application/json"}});
  assert.equal(result.data.id, 7);
  assert.equal(sent.body, data);
  assert.equal(sent.headers.has("Content-Type"), false);
  assert.equal(sent.headers.get("X-CSRF-TOKEN"), "private-csrf");
  assert.equal(sent.credentials, "include");
  assert.equal(sent.cache, "no-store");
});

test("private downloads preserve bytes and expose JSON authorization failures", async () => {
  setStaff(1);
  globalThis.fetch = async () => new Response(new Uint8Array([0, 255, 13, 10]), {headers: {"Content-Type": "application/octet-stream"}});
  const blob = await apiFetch("/files/7/download", {responseType: "blob"});
  assert.deepEqual([...new Uint8Array(await blob.arrayBuffer())], [0, 255, 13, 10]);
  globalThis.fetch = async () => new Response(JSON.stringify({message: "File access denied", code: "forbidden"}), {status: 403});
  await assert.rejects(apiFetch("/files/7/download", {responseType: "blob"}), error => error.status === 403 && error.message === "File access denied");
});

test("a download body finishing after an account change cannot be returned", async () => {
  setStaff(1);
  const body = deferred(), started = deferred();
  globalThis.fetch = async () => ({
    status: 200, ok: true, headers: new Headers({"Content-Type": "application/octet-stream"}),
    blob: () => { started.resolve(); return body.promise; },
  });
  const pending = apiFetch("/files/7/download", {responseType: "blob"});
  const rejected = assert.rejects(pending, SessionChangedError);
  await started.promise;
  setStaff(2);
  body.resolve(new Blob(["staff 1 private document"]));
  await rejected;
});

test("a successful HTML response cannot be saved as a private file", async () => {
  setStaff(1);
  globalThis.fetch = async () => new Response("<html>wrong route</html>", {headers: {"Content-Type": "text/html"}});
  await assert.rejects(apiFetch("/files/7/download", {responseType: "blob"}), error => error.code === "invalid_response");
});

test("file-only staff can enter their own library without staff or audit access", () => {
  const { isModuleAllowed } = loadSource("src/lib/authRoutes.ts");
  assert.equal(isModuleAllowed("/admin/files", [], ["files.view_own"]), true);
  assert.equal(isModuleAllowed("/admin", [], ["files.view_own"]), true);
  assert.equal(isModuleAllowed("/admin/audit", [], ["files.view_own"]), false);
  assert.equal(isModuleAllowed("/admin/users", [], ["files.view_own"]), false);
  assert.equal(isModuleAllowed("/admin/files", ["admin"], ["staff.manage"]), false);
  assert.equal(isModuleAllowed("/admin/files", [], ["files.upload"]), false);
});


test("section form unsubscribe returns void and removes only its own listener", () => {
  const { subscribeSectionFormClear, clearPendingSectionEntries } = loadSource("src/pages/doctor/patientProfile/hooks/useMedicalTable.ts");
  let first = 0;
  let second = 0;
  const stopFirst = subscribeSectionFormClear("TYPECHECK_TEST", () => { first += 1; });
  const stopSecond = subscribeSectionFormClear("TYPECHECK_TEST", () => { second += 1; });
  try {
    clearPendingSectionEntries(["TYPECHECK_TEST"]);
    assert.deepEqual([first, second], [1, 1]);
    assert.equal(stopFirst(), undefined);
    clearPendingSectionEntries(["TYPECHECK_TEST"]);
    assert.deepEqual([first, second], [1, 2]);
    assert.equal(stopFirst(), undefined);
  } finally { stopFirst(); stopSecond(); }
});


test("write keys survive a lost response, change for new work, and cannot cross an access boundary", async () => {
  const { WriteAttempt } = loadSource("src/api/client/writeAttempt.ts");
  const attempt = new WriteAttempt();
  setStaff(1);
  const first = attempt.key();
  assert.match(first, /^[0-9a-f]{32}$/);
  let calls = 0;
  const { saveStaff } = loadSource("src/api/staff.ts");
  const { setCsrfToken } = loadSource("src/api/client/apClient.ts");
  setCsrfToken("synthetic-csrf");
  globalThis.fetch = async (_url, options) => {
    calls++;
    assert.equal(options.headers.get("Idempotency-Key"), first);
    throw new TypeError("Synthetic lost connection");
  };
  await assert.rejects(saveStaff(null, {username: "synthetic"}, attempt.key()), error => error.code === "network_error");
  assert.equal(calls, 1, "a failed write must never be automatically replayed");
  assert.equal(attempt.key(), first);
  attempt.reset();
  const second = attempt.key();
  assert.notEqual(second, first);
  setStaff(2);
  assert.notEqual(attempt.key(), second);
});

test("multipart uploads pass the explicit key without changing the selected bytes", async () => {
  setStaff(1);
  const { uploadFile } = loadSource("src/api/files.ts");
  const { setCsrfToken } = loadSource("src/api/client/apClient.ts");
  setCsrfToken("synthetic-csrf");
  const file = new File(["synthetic document"], "synthetic.pdf", {type: "application/pdf"});
  globalThis.fetch = async (_url, options) => {
    assert.equal(options.headers.get("Idempotency-Key"), "synthetic-command-key-000001");
    assert.equal(await options.body.get("file").text(), "synthetic document");
    assert.equal(options.headers.has("Content-Type"), false);
    return new Response(JSON.stringify({data:{id:7,byte_size:file.size}}), {headers:{"Content-Type":"application/json"}});
  };
  const result = await uploadFile(file, "synthetic-command-key-000001");
  assert.equal(result.data.id, 7);
});

test("retry rules expose Retry-After without automatically retrying a busy save", async () => {
  setStaff(1);
  const { setCsrfToken } = loadSource("src/api/client/apClient.ts");
  const { isUncertainWrite, writeErrorMessage } = loadSource("src/api/client/writeAttempt.ts");
  setCsrfToken("synthetic-csrf");
  let calls = 0;
  globalThis.fetch = async () => {
    calls++;
    return new Response(JSON.stringify({code:"write_busy",message:"Another save is using this record."}), {
      status:503,headers:{"Content-Type":"application/json","Retry-After":"3"},
    });
  };
  await assert.rejects(apiFetch("/staff-management", {method:"POST", data:{}}), error => {
    assert.equal(error.retryAfterSeconds, 3);
    assert.equal(isUncertainWrite(error), true);
    assert.match(writeErrorMessage(error), /Wait 3 seconds/);
    return true;
  });
  assert.equal(calls, 1);
});

test("known validation conflicts and permission failures differ from an unconfirmed save", () => {
  const { ApiError } = loadSource("src/api/client/apClient.ts");
  const { isUncertainWrite } = loadSource("src/api/client/writeAttempt.ts");
  assert.equal(isUncertainWrite(new ApiError("Invalid",422)), false);
  assert.equal(isUncertainWrite(new ApiError("Stale",409,"conflict")), false);
  assert.equal(isUncertainWrite(new ApiError("Forbidden",403)), false);
  assert.equal(isUncertainWrite(new ApiError("Unreadable",200,"invalid_response")), true);
  assert.equal(isUncertainWrite(new ApiError("Cancelled",0,"request_cancelled")), true);
});


test("a successful JSON response without a matching write outcome cannot confirm a save", async () => {
  setStaff(1);
  const { uploadFile } = loadSource("src/api/files.ts");
  const { saveStaff } = loadSource("src/api/staff.ts");
  const { setCsrfToken } = loadSource("src/api/client/apClient.ts");
  setCsrfToken("synthetic-csrf");
  globalThis.fetch = async () => new Response(JSON.stringify({data:{status:"healthy"}}), {headers:{"Content-Type":"application/json"}});
  const file = new File(["synthetic document"], "synthetic.pdf");
  await assert.rejects(uploadFile(file,"synthetic-command-000001"), error => error.code === "invalid_response");
  await assert.rejects(saveStaff(null,{username:"synthetic"},"synthetic-command-000002"), error => error.code === "invalid_response");
});
