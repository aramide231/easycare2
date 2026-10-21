import type { ComponentType, ReactNode } from "react";
import { categoryComponents } from "@/pages/doctor/patientProfile/components/CategoryRenderer";
import Diagnosis from "@/pages/doctor/patientProfile/components/categories/shared/Diagnosis";
import PresentingComplaints from "@/pages/doctor/patientProfile/components/categories/shared/PresentingComplaints";
import Medication from "@/pages/doctor/patientProfile/components/categories/shared/Medication";
import NurseMedicationServe from "@/pages/doctor/patientProfile/components/categories/genConsult/NurseMedicationServe";
import NursingDispenses from "@/pages/doctor/patientProfile/components/categories/genConsult/NursingDispenses";
import NeoNatalVitalSigns from "@/pages/doctor/patientProfile/components/categories/neonatal/NeoNatalVitalSigns";
import GenConsultVitalSigns from "@/pages/doctor/patientProfile/components/categories/genConsult/GenConsultVitalSigns";
import ReadOnlySectionTable from "@/pages/doctor/patientProfile/components/categories/shared/ReadOnlySectionTable";

const ANC_NURSE_READONLY_SECTIONS = new Set([
  "PRESENTING COMPLAINTS",
  "PHYSICAL EXAMINATION",
  "DIAGNOSIS",
  "INVESTIGATION",
  "PROCEDURE",
  "MEDICATION",
]);

const GEN_CONSULT_NURSE_DETAILS_ONLY = new Set([
  "PRESENTING COMPLAINTS",
  "PHYSICAL EXAMINATION",
  "DIAGNOSIS",
  "INVESTIGATION",
  "PROCEDURE",
  "REPORT WRITING",
  "IN-TAKE CHART",
  "OUTPUT CHART",
  "PHARMACY DISPENSE",
]);

/**
 * Maps section labels to category form components.
 * Nurse module swaps clinician write forms for read-only / serve views where required.
 */
export function resolveCategoryForm(
  selectedCategory: string | null | undefined,
  sectionLabel: string,
  module?: string,
): ReactNode {
  const isNurse = module === "nurse";
  const category = selectedCategory ?? "";

  if (isNurse && category === "Neo Natal Care" && sectionLabel === "VITAL SIGNS") {
    return <NeoNatalVitalSigns />;
  }

  if (isNurse && category === "Gen Consult" && sectionLabel === "VITAL SIGNS") {
    return <GenConsultVitalSigns />;
  }

  if (isNurse && category === "Ante Natal Care") {
    if (sectionLabel === "DIAGNOSIS") {
      return <Diagnosis />;
    }
    if (sectionLabel === "PRESENTING COMPLAINTS") {
      return <PresentingComplaints />;
    }
    if (ANC_NURSE_READONLY_SECTIONS.has(sectionLabel)) {
      return <ReadOnlySectionTable sectionLabel={sectionLabel} />;
    }
  }

  if (isNurse && category === "Gen Consult") {
    if (sectionLabel === "DIAGNOSIS") {
      return <Diagnosis />;
    }
    if (sectionLabel === "PRESENTING COMPLAINTS") {
      return <PresentingComplaints />;
    }
    if (sectionLabel === "MEDICATION") {
      return <NurseMedicationServe />;
    }
    if (sectionLabel === "NURSING DISPENSES") {
      return <NursingDispenses />;
    }
    if (GEN_CONSULT_NURSE_DETAILS_ONLY.has(sectionLabel)) {
      return <ReadOnlySectionTable sectionLabel={sectionLabel} />;
    }
  }

  if (isNurse && category === "Neo Natal Care") {
    if (sectionLabel === "DIAGNOSIS") {
      return <Diagnosis />;
    }
    if (sectionLabel === "MEDICATION") {
      return <Medication />;
    }
    if (sectionLabel === "INVESTIGATION" || sectionLabel === "PROCEDURE") {
      return <ReadOnlySectionTable sectionLabel={sectionLabel} />;
    }
  }

  const FormComponent = categoryComponents[sectionLabel] as
    | ComponentType
    | undefined;

  if (!FormComponent) {
    return (
      <p className="px-1 py-2 text-sm text-gray-500">
        Form for this section is not available yet.
      </p>
    );
  }

  return <FormComponent />;
}
