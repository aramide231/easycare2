import type { CategoryFieldConfig } from "../../../config/categoryFieldTypes";
import { CategoryFormWithHistory } from "../../category";

const BLOOD_GROUP_OPTIONS = [
  { value: "A+", label: "A+" },
  { value: "A", label: "A" },
  { value: "B+", label: "B+" },
  { value: "B", label: "B" },
  { value: "O+", label: "O+" },
  { value: "O", label: "O" },
  { value: "AB+", label: "AB+" },
  { value: "AB", label: "AB" },
];

const GENOTYPE_OPTIONS = [
  { value: "AA", label: "AA" },
  { value: "AC", label: "AC" },
  { value: "AS", label: "AS" },
  { value: "SS", label: "SS" },
  { value: "SC", label: "SC" },
];

/** High-risk pregnancy factors (Figma / Gestation comment guidance). */
const HIGH_RISK_PREGNANCY_OPTIONS = [
  { value: "NONE", label: "None / Low Risk" },
  { value: "GESTATIONAL_DIABETES", label: "Gestational Diabetes Mellitus" },
  {
    value: "HYPERTENSIVE_DISORDERS",
    label: "Hypertensive Disorders in Pregnancy",
  },
  { value: "MULTIPLE_GESTATION", label: "Multiple Gestation" },
  { value: "PREVIOUS_CS", label: "Previous Caesarean Section" },
  { value: "APH", label: "Antepartum Haemorrhage" },
  { value: "ADVANCED_MATERNAL_AGE", label: "Advanced Maternal Age" },
  { value: "OTHER", label: "Other High Risk Factor" },
];

const bookingFields: CategoryFieldConfig[] = [
  {
    name: "bloodGroup",
    label: "Blood Group",
    tableLabel: "BLOOD GRP",
    type: "select",
    options: BLOOD_GROUP_OPTIONS,
  },
  {
    name: "genotype",
    label: "Genotype",
    type: "select",
    options: GENOTYPE_OPTIONS,
  },
  { name: "anyDischarge", label: "Any Discharge?", tableLabel: "DISCHARGE" },
  {
    name: "highRiskPregnancy",
    label: "High Risk Pregnancy?",
    tableLabel: "HIGH RISK",
    type: "select",
    options: HIGH_RISK_PREGNANCY_OPTIONS,
  },
  {
    name: "lastMenstrualPeriod",
    label: "Last Menstrual Period (LMP)",
    tableLabel: "LMP",
    type: "date",
  },
  {
    name: "estimatedGestationalAge",
    label: "Estimated Gestational Age (EGA)",
    tableLabel: "EGA",
  },
  {
    name: "expectedDeliveryDate",
    label: "Expected Date of Delivery (EDD)",
    tableLabel: "EDD",
    type: "date",
  },
  {
    name: "nextAppointmentDate",
    label: "Next Appointment Date",
    tableLabel: "NEXT APPT",
    type: "date",
    dateAllowFutureOnly: true,
  },
];

export default function NewAntenatalBooking() {
  return (
    <CategoryFormWithHistory
      sectionName="NEW ANTENATAL BOOKING"
      fields={bookingFields}
    />
  );
}
