import test, { afterEach } from "node:test";
import assert from "node:assert/strict";
import { loadSource } from "./source-loader.mjs";

const memoryStorage = () => ({ getItem: () => null, setItem() {}, removeItem() {} });
globalThis.window = { localStorage: memoryStorage(), sessionStorage: memoryStorage() };
const originalFetch = globalThis.fetch;
const { useAuthStore: store } = loadSource("src/store/useAuthStore.ts");
const { setCsrfToken, SessionChangedError } = loadSource("src/api/client/apClient.ts");
const { WriteAttempt } = loadSource("src/api/client/writeAttempt.ts");
const { isModuleAllowed } = loadSource("src/lib/authRoutes.ts");
const api = loadSource("src/api/visits.ts");
const input = { first_name: "Synthetic", last_name: "Caller", phone: "+2348012345678", starts_at: "2026-11-20T09:00:00+01:00", ends_at: "2026-11-20T09:30:00+01:00", booking_channel: "Voice Call", visit_type: "General Consultation", doctor_id: null, specialist_name: null, specialist_email: null };
const booking = (changes = {}) => ({ ...input, id: 7, version: 1, patient_id: null, booked_by: 1, status: "booked", follow_up_of_id: null, created_at: "2026-11-11T08:00:00Z", updated_at: "2026-11-11T08:00:00Z", ...changes });
const assignment = (changes = {}) => ({ id: 8, doctor_id: 1, assigned_by: 2, ended_by: null, version: 1, consultation_type: "General Consultation", status: "assigned", assigned_at: "2026-11-11T08:00:00Z", accepted_at: null, ended_at: null, ...changes });
const visit = (changes = {}) => ({ id: 9, version: 1, patient_id: 4, appointment_id: null, category_id: 1, opened_by: 1, visit_type: "General Consultation", care_setting: "OPD", status: "open", opened_at: "2026-11-11T08:00:00Z", closed_at: null, queue: "unassigned", current_assignment: null, patient: { id: 4, mrn: "SYNTHETIC-4", first_name: "Synthetic", last_name: "Patient", version: 2 }, ...changes });
function session(id = 1, permissions = ["patients.view", "appointments.view", "encounters.view"]) {
  store.getState().setUser({ id, department: null, is_active: true, roles: [{ code: "doctor" }], permissions }, Date.now() + 60000);
  setCsrfToken("synthetic-csrf");
}
afterEach(() => { store.getState().clearAuth(); globalThis.fetch = originalFetch; });

test("booking and visit workspaces use independent opt-in permissions for every role", () => {
  assert.equal(isModuleAllowed("/appointments/7", ["admin"], []), false);
  assert.equal(isModuleAllowed("/visits/9", ["doctor"], []), false);
  assert.equal(isModuleAllowed("/appointments", [], ["appointments.view"]), true);
  assert.equal(isModuleAllowed("/visits", [], ["encounters.view"]), false);
  assert.equal(isModuleAllowed("/visits", [], ["patients.view", "encounters.view"]), true);
});

test("Nigeria date inputs round-trip independently of the workstation timezone", () => {
  const previous = process.env.TZ;
  try {
    for (const zone of ["America/Los_Angeles", "Asia/Tokyo", "UTC"]) {
      process.env.TZ = zone;
      assert.equal(api.hospitalInstant("2026-11-20T00:15"), "2026-11-20T00:15:00+01:00");
      assert.equal(api.hospitalInput("2026-11-19T23:15:00Z"), "2026-11-20T00:15");
      assert.match(api.hospitalTime("2026-11-19T23:15:00Z"), /20 Nov 2026, 00:15/);
    }
  } finally { if (previous === undefined) delete process.env.TZ; else process.env.TZ = previous; }
});

test("hospital conversion rejects nonexistent calendar dates and incomplete or offset-less inputs", () => {
  for (const value of ["2026-11-31T09:00", "2026-02-29T09:00", "2026-13-01T09:00", "2026-11-20T24:00", "2026-11-20T09:60", "2026-11-20", "2026-11-20T09:00Z", "26-11-20T09:00"]) {
    assert.throws(() => api.hospitalInstant(value), (error) => error.code === "invalid_hospital_time");
  }
  assert.equal(api.hospitalInput(null), ""); assert.equal(api.hospitalTime(null), "Not recorded");
});

test("booking search sends literal filters and page bounds to the server with no private caching", async () => {
  session();
  globalThis.fetch = async (url, options) => {
    const query = new URL(url, "http://localhost").searchParams;
    assert.equal(query.get("q"), "Caller % & _"); assert.equal(query.get("from_date"), "2026-11-20"); assert.equal(query.get("page"), "2");
    assert.equal(options.cache, "no-store"); assert.equal(options.credentials, "include");
    return Response.json({ data: [], meta: { total: 0, current_page: 2, last_page: 1 } });
  };
  assert.equal((await api.listBookings({ q: "Caller % & _", from_date: "2026-11-20", page: 2 })).data.length, 0);
});

test("queues and historical registers use distinct endpoints and preserve server scope filters", async () => {
  session(); const paths = [];
  globalThis.fetch = async (url) => { paths.push(url); return Response.json({ data: [], meta: { total: 0, current_page: 1, last_page: 1 } }); };
  await api.listVisits({ doctor_id: 1, queue: "waiting", patient_id: 4 }, true);
  await api.listVisits({ status: "closed", page: 2 }, false);
  assert.match(paths[0], /^\/api\/v1\/queues\?/); assert.match(paths[0], /doctor_id=1/); assert.match(paths[0], /queue=waiting/);
  assert.match(paths[1], /^\/api\/v1\/encounters\?/); assert.match(paths[1], /status=closed/);
});

test("booking creation confirms matching saved caller, interval, identity and first version", async () => {
  session();
  globalThis.fetch = async (_url, options) => {
    assert.equal(options.headers.get("Idempotency-Key"), "synthetic-booking-key-001");
    return Response.json({ data: booking() });
  };
  assert.equal((await api.saveBooking(null, input, "synthetic-booking-key-001")).data.id, 7);
  for (const data of [booking({ first_name: "Other" }), booking({ version: 2 }), booking({ starts_at: "2026-11-20T12:00:00Z" }), booking({ patient_id: 99 }), booking({ status: "attended" }), { id: 7, version: 1 }]) {
    globalThis.fetch = async () => Response.json({ data });
    await assert.rejects(api.saveBooking(null, input, "synthetic-booking-key-001"), (error) => error.code === "invalid_response");
  }
});

test("booking confirmation accepts documented phone, email and UTC normalization", async () => {
  session();
  globalThis.fetch = async () => Response.json({ data: booking({ phone: "+2348012345678", specialist_email: "synthetic@example.test", starts_at: "2026-11-20T08:00:00.000000Z", ends_at: "2026-11-20T08:30:00.000000Z" }) });
  await api.saveBooking(null, { ...input, phone: "234 801-234-5678", specialist_email: "Synthetic@Example.test" }, "synthetic-booking-key-001");
});

test("partial booking edits do not resend unchanged past interval fields or change identity", async () => {
  session();
  globalThis.fetch = async (_url, options) => {
    assert.equal(options.method, "PATCH");
    assert.deepEqual(JSON.parse(options.body), { version: 2, reason: "Synthetic correction", phone: "+2348099999999" });
    return Response.json({ data: booking({ version: 3, phone: "+2348099999999" }) });
  };
  await api.saveBooking(7, { version: 2, reason: "Synthetic correction", phone: "+2348099999999" }, "synthetic-edit-key-001");
  globalThis.fetch = async () => Response.json({ data: booking({ id: 8, version: 3 }) });
  await assert.rejects(api.saveBooking(7, { version: 2 }, "synthetic-edit-key-001"), (error) => error.code === "invalid_response");
});

for (const [action, status] of [["confirm", "confirmed"], ["cancel", "cancelled"], ["no-show", "no_show"]]) {
  test(action + " requires the matching booking, next version and resulting status", async () => {
    session(); globalThis.fetch = async () => Response.json({ data: booking({ version: 2, status }) });
    await api.bookingCommand(7, action, { version: 1, reason: "Synthetic action" }, "synthetic-action-key-001");
    globalThis.fetch = async () => Response.json({ data: booking({ version: 2 }) });
    await assert.rejects(api.bookingCommand(7, action, { version: 1, reason: "Synthetic action" }, "synthetic-action-key-001"), (error) => error.code === "invalid_response");
  });
}

test("arrival confirms the unique booking link and explicitly selected registered identity", async () => {
  session();
  const data = { version: 1, patient_id: 4, patient_version: 2, identity_verified: true, care_setting: "OPD", reason: "Synthetic check" };
  globalThis.fetch = async (url, options) => { assert.equal(url, "/api/v1/appointments/7/arrive"); assert.deepEqual(JSON.parse(options.body), data); return Response.json({ data: visit({ appointment_id: 7 }) }); };
  await api.openVisit(7, data, "synthetic-arrival-key-001");
  for (const result of [visit(), visit({ appointment_id: 8 }), visit({ appointment_id: 7, patient_id: 5 }), visit({ appointment_id: 7, version: 2 }), visit({ appointment_id: 7, current_assignment: assignment() })]) {
    globalThis.fetch = async () => Response.json({ data: result });
    await assert.rejects(api.openVisit(7, data, "synthetic-arrival-key-001"), (error) => error.code === "invalid_response");
  }
});

test("walk-in confirmation cannot substitute a booked visit or a different patient", async () => {
  session(); const data = { patient_id: 4, patient_version: 2, identity_verified: true, care_setting: "OPD", visit_type: "General Consultation" };
  globalThis.fetch = async (url) => { assert.equal(url, "/api/v1/encounters"); return Response.json({ data: visit() }); };
  await api.openVisit(null, data, "synthetic-walkin-key-001");
  globalThis.fetch = async () => Response.json({ data: visit({ appointment_id: 7 }) });
  await assert.rejects(api.openVisit(null, data, "synthetic-walkin-key-001"), (error) => error.code === "invalid_response");
});

for (const action of ["assign", "reassign"]) {
  test(action + " confirms the chosen clinician and a new current assignment", async () => {
    session(); const data = { version: 2, doctor_id: 1, consultation_type: "General Consultation", reason: "Synthetic handover", ...(action === "reassign" ? { assignment_id: 5, assignment_version: 2 } : {}) };
    globalThis.fetch = async () => Response.json({ data: visit({ version: 3, queue: "waiting", current_assignment: assignment() }) });
    await api.visitCommand(9, action, data, "synthetic-assignment-key-001");
    for (const current of [assignment({ doctor_id: 3 }), assignment({ version: 2 }), assignment({ id: 5, status: "accepted" })]) {
      globalThis.fetch = async () => Response.json({ data: visit({ version: 3, current_assignment: current }) });
      await assert.rejects(api.visitCommand(9, action, data, "synthetic-assignment-key-001"), (error) => error.code === "invalid_response");
    }
  });
}

test("acceptance confirms the same assignment and advances both expected versions", async () => {
  session(); const data = { version: 2, assignment_id: 8, assignment_version: 1, reason: "Synthetic acceptance" };
  globalThis.fetch = async () => Response.json({ data: visit({ version: 3, status: "in_progress", queue: "in_progress", current_assignment: assignment({ version: 2, status: "accepted" }) }) });
  await api.visitCommand(9, "accept", data, "synthetic-accept-key-001");
  globalThis.fetch = async () => Response.json({ data: visit({ version: 3, status: "in_progress", current_assignment: assignment({ id: 99, version: 2, status: "accepted" }) }) });
  await assert.rejects(api.visitCommand(9, "accept", data, "synthetic-accept-key-001"), (error) => error.code === "invalid_response");
});

for (const [action, status] of [["complete", "closed"], ["cancel", "cancelled"]]) {
  test(action + " must end the current assignment and confirm terminal visit state", async () => {
    session(); const data = { version: 3, reason: "Synthetic closure", assignment_id: 8, assignment_version: 2 };
    globalThis.fetch = async () => Response.json({ data: visit({ version: 4, status }) });
    await api.visitCommand(9, action, data, "synthetic-closure-key-001");
    globalThis.fetch = async () => Response.json({ data: visit({ version: 4, status, current_assignment: assignment() }) });
    await assert.rejects(api.visitCommand(9, action, data, "synthetic-closure-key-001"), (error) => error.code === "invalid_response");
  });
}

test("a lost booking response retains one explicit key without automatically resubmitting", async () => {
  session(); const attempt = new WriteAttempt(); const key = attempt.key(); let calls = 0;
  globalThis.fetch = async (_url, options) => { calls++; assert.equal(options.headers.get("Idempotency-Key"), key); throw new TypeError("Synthetic lost response"); };
  await assert.rejects(api.saveBooking(null, input, attempt.key()), (error) => error.code === "network_error");
  assert.equal(calls, 1); assert.equal(attempt.key(), key);
  globalThis.fetch = async () => Response.json({ data: booking() });
  assert.equal((await api.saveBooking(null, input, attempt.key())).data.id, 7);
});

test("bad route IDs never issue requests and detail responses cannot select another record", async () => {
  session(); let calls = 0; globalThis.fetch = async () => { calls++; return Response.json({}); };
  for (const id of [0, -1, 1.5, "P-001", "01", Number.MAX_SAFE_INTEGER + 1]) {
    await assert.rejects(api.getBooking(id)); await assert.rejects(api.getVisit(id));
  }
  assert.equal(calls, 0);
  globalThis.fetch = async () => Response.json({ data: visit({ id: 10 }) });
  await assert.rejects(api.getVisit(9), (error) => error.code === "invalid_response");
});

test("late visit data and confirmations cannot cross account or permission boundaries", async () => {
  session(); let finish;
  globalThis.fetch = () => new Promise((resolve) => { finish = resolve; });
  const pending = api.getVisit(9); session(2); finish(Response.json({ data: visit() }));
  await assert.rejects(pending, SessionChangedError);
  const attempt = new WriteAttempt(); const key = attempt.key();
  session(2, ["patients.view"]); assert.notEqual(attempt.key(), key);
});

test("hospital option catalogs fail closed if the configured timezone changes", async () => {
  session(); globalThis.fetch = async () => Response.json({ data: { timezone: "UTC", visit_types: [], booking_channels: [], care_settings: [] } });
  await assert.rejects(api.bookingOptions(), (error) => error.code === "invalid_response");
  await assert.rejects(api.visitOptions(), (error) => error.code === "invalid_response");
});
