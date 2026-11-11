import VitalSigns from "@/pages/nurse/patient-profile/nurse-categories/VitalSigns";
import VaccineAdministration from "@/pages/nurse/patient-profile/nurse-categories/VaccineAdministration";
import NewAntenatalBooking from "@/pages/nurse/patient-profile/nurse-categories/NewAntenatalBooking";
import FollowUp from "@/pages/nurse/patient-profile/nurse-categories/FollowUp";
import { categoryStorageKey } from "./categoryStorage";
import type { ComponentType, ReactNode } from "react";
import { categoryComponents } from "@/pages/doctor/patientProfile/components/CategoryRenderer";
import Diagnosis from "@/pages/doctor/patientProfile/components/categories/shared/Diagnosis";
import PresentingComplaints from "@/pages/doctor/patientProfile/components/categories/shared/PresentingComplaints";
import NurseDispenseHistory from "../components/categories/genConsult/NurseDispenseHistory";
import NeoNatalVitalSigns from "@/pages/doctor/patientProfile/components/categories/neonatal/NeoNatalVitalSigns";
import ImmunizationVitalSigns from "@/pages/doctor/patientProfile/components/categories/immunization/ImmunizationVitalSigns";
import GenConsultVitalSigns from "@/pages/doctor/patientProfile/components/categories/genConsult/GenConsultVitalSigns";
import ReadOnlySectionTable from "@/pages/doctor/patientProfile/components/categories/shared/ReadOnlySectionTable";

const ANC_NURSE_READONLY_SECTIONS = new Set([
  "PRESENTING COMPLAINTS",
  "PHYSICAL EXAMINATION",
  "DIAGNOSIS",
  "INVESTIGATION",
  "MEDICAL IMAGING",
  "X-RAY (RADIOGRAPHY)",
  "PROCEDURE",
  "MEDICATION",
]);

const GEN_CONSULT_NURSE_DETAILS_ONLY = new Set([
  "PRESENTING COMPLAINTS",
  "PHYSICAL EXAMINATION",
  "DIAGNOSIS",
  "INVESTIGATION",
  "MEDICAL IMAGING",
  "X-RAY (RADIOGRAPHY)",
  "PROCEDURE",
  "REPORT WRITING",
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
  if (isNurse && sectionLabel === "MEDICATION") {
    return <ReadOnlySectionTable sectionLabel={sectionLabel} category={category} />;
  }

  if (isNurse && category === "Ante Natal Care" && sectionLabel === "VITAL SIGNS") return <VitalSigns nurse />;
  if (isNurse && category === "Immunization" && sectionLabel === "VACCINE ADMINISTRATION") return <VaccineAdministration nurse />;
  if (isNurse && category === "Ante Natal Care" && sectionLabel === "NEW ANTENATAL BOOKING") return <NewAntenatalBooking nurse />;
  if (isNurse && category === "Immunization" && sectionLabel === "FOLLOW-UP") return <FollowUp nurse />;

  if (isNurse && category === "Neo Natal Care" && sectionLabel === "VITAL SIGNS") {
    return <NeoNatalVitalSigns />;
  }

  if (isNurse && category === "Gen Consult" && sectionLabel === "VITAL SIGNS") {
    return <GenConsultVitalSigns />;
  }

  if (isNurse && category === "Immunization" && sectionLabel === "MEDICATION") {
    return <ReadOnlySectionTable sectionLabel={sectionLabel} />;
  }

  if (isNurse && category === "Immunization" && sectionLabel === "VITAL SIGNS") {
    return <ImmunizationVitalSigns />;
  }

  if (isNurse && category === "Ante Natal Care") {
    if (sectionLabel === "DIAGNOSIS") {
      return <Diagnosis />;
    }
    if (sectionLabel === "PRESENTING COMPLAINTS") {
      return <PresentingComplaints />;
    }
    if (ANC_NURSE_READONLY_SECTIONS.has(sectionLabel)) {
      return <ReadOnlySectionTable sectionLabel={sectionLabel} category={category} />;
    }
  }

  if (isNurse && category === "Gen Consult") {
    if (sectionLabel === "DIAGNOSIS") {
      return <Diagnosis />;
    }
    if (sectionLabel === "PRESENTING COMPLAINTS") {
      return <PresentingComplaints />;
    }
    if (sectionLabel === "NURSING DISPENSES") {
      return <NurseDispenseHistory />;
    }
    if (GEN_CONSULT_NURSE_DETAILS_ONLY.has(sectionLabel)) {
      return <ReadOnlySectionTable sectionLabel={sectionLabel} category={category} />;
    }
  }

  if (isNurse && category === "Neo Natal Care") {
    if (sectionLabel === "DIAGNOSIS") {
      return <ReadOnlySectionTable sectionLabel={sectionLabel} tableKey={categoryStorageKey(category, sectionLabel)} />;
    }
    if (
      sectionLabel === "INVESTIGATION" ||
      sectionLabel === "MEDICAL IMAGING" ||
      sectionLabel === "X-RAY (RADIOGRAPHY)" ||
      sectionLabel === "PROCEDURE"
    ) {
      return <ReadOnlySectionTable sectionLabel={sectionLabel} tableKey={categoryStorageKey(category, sectionLabel)} />;
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
