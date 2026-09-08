import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import InvestigationResultContent from "@/pages/doctor/patientProfile/components/category/InvestigationResultContent";
import MedicalRemarkViewPanel from "@/pages/doctor/patientProfile/components/category/MedicalRemarkViewPanel";
import { formFieldTextareaClass } from "@/pages/doctor/patientProfile/lib/formFieldStyles";
import {
  getInvestigationById,
  getPatientByPatientId,
  getPatientsLogRowById,
  NURSE_RECORDS_BY_PATIENT,
  PRESCRIBED_ITEMS_BY_PATIENT,
} from "../data/mockDiagnostics";
import {
  BLOOD_GLUCOSE_TESTS,
  isBloodGlucoseInvestigation,
  OGTT_ROWS,
  type BloodGlucoseResultValues,
} from "./data/bloodGlucose";
import {
  HAEMATOLOGY_CBC_PARAMETERS,
  isHaematologyInvestigation,
  type HaematologyResultValues,
} from "./data/haematologyCbc";
import {
  CARDIAC_MARKERS,
  isLiverFunctionTestInvestigation,
  LFT_PARAMETERS,
  URINARY_PROTEIN_ROWS,
  type LftResultValues,
} from "./data/liverFunctionTest";
import {
  ELECTROLYTES_UREA_PARAMETERS,
  isElectrolytesUreaInvestigation,
  MICRO_ALBIUM_ROWS,
  type ElectrolytesUreaResultValues,
} from "./data/electrolytesUrea";
import {
  isUltrasoundInvestigation,
  OBSTETRIC_SCAN_IMAGES,
  type BreastUltrasoundReport,
  type EarlyObstetricsUltrasoundReport,
  type ScrotalUltrasoundReport,
  type TransvaginalUltrasoundReport,
} from "./data/ultrasoundScan";
import BloodGlucoseResultForm from "./components/BloodGlucoseResultForm";
import ElectrolytesUreaResultForm from "./components/ElectrolytesUreaResultForm";
import HaematologyCbcResultForm from "./components/HaematologyCbcResultForm";
import LiverFunctionTestResultForm from "./components/LiverFunctionTestResultForm";
import UltrasoundScanResultForm from "./components/UltrasoundScanResultForm";
import InvestigationFormPatientSidebar from "./components/InvestigationFormPatientSidebar";

const InvestigationProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const investigationId = Number(id);
  const investigation = getInvestigationById(investigationId);
  const patient = investigation
    ? getPatientByPatientId(investigation.patientId)
    : null;

  const isHaematology = investigation
    ? isHaematologyInvestigation(investigation.investigation)
    : false;
  const isBloodGlucose = investigation
    ? isBloodGlucoseInvestigation(investigation.investigation)
    : false;
  const isLiverFunctionTest = investigation
    ? isLiverFunctionTestInvestigation(investigation.investigation)
    : false;
  const isElectrolytesUrea = investigation
    ? isElectrolytesUreaInvestigation(investigation.investigation)
    : false;
  const isUltrasound = investigation
    ? isUltrasoundInvestigation(investigation.investigation)
    : false;

  const [resultsOpen, setResultsOpen] = useState(false);
  const [hasUploadedResult, setHasUploadedResult] = useState(
    investigation?.hasResult ?? false,
  );
  const [resultForm, setResultForm] = useState({
    observation: "",
    conclusion: "",
    recommendation: "",
  });
  const [haematologyValues, setHaematologyValues] =
    useState<HaematologyResultValues | null>(null);
  const [haematologyMeta, setHaematologyMeta] = useState<{
    specimen: string;
    parameter: string;
    requestDateTime: string;
    resultDateTime: string;
    requestedBy: string;
    doneBy: string;
  } | null>(null);
  const [bloodGlucoseValues, setBloodGlucoseValues] =
    useState<BloodGlucoseResultValues | null>(null);
  const [bloodGlucoseMeta, setBloodGlucoseMeta] = useState<{
    specimen: string;
    parameter: string;
    requestDateTime: string;
    resultDateTime: string;
    requestedBy: string;
    doneBy: string;
  } | null>(null);
  const [lftValues, setLftValues] = useState<LftResultValues | null>(null);
  const [lftMeta, setLftMeta] = useState<{
    specimen: string;
    parameter: string;
    requestDateTime: string;
    resultDateTime: string;
    requestedBy: string;
    doneBy: string;
  } | null>(null);
  const [electrolytesValues, setElectrolytesValues] =
    useState<ElectrolytesUreaResultValues | null>(null);
  const [electrolytesMeta, setElectrolytesMeta] = useState<{
    specimen: string;
    parameter: string;
    requestDateTime: string;
    resultDateTime: string;
    requestedBy: string;
    doneBy: string;
  } | null>(null);
  const [ultrasoundScanType, setUltrasoundScanType] = useState<string | null>(
    null,
  );
  const [ultrasoundScanImages, setUltrasoundScanImages] = useState<string[]>(
    [],
  );
  const [ultrasoundBreastReport, setUltrasoundBreastReport] =
    useState<BreastUltrasoundReport | null>(null);
  const [ultrasoundScrotalReport, setUltrasoundScrotalReport] =
    useState<ScrotalUltrasoundReport | null>(null);
  const [ultrasoundTransvaginalReport, setUltrasoundTransvaginalReport] =
    useState<TransvaginalUltrasoundReport | null>(null);
  const [ultrasoundEarlyObstetricsReport, setUltrasoundEarlyObstetricsReport] =
    useState<EarlyObstetricsUltrasoundReport | null>(null);
  const [ultrasoundMeta, setUltrasoundMeta] = useState<{
    requestDateTime: string;
    resultDateTime: string;
    requestedBy: string;
    doneBy: string;
  } | null>(null);

  const prescribedItems = useMemo(
    () =>
      investigation
        ? (PRESCRIBED_ITEMS_BY_PATIENT[investigation.patientId] ?? [])
        : [],
    [investigation],
  );

  const nurseRecords = useMemo(
    () =>
      investigation
        ? (NURSE_RECORDS_BY_PATIENT[investigation.patientId] ?? [])
        : [],
    [investigation],
  );

  if (!investigation || !patient) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-gray-600">Investigation record not found.</p>
        <button
          type="button"
          onClick={() =>
            navigate("/diagnostics-and-radiologist/investigation-logs")
          }
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

  if (isHaematology) {
    const logRow = getPatientsLogRowById(investigationId);

    if (!logRow) {
      return (
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-600">Investigation record not found.</p>
        </div>
      );
    }

    return (
      <div className="relative flex min-h-[calc(100dvh-5.75rem)] w-full min-w-0 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm lg:flex-row">
        <InvestigationFormPatientSidebar patient={logRow} />

        <div className="flex min-w-0 flex-1 flex-col">
          <HaematologyCbcResultForm
            patientName={patient.name}
            requestedByDefault={investigation.requestedBy}
            requestDateDefault={investigation.date}
            requestTimeDefault={investigation.time}
            onConfirmed={(payload) => {
              setHaematologyValues(payload.values);
              setHaematologyMeta({
                specimen: payload.specimen,
                parameter: payload.parameter,
                requestDateTime: payload.requestDateTime,
                resultDateTime: payload.resultDateTime,
                requestedBy: payload.requestedBy,
                doneBy: payload.doneBy,
              });
              setHasUploadedResult(true);
            }}
          />

          {hasUploadedResult && haematologyValues ? (
            <div className="border-t border-gray-200 px-4 pb-6 sm:px-6">
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-base font-bold text-gray-900">
                  Confirmed Haematology /CBC Result
                </h3>
                <button
                  type="button"
                  onClick={() => setResultsOpen(true)}
                  className="rounded-lg border border-[#573FD1] px-4 py-2 text-sm font-semibold text-[#573FD1] hover:bg-purple-50"
                >
                  View Results
                </button>
              </div>
              {haematologyMeta ? (
                <div className="mb-4 grid grid-cols-1 gap-2 text-sm text-gray-600 sm:grid-cols-2">
                  <p>
                    <span className="font-medium text-gray-800">Specimen:</span>{" "}
                    {haematologyMeta.specimen}
                  </p>
                  <p>
                    <span className="font-medium text-gray-800">Parameter:</span>{" "}
                    {haematologyMeta.parameter}
                  </p>
                  <p>
                    <span className="font-medium text-gray-800">Requested:</span>{" "}
                    {haematologyMeta.requestDateTime}
                  </p>
                  <p>
                    <span className="font-medium text-gray-800">Resulted:</span>{" "}
                    {haematologyMeta.resultDateTime}
                  </p>
                  <p>
                    <span className="font-medium text-gray-800">
                      Requested By:
                    </span>{" "}
                    {haematologyMeta.requestedBy}
                  </p>
                  <p>
                    <span className="font-medium text-gray-800">Done By:</span>{" "}
                    {haematologyMeta.doneBy}
                  </p>
                </div>
              ) : null}
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {HAEMATOLOGY_CBC_PARAMETERS.filter(
                  (item) => haematologyValues[item.key]?.trim(),
                ).map((item) => (
                  <p key={item.key} className="text-sm text-gray-700">
                    <span className="font-medium">{item.label}:</span>{" "}
                    {haematologyValues[item.key]}
                  </p>
                ))}
              </div>
            </div>
          ) : null}

          <MedicalRemarkViewPanel
            open={resultsOpen}
            onClose={() => setResultsOpen(false)}
            title="Haematology /CBC Results"
            subtitle={investigation.investigation}
            hasResult={hasUploadedResult}
          >
            {hasUploadedResult && haematologyValues ? (
              <div className="space-y-3 text-sm">
                {HAEMATOLOGY_CBC_PARAMETERS.filter(
                  (item) => haematologyValues[item.key]?.trim(),
                ).map((item) => (
                  <div
                    key={item.key}
                    className="flex items-start justify-between gap-4 border-b border-gray-100 pb-2"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{item.label}</p>
                      <p className="text-xs text-gray-500">{item.refValues}</p>
                    </div>
                    <p className="shrink-0 font-semibold text-[#573FD1]">
                      {haematologyValues[item.key]}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}
          </MedicalRemarkViewPanel>
        </div>
      </div>
    );
  }

  if (isBloodGlucose) {
    const logRow = getPatientsLogRowById(investigationId);

    if (!logRow) {
      return (
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-600">Investigation record not found.</p>
        </div>
      );
    }

    const ogttTimeKey = (rowKey: string) => {
      if (rowKey === "fasting") return "ogttFastingTime";
      if (rowKey === "oneHr") return "ogttOneHrTime";
      return "ogttTwoHrTime";
    };

    const ogttResultKey = (rowKey: string) => {
      if (rowKey === "fasting") return "ogttFastingResult";
      if (rowKey === "oneHr") return "ogttOneHrResult";
      return "ogttTwoHrResult";
    };

    return (
      <div className="relative flex min-h-[calc(100dvh-5.75rem)] w-full min-w-0 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm lg:flex-row">
        <InvestigationFormPatientSidebar patient={logRow} />

        <div className="flex min-w-0 flex-1 flex-col">
          <BloodGlucoseResultForm
            patientName={patient.name}
            requestedByDefault={investigation.requestedBy}
            requestDateDefault={investigation.date}
            requestTimeDefault={investigation.time}
            onConfirmed={(payload) => {
              setBloodGlucoseValues(payload.values);
              setBloodGlucoseMeta({
                specimen: payload.specimen,
                parameter: payload.parameter,
                requestDateTime: payload.requestDateTime,
                resultDateTime: payload.resultDateTime,
                requestedBy: payload.requestedBy,
                doneBy: payload.doneBy,
              });
              setHasUploadedResult(true);
            }}
          />

          {hasUploadedResult && bloodGlucoseValues ? (
            <div className="border-t border-gray-200 px-4 pb-6 sm:px-6">
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-base font-bold text-gray-900">
                  Confirmed Blood Glucose Result
                </h3>
                <button
                  type="button"
                  onClick={() => setResultsOpen(true)}
                  className="rounded-lg border border-[#573FD1] px-4 py-2 text-sm font-semibold text-[#573FD1] hover:bg-purple-50"
                >
                  View Results
                </button>
              </div>
              {bloodGlucoseMeta ? (
                <div className="mb-4 grid grid-cols-1 gap-2 text-sm text-gray-600 sm:grid-cols-2">
                  <p>
                    <span className="font-medium text-gray-800">Specimen:</span>{" "}
                    {bloodGlucoseMeta.specimen}
                  </p>
                  <p>
                    <span className="font-medium text-gray-800">Parameter:</span>{" "}
                    {bloodGlucoseMeta.parameter}
                  </p>
                  <p>
                    <span className="font-medium text-gray-800">Requested:</span>{" "}
                    {bloodGlucoseMeta.requestDateTime}
                  </p>
                  <p>
                    <span className="font-medium text-gray-800">Resulted:</span>{" "}
                    {bloodGlucoseMeta.resultDateTime}
                  </p>
                  <p>
                    <span className="font-medium text-gray-800">
                      Requested By:
                    </span>{" "}
                    {bloodGlucoseMeta.requestedBy}
                  </p>
                  <p>
                    <span className="font-medium text-gray-800">Done By:</span>{" "}
                    {bloodGlucoseMeta.doneBy}
                  </p>
                </div>
              ) : null}
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {BLOOD_GLUCOSE_TESTS.filter(
                  (item) => bloodGlucoseValues[item.key]?.trim(),
                ).map((item) => (
                  <p key={item.key} className="text-sm text-gray-700">
                    <span className="font-medium">{item.label}:</span>{" "}
                    {bloodGlucoseValues[item.key]}
                  </p>
                ))}
                {OGTT_ROWS.filter(
                  (row) =>
                    bloodGlucoseValues[ogttTimeKey(row.key)]?.trim() ||
                    bloodGlucoseValues[ogttResultKey(row.key)]?.trim(),
                ).map((row) => (
                  <p key={row.key} className="text-sm text-gray-700">
                    <span className="font-medium">OGTT {row.label}:</span>{" "}
                    {bloodGlucoseValues[ogttTimeKey(row.key)] || "—"} /{" "}
                    {bloodGlucoseValues[ogttResultKey(row.key)] || "—"}
                  </p>
                ))}
              </div>
            </div>
          ) : null}

          <MedicalRemarkViewPanel
            open={resultsOpen}
            onClose={() => setResultsOpen(false)}
            title="Blood Glucose Results"
            subtitle={investigation.investigation}
            hasResult={hasUploadedResult}
          >
            {hasUploadedResult && bloodGlucoseValues ? (
              <div className="space-y-3 text-sm">
                {BLOOD_GLUCOSE_TESTS.filter(
                  (item) => bloodGlucoseValues[item.key]?.trim(),
                ).map((item) => (
                  <div
                    key={item.key}
                    className="flex items-start justify-between gap-4 border-b border-gray-100 pb-2"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{item.label}</p>
                      <p className="text-xs text-gray-500">{item.refValues}</p>
                    </div>
                    <p className="shrink-0 font-semibold text-[#573FD1]">
                      {bloodGlucoseValues[item.key]}
                    </p>
                  </div>
                ))}
                {OGTT_ROWS.filter(
                  (row) =>
                    bloodGlucoseValues[ogttTimeKey(row.key)]?.trim() ||
                    bloodGlucoseValues[ogttResultKey(row.key)]?.trim(),
                ).map((row) => (
                  <div
                    key={row.key}
                    className="flex items-start justify-between gap-4 border-b border-gray-100 pb-2"
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        OGTT {row.label}
                      </p>
                    </div>
                    <p className="shrink-0 text-right font-semibold text-[#573FD1]">
                      {bloodGlucoseValues[ogttTimeKey(row.key)] || "—"} /{" "}
                      {bloodGlucoseValues[ogttResultKey(row.key)] || "—"}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}
          </MedicalRemarkViewPanel>
        </div>
      </div>
    );
  }

  if (isLiverFunctionTest) {
    const logRow = getPatientsLogRowById(investigationId);

    if (!logRow) {
      return (
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-600">Investigation record not found.</p>
        </div>
      );
    }

    return (
      <div className="relative flex min-h-[calc(100dvh-5.75rem)] w-full min-w-0 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm lg:flex-row">
        <InvestigationFormPatientSidebar patient={logRow} />

        <div className="flex min-w-0 flex-1 flex-col">
          <LiverFunctionTestResultForm
            patientName={patient.name}
            requestedByDefault={investigation.requestedBy}
            requestDateDefault={investigation.date}
            requestTimeDefault={investigation.time}
            onConfirmed={(payload) => {
              setLftValues(payload.values);
              setLftMeta({
                specimen: payload.specimen,
                parameter: payload.parameter,
                requestDateTime: payload.requestDateTime,
                resultDateTime: payload.resultDateTime,
                requestedBy: payload.requestedBy,
                doneBy: payload.doneBy,
              });
              setHasUploadedResult(true);
            }}
          />

          {hasUploadedResult && lftValues ? (
            <div className="border-t border-gray-200 px-4 pb-6 sm:px-6">
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-base font-bold text-gray-900">
                  Confirmed Liver Function Test Result
                </h3>
                <button
                  type="button"
                  onClick={() => setResultsOpen(true)}
                  className="rounded-lg border border-[#573FD1] px-4 py-2 text-sm font-semibold text-[#573FD1] hover:bg-purple-50"
                >
                  View Results
                </button>
              </div>
              {lftMeta ? (
                <div className="mb-4 grid grid-cols-1 gap-2 text-sm text-gray-600 sm:grid-cols-2">
                  <p>
                    <span className="font-medium text-gray-800">Specimen:</span>{" "}
                    {lftMeta.specimen}
                  </p>
                  <p>
                    <span className="font-medium text-gray-800">Parameter:</span>{" "}
                    {lftMeta.parameter}
                  </p>
                  <p>
                    <span className="font-medium text-gray-800">Requested:</span>{" "}
                    {lftMeta.requestDateTime}
                  </p>
                  <p>
                    <span className="font-medium text-gray-800">Resulted:</span>{" "}
                    {lftMeta.resultDateTime}
                  </p>
                  <p>
                    <span className="font-medium text-gray-800">
                      Requested By:
                    </span>{" "}
                    {lftMeta.requestedBy}
                  </p>
                  <p>
                    <span className="font-medium text-gray-800">Done By:</span>{" "}
                    {lftMeta.doneBy}
                  </p>
                </div>
              ) : null}
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {LFT_PARAMETERS.filter((item) => lftValues[item.key]?.trim()).map(
                  (item) => (
                    <p key={item.key} className="text-sm text-gray-700">
                      <span className="font-medium">{item.label}:</span>{" "}
                      {lftValues[item.key]}
                    </p>
                  ),
                )}
                {URINARY_PROTEIN_ROWS.filter(
                  (row) =>
                    lftValues[row.timeKey]?.trim() ||
                    lftValues[row.rangeKey]?.trim(),
                ).map((row) => (
                  <p key={row.key} className="text-sm text-gray-700">
                    <span className="font-medium">{row.label}:</span>{" "}
                    {lftValues[row.timeKey] || "—"} /{" "}
                    {lftValues[row.rangeKey] || "—"}
                  </p>
                ))}
                {CARDIAC_MARKERS.filter((item) =>
                  lftValues[item.key]?.trim(),
                ).map((item) => (
                  <p key={item.key} className="text-sm text-gray-700">
                    <span className="font-medium">{item.label}:</span>{" "}
                    {lftValues[item.key]}
                  </p>
                ))}
              </div>
            </div>
          ) : null}

          <MedicalRemarkViewPanel
            open={resultsOpen}
            onClose={() => setResultsOpen(false)}
            title="Liver Function Test Results"
            subtitle={investigation.investigation}
            hasResult={hasUploadedResult}
          >
            {hasUploadedResult && lftValues ? (
              <div className="space-y-3 text-sm">
                {LFT_PARAMETERS.filter((item) => lftValues[item.key]?.trim()).map(
                  (item) => (
                    <div
                      key={item.key}
                      className="flex items-start justify-between gap-4 border-b border-gray-100 pb-2"
                    >
                      <div>
                        <p className="font-medium text-gray-900">{item.label}</p>
                        <p className="text-xs text-gray-500">{item.refValues}</p>
                      </div>
                      <p className="shrink-0 font-semibold text-[#573FD1]">
                        {lftValues[item.key]}
                      </p>
                    </div>
                  ),
                )}
                {URINARY_PROTEIN_ROWS.filter(
                  (row) =>
                    lftValues[row.timeKey]?.trim() ||
                    lftValues[row.rangeKey]?.trim(),
                ).map((row) => (
                  <div
                    key={row.key}
                    className="flex items-start justify-between gap-4 border-b border-gray-100 pb-2"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{row.label}</p>
                    </div>
                    <p className="shrink-0 text-right font-semibold text-[#573FD1]">
                      {lftValues[row.timeKey] || "—"} /{" "}
                      {lftValues[row.rangeKey] || "—"}
                    </p>
                  </div>
                ))}
                {CARDIAC_MARKERS.filter((item) =>
                  lftValues[item.key]?.trim(),
                ).map((item) => (
                  <div
                    key={item.key}
                    className="flex items-start justify-between gap-4 border-b border-gray-100 pb-2"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{item.label}</p>
                      <p className="text-xs text-gray-500">{item.refValues}</p>
                    </div>
                    <p className="shrink-0 font-semibold text-[#573FD1]">
                      {lftValues[item.key]}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}
          </MedicalRemarkViewPanel>
        </div>
      </div>
    );
  }

  if (isElectrolytesUrea) {
    const logRow = getPatientsLogRowById(investigationId);

    if (!logRow) {
      return (
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-600">Investigation record not found.</p>
        </div>
      );
    }

    return (
      <div className="relative flex min-h-[calc(100dvh-5.75rem)] w-full min-w-0 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm lg:flex-row">
        <InvestigationFormPatientSidebar patient={logRow} />

        <div className="flex min-w-0 flex-1 flex-col">
          <ElectrolytesUreaResultForm
            patientName={patient.name}
            requestedByDefault={investigation.requestedBy}
            requestDateDefault={investigation.date}
            requestTimeDefault={investigation.time}
            onConfirmed={(payload) => {
              setElectrolytesValues(payload.values);
              setElectrolytesMeta({
                specimen: payload.specimen,
                parameter: payload.parameter,
                requestDateTime: payload.requestDateTime,
                resultDateTime: payload.resultDateTime,
                requestedBy: payload.requestedBy,
                doneBy: payload.doneBy,
              });
              setHasUploadedResult(true);
            }}
          />

          {hasUploadedResult && electrolytesValues ? (
            <div className="border-t border-gray-200 px-4 pb-6 sm:px-6">
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-base font-bold text-gray-900">
                  Confirmed Electrolytes & UREA Result
                </h3>
                <button
                  type="button"
                  onClick={() => setResultsOpen(true)}
                  className="rounded-lg border border-[#573FD1] px-4 py-2 text-sm font-semibold text-[#573FD1] hover:bg-purple-50"
                >
                  View Results
                </button>
              </div>
              {electrolytesMeta ? (
                <div className="mb-4 grid grid-cols-1 gap-2 text-sm text-gray-600 sm:grid-cols-2">
                  <p>
                    <span className="font-medium text-gray-800">Specimen:</span>{" "}
                    {electrolytesMeta.specimen}
                  </p>
                  <p>
                    <span className="font-medium text-gray-800">Parameter:</span>{" "}
                    {electrolytesMeta.parameter}
                  </p>
                  <p>
                    <span className="font-medium text-gray-800">Requested:</span>{" "}
                    {electrolytesMeta.requestDateTime}
                  </p>
                  <p>
                    <span className="font-medium text-gray-800">Resulted:</span>{" "}
                    {electrolytesMeta.resultDateTime}
                  </p>
                  <p>
                    <span className="font-medium text-gray-800">
                      Requested By:
                    </span>{" "}
                    {electrolytesMeta.requestedBy}
                  </p>
                  <p>
                    <span className="font-medium text-gray-800">Done By:</span>{" "}
                    {electrolytesMeta.doneBy}
                  </p>
                </div>
              ) : null}
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {ELECTROLYTES_UREA_PARAMETERS.filter((item) =>
                  electrolytesValues[item.key]?.trim(),
                ).map((item) => (
                  <p key={item.key} className="text-sm text-gray-700">
                    <span className="font-medium">{item.label}:</span>{" "}
                    {electrolytesValues[item.key]}
                  </p>
                ))}
                {MICRO_ALBIUM_ROWS.filter(
                  (row) =>
                    electrolytesValues[row.primaryKey]?.trim() ||
                    electrolytesValues[row.rangeKey]?.trim(),
                ).map((row) => (
                  <p key={row.key} className="text-sm text-gray-700">
                    <span className="font-medium">
                      Micro Albium {row.label}:
                    </span>{" "}
                    {electrolytesValues[row.primaryKey] || "—"} /{" "}
                    {electrolytesValues[row.rangeKey] || "—"}
                  </p>
                ))}
              </div>
            </div>
          ) : null}

          <MedicalRemarkViewPanel
            open={resultsOpen}
            onClose={() => setResultsOpen(false)}
            title="Electrolytes & UREA Results"
            subtitle={investigation.investigation}
            hasResult={hasUploadedResult}
          >
            {hasUploadedResult && electrolytesValues ? (
              <div className="space-y-3 text-sm">
                {ELECTROLYTES_UREA_PARAMETERS.filter((item) =>
                  electrolytesValues[item.key]?.trim(),
                ).map((item) => (
                  <div
                    key={item.key}
                    className="flex items-start justify-between gap-4 border-b border-gray-100 pb-2"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{item.label}</p>
                      {item.refValues ? (
                        <p className="text-xs text-gray-500">{item.refValues}</p>
                      ) : null}
                    </div>
                    <p className="shrink-0 font-semibold text-[#573FD1]">
                      {electrolytesValues[item.key]}
                    </p>
                  </div>
                ))}
                {MICRO_ALBIUM_ROWS.filter(
                  (row) =>
                    electrolytesValues[row.primaryKey]?.trim() ||
                    electrolytesValues[row.rangeKey]?.trim(),
                ).map((row) => (
                  <div
                    key={row.key}
                    className="flex items-start justify-between gap-4 border-b border-gray-100 pb-2"
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        Micro Albium {row.label}
                      </p>
                    </div>
                    <p className="shrink-0 text-right font-semibold text-[#573FD1]">
                      {electrolytesValues[row.primaryKey] || "—"} /{" "}
                      {electrolytesValues[row.rangeKey] || "—"}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}
          </MedicalRemarkViewPanel>
        </div>
      </div>
    );
  }

  if (isUltrasound) {
    const logRow = getPatientsLogRowById(investigationId);

    if (!logRow) {
      return (
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-600">Investigation record not found.</p>
        </div>
      );
    }

    return (
      <div className="relative flex min-h-[calc(100dvh-5.75rem)] w-full min-w-0 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm lg:flex-row">
        <InvestigationFormPatientSidebar patient={logRow} />

        <div className="flex min-w-0 flex-1 flex-col">
          <UltrasoundScanResultForm
            patientName={patient.name}
            requestedByDefault={investigation.requestedBy}
            requestDateDefault={investigation.date}
            requestTimeDefault={investigation.time}
            onConfirmed={(payload) => {
              setUltrasoundScanType(payload.scanType);
              setUltrasoundScanImages(payload.scanImages);
              setUltrasoundBreastReport(payload.breastReport);
              setUltrasoundScrotalReport(payload.scrotalReport);
              setUltrasoundTransvaginalReport(payload.transvaginalReport);
              setUltrasoundEarlyObstetricsReport(payload.earlyObstetricsReport);
              setUltrasoundMeta({
                requestDateTime: payload.requestDateTime,
                resultDateTime: payload.resultDateTime,
                requestedBy: payload.requestedBy,
                doneBy: payload.doneBy,
              });
              setHasUploadedResult(true);
            }}
          />

          {hasUploadedResult && ultrasoundScanType ? (
            <div className="border-t border-gray-200 px-4 pb-6 sm:px-6">
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-base font-bold text-gray-900">
                  Confirmed Ultrasound Scan
                </h3>
                <button
                  type="button"
                  onClick={() => setResultsOpen(true)}
                  className="rounded-lg border border-[#573FD1] px-4 py-2 text-sm font-semibold text-[#573FD1] hover:bg-purple-50"
                >
                  View Results
                </button>
              </div>
              {ultrasoundMeta ? (
                <div className="mb-4 grid grid-cols-1 gap-2 text-sm text-gray-600 sm:grid-cols-2">
                  <p>
                    <span className="font-medium text-gray-800">Scan Type:</span>{" "}
                    {ultrasoundScanType}
                  </p>
                  {ultrasoundScanImages.length > 0 ? (
                    <p className="sm:col-span-2">
                      <span className="font-medium text-gray-800">
                        Scan Images:
                      </span>{" "}
                      {ultrasoundScanImages
                        .map(
                          (key) =>
                            OBSTETRIC_SCAN_IMAGES.find((item) => item.key === key)
                              ?.label ?? key,
                        )
                        .join(", ")}
                    </p>
                  ) : null}
                  {ultrasoundBreastReport ? (
                    <div className="space-y-2 sm:col-span-2">
                      <p>
                        <span className="font-medium text-gray-800">
                          Comment:
                        </span>{" "}
                        {ultrasoundBreastReport.comment}
                      </p>
                      <p>
                        <span className="font-medium text-gray-800">
                          Impression:
                        </span>{" "}
                        {ultrasoundBreastReport.impression}
                      </p>
                      <p>
                        <span className="font-medium text-gray-800">
                          Recommendation:
                        </span>{" "}
                        {ultrasoundBreastReport.recommendation}
                      </p>
                    </div>
                  ) : null}
                  {ultrasoundScrotalReport ? (
                    <div className="space-y-2 sm:col-span-2">
                      <p>
                        <span className="font-medium text-gray-800">LT:</span>{" "}
                        {ultrasoundScrotalReport.leftTesticleMm} mm
                      </p>
                      <p>
                        <span className="font-medium text-gray-800">RT:</span>{" "}
                        {ultrasoundScrotalReport.rightTesticleMm} mm
                      </p>
                      <p>
                        <span className="font-medium text-gray-800">
                          Comment:
                        </span>{" "}
                        {ultrasoundScrotalReport.comment}
                      </p>
                      <p>
                        <span className="font-medium text-gray-800">
                          Impression:
                        </span>{" "}
                        {ultrasoundScrotalReport.impression}
                      </p>
                      <p>
                        <span className="font-medium text-gray-800">
                          Recommendation:
                        </span>{" "}
                        {ultrasoundScrotalReport.recommendation}
                      </p>
                    </div>
                  ) : null}
                  {ultrasoundTransvaginalReport ? (
                    <div className="space-y-2 sm:col-span-2">
                      <p>
                        <span className="font-medium text-gray-800">
                          Comment:
                        </span>{" "}
                        {ultrasoundTransvaginalReport.comment}
                      </p>
                      <p>
                        <span className="font-medium text-gray-800">
                          Impression:
                        </span>{" "}
                        {ultrasoundTransvaginalReport.impression}
                      </p>
                      <p>
                        <span className="font-medium text-gray-800">
                          Recommendation:
                        </span>{" "}
                        {ultrasoundTransvaginalReport.recommendation}
                      </p>
                    </div>
                  ) : null}
                  {ultrasoundEarlyObstetricsReport ? (
                    <div className="space-y-2 sm:col-span-2">
                      {ultrasoundEarlyObstetricsReport.noOfFetuses ? (
                        <p>
                          <span className="font-medium text-gray-800">
                            No of Fetuses:
                          </span>{" "}
                          {ultrasoundEarlyObstetricsReport.noOfFetuses}
                        </p>
                      ) : null}
                      {ultrasoundEarlyObstetricsReport.placentation ? (
                        <p>
                          <span className="font-medium text-gray-800">
                            Placentation:
                          </span>{" "}
                          {ultrasoundEarlyObstetricsReport.placentation}
                        </p>
                      ) : null}
                      {ultrasoundEarlyObstetricsReport.gender ? (
                        <p>
                          <span className="font-medium text-gray-800">
                            Gender:
                          </span>{" "}
                          {ultrasoundEarlyObstetricsReport.gender}
                        </p>
                      ) : null}
                      <p>
                        <span className="font-medium text-gray-800">
                          Impression:
                        </span>{" "}
                        {ultrasoundEarlyObstetricsReport.impression}
                      </p>
                      {ultrasoundEarlyObstetricsReport.recommendation ? (
                        <p>
                          <span className="font-medium text-gray-800">
                            Recommendation(s):
                          </span>{" "}
                          {ultrasoundEarlyObstetricsReport.recommendation}
                        </p>
                      ) : null}
                    </div>
                  ) : null}
                  <p>
                    <span className="font-medium text-gray-800">Requested:</span>{" "}
                    {ultrasoundMeta.requestDateTime}
                  </p>
                  <p>
                    <span className="font-medium text-gray-800">Resulted:</span>{" "}
                    {ultrasoundMeta.resultDateTime}
                  </p>
                  <p>
                    <span className="font-medium text-gray-800">
                      Requested By:
                    </span>{" "}
                    {ultrasoundMeta.requestedBy}
                  </p>
                  <p>
                    <span className="font-medium text-gray-800">Done By:</span>{" "}
                    {ultrasoundMeta.doneBy}
                  </p>
                </div>
              ) : null}
            </div>
          ) : null}

          <MedicalRemarkViewPanel
            open={resultsOpen}
            onClose={() => setResultsOpen(false)}
            title="Ultrasound Scan Results"
            subtitle={investigation.investigation}
            hasResult={hasUploadedResult}
          >
            {hasUploadedResult && ultrasoundScanType ? (
              <div className="space-y-3 text-sm">
                <div className="flex items-start justify-between gap-4 border-b border-gray-100 pb-2">
                  <p className="font-medium text-gray-900">Ultrasound Type</p>
                  <p className="shrink-0 font-semibold text-[#573FD1]">
                    {ultrasoundScanType}
                  </p>
                </div>
                {ultrasoundScanImages.map((image) => (
                  <div
                    key={image}
                    className="flex items-start justify-between gap-4 border-b border-gray-100 pb-2"
                  >
                    <p className="font-medium text-gray-900">Scan Image</p>
                    <p className="shrink-0 text-right font-semibold text-[#573FD1]">
                      {OBSTETRIC_SCAN_IMAGES.find((item) => item.key === image)
                        ?.label ?? image}
                    </p>
                  </div>
                ))}
                {ultrasoundBreastReport ? (
                  <>
                    <div className="border-b border-gray-100 pb-2">
                      <p className="font-medium text-gray-900">Comment</p>
                      <p className="mt-1 text-gray-700">
                        {ultrasoundBreastReport.comment}
                      </p>
                    </div>
                    <div className="border-b border-gray-100 pb-2">
                      <p className="font-medium text-gray-900">Impression</p>
                      <p className="mt-1 text-gray-700">
                        {ultrasoundBreastReport.impression}
                      </p>
                    </div>
                    <div className="border-b border-gray-100 pb-2">
                      <p className="font-medium text-gray-900">Recommendation</p>
                      <p className="mt-1 text-gray-700">
                        {ultrasoundBreastReport.recommendation}
                      </p>
                    </div>
                  </>
                ) : null}
                {ultrasoundScrotalReport ? (
                  <>
                    <div className="flex items-start justify-between gap-4 border-b border-gray-100 pb-2">
                      <p className="font-medium text-gray-900">
                        Left Testicles (LT)
                      </p>
                      <p className="shrink-0 font-semibold text-[#573FD1]">
                        {ultrasoundScrotalReport.leftTesticleMm} mm
                      </p>
                    </div>
                    <div className="flex items-start justify-between gap-4 border-b border-gray-100 pb-2">
                      <p className="font-medium text-gray-900">
                        Right Testicles (RT)
                      </p>
                      <p className="shrink-0 font-semibold text-[#573FD1]">
                        {ultrasoundScrotalReport.rightTesticleMm} mm
                      </p>
                    </div>
                    <div className="border-b border-gray-100 pb-2">
                      <p className="font-medium text-gray-900">Comment</p>
                      <p className="mt-1 text-gray-700">
                        {ultrasoundScrotalReport.comment}
                      </p>
                    </div>
                    <div className="border-b border-gray-100 pb-2">
                      <p className="font-medium text-gray-900">Impression</p>
                      <p className="mt-1 text-gray-700">
                        {ultrasoundScrotalReport.impression}
                      </p>
                    </div>
                    <div className="border-b border-gray-100 pb-2">
                      <p className="font-medium text-gray-900">Recommendation</p>
                      <p className="mt-1 text-gray-700">
                        {ultrasoundScrotalReport.recommendation}
                      </p>
                    </div>
                  </>
                ) : null}
                {ultrasoundTransvaginalReport ? (
                  <>
                    <div className="border-b border-gray-100 pb-2">
                      <p className="font-medium text-gray-900">Comment</p>
                      <p className="mt-1 text-gray-700">
                        {ultrasoundTransvaginalReport.comment}
                      </p>
                    </div>
                    <div className="border-b border-gray-100 pb-2">
                      <p className="font-medium text-gray-900">Impression</p>
                      <p className="mt-1 text-gray-700">
                        {ultrasoundTransvaginalReport.impression}
                      </p>
                    </div>
                    <div className="border-b border-gray-100 pb-2">
                      <p className="font-medium text-gray-900">Recommendation</p>
                      <p className="mt-1 text-gray-700">
                        {ultrasoundTransvaginalReport.recommendation}
                      </p>
                    </div>
                  </>
                ) : null}
                {ultrasoundEarlyObstetricsReport ? (
                  <>
                    {(
                      [
                        ["No of Fetuses", ultrasoundEarlyObstetricsReport.noOfFetuses],
                        ["Placentation", ultrasoundEarlyObstetricsReport.placentation],
                        [
                          "Cardiac Activity",
                          ultrasoundEarlyObstetricsReport.cardiacActivity,
                        ],
                        [
                          "Fetal Body Movement (FBM)",
                          ultrasoundEarlyObstetricsReport.fetalBodyMovement,
                        ],
                        ["Fetal Lie (FL)", ultrasoundEarlyObstetricsReport.fetalLie],
                        [
                          "Biparimeter Diameter (BPD)",
                          ultrasoundEarlyObstetricsReport.bpd
                            ? `${ultrasoundEarlyObstetricsReport.bpd} mm`
                            : "",
                        ],
                        [
                          "Head Circumference (HC)",
                          ultrasoundEarlyObstetricsReport.headCircumference
                            ? `${ultrasoundEarlyObstetricsReport.headCircumference} mm`
                            : "",
                        ],
                        [
                          "Fetal Heart Rate (FHR)",
                          ultrasoundEarlyObstetricsReport.fetalHeartRate,
                        ],
                        [
                          "Femur Length (FL)",
                          ultrasoundEarlyObstetricsReport.femurLength
                            ? `${ultrasoundEarlyObstetricsReport.femurLength} mm`
                            : "",
                        ],
                        [
                          "Estimated Fetal Weight (EFW)",
                          ultrasoundEarlyObstetricsReport.estimatedFetalWeight,
                        ],
                        [
                          "Abdominal Circumference (AC)",
                          ultrasoundEarlyObstetricsReport.abdominalCircumference
                            ? `${ultrasoundEarlyObstetricsReport.abdominalCircumference} mm`
                            : "",
                        ],
                        [
                          "Amniotic Fluid Index",
                          ultrasoundEarlyObstetricsReport.amnioticFluidIndex
                            ? `${ultrasoundEarlyObstetricsReport.amnioticFluidIndex} mm`
                            : "",
                        ],
                        [
                          "Estimated Delivery Date (EDD)",
                          ultrasoundEarlyObstetricsReport.estimatedDeliveryDate
                            ? `${ultrasoundEarlyObstetricsReport.estimatedDeliveryDate} mm`
                            : "",
                        ],
                        [
                          "Mean/Estimated Gestational Age (EGA)",
                          ultrasoundEarlyObstetricsReport.estimatedGestationalAge,
                        ],
                        ["Gender", ultrasoundEarlyObstetricsReport.gender],
                        [
                          "Liquor Volume",
                          ultrasoundEarlyObstetricsReport.liquorVolume
                            ? `${ultrasoundEarlyObstetricsReport.liquorVolume} mm`
                            : "",
                        ],
                        ["Cervix", ultrasoundEarlyObstetricsReport.cervix],
                      ] as const
                    )
                      .filter(([, value]) => value.trim())
                      .map(([label, value]) => (
                        <div
                          key={label}
                          className="flex items-start justify-between gap-4 border-b border-gray-100 pb-2"
                        >
                          <p className="font-medium text-gray-900">{label}</p>
                          <p className="shrink-0 text-right font-semibold text-[#573FD1]">
                            {value}
                          </p>
                        </div>
                      ))}
                    <div className="border-b border-gray-100 pb-2">
                      <p className="font-medium text-gray-900">Impression</p>
                      <p className="mt-1 text-gray-700">
                        {ultrasoundEarlyObstetricsReport.impression}
                      </p>
                    </div>
                    {ultrasoundEarlyObstetricsReport.recommendation ? (
                      <div className="border-b border-gray-100 pb-2">
                        <p className="font-medium text-gray-900">
                          Recommendation(s)
                        </p>
                        <p className="mt-1 text-gray-700">
                          {ultrasoundEarlyObstetricsReport.recommendation}
                        </p>
                      </div>
                    ) : null}
                  </>
                ) : null}
              </div>
            ) : null}
          </MedicalRemarkViewPanel>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h1 className="truncate text-lg font-bold text-gray-900 sm:text-xl">
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
            className="w-full rounded-lg border border-[#573FD1] px-4 py-2 text-sm font-semibold text-[#573FD1] hover:bg-purple-50 sm:w-auto"
          >
            View Results
          </button>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
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
                    <td className="whitespace-nowrap px-4 py-3">{entry.time}</td>
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
