import { useCallback, useEffect, useState } from "react";
import { categoryDetailsTitle } from "../../../config/categoryFieldTypes";
import { useMedicalTable } from "../../../hooks/useMedicalTable";
import { usePendingCategoryDraft } from "../../../hooks/usePendingCategoryDraft";
import FormDatePicker from "../../category/FormDatePicker";
import CategoryMedicalTable from "../../category/CategoryMedicalTable";
import { isFutureAppointmentDateField } from "../../../lib/dateFieldRules";
import { formFieldTextareaClass } from "../../../lib/formFieldStyles";

const followUpTableColumns = [
  { key: "sn", label: "SN" },
  { key: "dateTime", label: "DATE | TIME" },
  { key: "patientType", label: "PATIENT TYPE" },
  { key: "findings", label: "FINDINGS" },
  { key: "nextAppointmentDate", label: "NEXT APPOINTMENT" },
];

export default function FollowUpVisit() {
  const [followUpForm, setFollowUpForm] = useState<Record<string, string>>({});

  const { history: bookingHistory } = useMedicalTable("NEW ANTENATAL BOOKING");
  const { history: followUpVisits } = useMedicalTable("FOLLOW-UP VISIT");

  // Capture next appointment date from New Antenatal Booking or previous follow-up visit
  const capturedAppointmentDate = String(
    bookingHistory.find((r) => r.nextAppointmentDate)?.nextAppointmentDate ??
      bookingHistory[0]?.nextAppointmentDate ??
      followUpVisits.find((r) => r.nextAppointmentDate)?.nextAppointmentDate ??
      ""
  );

  useEffect(() => {
    if (capturedAppointmentDate && !followUpForm.nextAppointmentDate) {
      setFollowUpForm((prev) => ({
        ...prev,
        nextAppointmentDate: capturedAppointmentDate,
      }));
    }
  }, [capturedAppointmentDate]);

  const clearForm = useCallback(() => {
    setFollowUpForm(
      capturedAppointmentDate
        ? { nextAppointmentDate: capturedAppointmentDate }
        : {}
    );
  }, [capturedAppointmentDate]);

  usePendingCategoryDraft(
    "FOLLOW-UP VISIT",
    () => {
      const hasFindings = Boolean(followUpForm.findings?.trim());
      const hasDate = Boolean(followUpForm.nextAppointmentDate?.trim());
      if (!hasFindings && !hasDate) return null;
      return {
        findings: followUpForm.findings?.trim() || "",
        nextAppointmentDate: followUpForm.nextAppointmentDate?.trim() || "",
      };
    },
    [followUpForm],
    clearForm
  );

  return (
    <div className="space-y-6 text-sm">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="min-w-0">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Next Appointment Date
          </label>
          <FormDatePicker
            value={followUpForm.nextAppointmentDate || ""}
            onChange={(next) =>
              setFollowUpForm((prev) => ({
                ...prev,
                nextAppointmentDate: next,
              }))
            }
            allowFutureOnly={isFutureAppointmentDateField("nextAppointmentDate")}
          />
          {capturedAppointmentDate ? (
            <p className="mt-1 text-xs text-[#573FD1]">
              Pre-captured from New Antenatal Booking ({capturedAppointmentDate})
            </p>
          ) : null}
        </div>
      </div>

      <div className="min-w-0">
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Findings / Clinical Notes
        </label>
        <textarea
          rows={7}
          value={followUpForm.findings || ""}
          onChange={(e) =>
            setFollowUpForm((prev) => ({ ...prev, findings: e.target.value }))
          }
          placeholder="Document clinical findings and patient assessment for this follow-up visit..."
          className={`${formFieldTextareaClass} min-h-[160px]`}
        />
      </div>

      <CategoryMedicalTable
        title={categoryDetailsTitle("FOLLOW-UP VISIT")}
        columns={followUpTableColumns}
        rows={followUpVisits}
        emptyMessage="No follow-up visit records yet."
        wrapColumns={["findings"]}
      />
    </div>
  );
}
