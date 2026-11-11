import { useEffect, useRef, useState } from "react";
import { registerSessionCleanup } from "@/lib/sessionScope";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { cn } from "@doctor-shared/lib/utils";
import { useAuth } from "@doctor-shared/context/useAuth";
import {
  formatFlagDate,
  formatFlagTime,
  type FlagReport,
} from "@/pages/nurse/patient-profile/flag-profile/data/mockFlagReports";
import { usePatientFlags } from "@/pages/nurse/patient-profile/flag-profile/data/usePatientFlags";

type PatientInfo = {
  staffName?: string;
  firstName?: string;
  lastName?: string;
  patientId?: string;
  flagged?: boolean;
};

type Props = {
  patientOverride?: PatientInfo;
  embedded?: boolean;
};

const DEFAULT_STAFF = "Clinical Staff";
const FALLBACK_PATIENT_KEY = "doctor-unknown-patient";

const SEED_COMMENTS = [
  {
    date: "14-Feb-2020",
    time: "10:25 AM",
    comment:
      "The patient was flagged due to a significant change in their vital signs, indicating a potential risk that requires immediate attention.",
  },
  {
    date: "15-Feb-2020",
    time: "10:25 AM",
    comment:
      "We flagged this patient because their recent lab results showed elevated levels that could suggest a serious condition.",
  },
  {
    date: "16-Feb-2020",
    time: "10:25 AM",
    comment:
      "This patient was marked for review as they exhibited symptoms that are concerning and may require further evaluation.",
  },
  {
    date: "17-Feb-2020",
    time: "11:00 AM",
    comment:
      "The reason for flagging this patient is due to their history of non-compliance with treatment, which poses a risk to their health.",
  },
];

/** Patients whose clinician seed reports have already been loaded this session. */
const seededPatients = new Set<string>();
registerSessionCleanup(() => { seededPatients.clear(); });

/**
 * Flag reports for a clinician patient. Uses the shared (nurse) flag store so
 * counts stay in sync across modules; previously-flagged patients are seeded
 * once with their existing flag history.
 */
export function useClinicianPatientFlags(patient?: PatientInfo) {
  const patientKey = patient?.patientId ?? FALLBACK_PATIENT_KEY;
  const flags = usePatientFlags(patientKey);
  const { setReports } = flags;

  useEffect(() => {
    if (!patient?.flagged || seededPatients.has(patientKey)) return;
    seededPatients.add(patientKey);
    setReports((prev) =>
      prev.length > 0
        ? prev
        : SEED_COMMENTS.map((seed, index) => ({
            id: `flag-seed-${index + 1}`,
            ...seed,
            flaggedBy: patient?.staffName ?? DEFAULT_STAFF,
          })),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientKey, patient?.flagged]);

  return flags;
}

/**
 * Clinician flag report — mirrors the nurse "Flag Profile" look and feel.
 */
export default function FlagProfileReport({
  patientOverride,
  embedded = false,
}: Props = {}) {
  const { state } = useLocation();
  const { user } = useAuth();
  const patient: PatientInfo | undefined = patientOverride ?? state?.patient;
  const focusPreviousRecords = Boolean(state?.focusPreviousRecords);
  const recordsRef = useRef<HTMLElement>(null);
  const commentSectionRef = useRef<HTMLElement>(null);
  const flaggedByName =
    user?.fullName?.trim() || patient?.staffName || DEFAULT_STAFF;

  const [commentInput, setCommentInput] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const { reports, setReports } = useClinicianPatientFlags(patient);

  useEffect(() => {
    if (focusPreviousRecords && recordsRef.current) {
      recordsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [focusPreviousRecords]);

  const handleSaveComment = () => {
    const trimmed = commentInput.trim();
    if (!trimmed) return;

    if (editingId) {
      setReports((prev) =>
        prev.map((report) =>
          report.id === editingId ? { ...report, comment: trimmed } : report,
        ),
      );
      setEditingId(null);
      setCommentInput("");
      toast.success("Flag comment updated successfully.");
      return;
    }

    const now = new Date();
    const newReport: FlagReport = {
      id: `flag-${Date.now()}`,
      date: formatFlagDate(now),
      time: formatFlagTime(now),
      comment: trimmed,
      flaggedBy: flaggedByName,
    };

    setReports((prev) => [newReport, ...prev]);
    setCommentInput("");
    toast.success("Flag comment submitted successfully.");
  };

  const handleEdit = (report: FlagReport) => {
    setEditingId(report.id);
    setCommentInput(report.comment);
    commentSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleDelete = (id: string) => {
    setReports((prev) => prev.filter((report) => report.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setCommentInput("");
    }
    toast.info("Flag comment removed.");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setCommentInput("");
  };

  return (
    <div className={cn("space-y-8", !embedded && "p-6")}>
      <section ref={commentSectionRef}>
        <label
          htmlFor="doctor-flag-comment"
          className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-800"
        >
          Comments
        </label>
        <textarea
          id="doctor-flag-comment"
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          placeholder="Enter Comment Here"
          className="min-h-[140px] w-full resize-y rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#573FD1] focus:outline-none focus:ring-1 focus:ring-[#573FD1]"
        />
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleSaveComment}
            className="rounded-lg bg-[#573FD1] px-10 py-2.5 text-sm font-semibold text-white hover:bg-[#4a35b0]"
          >
            {editingId ? "Update Comment" : "Save Comment"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
          )}
        </div>
      </section>

      <section
        ref={recordsRef}
        id="previous-patient-records"
        className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-800">
          {focusPreviousRecords
            ? "Previous Patient Records"
            : "Profile Flag Report"}
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-[#D4D4D4] bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3 text-center font-medium">SN</th>
                <th className="px-4 py-3 font-medium">Date | Time</th>
                <th className="px-4 py-3 font-medium">Comment</th>
                <th className="px-4 py-3 font-medium">Flagged By</th>
                <th className="px-4 py-3 text-center font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.length > 0 ? (
                reports.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#D4D4D4] bg-white"
                  >
                    <td className="px-4 py-3 text-center font-medium">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3">
                      <div>{item.date}</div>
                      <div className="text-xs text-gray-500">{item.time}</div>
                    </td>
                    <td className="max-w-xl px-4 py-3 text-gray-700">
                      {item.comment}
                    </td>
                    <td className="px-4 py-3">{item.flaggedBy}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(item)}
                          className="rounded-md border border-green-300 bg-green-50 px-3 py-1 text-xs font-semibold uppercase text-green-700 hover:bg-green-100"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          className="rounded-md border border-red-300 bg-red-50 px-3 py-1 text-xs font-semibold uppercase text-red-600 hover:bg-red-100"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="bg-gray-50 py-12 text-center text-sm text-gray-500"
                  >
                    No flag comments yet. Add a comment above to flag this
                    profile.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
