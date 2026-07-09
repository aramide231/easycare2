import { useState } from "react";
import { Calendar } from "lucide-react";
import { useMedicalTable } from "../../../hooks/useMedicalTable";
import CategoryMedicalTable from "../../category/CategoryMedicalTable";
import {
  formFieldGridClass,
  formFieldInputClass,
  formFieldSelectClass,
  formFieldTextareaClass,
} from "../../../lib/formFieldStyles";

type PairField = {
  name: string;
  label: string;
  type?: "select" | "suffix";
  suffix?: string;
  placeholder?: string;
};

const stageTwoPairFields: PairField[] = [
  {
    name: "cervicalDilatation",
    label: "Cervical Dilatation (4hrly)",
    placeholder: "-Input dilatation-",
  },
  {
    name: "deliveryMode",
    label: "Mother's Mode of Delivery",
    type: "select",
    placeholder: "-Select option-",
  },
  {
    name: "apgarScore",
    label: "APGAR Score",
    type: "select",
    placeholder: "-Select option-",
  },
  {
    name: "babyGender",
    label: "Baby's Gender",
    type: "select",
    placeholder: "-Select option-",
  },
  {
    name: "babyWeight",
    label: "Baby's Weight",
    type: "suffix",
    suffix: "KG",
    placeholder: "-Input weight in KG-",
  },
  {
    name: "babyHeight",
    label: "Baby's Height",
    type: "suffix",
    suffix: "CM",
    placeholder: "-Input height in CM-",
  },
  {
    name: "babyTemperature",
    label: "Baby's Temperature",
    type: "suffix",
    suffix: "TEMP",
    placeholder: "-Input temperature in TEMP-",
  },
  {
    name: "abnormality",
    label: "Any Congenital Abnormality in Baby?",
    placeholder: "Enter notes here",
  },
];

const pushingTableColumns = [
  { key: "sn", label: "SN" },
  { key: "deliveryDateTime", label: "DATE | TIME" },
  { key: "cervicalDilatation", label: "C.V" },
  { key: "deliveryMode", label: "MODE" },
  { key: "apgarScore", label: "APGAR SCORE" },
  { key: "babyGender", label: "GENDER" },
];

function SuffixInput({
  suffix,
  value,
  onChange,
  placeholder,
}: {
  suffix: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`${formFieldInputClass} pr-14`}
      />
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500">
        {suffix}
      </span>
    </div>
  );
}

export default function Stage2Pushing() {
  const [stageTwoForm, setStageTwoForm] = useState<Record<string, string>>({});

  const { history: stageTwoHistory, save } = useMedicalTable(
    "STAGE 2: PUSHING & BIRTHING"
  );

  const handleChange = (name: string, value: string) => {
    setStageTwoForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const hasValue = Object.values(stageTwoForm).some((value) => value?.trim());
    if (!hasValue) return;

    save(stageTwoForm);
    setStageTwoForm({});
  };

  const renderSelectOptions = (fieldName: string) => {
    if (fieldName === "deliveryMode") {
      return (
        <>
          <option value="Assisted Vaginal Delivery (AVD)">
            Assisted Vaginal Delivery (AVD)
          </option>
          <option value="Cesarean Section (C/S)">Cesarean Section (C/S)</option>
          <option value="Vaginal Delivery (VD)">Vaginal Delivery (VD)</option>
          <option value="Vaginal Birth After Cesarean (VBAC)">
            Vaginal Birth After Cesarean (VBAC)
          </option>
          <option value="Vacuum Delivery">Vacuum Delivery</option>
        </>
      );
    }

    if (fieldName === "apgarScore") {
      return [...Array(11)].map((_, i) => (
        <option key={i} value={String(i)}>
          {i}
        </option>
      ));
    }

    if (fieldName === "babyGender") {
      return (
        <>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
        </>
      );
    }

    return null;
  };

  const tableRows = stageTwoHistory.map((row) => ({
    ...row,
    deliveryDateTime:
      row.deliveryDateTime ?? row.dateTime ?? "—",
  }));

  return (
    <div className="space-y-6 text-sm">
      <div className={formFieldGridClass}>
        {stageTwoPairFields.map((field) => (
          <div key={field.name} className="min-w-0">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              {field.label}
            </label>

            {field.type === "select" ? (
              <select
                value={stageTwoForm[field.name] || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className={formFieldSelectClass}
              >
                <option value="">{field.placeholder ?? "-Select option-"}</option>
                {renderSelectOptions(field.name)}
              </select>
            ) : field.type === "suffix" ? (
              <SuffixInput
                suffix={field.suffix ?? ""}
                value={stageTwoForm[field.name] || ""}
                onChange={(value) => handleChange(field.name, value)}
                placeholder={field.placeholder}
              />
            ) : (
              <input
                type="text"
                value={stageTwoForm[field.name] || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                className={formFieldInputClass}
              />
            )}
          </div>
        ))}

        <div className="min-w-0">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Date + Time of Delivery
          </label>
          <div className="relative">
            <input
              type="datetime-local"
              value={stageTwoForm.deliveryDateTime || ""}
              onChange={(e) => handleChange("deliveryDateTime", e.target.value)}
              className={`${formFieldInputClass} pr-10`}
            />
            <Calendar
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
              aria-hidden
            />
          </div>
        </div>

        <div className="col-span-2 min-w-0">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Additional(s)
          </label>
          <textarea
            rows={4}
            value={stageTwoForm.additional || ""}
            onChange={(e) => handleChange("additional", e.target.value)}
            placeholder="Enter notes here"
            className={formFieldTextareaClass}
          />
        </div>
      </div>

      <div className="text-center">
        <button
          type="button"
          onClick={handleSave}
          className="w-full max-w-xs rounded-lg bg-[#573FD1] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#4a35b8]"
        >
          Save
        </button>
      </div>

      <CategoryMedicalTable
        title="PUSHING & BIRTHING DETAILS"
        columns={pushingTableColumns}
        rows={tableRows}
        emptyMessage="No pushing and birthing records yet."
      />
    </div>
  );
}
