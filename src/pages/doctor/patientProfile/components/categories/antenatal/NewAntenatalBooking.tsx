import type { CategoryFieldConfig } from "../../../config/categoryFieldTypes";
import { CategoryFormWithHistory } from "../../category";

const toOptions = (values: string[]) =>
  values.map((value) => ({ value, label: value }));

const BLOOD_GROUP_OPTIONS = toOptions([
  "A+",
  "A-",
  "B+",
  "B-",
  "O+",
  "O-",
  "AB+",
  "AB-",
]);

/** Genotype values from Figma. */
const GENOTYPE_OPTIONS = toOptions(["AA", "AC", "AS", "SS", "SC"]);

const HIGH_RISK_PREGNANCY_OPTIONS = toOptions([
  "Bad Obstetrics Hx",
  "Bleeding Pv In Early Pregnancy",
  "Co-Existing Fibroid",
  "Co-Existing Ovarian Cyst",
  "Grand Multiparous = 5",
  "Multiple Gestations",
  "Pre-Existing Medical Conditions",
  "Previous Aph",
  "Previous Cesarian Section",
  "Previous Cesarian Section x1",
  "Previous Cesarian Section x2",
  "Previous Cesarian Section x3",
  "Previous Ectopic Pregnancy",
  "Previous Gestgational Dm",
  "Previous Hx Of Cervical Incompetence",
  "Previous Infertility",
  "Previous Myomectomy",
  "Previous Preclampsia / Enclampsia",
  "Previous Preterm Delivery",
  "Previous Prom",
  "Premigravida",
]);

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
