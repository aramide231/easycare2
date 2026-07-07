import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useMedicalTable } from "../../../hooks/useMedicalTable";
import {
  genConsultDeleteBtn,
  genConsultInputClass,
  genConsultLabelClass,
  genConsultSaveBtn,
  genConsultSelectClass,
  genConsultTextareaClass,
} from "../genConsult/genConsultStyles";
import {
  babyCountFromSelection,
  BOOKED_PATIENT_OPTIONS,
  DELIVERY_MODE_STAGE4_OPTIONS,
  GENDER_OPTIONS,
  IMMUNIZATION_AT_BIRTH_OPTIONS,
  NO_OF_BABY_OPTIONS,
} from "./childbirthFieldOptions";

type BabyRecord = {
  weight: string;
  length: string;
  headCircumference: string;
  condition: string;
  gender: string;
  immunization: string;
  deliveryDateTime: string;
};

const emptyBaby = (): BabyRecord => ({
  weight: "",
  length: "",
  headCircumference: "",
  condition: "",
  gender: "",
  immunization: "",
  deliveryDateTime: "",
});

const HISTORY_COLUMNS = [
  { key: "sn", label: "SN" },
  { key: "dateTime", label: "DATE | TIME" },
  { key: "deliveryMode", label: "MOTHER'S MODE OF DELIVERY" },
  { key: "noOfBaby", label: "NO OF BABY" },
  { key: "babyWeights", label: "BABY WEIGHT" },
];

export default function Stage4DeliveryNote() {
  const { user } = useAuth();
  const [ega, setEga] = useState("");
  const [deliveryMode, setDeliveryMode] = useState("");
  const [noOfBaby, setNoOfBaby] = useState("1 Baby");
  const [motherCondition, setMotherCondition] = useState("");
  const [patientType, setPatientType] = useState("");
  const [complication, setComplication] = useState("");
  const [clinician, setClinician] = useState("");
  const [physicalExam, setPhysicalExam] = useState("");
  const [additional, setAdditional] = useState("");
  const [babies, setBabies] = useState<BabyRecord[]>([emptyBaby()]);

  const { history, save, remove } = useMedicalTable(
    "CHILD BIRTH — STAGE 4: DELIVERY NOTE",
  );

  const inputClass = genConsultInputClass.replace("max-w-[354px]", "max-w-none");
  const selectClass = genConsultSelectClass.replace(
    "max-w-[354px]",
    "max-w-none",
  );
  const textareaClass = genConsultTextareaClass.replace(
    "max-w-[354px]",
    "max-w-none",
  );
  const smallInputClass = `${inputClass} max-w-[120px]`;

  const handleNoOfBabyChange = (value: string) => {
    const count = babyCountFromSelection(value);
    setNoOfBaby(value);
    setBabies((prev) =>
      Array.from({ length: count }, (_, i) => prev[i] ?? emptyBaby()),
    );
  };

  const updateBaby = (
    index: number,
    field: keyof BabyRecord,
    value: string,
  ) => {
    setBabies((prev) =>
      prev.map((baby, i) => (i === index ? { ...baby, [field]: value } : baby)),
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    save({
      ega,
      deliveryMode,
      noOfBaby,
      motherCondition,
      patientType,
      complication,
      clinician: clinician || user?.fullName || "",
      physicalExam,
      additional,
      babyWeights: babies.map((b) => b.weight).filter(Boolean).join(", "),
      babyDetails: JSON.stringify(babies),
    });
    setEga("");
    setDeliveryMode("");
    setNoOfBaby("1 Baby");
    setMotherCondition("");
    setPatientType("");
    setComplication("");
    setClinician("");
    setPhysicalExam("");
    setAdditional("");
    setBabies([emptyBaby()]);
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSave}
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
      >
        <div>
          <label className={genConsultLabelClass}>
            Estimated Gestational Age (E.G.A)
          </label>
          <input
            value={ega}
            onChange={(e) => setEga(e.target.value)}
            placeholder="-Input EGA-"
            className={inputClass}
          />
        </div>
        <div>
          <label className={genConsultLabelClass}>Mother's Mode of Delivery</label>
          <select
            value={deliveryMode}
            onChange={(e) => setDeliveryMode(e.target.value)}
            className={selectClass}
          >
            <option value="">-Select option-</option>
            {DELIVERY_MODE_STAGE4_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={genConsultLabelClass}>No of Baby</label>
          <select
            value={noOfBaby}
            onChange={(e) => handleNoOfBabyChange(e.target.value)}
            className={selectClass}
          >
            {NO_OF_BABY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={genConsultLabelClass}>Mother's Condition</label>
          <input
            value={motherCondition}
            onChange={(e) => setMotherCondition(e.target.value)}
            placeholder="-Enter condition-"
            className={inputClass}
          />
        </div>
        <div>
          <label className={genConsultLabelClass}>Patient Type</label>
          <select
            value={patientType}
            onChange={(e) => setPatientType(e.target.value)}
            className={selectClass}
          >
            <option value="">-Select option-</option>
            {BOOKED_PATIENT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={genConsultLabelClass}>Any Complication</label>
          <input
            value={complication}
            onChange={(e) => setComplication(e.target.value)}
            placeholder="-Enter complication-"
            className={inputClass}
          />
        </div>

        <div className="md:col-span-2 space-y-4 rounded-lg border border-gray-200 bg-[#FAFAFA] p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-700">
            Baby Details ({babies.length})
          </p>
          {babies.map((baby, index) => (
            <div key={index} className="space-y-3 border-b border-gray-200 pb-4 last:border-0">
              {babies.length > 1 && (
                <p className="text-sm font-medium text-[#573FD1]">
                  Baby {String.fromCharCode(65 + index)}
                </p>
              )}
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                <div>
                  <label className={genConsultLabelClass}>Baby's Weight</label>
                  <input
                    value={baby.weight}
                    onChange={(e) => updateBaby(index, "weight", e.target.value)}
                    placeholder="-Kg-"
                    className={smallInputClass}
                  />
                </div>
                <div>
                  <label className={genConsultLabelClass}>Baby's Length</label>
                  <input
                    value={baby.length}
                    onChange={(e) => updateBaby(index, "length", e.target.value)}
                    placeholder="-CM-"
                    className={smallInputClass}
                  />
                </div>
                <div>
                  <label className={genConsultLabelClass}>Head Circumference</label>
                  <input
                    value={baby.headCircumference}
                    onChange={(e) =>
                      updateBaby(index, "headCircumference", e.target.value)
                    }
                    placeholder="-CM-"
                    className={smallInputClass}
                  />
                </div>
                <div>
                  <label className={genConsultLabelClass}>Baby's Condition</label>
                  <input
                    value={baby.condition}
                    onChange={(e) => updateBaby(index, "condition", e.target.value)}
                    placeholder="-Enter-"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={genConsultLabelClass}>Baby's Gender</label>
                  <select
                    value={baby.gender}
                    onChange={(e) => updateBaby(index, "gender", e.target.value)}
                    className={selectClass}
                  >
                    <option value="">-Select-</option>
                    {GENDER_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={genConsultLabelClass}>
                    Baby's Immunization at Birth
                  </label>
                  <select
                    value={baby.immunization}
                    onChange={(e) =>
                      updateBaby(index, "immunization", e.target.value)
                    }
                    className={selectClass}
                  >
                    <option value="">-Select-</option>
                    {IMMUNIZATION_AT_BIRTH_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-3">
                  <label className={genConsultLabelClass}>
                    Date + Time of Delivery
                  </label>
                  <input
                    type="datetime-local"
                    value={baby.deliveryDateTime}
                    onChange={(e) =>
                      updateBaby(index, "deliveryDateTime", e.target.value)
                    }
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <label className={genConsultLabelClass}>Clinician Name</label>
          <input
            value={clinician}
            onChange={(e) => setClinician(e.target.value)}
            placeholder="capture name of filler"
            className={inputClass}
          />
        </div>

        <div className="md:col-span-2">
          <label className={genConsultLabelClass}>Physical Examination</label>
          <textarea
            value={physicalExam}
            onChange={(e) => setPhysicalExam(e.target.value)}
            placeholder="Enter examination notes..."
            className={textareaClass}
          />
        </div>
        <div className="md:col-span-2">
          <label className={genConsultLabelClass}>Additional(s)</label>
          <textarea
            value={additional}
            onChange={(e) => setAdditional(e.target.value)}
            placeholder="Enter notes here"
            className={textareaClass}
          />
        </div>

        <div className="md:col-span-2 pt-2 text-center">
          <button type="submit" className={genConsultSaveBtn}>
            Save
          </button>
        </div>
      </form>

      <div className="overflow-x-auto border-t border-gray-200 pt-4">
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-800">
          DELIVERY NOTE DETAILS
        </h3>
        <table className="min-w-max w-full text-left text-sm">
          <thead className="border-b border-[#D4D4D4] text-xs uppercase text-gray-500">
            <tr>
              {HISTORY_COLUMNS.map((col) => (
                <th
                  key={col.key}
                  className="whitespace-nowrap px-4 py-2 font-medium"
                >
                  {col.label}
                </th>
              ))}
              <th className="px-4 py-2" />
            </tr>
          </thead>
          <tbody>
            {history.length === 0 ? (
              <tr>
                <td
                  colSpan={HISTORY_COLUMNS.length + 1}
                  className="py-8 text-center text-gray-500"
                >
                  No delivery notes recorded yet.
                </td>
              </tr>
            ) : (
              history.map((row, index) => (
                <tr
                  key={index}
                  className={`border-b border-[#D4D4D4] ${
                    index % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]"
                  }`}
                >
                  <td className="px-4 py-3">{row.sn as number}</td>
                  <td className="px-4 py-3">{row.dateTime as string}</td>
                  <td className="px-4 py-3">{row.deliveryMode as string}</td>
                  <td className="px-4 py-3">{row.noOfBaby as string}</td>
                  <td className="px-4 py-3">{row.babyWeights as string}</td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className={genConsultDeleteBtn}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
