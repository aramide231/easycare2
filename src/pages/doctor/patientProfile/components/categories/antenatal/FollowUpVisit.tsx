import { useCallback, useState } from "react";
import { useMedicalTable } from "../../../hooks/useMedicalTable";
import { usePendingCategoryDraft } from "../../../hooks/usePendingCategoryDraft";
import FormDatePicker from "../../category/FormDatePicker";
import { isFutureAppointmentDateField } from "../../../lib/dateFieldRules";
import { formFieldInputClass } from "../../../lib/formFieldStyles";

export default function FollowUpVisit() {
  const [followUpForm, setFollowUpForm] = useState<Record<string, string>>({});

  const followUpFields = [
    {
      name: "ega",
      label: "Estimated Gestational Age",
      placeholder: "e.g. 24 weeks, 3 days",
    },
    {
      name: "heightOfFundus",
      label: "Height of Fundus (cm)",
      numeric: true,
      placeholder: "e.g. 24",
    },
    {
      name: "presentationPosition",
      label: "Presentation & Position (bpm)",
      placeholder: "e.g. Cephalic",
    },
    {
      name: "relationOfBrim",
      label: "Relation of Presenting Part of Brim",
      placeholder: "Enter relation of presenting part",
    },
    {
      name: "foetalHeart",
      label: "Foetal Heart",
      numeric: true,
      placeholder: "e.g. 142",
    },
    {
      name: "urine",
      label: "Urine",
      placeholder: "Enter urine result",
    },
    {
      name: "bloodPressure",
      label: "Blood Pressure (mmHg)",
      bp: true,
      placeholder: "e.g. 120/80",
    },
    {
      name: "weight",
      label: "Weight (Kg)",
      numeric: true,
      placeholder: "e.g. 68",
    },
    {
      name: "pcv",
      label: "PCV",
      numeric: true,
      placeholder: "e.g. 34",
    },
    {
      name: "oedema",
      label: "Oedema",
      placeholder: "Enter oedema status",
    },
    {
      name: "findings",
      label: "Findings",
      placeholder: "Enter clinical findings",
    },
    { name: "nextAppointmentDate", label: "Next Appointment Date", type: "date" },
  ];

  const {
    history: followUpVisits,
    remove: deleteFollowUp,
  } = useMedicalTable("FOLLOW-UP VISIT");

  const clearForm = useCallback(() => setFollowUpForm({}), []);

  usePendingCategoryDraft(
    "FOLLOW-UP VISIT",
    () => {
      const hasValue = Object.values(followUpForm).some((value) => value?.trim());
      if (!hasValue) return null;
      return { ...followUpForm };
    },
    [followUpForm],
    clearForm
  );

  return (
    <div className="p-4 bg-gray-50 rounded-b text-sm">
      <div className="grid grid-cols-2 gap-4">
        {followUpFields.map((field) => (
          <div key={field.name}>
            <label className="block mb-1 font-medium">{field.label}</label>

            {field.type === "date" ? (
              <FormDatePicker
                value={followUpForm[field.name] || ""}
                onChange={(next) =>
                  setFollowUpForm({
                    ...followUpForm,
                    [field.name]: next,
                  })
                }
                allowFutureOnly={isFutureAppointmentDateField(field.name)}
              />
            ) : (
              <input
                type="text"
                inputMode={
                  field.numeric ? "decimal" : field.bp ? "numeric" : undefined
                }
                value={followUpForm[field.name] || ""}
                onChange={(e) => {
                  const raw = e.target.value;
                  const next = field.bp
                    ? raw.replace(/[^0-9/]/g, "")
                    : field.numeric
                      ? raw.replace(/[^0-9.]/g, "")
                      : raw;
                  setFollowUpForm({
                    ...followUpForm,
                    [field.name]: next,
                  });
                }}
                placeholder={field.placeholder}
                className={formFieldInputClass}
              />
            )}
          </div>
        ))}
      </div>

      {followUpVisits.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <h4 className="font-semibold mb-2">FOLLOW-UP VISIT</h4>

          <table className="min-w-max text-sm text-left border">
            <thead className="bg-gray-100">
              <tr>
                <th>S/N</th>
                <th>Date | Time</th>
                <th>Patient Type</th>
                <th>EGA</th>
                <th>Height of Fundus</th>
                <th>BPM</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {followUpVisits.map((row, index) => (
                <tr key={index} className="even:bg-gray-50">
                  <td>{String(row.sn ?? index + 1)}</td>
                  <td>{String(row.dateTime ?? "—")}</td>
                  <td>{String(row.patientType ?? "—")}</td>
                  <td>{String(row.ega ?? "—")}</td>
                  <td>{String(row.heightOfFundus ?? "—")}</td>
                  <td>{String(row.presentationPosition ?? "—")}</td>
                  <td>
                    <button
                      onClick={() => deleteFollowUp(index)}
                      className="px-2 py-1 text-xs bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
