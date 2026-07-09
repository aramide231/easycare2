import type { CategoryFieldConfig } from "../../../config/categoryFieldTypes";
import { CategoryFormWithHistory } from "../../category";

const bookingFields: CategoryFieldConfig[] = [
  { name: "bloodGroup", label: "Blood Group", tableLabel: "BLOOD GRP" },
  { name: "genotype", label: "Genotype" },
  { name: "anyDischarge", label: "Any Discharge?", tableLabel: "DISCHARGE" },
  {
    name: "highRiskPregnancy",
    label: "High Risk Pregnancy?",
    tableLabel: "HIGH RISK",
    type: "select",
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
