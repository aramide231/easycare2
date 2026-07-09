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

const stageThreePairFields: PairField[] = [
  {
    name: "placentaDelivery",
    label: "Placenta Delivery",
    type: "select",
    placeholder: "-Select option-",
  },
  {
    name: "placentaComplications",
    label: "Placenta Complications?",
    type: "select",
    placeholder: "-Select option-",
  },
  {
    name: "estimatedBloodLoss",
    label: "Estimated Blood Loss",
    placeholder: "-Input loss in ml-",
  },
  {
    name: "hemorrhage",
    label: "Excessive Bleeding or Hemorrhage?",
    type: "select",
    placeholder: "-Select option-",
  },
  {
    name: "uterusContraction",
    label: "Uterus Contraction",
    type: "select",
    placeholder: "-Select option-",
  },
  {
    name: "uterineAtony",
    label: "Uterine Atony",
    type: "select",
    placeholder: "-Select option-",
  },
  {
    name: "bloodPressure",
    label: "Blood Pressure (B.P)",
    placeholder: "-Input B.P-",
  },
  {
    name: "tpr",
    label: "Temperature Pulse Respiration (T.P.R)",
    placeholder: "-Input TPR-",
  },
];

const placentaTableColumns = [
  { key: "sn", label: "SN" },
  { key: "placentaDelivery", label: "PLACENTA DELIVERY" },
  { key: "placentaComplications", label: "PLACENTA COMPLICATIONS" },
  { key: "estimatedBloodLoss", label: "ESTIMATED BLOOD LOSS" },
];

export default function Stage3Placenta() {
  const [stageThreeForm, setStageThreeForm] = useState<Record<string, string>>(
    {}
  );

  const { history: stageThreeHistory, save } = useMedicalTable(
    "STAGE 3: DELIVERY OF PLACENTA"
  );

  const handleChange = (name: string, value: string) => {
    setStageThreeForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const hasValue = Object.values(stageThreeForm).some((value) => value?.trim());
    if (!hasValue) return;

    save(stageThreeForm);
    setStageThreeForm({});
  };

  const renderSelectOptions = (fieldName: string) => {
    if (fieldName === "placentaDelivery") {
      return (
        <>
          <option value="Controlled Cord Traction">
            Controlled Cord Traction
          </option>
          <option value="Manual Removal of Placenta">
            Manual Removal of Placenta
          </option>
        </>
      );
    }

    if (fieldName === "placentaComplications") {
      return (
        <>
          <option value="No">No</option>
          <option value="Yes, Partially Separated">
            Yes, Partially Separated
          </option>
          <option value="Yes, Retained Placenta">Yes, Retained Placenta</option>
        </>
      );
    }

    if (fieldName === "hemorrhage") {
      return (
        <>
          <option value="Uterine Massage">Uterine Massage</option>
          <option value="Medications">Medications</option>
          <option value="IV fluids">IV fluids</option>
          <option value="Other">Other</option>
        </>
      );
    }

    if (fieldName === "uterusContraction" || fieldName === "uterineAtony") {
      return (
        <>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </>
      );
    }

    return null;
  };

  return (
    <div className="space-y-6 text-sm">
      <div className={formFieldGridClass}>
        {stageThreePairFields.map((field) => (
          <div key={field.name} className="min-w-0">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              {field.label}
            </label>

            {field.type === "select" ? (
              <select
                value={stageThreeForm[field.name] || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className={formFieldSelectClass}
              >
                <option value="">{field.placeholder ?? "-Select option-"}</option>
                {renderSelectOptions(field.name)}
              </select>
            ) : (
              <input
                type="text"
                value={stageThreeForm[field.name] || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                className={formFieldInputClass}
              />
            )}
          </div>
        ))}

        <div className="col-span-2 min-w-0">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Additional(s)
          </label>
          <textarea
            rows={4}
            value={stageThreeForm.additional || ""}
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
        title="DELIVERY OF PLACENTA"
        columns={placentaTableColumns}
        rows={stageThreeHistory}
        emptyMessage="No delivery of placenta records yet."
      />
    </div>
  );
}
