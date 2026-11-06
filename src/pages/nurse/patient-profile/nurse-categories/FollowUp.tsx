import { useCallback, useState } from "react";
import { useMedicalTable } from "@/pages/doctor/patientProfile/hooks/useMedicalTable";
import { usePendingCategoryDraft } from "@/pages/doctor/patientProfile/hooks/usePendingCategoryDraft";
import FormDatePicker from "@/pages/doctor/patientProfile/components/category/FormDatePicker";
import { isFutureAppointmentDateField } from "@/pages/doctor/patientProfile/lib/dateFieldRules";
import {
  formFieldGridClass,
  formFieldTextareaClass,
} from "@/pages/doctor/patientProfile/lib/formFieldStyles";

const pairedFieldMinHeight = "min-h-[180px]";

export default function FollowUp({ nurse = false }: { nurse?: boolean }) {
  const [form, setForm] = useState<Record<string, string>>({});

  const {
    history: followUpHistory,
    remove: deleteFollowUp,
  } = useMedicalTable("FOLLOW-UP");

  const clearForm = useCallback(() => setForm({}), []);

  usePendingCategoryDraft(
    "FOLLOW-UP",
    () => {
      if (!form.nextDoseDate?.trim() && !form.notes?.trim() && !form.extraNotes?.trim()) {
        return null;
      }
      return {
        appointmentDate: form.nextDoseDate || "",
        nurse: form.nurse || "TOBA AYO",
        notes: form.notes || "",
        extraNotes: form.extraNotes || "",
      };
    },
    [form],
    clearForm
  );

  return (
    <div className="space-y-6 text-sm">
      <div className={`${formFieldGridClass} items-stretch`}>
        <div className={`flex ${pairedFieldMinHeight} flex-col`}>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Next Dose Due Date
          </label>
          <div className="flex flex-1 flex-col justify-center">
            <FormDatePicker
              value={form.nextDoseDate || ""}
              onChange={(next) => setForm({ ...form, nextDoseDate: next })}
              allowFutureOnly={isFutureAppointmentDateField("nextDoseDate")}
            />
          </div>
        </div>

        <div className={`flex ${pairedFieldMinHeight} flex-col`}>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Follow-up Notes
          </label>
          <textarea
            className={`${formFieldTextareaClass} min-h-0 flex-1`}
            placeholder="Enter follow-up notes"
            value={form.notes || ""}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />
        </div>
      </div>

      {!nurse && <div>
        <label htmlFor="immunization-extra-notes" className="mb-1 block text-sm font-medium text-gray-700">
          Additional Follow-up Notes
        </label>
        <textarea
          id="immunization-extra-notes"
          className={`${formFieldTextareaClass} min-h-[180px]`}
          value={form.extraNotes || ""}
          onChange={(e) => setForm({ ...form, extraNotes: e.target.value })}
        />
      </div>}

      {followUpHistory.length > 0 && (
        <div className="overflow-x-auto">
          <h4 className="mb-2 font-semibold">FOLLOW-UP VISIT</h4>

          <table className="min-w-max w-full border text-left text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th>S/N</th>
                <th>Date | Time</th>
                <th>Patient Type</th>
                <th>Appointment Date</th>
                <th>Nurse</th>
                <th>Follow-up Notes</th>
                {!nurse && <th>Additional Follow-up Notes</th>}
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {followUpHistory.map((row, index) => (
                <tr key={index} className="even:bg-gray-50">
                  <td>{String(row.sn ?? "")}</td>
                  <td>{String(row.dateTime ?? "")}</td>
                  <td>{String(row.patientType || "OPD")}</td>
                  <td>{String(row.appointmentDate ?? "")}</td>
                  <td>{String(row.nurse ?? "")}</td>
                  <td className="max-w-sm whitespace-pre-wrap break-words">{String(row.notes ?? "")}</td>
                  {!nurse && <td className="max-w-sm whitespace-pre-wrap break-words">{String(row.extraNotes ?? "")}</td>}
                  <td>
                    <button
                      type="button"
                      onClick={() => deleteFollowUp(index)}
                      className="rounded bg-red-500 px-2 py-1 text-xs text-white"
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
