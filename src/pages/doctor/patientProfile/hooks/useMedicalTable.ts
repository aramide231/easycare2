import { useSyncExternalStore } from "react";
import { useAuth } from "@doctor-shared/context/useAuth";
import { DIAGNOSIS_SEED } from "../data/diagnosisSeed";
import { INVESTIGATION_SEED } from "../data/investigationSeed";
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

const INITIAL_TABLES: Record<string, Record<string, unknown>[]> = {
  "VITAL SIGNS": [...VITAL_SIGNS_SEED],
  "PRESENTING COMPLAINTS": [...PRESENTING_COMPLAINTS_SEED],
  "PHYSICAL EXAMINATION": [...PHYSICAL_EXAMINATION_SEED],
  DIAGNOSIS: [...DIAGNOSIS_SEED],
  INVESTIGATION: [...INVESTIGATION_SEED],
  TREATMENT: [...TREATMENT_SEED],
  PROCEDURE: [...PROCEDURE_SEED],
  "VACCINE ADMINISTRATION": [...VACCINE_ADMINISTRATION_SEED],
  "REPORT WRITING": [],
  "IN-TAKE CHART": [],
  "OUTPUT CHART": [],
  "NURSING DISPENSES": [],
  "PHARMACY DISPENSE": [],
  "ACCOUNT REVIEW": [...ACCOUNT_REVIEW_SEED],
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
  return Object.fromEntries(
    Object.entries(INITIAL_TABLES).map(([key, rows]) => [key, [...rows]])
  );
}

let tables = cloneInitialTables();
const userSavedTableKeys = new Set<string>();
const listeners = new Set<() => void>();

const DIAGNOSIS_TABLE_KEY = "DIAGNOSIS";
const PRESENTING_COMPLAINTS_TABLE_KEY = "PRESENTING COMPLAINTS";
const PHYSICAL_EXAMINATION_TABLE_KEY = "PHYSICAL EXAMINATION";
const MEDICATION_TABLE_KEY = "MEDICATION";
const PENDING_BATCH_KEY = "__batch__";
const PENDING_INCOMPLETE_KEY = "__incomplete__";

let pendingSectionEntries: Record<string, Record<string, string>> = {};
const sectionClearListeners = new Map<string, Set<() => void>>();

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
  return () => sectionClearListeners.get(tableKey)?.delete(listener);
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

export function setPendingDiagnosis(entry: PendingDiagnosis | null) {
  setPendingSectionEntry(
    DIAGNOSIS_TABLE_KEY,
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

export function subscribeDiagnosisFormClear(listener: () => void) {
  return subscribeSectionFormClear(DIAGNOSIS_TABLE_KEY, listener);
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

function appendTableRow(
  tableKey: string,
  data: Record<string, unknown>,
  enteredBy: string,
  doctor: string
) {
  const currentTable = tables[tableKey] ?? [];

  tables = {
    ...tables,
    [tableKey]: [
      ...currentTable,
      {
        sn: currentTable.length + 1,
        dateTime: formatMedicalDateTime(new Date()),
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
    (tableKey === "INVESTIGATION" || tableKey === "INVOICE") &&
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

/** Commits all draft subcategory entries on category Submit / Preview. */
export function commitPendingCategoryEntries(
  enteredBy: string,
  doctor: string
) {
  [...Object.keys(pendingSectionEntries)].forEach((tableKey) => {
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
