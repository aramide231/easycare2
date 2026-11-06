import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import InvestigationResultContent from "@/pages/doctor/patientProfile/components/category/InvestigationResultContent";
import MedicalRemarkViewPanel from "@/pages/doctor/patientProfile/components/category/MedicalRemarkViewPanel";
import {
  formFieldTextareaClass,
} from "@/pages/doctor/patientProfile/lib/formFieldStyles";
import {
  getInvestigationById,
  getPatientByPatientId,
  NURSE_RECORDS_BY_PATIENT,
  PRESCRIBED_ITEMS_BY_PATIENT,
} from "../data/mockDiagnostics";

const InvestigationProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const investigationId = Number(id);
  const investigation = getInvestigationById(investigationId);
  const patient = investigation
    ? getPatientByPatientId(investigation.patientId)
    : null;

  const [resultsOpen, setResultsOpen] = useState(false);
  const [hasUploadedResult, setHasUploadedResult] = useState(
    investigation?.hasResult ?? false
  );
  const [resultForm, setResultForm] = useState({
    observation: "",
    conclusion: "",
    recommendation: "",
  });

  const prescribedItems = useMemo(
    () =>
      investigation
        ? (PRESCRIBED_ITEMS_BY_PATIENT[investigation.patientId] ?? [])
        : [],
    [investigation]
  );

  const nurseRecords = useMemo(
    () =>
      investigation
        ? (NURSE_RECORDS_BY_PATIENT[investigation.patientId] ?? [])
        : [],
    [investigation]
  );

  if (!investigation || !patient) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-gray-600">Investigation record not found.</p>
        <button
          type="button"
          onClick={() => navigate("/diagnostics/investigation-logs")}
          className="mt-4 text-sm font-semibold text-[#573FD1] hover:underline"
        >
          Back to Investigation Logs
        </button>
      </div>
    );
  }

  const isInPatient = patient.isInPatient;

  const handleSaveResults = () => {
    if (
      !resultForm.observation.trim() ||
      !resultForm.conclusion.trim() ||
      !resultForm.recommendation.trim()
    ) {
      toast.error("Complete observation, conclusion, and recommendation.");
      return;
    }
    setHasUploadedResult(true);
    toast.success("Investigation results uploaded.");
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              {investigation.patientName}
            </h1>
            <p className="text-sm text-gray-600">
              {investigation.patientId} · {investigation.gender} · Age{" "}
              {investigation.age}
            </p>
            <p className="mt-1 text-sm font-medium text-[#573FD1]">
              {investigation.investigation}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setResultsOpen(true)}
            className="rounded-lg border border-[#573FD1] px-4 py-2 text-sm font-semibold text-[#573FD1] hover:bg-purple-50"
          >
            View Results
          </button>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-800">
          Prescribed Drugs / Items
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-[#D4D4D4] text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-2 font-medium">Item</th>
                <th className="px-4 py-2 font-medium">Qty</th>
                <th className="px-4 py-2 font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {prescribedItems.map((item, index) => (
                <tr
                  key={item.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]"}
                >
                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3">{item.quantity}</td>
                  <td className="px-4 py-3">{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-800">
          Investigation Results
        </h2>
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Observation / Findings
            </label>
            <textarea
              rows={4}
              value={resultForm.observation}
              onChange={(e) =>
                setResultForm((prev) => ({
                  ...prev,
                  observation: e.target.value,
                }))
              }
              className={formFieldTextareaClass}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Conclusion / Impression
            </label>
            <textarea
              rows={3}
              value={resultForm.conclusion}
              onChange={(e) =>
                setResultForm((prev) => ({
                  ...prev,
                  conclusion: e.target.value,
                }))
              }
              className={formFieldTextareaClass}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Recommendation
            </label>
            <textarea
              rows={3}
              value={resultForm.recommendation}
              onChange={(e) =>
                setResultForm((prev) => ({
                  ...prev,
                  recommendation: e.target.value,
                }))
              }
              className={formFieldTextareaClass}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSaveResults}
              className="rounded-lg bg-[#573FD1] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#4a35b8]"
            >
              Upload Results
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-800">
          Nurses Record Report
          {isInPatient ? (
            <span className="ml-2 text-xs font-normal normal-case text-gray-500">
              (In-Patient — ward documentation on admission record)
            </span>
          ) : null}
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-[#D4D4D4] text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-2 font-medium">Time</th>
                <th className="px-4 py-2 font-medium">Report</th>
                <th className="px-4 py-2 font-medium">Sign</th>
              </tr>
            </thead>
            <tbody>
              {nurseRecords.length > 0 ? (
                nurseRecords.map((entry, index) => (
                  <tr
                    key={entry.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]"}
                  >
                    <td className="px-4 py-3 whitespace-nowrap">{entry.time}</td>
                    <td className="px-4 py-3">{entry.report}</td>
                    <td className="px-4 py-3">{entry.signedBy}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    className="px-4 py-8 text-center text-sm text-gray-500"
                  >
                    No nurse report entries yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <MedicalRemarkViewPanel
        open={resultsOpen}
        onClose={() => setResultsOpen(false)}
        title="Investigation Results"
        subtitle={investigation.investigation}
        hasResult={hasUploadedResult}
      >
        {hasUploadedResult ? (
          <div className="space-y-4">
            <InvestigationResultContent
              investigationName={investigation.investigation}
              dateTime={`${investigation.date} ${investigation.time}`}
            />
            {resultForm.observation ? (
              <div className="space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm">
                <p>
                  <span className="font-semibold text-gray-800">
                    Observation:
                  </span>{" "}
                  {resultForm.observation}
                </p>
                <p>
                  <span className="font-semibold text-gray-800">
                    Conclusion:
                  </span>{" "}
                  {resultForm.conclusion}
                </p>
                <p>
                  <span className="font-semibold text-gray-800">
                    Recommendation:
                  </span>{" "}
                  {resultForm.recommendation}
                </p>
              </div>
            ) : null}
          </div>
        ) : null}
      </MedicalRemarkViewPanel>
    </div>
  );
};

export default InvestigationProfile;
