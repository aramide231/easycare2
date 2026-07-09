import { createElement, type ReactNode } from "react";
import type { ComponentType } from "react";
import { categoryComponents } from "@/pages/doctor/patientProfile/components/CategoryRenderer";
import ImmunizationVitalSigns from "@/pages/doctor/patientProfile/components/categories/immunization/ImmunizationVitalSigns";
import GenConsultVitalSigns from "@/pages/doctor/patientProfile/components/categories/genConsult/GenConsultVitalSigns";
import NeoNatalVitalSigns from "@/pages/doctor/patientProfile/components/categories/neonatal/NeoNatalVitalSigns";
import SpecialistPresentingComplaints from "@/pages/doctor/patientProfile/components/categories/specialistConsult/SpecialistPresentingComplaints";

const healthCategorySectionOverrides: Record<
  string,
  Record<string, ComponentType>
> = {
  Immunization: {
    "VITAL SIGNS": ImmunizationVitalSigns,
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

function resolveFormComponent(
  healthCategory: string | null | undefined,
  sectionLabel: string,
): ComponentType | undefined {
  const override =
    healthCategory &&
    healthCategorySectionOverrides[healthCategory]?.[sectionLabel];

  return override ?? categoryComponents[sectionLabel];
}

export function resolveCategoryForm(
  selectedCategory: string | null | undefined,
  sectionLabel: string,
): ReactNode {
  const FormComponent = resolveFormComponent(selectedCategory, sectionLabel);

  if (!FormComponent) {
    return null;
  }

  return createElement(FormComponent);
}
