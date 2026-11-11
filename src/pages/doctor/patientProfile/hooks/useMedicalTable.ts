import { useSyncExternalStore } from "react";
import { registerSessionCleanup } from "@/lib/sessionScope";
import { useAuth } from "@doctor-shared/context/useAuth";
import { DIAGNOSIS_SEED } from "../data/diagnosisSeed";
import { INVESTIGATION_SEED } from "../data/investigationSeed";
import { IMAGING_SEED, XRAY_SEED } from "../data/imagingSeed";
import { PHYSICAL_EXAMINATION_SEED } from "../data/physicalExaminationSeed";
import { PRESENTING_COMPLAINTS_SEED } from "../data/presentingComplaintsSeed";
import { PROCEDURE_SEED } from "../data/procedureSeed";
import {
  ACCOUNT_REVIEW_SEED,
  ADMISSION_BILL_SEED,
  CLAIMS_PROCESSOR_SEED,
  INVOICE_SEED,
  PAYMENT_HISTORY_SEED,
  RECEIPT_SEED,
  SERVICE_FEE_SEED,
} from "../data/financialSeed";
import { TREATMENT_SEED } from "../data/treatmentSeed";
import { VACCINE_ADMINISTRATION_SEED } from "../data/vaccineAdministrationSeed";
import { VITAL_SIGNS_SEED } from "../data/vitalSignsSeed";
import { getGenConsultRecordPatientType } from "./genConsultSession";

export const MEDICATION_REMARK_OPTIONS = [
  "1st Dose",
  "2nd Dose",
  "3rd Dose",
  "4th Dose",
  "5th Dose",
  "Completed",
  "Declined",
  "Dispensed",
  "Given",
  "Missed",
  "Not Available",
  "Served",
] as const;

function formatMedicalDateTime(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("en-GB", { month: "short" });
  const year = date.getFullYear();
  const time = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return `${day}-${month}-${year} ${time}`;
}

const INITIAL_MEDICATION_ROWS: Record<string, unknown>[] = [
  {
    id: "med-seed-1",
    sn: 1,
    dateTime: "15-Feb-2026 10:25 AM",
    patientType: "In-Patient",
    medication: "Folic Acid 5MG",
    adminRoute: "Oral",
    dosage: "1 Tab Daily",
    amount: "N 1,500.00",
    lineTotal: 1500,
    remark: "Served",
    served: true,
    dispensedBy: "Titilayo Olayinka",
    doctor: "Dr. Chibuzor",
  },
  {
    id: "med-seed-2",
    sn: 2,
    dateTime: "16-Feb-2026 02:30 PM",
    patientType: "Out-Patient",
    medication: "Ferrous Sulphate 200MG",
    adminRoute: "Oral",
    dosage: "1 Tab BD",
    amount: "N 2,500.00",
    lineTotal: 2500,
    remark: "1st Dose",
    served: true,
    dispensedBy: "Titilayo Olayinka",
    doctor: "Dr. Chibuzor",
  },
  {
    id: "med-seed-3",
    sn: 3,
    dateTime: "10-Mar-2026 09:15 AM",
    patientType: "In-Patient",
    medication: "Paracetamol 500MG",
    adminRoute: "Oral",
    dosage: "2 Tabs TDS",
    amount: "N 1,200.00",
    lineTotal: 1200,
    remark: "Given",
    served: true,
    dispensedBy: "Titilayo Olayinka",
    doctor: "Dr. Chibuzor",
  },
];

function buildNursingDispensesFromMedication(
  medRows: Record<string, unknown>[]
): Record<string, unknown>[] {
  return medRows
    .filter((row) => Boolean(row.served) || Boolean(String(row.remark ?? "").trim()))
    .map((row, idx) => ({
      ...row,
      sn: idx + 1,
      remark: String(row.remark || "Served"),
      dispensedBy: String(row.dispensedBy || "—"),
    }));
}

const INITIAL_TABLES: Record<string, Record<string, unknown>[]> = {
  "VITAL SIGNS": [...VITAL_SIGNS_SEED],
  "PRESENTING COMPLAINTS": [...PRESENTING_COMPLAINTS_SEED],
  "PHYSICAL EXAMINATION": [...PHYSICAL_EXAMINATION_SEED],
  DIAGNOSIS: [...DIAGNOSIS_SEED],
  INVESTIGATION: [...INVESTIGATION_SEED],
  "MEDICAL IMAGING": [...IMAGING_SEED],
  "X-RAY (RADIOGRAPHY)": [...XRAY_SEED],
  TREATMENT: [...TREATMENT_SEED],
  PROCEDURE: [...PROCEDURE_SEED],
  MEDICATION: [...INITIAL_MEDICATION_ROWS],
  "VACCINE ADMINISTRATION": [...VACCINE_ADMINISTRATION_SEED],
  "REPORT WRITING": [],
  "IN-TAKE CHART": [
    {
      sn: 1,
      dateTime: "15-Feb-2026 10:25 AM",
      patientType: "In-Patient",
      fluidType: "IV",
      iv: "500ml Normal Saline",
      oral: "200ml Water",
      rectal: "—",
      intakeTotal: "700",
    },
  ],
  "OUTPUT CHART": [
    {
      sn: 1,
      dateTime: "15-Feb-2026 10:25 AM",
      patientType: "In-Patient",
      gastricAspiration: "50ml",
      blood: "—",
      urine: "450ml",
      urineOutput: "—",
      vomit: "—",
      stool: "Formed x1",
      outputTotal: "500",
      fluidBalance: "+200",
    },
  ],
  "PRE-OPERATION NOTE": [
    {
      sn: 1,
      dateTime: "15-Feb-2026 10:25 AM",
      patientType: "In-Patient",
      preOpHB: "12.5 g/dL",
      genotype: "AA",
      hiv: "Negative (-)",
      hepatitis: "Negative (-)",
      bloodGroup: "O+",
      allergies: "NKDA",
      operationProposed: "Appendectomy",
      indication: "Acute Appendicitis",
      operationState: "Emergency",
      proposedDate: "15-Feb-2026",
      consentGiven: "YES",
      signature: "Signed",
    },
  ],
  "POST-OPERATION NOTE": [
    {
      sn: 1,
      dateTime: "15-Feb-2026 01:30 PM",
      patientType: "In-Patient",
      surgeon: "Dr. Adebayo",
      procedureFindings: "Open appendectomy completed, inflamed appendix excised without perforation.",
      swabCount: "YES",
      bloodLoss: "50 ml",
      bloodPressure: "118/76",
      pulse: "74",
      respiration: "18 / 98%",
      signature: "Signed",
    },
  ],
  "POST-OPERATION ORDERS": [
    {
      sn: 1,
      dateTime: "15-Feb-2026 02:00 PM",
      patientType: "In-Patient",
      ordersNote: "NPO for 6 hours post-op, IV fluids 1L D/S over 8h, monitor vitals q4h, elevate head of bed.",
      enteredBy: "Dr. Adebayo",
    },
  ],
  "NURSING DISPENSES": buildNursingDispensesFromMedication(INITIAL_MEDICATION_ROWS),
  "PHARMACY DISPENSE": [],
  "NEO NATAL:DIAGNOSIS": [],
  "NEO NATAL:INVESTIGATION": [],
  "NEO NATAL:PROCEDURE": [],
  "ACCOUNT REVIEW": [...ACCOUNT_REVIEW_SEED],
  ADMISSION_BILL: [...ADMISSION_BILL_SEED],
  "ADMISSION BILL": [...ADMISSION_BILL_SEED],
  "SERVICE FEE": [...SERVICE_FEE_SEED],
  "CLAIMS PROCESSOR": [...CLAIMS_PROCESSOR_SEED],
  INVOICE: [...INVOICE_SEED],
  RECEIPT: [...RECEIPT_SEED],
  "PAYMENT HISTORY": [...PAYMENT_HISTORY_SEED],
  "PREVIOUS DENTAL HISTORY": [],
  "PREVIOUS DENTAL MEDICATION": [],
};

function cloneInitialTables(): Record<string, Record<string, unknown>[]> {
  return structuredClone(INITIAL_TABLES);
}

let tables = cloneInitialTables();
let userSavedTableKeys = new Set<string>();
const listeners = new Set<() => void>();

const DIAGNOSIS_TABLE_KEY = "DIAGNOSIS";
const PRESENTING_COMPLAINTS_TABLE_KEY = "PRESENTING COMPLAINTS";
const PHYSICAL_EXAMINATION_TABLE_KEY = "PHYSICAL EXAMINATION";
const MEDICATION_TABLE_KEY = "MEDICATION";
const PENDING_BATCH_KEY = "__batch__";
const PENDING_INCOMPLETE_KEY = "__incomplete__";

let pendingSectionEntries: Record<string, Record<string, string>> = {};
const sectionClearListeners = new Map<string, Set<() => void>>();

const patientRecords = new Map<string, { tables: typeof tables; saved: Set<string> }>();
let activePatientId: string | undefined;

registerSessionCleanup(() => {
  tables = cloneInitialTables();
  userSavedTableKeys = new Set();
  pendingSectionEntries = {};
  patientRecords.clear();
  activePatientId = undefined;
  sectionClearListeners.clear();
});

export function openPatientRecord(patientId: string) {
  if (activePatientId) patientRecords.set(activePatientId, { tables, saved: userSavedTableKeys });
  const record = patientRecords.get(patientId);
  tables = record?.tables ?? cloneInitialTables();
  userSavedTableKeys = record?.saved ?? new Set();
  pendingSectionEntries = {};
  activePatientId = patientId;
  emitChange();
}

function emitChange() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return tables;
}

export function setPendingSectionEntry(
  tableKey: string,
  data: Record<string, string> | null
) {
  if (!data) {
    delete pendingSectionEntries[tableKey];
    return;
  }
  pendingSectionEntries[tableKey] = data;
}

export function subscribeSectionFormClear(
  tableKey: string,
  listener: () => void
) {
  if (!sectionClearListeners.has(tableKey)) {
    sectionClearListeners.set(tableKey, new Set());
  }
  sectionClearListeners.get(tableKey)!.add(listener);
  return () => {
    sectionClearListeners.get(tableKey)?.delete(listener);
  };
}

function notifySectionClear(tableKey: string) {
  sectionClearListeners.get(tableKey)?.forEach((listener) => listener());
}

function clearPendingSection(tableKey: string) {
  delete pendingSectionEntries[tableKey];
  notifySectionClear(tableKey);
}

export function clearPendingSectionEntries(tableKeys: string[]) {
  tableKeys.forEach(clearPendingSection);
}

function hasPendingSectionEntry(sectionLabel: string): boolean {
  const data = pendingSectionEntries[sectionLabel];
  if (!data) return false;

  if (data[PENDING_BATCH_KEY]) return true;

  switch (sectionLabel) {
    case DIAGNOSIS_TABLE_KEY:
    case "NEO NATAL:DIAGNOSIS":
      return Boolean(data.diagnosis?.trim());
    case PRESENTING_COMPLAINTS_TABLE_KEY:
      return Boolean(data.complaint?.trim());
    case PHYSICAL_EXAMINATION_TABLE_KEY:
      return Boolean(data.general?.trim());
    case MEDICATION_TABLE_KEY:
      if (data[PENDING_INCOMPLETE_KEY]) return false;
      return Boolean(data.__payload__);
    default:
      return Object.entries(data).some(([, value]) => value.trim() !== "");
  }
}

/** True when the user has saved at least one entry in any of the given sections. */
export function hasUserSavedInSections(sectionLabels: string[]): boolean {
  return sectionLabels.some((label) => userSavedTableKeys.has(label));
}

/** Clears saved markers for the current category so submit requires fresh entries. */
export function resetUserSavedSections(sectionLabels: string[]) {
  sectionLabels.forEach((label) => userSavedTableKeys.delete(label));
}

export function getUserSavedSectionLabels(
  sectionLabels: string[]
): string[] {
  return sectionLabels.filter((label) => userSavedTableKeys.has(label));
}

export function getSectionEntryCount(sectionLabel: string): number {
  return tables[sectionLabel]?.length ?? 0;
}

export function getSectionTableRows(
  sectionLabel: string
): Record<string, unknown>[] {
  return [...(tables[sectionLabel] ?? [])];
}

export type PendingPhysicalExamination = {
  general: string;
  cns: string;
  chest: string;
  cvs: string;
  abdomen: string;
  dre: string;
  ve: string;
  mss: string;
  ent: string;
  comments: string;
};

type PendingDiagnosis = {
  diagnosis: string;
  icdDiagnosis: "YES" | "NO";
};

export function setPendingDiagnosis(
  entry: PendingDiagnosis | null,
  key = DIAGNOSIS_TABLE_KEY
) {
  setPendingSectionEntry(
    key,
    entry
      ? {
          diagnosis: entry.diagnosis,
          icdDiagnosis: entry.icdDiagnosis,
        }
      : null
  );
}

export function setPendingPresentingComplaint(value: string | null) {
  setPendingSectionEntry(
    PRESENTING_COMPLAINTS_TABLE_KEY,
    value ? { complaint: value } : null
  );
}

export function setPendingPhysicalExamination(
  entry: PendingPhysicalExamination | null
) {
  setPendingSectionEntry(
    PHYSICAL_EXAMINATION_TABLE_KEY,
    entry ? { ...entry } : null
  );
}

export function subscribeDiagnosisFormClear(
  listener: () => void,
  key = DIAGNOSIS_TABLE_KEY
) {
  return subscribeSectionFormClear(key, listener);
}

export function subscribePresentingComplaintFormClear(listener: () => void) {
  return subscribeSectionFormClear(PRESENTING_COMPLAINTS_TABLE_KEY, listener);
}

export function subscribePhysicalExaminationFormClear(listener: () => void) {
  return subscribeSectionFormClear(PHYSICAL_EXAMINATION_TABLE_KEY, listener);
}

export function isSectionFilled(sectionLabel: string): boolean {
  if (userSavedTableKeys.has(sectionLabel)) return true;
  return hasPendingSectionEntry(sectionLabel);
}

export function getUnfilledSectionLabels(sectionLabels: string[]): string[] {
  return sectionLabels.filter((label) => !isSectionFilled(label));
}

export function hasAnySectionFilled(sectionLabels: string[]): boolean {
  return sectionLabels.some((label) => isSectionFilled(label));
}

/** Every subcategory in the active health/financial category must be filled. */
export function areAllSectionsFilled(sectionLabels: string[]): boolean {
  return (
    sectionLabels.length > 0 &&
    sectionLabels.every((label) => isSectionFilled(label))
  );
}

const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000;

function appendTableRow(
  tableKey: string,
  data: Record<string, unknown>,
  enteredBy: string,
  doctor: string
) {
  if (tableKey === "PROCEDURE" && data.__findingsUpdate) {
    const rowIndex = Number(data.rowIndex);
    const proc = tables.PROCEDURE ?? [];
    if (rowIndex >= 0 && rowIndex < proc.length) {
      tables = {
        ...tables,
        PROCEDURE: proc.map((row, idx) =>
          idx === rowIndex
            ? {
                ...row,
                findings: String(data.findings ?? ""),
                findingsBy: String(data.findingsBy || enteredBy),
                hasResult: true,
              }
            : row
        ),
      };
      userSavedTableKeys.add(tableKey);
      emitChange();
    }
    return;
  }

  const currentTable = tables[tableKey] ?? [];
  const now = new Date();
  const nowMs = now.getTime();
  const formattedNow = formatMedicalDateTime(now);

  // Item 22: If new Diagnosis are entered by the same Clinician under 24 hours, separate entries with "; "
  if (
    (tableKey === "DIAGNOSIS" || tableKey.endsWith(":DIAGNOSIS")) &&
    typeof data.diagnosis === "string" &&
    data.diagnosis.trim()
  ) {
    const incomingDiag = data.diagnosis.trim();
    const lastIndex = [...currentTable]
      .map((row, idx) => ({ row, idx }))
      .reverse()
      .find(({ row }) => {
        const sameClinician =
          (row.doctor && row.doctor === doctor) ||
          (row.enteredBy && row.enteredBy === enteredBy);
        const createdAtMs = Number(row.createdAtMs ?? 0);
        return (
          sameClinician &&
          createdAtMs > 0 &&
          nowMs - createdAtMs <= TWENTY_FOUR_HOURS_MS
        );
      })?.idx;

    if (lastIndex !== undefined) {
      const targetRow = currentTable[lastIndex];
      const existingDiag = String(targetRow.diagnosis ?? "").trim();
      const existingParts = existingDiag
        .split(";")
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean);
      const incomingParts = incomingDiag
        .split(";")
        .map((s) => s.trim())
        .filter(Boolean);
      const newUniqueParts = incomingParts.filter(
        (part) => !existingParts.includes(part.toLowerCase())
      );
      const mergedDiagnosis =
        newUniqueParts.length > 0
          ? `${existingDiag}; ${newUniqueParts.join("; ")}`
          : existingDiag;

      const updatedTable = currentTable.map((row, idx) =>
        idx === lastIndex
          ? {
              ...row,
              diagnosis: mergedDiagnosis,
              dateTime: formattedNow,
              createdAtMs: nowMs,
            }
          : row
      );

      tables = {
        ...tables,
        [tableKey]: updatedTable,
      };
      userSavedTableKeys.add(tableKey);
      emitChange();
      return;
    }
  }

  // Expand batched medications into individual rows so each has Amount, Remark, and Dispensed By
  if (tableKey === "MEDICATION" && Array.isArray(data.medications)) {
    const medItems = data.medications as Record<string, unknown>[];
    const expandedRows = medItems.map((med, idx) => {
      const lineTotal = Number(med.lineTotal ?? med.sellingPrice ?? 0);
      return {
        id: `med-${nowMs}-${idx}`,
        sn: currentTable.length + idx + 1,
        dateTime: formattedNow,
        createdAtMs: nowMs,
        patientType: getGenConsultRecordPatientType(),
        enteredBy,
        doctor,
        medication: String(med.medication ?? "—"),
        strength: String(med.strength ?? ""),
        drugForm: String(med.drugForm ?? ""),
        adminRoute: String(med.adminRoute ?? "Oral"),
        dosage: String(med.dosage ?? "—"),
        interval: String(med.interval ?? ""),
        period: String(med.period ?? ""),
        quantity: Number(med.quantity ?? 1),
        lineTotal,
        amount: formatInvestigationAmount(String(lineTotal)),
        remark: String(med.remark ?? ""),
        served: Boolean(med.served),
        dispensedBy: String(med.dispensedBy ?? "—"),
      };
    });

    const nextMedTable = [...currentTable, ...expandedRows];
    tables = {
      ...tables,
      MEDICATION: nextMedTable,
      "NURSING DISPENSES": buildNursingDispensesFromMedication(nextMedTable),
    };
    userSavedTableKeys.add(tableKey);
    emitChange();
    return;
  }

  tables = {
    ...tables,
    [tableKey]: [
      ...currentTable,
      {
        sn: currentTable.length + 1,
        dateTime: formattedNow,
        createdAtMs: nowMs,
        patientType: getGenConsultRecordPatientType(),
        enteredBy,
        doctor,
        ...data,
      },
    ],
  };
  userSavedTableKeys.add(tableKey);
  emitChange();
}

export function updateMedicationDispenseStatus(
  rowIndex: number,
  updates: { served?: boolean; remark?: string },
  dispensedByName: string
) {
  const currentMeds = tables.MEDICATION ?? [];
  if (rowIndex < 0 || rowIndex >= currentMeds.length) return;

  const nowFormatted = formatMedicalDateTime(new Date());
  const nextMeds = currentMeds.map((row, idx) => {
    if (idx !== rowIndex) return row;
    const prevServed = Boolean(row.served);
    const prevRemark = String(row.remark ?? "");
    const nextServed =
      updates.served !== undefined
        ? updates.served
        : Boolean(updates.remark?.trim()) || prevServed;
    const nextRemark =
      updates.remark !== undefined
        ? updates.remark
        : nextServed && !prevRemark
          ? "Served"
          : prevRemark;

    const isActioned = nextServed || Boolean(nextRemark.trim());

    return {
      ...row,
      served: nextServed,
      remark: nextRemark,
      dispensedBy: isActioned ? dispensedByName : "—",
      dispensedAt: isActioned ? nowFormatted : row.dispensedAt,
    };
  });

  tables = {
    ...tables,
    MEDICATION: nextMeds,
    "NURSING DISPENSES": buildNursingDispensesFromMedication(nextMeds),
  };
  userSavedTableKeys.add("MEDICATION");
  userSavedTableKeys.add("NURSING DISPENSES");
  emitChange();
}

function formatInvestigationAmount(amount: string): string {
  if (amount.startsWith("N")) return amount;
  const numeric = Number(amount.replace(/[^\d.]/g, ""));
  return `N ${numeric.toLocaleString()}.00`;
}

function commitPendingSection(
  tableKey: string,
  enteredBy: string,
  doctor: string
): boolean {
  const data = pendingSectionEntries[tableKey];
  if (!data || !hasPendingSectionEntry(tableKey)) return false;

  if (data[PENDING_BATCH_KEY]) {
    const rows = JSON.parse(data[PENDING_BATCH_KEY]) as Record<string, string>[];
    rows.forEach((row) => appendTableRow(tableKey, row, enteredBy, doctor));
    clearPendingSection(tableKey);
    return true;
  }

  const rowData = { ...data };

  if (rowData.__payload__) {
    const payload = JSON.parse(String(rowData.__payload__)) as Record<
      string,
      unknown
    >;
    appendTableRow(tableKey, payload, enteredBy, doctor);
    clearPendingSection(tableKey);
    return true;
  }

  if (
    (tableKey === "INVESTIGATION" ||
      tableKey === "MEDICAL IMAGING" ||
      tableKey === "X-RAY (RADIOGRAPHY)" ||
      tableKey === "INVOICE") &&
    rowData.amount
  ) {
    rowData.amount = formatInvestigationAmount(String(rowData.amount));
  }

  if (tableKey === "INVOICE" && rowData.description && !rowData.invoiceNo) {
    const count = (tables[tableKey] ?? []).length;
    rowData.invoiceNo = `INV-2023-${String(count + 150).padStart(4, "0")}`;
    rowData.status = rowData.status ?? "Unpaid";
  }

  appendTableRow(tableKey, rowData, enteredBy, doctor);
  clearPendingSection(tableKey);
  return true;
}

/** Read a draft without recording it or clearing the form. */
export function getPendingSectionRows(key: string): Record<string, unknown>[] {
  if (!hasPendingSectionEntry(key)) return [];
  const draft = pendingSectionEntries[key];
  if (draft[PENDING_BATCH_KEY]) return JSON.parse(draft[PENDING_BATCH_KEY]);
  if (draft.__payload__) return [JSON.parse(draft.__payload__)];
  return [{ ...draft }];
}

/** Commits all draft subcategory entries on category Submit / Preview. */
export function commitPendingCategoryEntries(
  enteredBy: string,
  doctor: string,
  sectionKeys = [...Object.keys(pendingSectionEntries)]
) {
  sectionKeys.forEach((tableKey) => {
    commitPendingSection(tableKey, enteredBy, doctor);
  });
}

export const useMedicalTable = (tableKey: string) => {
  const { user } = useAuth();
  const allTables = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  const history = allTables[tableKey] ?? [];

  const save = (data: Record<string, string>) => {
    const enteredBy = user?.fullName ?? "Unknown User";
    const doctor = user?.fullName ? `Dr. ${user.fullName}` : "Unknown Doctor";
    appendTableRow(tableKey, data, enteredBy, doctor);
  };

  const remove = (index: number) => {
    const updated = (tables[tableKey] ?? [])
      .filter((_, i) => i !== index)
      .map((item, i) => ({
        ...item,
        sn: i + 1,
      }));

    tables = {
      ...tables,
      [tableKey]: updated,
    };
    emitChange();
  };

  return {
    history,
    save,
    remove,
  };
};

/** Store multiple rows to commit together on category Submit. */
export function buildBatchPendingEntry(
  rows: Record<string, string>[]
): Record<string, string> | null {
  if (rows.length === 0) return null;
  return { [PENDING_BATCH_KEY]: JSON.stringify(rows) };
}
