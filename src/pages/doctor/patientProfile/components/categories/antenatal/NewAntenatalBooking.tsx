import type { CategoryFieldConfig } from "../../../config/categoryFieldTypes";
import { DEFAULT_META_TABLE_COLUMNS } from "../../../config/categoryFieldTypes";
import { CategoryFormWithHistory } from "../../category";
import {
  BLOOD_GROUP_OPTIONS,
  GENOTYPE_OPTIONS,
} from "./antenatalFieldOptions";

const bookingFields: CategoryFieldConfig[] = [
  {
    name: "bloodGroup",
    label: "Blood Group",
    tableLabel: "BLOOD GROUP",
    type: "select",
    placeholder: "-Select a type-",
    options: BLOOD_GROUP_OPTIONS,
  },
  {
    name: "genotype",
    label: "Genotype",
    tableLabel: "GENOTYPE",
    type: "select",
    placeholder: "-Select a type-",
    options: GENOTYPE_OPTIONS,
  },
  {
    name: "anyDischarge",
    label: "Any Discharge?",
    tableLabel: "ANY DISCHARGE",
    type: "select",
    placeholder: "-Select a type-",
  },
  {
    name: "highRiskPregnancy",
    label: "High Risk Pregnancy",
    tableLabel: "HIGH RISK",
    type: "select",
    placeholder: "-Select a type-",
    showInTable: false,
  },
  {
    name: "lastMenstrualPeriod",
    label: "Last Menstrual Period",
    tableLabel: "LMP",
    type: "date",
    placeholder: "DD/MM/YYY",
  },
  {
    name: "estimatedGestationalAge",
    label: "Estimated Gestational Age",
    tableLabel: "EGA",
    placeholder: "-Input gestational age-",
    showInTable: false,
  },
  {
    name: "expectedDeliveryDate",
    label: "Expected Date of Delivery",
    tableLabel: "EDD",
    type: "date",
    placeholder: "DD/MM/YYY",
    showInTable: false,
  },
  {
    name: "nextAppointmentDate",
    label: "Next Appointment Date",
    tableLabel: "NEXT APPT",
    type: "date",
    placeholder: "DD/MM/YYY",
    showInTable: false,
  },
];

const bookingTableColumns = [
  ...DEFAULT_META_TABLE_COLUMNS.filter((c) => c.key !== "enteredBy"),
  { key: "bloodGroup", label: "BLOOD GROUP" },
  { key: "genotype", label: "GENOTYPE" },
  { key: "anyDischarge", label: "ANY DISCHARGE" },
  { key: "lastMenstrualPeriod", label: "LMP" },
];

export default function NewAntenatalBooking() {
  return (
    <CategoryFormWithHistory
      sectionName="NEW ANTENATAL BOOKING"
      tableKey="ANTE NATAL — NEW ANTENATAL BOOKING"
      fields={bookingFields}
      detailsTitle="NEW ANTENATAL BOOKING"
      fullWidth
      tableColumns={bookingTableColumns}
    />
  );
}
