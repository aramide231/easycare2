import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  ANTE_NATAL_BOOKING_SEED,
  ANTE_NATAL_FMH_SEED,
  ANTE_NATAL_FOLLOW_UP_SEED,
  ANTE_NATAL_PMH_SEED,
  ANTE_NATAL_PRESENTING_COMPLAINTS_SEED,
  ANTE_NATAL_PREGNANCY_SEED,
} from "../data/antenatalSeed";
import {
  CHILD_BIRTH_STAGE1_SEED,
  CHILD_BIRTH_STAGE2_SEED,
  CHILD_BIRTH_STAGE3_SEED,
  CHILD_BIRTH_STAGE4_SEED,
} from "../data/childbirthSeed";
import {
  IMMUNIZATION_CLINICAL_NOTES_SEED,
  IMMUNIZATION_FOLLOW_UP_SEED,
  IMMUNIZATION_MEDICATION_SEED,
  IMMUNIZATION_VACCINE_SEED,
  IMMUNIZATION_VITAL_SIGNS_SEED,
} from "../data/immunizationSeed";
import {
  NEO_NATAL_DIAGNOSIS_SEED,
  NEO_NATAL_INVESTIGATION_SEED,
  NEO_NATAL_MEDICATION_SEED,
  NEO_NATAL_PROCEDURE_SEED,
  NEO_NATAL_VITAL_SIGNS_SEED,
} from "../data/neonatalSeed";
import {
  POST_NATAL_COMPLAINTS_SEED,
  POST_NATAL_INVESTIGATION_SEED,
  POST_NATAL_MEDICATION_SEED,
  POST_NATAL_PHYSICAL_EXAM_SEED,
  POST_NATAL_VITAL_SIGNS_SEED,
} from "../data/postNatalSeed";
import {
  SPECIALIST_COMPLAINTS_SEED,
  SPECIALIST_DENTAL_HISTORY_SEED,
  SPECIALIST_DENTAL_MEDICATION_SEED,
} from "../data/specialistConsultSeed";
import {
  SURGICAL_POST_OP_NOTE_SEED,
  SURGICAL_POST_OP_ORDERS_SEED,
  SURGICAL_PRE_OP_SEED,
} from "../data/surgicalSeed";
import { VITAL_SIGNS_SEED } from "../data/vitalSignsSeed";
import { GEN_CONSULT_PRESENTING_COMPLAINTS_SEED } from "../data/genConsultPresentingComplaintsSeed";
import { PRESENTING_COMPLAINTS_SEED } from "../data/presentingComplaintsSeed";

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
  "PRESENTING COMPLAINTS": [...PRESENTING_COMPLAINTS_SEED],
  "VITAL SIGNS": [...VITAL_SIGNS_SEED],
  "GEN CONSULT — VITAL SIGNS": [...VITAL_SIGNS_SEED],
  "GEN CONSULT — PRESENTING COMPLAINTS": [...GEN_CONSULT_PRESENTING_COMPLAINTS_SEED],
  "ANTE NATAL — VITAL SIGNS": [...VITAL_SIGNS_SEED],
  "ANTE NATAL — PRESENTING COMPLAINTS": [...ANTE_NATAL_PRESENTING_COMPLAINTS_SEED],
  "ANTE NATAL — PREVIOUS MEDICAL HISTORY": [...ANTE_NATAL_PMH_SEED],
  "ANTE NATAL — FAMILY MEDICAL HISTORY": [...ANTE_NATAL_FMH_SEED],
  "ANTE NATAL — NEW ANTENATAL BOOKING": [...ANTE_NATAL_BOOKING_SEED],
  "ANTE NATAL — PREVIOUS PREGNANCY HISTORY": [...ANTE_NATAL_PREGNANCY_SEED],
  "ANTE NATAL — FOLLOW-UP VISIT": [...ANTE_NATAL_FOLLOW_UP_SEED],
  "NEO NATAL — VITAL SIGNS": [...NEO_NATAL_VITAL_SIGNS_SEED],
  "NEO NATAL — DIAGNOSIS": [...NEO_NATAL_DIAGNOSIS_SEED],
  "NEO NATAL — INVESTIGATION": [...NEO_NATAL_INVESTIGATION_SEED],
  "NEO NATAL — PROCEDURE": [...NEO_NATAL_PROCEDURE_SEED],
  "NEO NATAL — MEDICATION": [...NEO_NATAL_MEDICATION_SEED],
  "IMMUNIZATION — VITAL SIGNS": [...IMMUNIZATION_VITAL_SIGNS_SEED],
  "IMMUNIZATION — VACCINE ADMINISTRATION": [...IMMUNIZATION_VACCINE_SEED],
  "IMMUNIZATION — MEDICATION": [...IMMUNIZATION_MEDICATION_SEED],
  "IMMUNIZATION — FOLLOW-UP": [...IMMUNIZATION_FOLLOW_UP_SEED],
  "IMMUNIZATION — CLINICAL NOTES": [...IMMUNIZATION_CLINICAL_NOTES_SEED],
  "CHILD BIRTH — STAGE 1: LABOUR": [...CHILD_BIRTH_STAGE1_SEED],
  "CHILD BIRTH — STAGE 2: PUSHING & BIRTHING": [...CHILD_BIRTH_STAGE2_SEED],
  "CHILD BIRTH — STAGE 3: DELIVERY OF PLACENTA": [...CHILD_BIRTH_STAGE3_SEED],
  "CHILD BIRTH — STAGE 4: DELIVERY NOTE": [...CHILD_BIRTH_STAGE4_SEED],
  "POST NATAL — VITAL SIGNS": [...POST_NATAL_VITAL_SIGNS_SEED],
  "POST NATAL — PRESENTING COMPLAINTS": [...POST_NATAL_COMPLAINTS_SEED],
  "POST NATAL — PHYSICAL EXAMINATION": [...POST_NATAL_PHYSICAL_EXAM_SEED],
  "POST NATAL — INVESTIGATION": [...POST_NATAL_INVESTIGATION_SEED],
  "POST NATAL — MEDICATION": [...POST_NATAL_MEDICATION_SEED],
  "SURGICAL — PRE-OPERATION NOTE": [...SURGICAL_PRE_OP_SEED],
  "SURGICAL — POST-OPERATION NOTE": [...SURGICAL_POST_OP_NOTE_SEED],
  "SURGICAL — POST-OPERATION ORDERS": [...SURGICAL_POST_OP_ORDERS_SEED],
  "SPECIALIST CONSULT — PRESENTING COMPLAINTS": [...SPECIALIST_COMPLAINTS_SEED],
  "SPECIALIST CONSULT — PREVIOUS DENTAL HISTORY": [
    ...SPECIALIST_DENTAL_HISTORY_SEED,
  ],
  "SPECIALIST CONSULT — PREVIOUS DENTAL MEDICATION": [
    ...SPECIALIST_DENTAL_MEDICATION_SEED,
  ],
};

const savedSectionLabels = new Set<string>();
const sectionEntryCounts: Record<string, number> = {};
const pendingBySection: Record<string, Record<string, unknown>[]> = {};

export function markSectionSaved(sectionLabel: string, entryCount = 1) {
  savedSectionLabels.add(sectionLabel);
  sectionEntryCounts[sectionLabel] =
    (sectionEntryCounts[sectionLabel] ?? 0) + entryCount;
}

export function clearPendingSectionEntries(sectionLabels: string[]) {
  for (const label of sectionLabels) {
    delete pendingBySection[label];
  }
}

export function resetUserSavedSections(sectionLabels: string[]) {
  for (const label of sectionLabels) {
    savedSectionLabels.delete(label);
    delete sectionEntryCounts[label];
  }
}

export function areAllSectionsFilled(sectionLabels: string[]): boolean {
  if (sectionLabels.length === 0) return false;
  return sectionLabels.every((label) => savedSectionLabels.has(label));
}

export function getUnfilledSectionLabels(sectionLabels: string[]): string[] {
  return sectionLabels.filter((label) => !savedSectionLabels.has(label));
}

export function getUserSavedSectionLabels(sectionLabels: string[]): string[] {
  return sectionLabels.filter((label) => savedSectionLabels.has(label));
}

export function getSectionEntryCount(sectionLabel: string): number {
  return sectionEntryCounts[sectionLabel] ?? 0;
}

export function commitPendingCategoryEntries(
  _enteredBy: string,
  _doctor: string,
) {
  // Per-section saves are applied on Save; reserved for future API sync.
}

export const useMedicalTable = (tableKey: string) => {
  const { user } = useAuth();
  const [tables, setTables] = useState<Record<string, Record<string, unknown>[]>>(
    () => ({
      ...INITIAL_TABLES,
    })
  );
  const history = tables[tableKey] || [];

  const save = (data: Record<string, string>) => {
    const enteredBy = user?.fullName ?? "Unknown User";
    setTables((prev) => {
      const currentTable = prev[tableKey] || [];

      return {
        ...prev,
        [tableKey]: [
          ...currentTable,
          {
            sn: currentTable.length + 1,
            dateTime: formatMedicalDateTime(new Date()),
            patientType: "IN-PATIENT",
            enteredBy,
            ...data,
          },
        ],
      };
    });
  };

  const saveBatch = (rows: Record<string, string>[]) => {
    if (!rows.length) return;
    const enteredBy = user?.fullName ?? "Unknown User";
    setTables((prev) => {
      const currentTable = prev[tableKey] || [];
      const newRows = rows.map((data, index) => ({
        sn: currentTable.length + index + 1,
        dateTime: formatMedicalDateTime(new Date()),
        patientType: "IN-PATIENT",
        enteredBy,
        ...data,
      }));
      return {
        ...prev,
        [tableKey]: [...currentTable, ...newRows],
      };
    });
  };

  const remove = (index: number) => {
    setTables((prev) => {
      const updated = (prev[tableKey] || [])
        .filter((_, i) => i !== index)
        .map((item, i) => ({
          ...item,
          sn: i + 1,
        }));

      return {
        ...prev,
        [tableKey]: updated,
      };
    });
  };

  return {
    history,
    save,
    saveBatch,
    remove,
  };
};
