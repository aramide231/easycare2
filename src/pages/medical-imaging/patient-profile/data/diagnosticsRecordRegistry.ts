import type { CategoryTableColumn } from "@/pages/doctor/patientProfile/config/categoryFieldTypes";
import { genConsultVitalTableColumns } from "@/pages/doctor/patientProfile/config/clinicalVitalFields";

export type DiagnosticsRecordConfig = {
  tableKey: string;
  columns: CategoryTableColumn[];
  linkColumns?: string[];
  remarkType?: "investigation" | "procedure";
};

/** Section label → record table config (read-only diagnostics view). */
export const DIAGNOSTICS_RECORD_REGISTRY: Record<
  string,
  DiagnosticsRecordConfig
> = {
  "VITAL SIGNS": {
    tableKey: "VITAL SIGNS",
    columns: genConsultVitalTableColumns,
  },
  "PRESENTING COMPLAINTS": {
    tableKey: "PRESENTING COMPLAINTS",
    columns: [
      { key: "sn", label: "SN" },
      { key: "dateTime", label: "DATE | TIME" },
      { key: "patientType", label: "PATIENT TYPE" },
      {
        key: "complaint",
        label: "COMPLAINTS / HISTORY OF PRESENTING COMPLAINTS",
      },
    ],
  },
  "PHYSICAL EXAMINATION": {
    tableKey: "PHYSICAL EXAMINATION",
    columns: [
      { key: "sn", label: "SN" },
      { key: "dateTime", label: "DATE | TIME" },
      { key: "patientType", label: "PATIENT TYPE" },
      { key: "general", label: "GENERAL" },
      { key: "cns", label: "CNS" },
      { key: "chest", label: "CHEST" },
      { key: "cvs", label: "CVS" },
      { key: "abdomen", label: "ABDOMEN" },
      { key: "dre", label: "DRE" },
      { key: "ve", label: "VE" },
      { key: "mss", label: "MSS" },
      { key: "ent", label: "ENT" },
      { key: "comments", label: "COMMENTS" },
    ],
  },
  DIAGNOSIS: {
    tableKey: "DIAGNOSIS",
    columns: [
      { key: "sn", label: "SN" },
      { key: "dateTime", label: "DATE | TIME" },
      { key: "patientType", label: "PATIENT TYPE" },
      { key: "diagnosis", label: "DIAGNOSIS" },
      { key: "doctor", label: "DOCTOR" },
    ],
  },
  INVESTIGATION: {
    tableKey: "INVESTIGATION",
    columns: [
      { key: "sn", label: "SN" },
      { key: "dateTime", label: "DATE | TIME" },
      { key: "patientType", label: "PATIENT TYPE" },
      { key: "investigation", label: "INVESTIGATION" },
      { key: "amount", label: "AMOUNT" },
      { key: "remarks", label: "REMARKS" },
    ],
    linkColumns: ["remarks"],
    remarkType: "investigation",
  },
  PROCEDURE: {
    tableKey: "PROCEDURE",
    columns: [
      { key: "sn", label: "SN" },
      { key: "dateTime", label: "DATE | TIME" },
      { key: "patientType", label: "PATIENT TYPE" },
      { key: "procedure", label: "PROCEDURE" },
      { key: "price", label: "PRICE" },
      { key: "remarks", label: "REMARKS" },
      { key: "doctor", label: "DOCTOR" },
    ],
    linkColumns: ["remarks"],
    remarkType: "procedure",
  },
  MEDICATION: {
    tableKey: "MEDICATION",
    columns: [
      { key: "sn", label: "SN" },
      { key: "dateTime", label: "DATE | TIME" },
      { key: "patientType", label: "PATIENT TYPE" },
      { key: "medication", label: "MEDICATION" },
      { key: "adminRoute", label: "ADMIN ROUTE" },
      { key: "dosage", label: "DOSAGE" },
    ],
  },
  TREATMENT: {
    tableKey: "TREATMENT",
    columns: [
      { key: "sn", label: "SN" },
      { key: "dateTime", label: "DATE | TIME" },
      { key: "patientType", label: "PATIENT TYPE" },
      { key: "medication", label: "MEDICATION" },
      { key: "form", label: "FORM" },
      { key: "dosage", label: "DOSAGE" },
      { key: "duration", label: "DURATION" },
      { key: "period", label: "PERIOD" },
    ],
  },
  "REPORT WRITING": {
    tableKey: "REPORT WRITING",
    columns: [
      { key: "sn", label: "SN" },
      { key: "dateTime", label: "DATE | TIME" },
      { key: "patientType", label: "PATIENT TYPE" },
      { key: "wardType", label: "SELECT WARD" },
      { key: "ward", label: "WARD" },
      { key: "comment", label: "COMMENT" },
    ],
  },
  "IN-TAKE CHART": {
    tableKey: "IN-TAKE CHART",
    columns: [
      { key: "sn", label: "SN" },
      { key: "dateTime", label: "DATE | TIME" },
      { key: "patientType", label: "PATIENT TYPE" },
      { key: "fluidType", label: "TYPE OF FLUID" },
      { key: "iv", label: "IV" },
      { key: "oral", label: "ORAL" },
      { key: "rectal", label: "RECTAL" },
      { key: "intakeTotal", label: "INTAKE-TOTAL" },
    ],
  },
  "OUTPUT CHART": {
    tableKey: "OUTPUT CHART",
    columns: [
      { key: "sn", label: "SN" },
      { key: "dateTime", label: "DATE | TIME" },
      { key: "patientType", label: "PATIENT TYPE" },
      { key: "gastricAspiration", label: "GASTRIC ASPIRATION" },
      { key: "blood", label: "BLOOD" },
      { key: "urine", label: "URINE" },
      { key: "urineOutput", label: "URINE (2)" },
      { key: "vomit", label: "VOMIT" },
      { key: "stool", label: "STOOL" },
      { key: "outputTotal", label: "OUTPUT-TOTAL" },
    ],
  },
  "NURSING DISPENSES": {
    tableKey: "NURSING DISPENSES",
    columns: [
      { key: "sn", label: "SN" },
      { key: "dateTime", label: "DATE | TIME" },
      { key: "patientType", label: "PATIENT TYPE" },
      { key: "item", label: "ITEM" },
      { key: "quantity", label: "QTY" },
      { key: "nurse", label: "NURSE" },
      { key: "notes", label: "NOTES" },
    ],
  },
  "PHARMACY DISPENSE": {
    tableKey: "PHARMACY DISPENSE",
    columns: [
      { key: "sn", label: "SN" },
      { key: "dateTime", label: "DATE | TIME" },
      { key: "patientType", label: "PATIENT TYPE" },
      { key: "medication", label: "MEDICATION" },
      { key: "quantity", label: "QTY" },
      { key: "pharmacist", label: "PHARMACIST" },
    ],
  },
  "VACCINE ADMINISTRATION": {
    tableKey: "VACCINE ADMINISTRATION",
    columns: [
      { key: "sn", label: "SN" },
      { key: "dateTime", label: "DATE | TIME" },
      { key: "patientType", label: "PT TYPE" },
      { key: "ageGrade", label: "AGE GRADE" },
      { key: "vaccineType", label: "TYPE OF VACCINE" },
      { key: "dosage", label: "DOSAGE" },
    ],
  },
};
