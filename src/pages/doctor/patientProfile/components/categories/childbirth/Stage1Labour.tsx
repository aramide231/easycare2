import { useState } from "react";
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
  type?: "select";
  placeholder?: string;
};

const stageOneLabourPairFields: PairField[] = [
  {
    name: "patientType",
    label: "Patient Type",
    type: "select",
    placeholder: "-Select option-",
  },
  {
    name: "intensity",
    label: "Intensity of Contractions",
    type: "select",
    placeholder: "-Select option-",
  },
  {
    name: "cervicalDilatation",
    label: "Cervical Dilatation (4hrly)",
    placeholder: "-Input dilation-",
  },
  {
    name: "presentation",
    label: "Presentation",
    type: "select",
    placeholder: "-Select option-",
  },
  {
    name: "fhr",
    label: "Fetal Heart Rate (FHR)",
    placeholder: "-Input FHR-",
  },
  {
    name: "bloodPressure",
    label: "Blood Pressure (B.P)",
    placeholder: "-Input B.P-",
  },
];

const labourTableColumns = [
  { key: "sn", label: "S/N" },
  { key: "dateTime", label: "DATE" },
  { key: "patientType", label: "PATIENT TYPE" },
  { key: "intensity", label: "INT. OF CONT." },
  { key: "cervicalDilatation", label: "C.V" },
  { key: "presentation", label: "PRESENTATION" },
];

export default function Stage1Labour() {
  const [stageOneLabourForm, setStageOneLabourForm] = useState<
    Record<string, string>
  >({});

  const { history: stageOneLabourHistory, save } = useMedicalTable(
    "STAGE 1: LABOUR"
  );

  const handleChange = (name: string, value: string) => {
    setStageOneLabourForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const hasValue = Object.values(stageOneLabourForm).some((value) =>
      value?.trim()
    );
    if (!hasValue) return;

    save(stageOneLabourForm);
    setStageOneLabourForm({});
  };

  const renderSelectOptions = (fieldName: string) => {
    if (fieldName === "patientType") {
      return (
        <>
          <option value="Booked">Booked</option>
          <option value="UnBooked">UnBooked</option>
        </>
      );
    }

    if (fieldName === "intensity") {
      return (
        <>
          <option value="Mild">Mild</option>
          <option value="Moderate">Moderate</option>
          <option value="Severe">Severe</option>
        </>
      );
    }

    if (fieldName === "presentation") {
      return (
        <>
          <option value="Breech">Breech</option>
          <option value="Cephalic">Cephalic</option>
          <option value="Transverse">Transverse</option>
        </>
      );
    }

    return null;
  };

  return (
    <div className="space-y-6 text-sm">
      <div className={formFieldGridClass}>
        {stageOneLabourPairFields.map((field) => (
          <div key={field.name} className="min-w-0">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              {field.label}
            </label>

            {field.type === "select" ? (
              <select
                value={stageOneLabourForm[field.name] || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className={formFieldSelectClass}
              >
                <option value="">{field.placeholder ?? "-Select option-"}</option>
                {renderSelectOptions(field.name)}
              </select>
            ) : (
              <input
                type="text"
                value={stageOneLabourForm[field.name] || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                className={formFieldInputClass}
              />
            )}
          </div>
        ))}

        <div className="col-span-2 min-w-0">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Temperature Pulse Respiration (T.P.R)
          </label>
          <input
            type="text"
            value={stageOneLabourForm.tpr || ""}
            onChange={(e) => handleChange("tpr", e.target.value)}
            placeholder="-Input TPR-"
            className={formFieldInputClass}
          />
        </div>

        <div className="col-span-2 min-w-0">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Additional(s)
          </label>
          <textarea
            rows={4}
            value={stageOneLabourForm.additional || ""}
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
        title="LABOUR DETAILS"
        columns={labourTableColumns}
        rows={stageOneLabourHistory}
        emptyMessage="No labour records yet."
      />
    </div>
  );
}
