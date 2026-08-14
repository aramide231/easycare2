import { createElement, type ReactNode } from "react";
import type { ComponentType } from "react";
import { categoryComponents } from "@/pages/doctor/patientProfile/components/CategoryRenderer";
import GenConsultVitalSigns from "@/pages/doctor/patientProfile/components/categories/genConsult/GenConsultVitalSigns";
import NeoNatalVitalSigns from "@/pages/doctor/patientProfile/components/categories/neonatal/NeoNatalVitalSigns";
import SpecialistPresentingComplaints from "@/pages/doctor/patientProfile/components/categories/specialistConsult/SpecialistPresentingComplaints";
import PresentingComplaints from "@/pages/doctor/patientProfile/components/categories/shared/PresentingComplaints";
import Diagnosis from "@/pages/doctor/patientProfile/components/categories/shared/Diagnosis";
import PhysicalExaminationTableOnly from "@/pages/doctor/patientProfile/components/categories/shared/PhysicalExaminationTableOnly";
import InvestigationTableOnly from "@/pages/doctor/patientProfile/components/categories/shared/InvestigationTableOnly";
import ProcedureTableOnly from "@/pages/doctor/patientProfile/components/categories/shared/ProcedureTableOnly";
import MedicationTableOnly from "@/pages/doctor/patientProfile/components/categories/shared/MedicationTableOnly";

export type CategoryViewerRole = "doctor" | "nurse";

const healthCategorySectionOverrides: Record<
  string,
  Record<string, ComponentType>
> = {
  Immunization: {
    "VITAL SIGNS": NeoNatalVitalSigns,
  },
  "Gen Consult": {
    "VITAL SIGNS": GenConsultVitalSigns,
  },
  "Neo Natal Care": {
    "VITAL SIGNS": NeoNatalVitalSigns,
  },
  "Specialist Consult": {
    "PRESENTING COMPLAINTS": SpecialistPresentingComplaints,
  },
};

/** Nurse sees record tables only for clinician-authored clinical sections. */
const nurseTableOnlyOverrides: Record<string, ComponentType> = {
  "PRESENTING COMPLAINTS": PresentingComplaints,
  "PHYSICAL EXAMINATION": PhysicalExaminationTableOnly,
  DIAGNOSIS: Diagnosis,
  INVESTIGATION: InvestigationTableOnly,
  PROCEDURE: ProcedureTableOnly,
  MEDICATION: MedicationTableOnly,
};

function resolveFormComponent(
  healthCategory: string | null | undefined,
  sectionLabel: string,
  viewerRole: CategoryViewerRole = "doctor",
): ComponentType | undefined {
  if (viewerRole === "nurse" && nurseTableOnlyOverrides[sectionLabel]) {
    return nurseTableOnlyOverrides[sectionLabel];
  }

  const override =
    healthCategory &&
    healthCategorySectionOverrides[healthCategory]?.[sectionLabel];

  return override ?? categoryComponents[sectionLabel];
}

export function resolveCategoryForm(
  selectedCategory: string | null | undefined,
  sectionLabel: string,
  viewerRole: CategoryViewerRole = "doctor",
): ReactNode {
  const FormComponent = resolveFormComponent(
    selectedCategory,
    sectionLabel,
    viewerRole,
  );

  if (!FormComponent) {
    return null;
  }

  return createElement(FormComponent);
}
