import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { cn } from "@doctor-shared/lib/utils";
import { useAuth } from "@doctor-shared/context/useAuth";

interface FlagReport {
  id: number;
  date: string;
  time: string;
  comment: string;
  flaggedBy: string;
}

type PatientInfo = {
  staffName?: string;
  firstName?: string;
  lastName?: string;
  patientId?: string;
};

type Props = {
  patientOverride?: PatientInfo;
  embedded?: boolean;
};

const DEFAULT_STAFF = "Clinical Staff";

export default function FlagProfileReport({
  patientOverride,
  embedded = false,
}: Props = {}) {
  const { state } = useLocation();
  const { user } = useAuth();
  const patient = patientOverride ?? state?.patient;
  const focusPreviousRecords = Boolean(state?.focusPreviousRecords);
  const recordsRef = useRef<HTMLDivElement>(null);
  const commentSectionRef = useRef<HTMLDivElement>(null);
  const flaggedByName = user?.fullName ?? patient?.staffName ?? DEFAULT_STAFF;

  const [commentInput, setCommentInput] = useState("");
  const [editingReportId, setEditingReportId] = useState<number | null>(null);
  const [reports, setReports] = useState<FlagReport[]>([
    {
      id: 1,
      date: "14-Feb-2020",
      time: "10:25 AM",
      comment:
        "The patient was flagged due to a significant change in their vital signs, indicating a potential risk that requires immediate attention.",
      flaggedBy: patient?.staffName ?? DEFAULT_STAFF,
    },
    {
      id: 2,
      date: "15-Feb-2020",
      time: "10:25 AM",
      comment:
        "We flagged this patient because their recent lab results showed elevated levels that could suggest a serious condition.",
      flaggedBy: patient?.staffName ?? DEFAULT_STAFF,
    },
    {
      id: 3,
      date: "16-Feb-2020",
      time: "10:25 AM",
      comment:
        "This patient was marked for review as they exhibited symptoms that are concerning and may require further evaluation.",
      flaggedBy: patient?.staffName ?? DEFAULT_STAFF,
    },
    {
      id: 4,
      date: "17-Feb-2020",
      time: "11:00 AM",
      comment:
        "The reason for flagging this patient is due to their history of non-compliance with treatment, which poses a risk to their health.",
      flaggedBy: patient?.staffName ?? DEFAULT_STAFF,
    },
  ]);

  const canSubmit = commentInput.trim().length > 0;
  const isEditing = editingReportId !== null;
  const submitLabel = isEditing ? "Save Changes" : "Confirm";

  const formatNow = () => {
    const now = new Date();
    return {
      date: now.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      time: now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const handleSubmit = () => {
    if (!canSubmit) return;

    if (isEditing) {
      setReports((prev) =>
        prev.map((report) =>
          report.id === editingReportId
            ? { ...report, comment: commentInput.trim() }
            : report
        )
      );
      setCommentInput("");
      setEditingReportId(null);
      toast.success("Flag comment updated successfully.");
      return;
    }

    const { date, time } = formatNow();
    const newReport: FlagReport = {
      id: Date.now(),
      date,
      time,
      comment: commentInput.trim(),
      flaggedBy: flaggedByName,
    };

    setReports((prev) => [newReport, ...prev]);
    setCommentInput("");
    toast.success("Flag comment submitted successfully.");
  };

  const handleEdit = (id: number) => {
    const report = reports.find((item) => item.id === id);
    if (!report) return;

    setCommentInput(report.comment);
    setEditingReportId(id);
    commentSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleDelete = (id: number) => {
    setReports((prev) => prev.filter((report) => report.id !== id));
    if (editingReportId === id) {
      setCommentInput("");
      setEditingReportId(null);
    }
    toast.info("Flag comment removed.");
  };

  useEffect(() => {
    if (focusPreviousRecords && recordsRef.current) {
      recordsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [focusPreviousRecords]);

  return (
    <div className={cn("w-full", embedded ? "p-4 md:p-6" : "p-6")}>
      <div ref={commentSectionRef}>
        <label className="font-semibold text-gray-700">COMMENTS</label>

        <textarea
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          placeholder="Enter Comment Here"
          className="mt-2 h-32 w-full resize-none rounded-lg border border-gray-300 p-3 focus:border-[#573FD1] focus:ring-[#573FD1]"
        />

        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={cn(
              "min-w-[160px] rounded-lg px-6 py-2.5 text-sm font-semibold transition",
              canSubmit
                ? "bg-[#573FD1] text-white hover:bg-[#4a35b8]"
                : "cursor-not-allowed bg-gray-200 text-gray-400"
            )}
          >
            {submitLabel}
          </button>
        </div>
      </div>

      <div
        ref={recordsRef}
        id="previous-patient-records"
        className="mt-10 w-full rounded-xl border bg-white p-6 shadow-sm"
      >
        <h2 className="mb-4 font-semibold text-gray-700">
          {focusPreviousRecords
            ? "PREVIOUS PATIENT RECORDS"
            : "PROFILE FLAG REPORT"}
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b bg-gray-100 text-left text-gray-600">
                <th className="w-12 p-3 text-center">SN</th>
                <th className="p-3">DATE | TIME</th>
                <th className="w-[45%] p-3">COMMENT</th>
                <th className="p-3">FLAGGED BY</th>
                <th className="p-3 text-center">ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {reports.map((item, idx) => (
                <tr
                  key={item.id}
                  className="border-b transition hover:bg-gray-50"
                >
                  <td className="p-3 text-center">{idx + 1}</td>

                  <td className="p-3">
                    <div>{item.date}</div>
                    <div className="text-sm text-gray-500">{item.time}</div>
                  </td>

                  <td className="p-3 text-sm text-gray-700">{item.comment}</td>

                  <td className="p-3">{item.flaggedBy}</td>

                  <td className="p-3">
                    <div className="flex justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleEdit(item.id)}
                        className="rounded-md border border-green-300 bg-green-100 px-3 py-1 text-xs text-green-700"
                      >
                        EDIT
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="rounded-md border border-red-300 bg-red-100 px-3 py-1 text-xs text-red-700"
                      >
                        DELETE
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
