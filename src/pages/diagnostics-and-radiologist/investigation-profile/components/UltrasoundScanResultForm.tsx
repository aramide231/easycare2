import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "react-toastify";
import {
  BREAST_ULTRASOUND_TITLE,
  EMPTY_BREAST_ULTRASOUND_REPORT,
  EMPTY_EARLY_OBSTETRICS_REPORT,
  EMPTY_SCROTAL_ULTRASOUND_REPORT,
  EMPTY_TRANSVAGINAL_ULTRASOUND_REPORT,
  isBreastUltrasoundType,
  isEarlyObstetricsUltrasoundType,
  isObstetricUltrasoundType,
  isScrotalUltrasoundType,
  isTransvaginalUltrasoundType,
  OBSTETRIC_SCAN_IMAGES,
  OBSTETRICS_ULTRASOUND_TITLE,
  SCROTAL_ULTRASOUND_TITLE,
  TRANSVAGINAL_ULTRASOUND_TITLE,
  ULTRASOUND_INVESTIGATION_NAME,
  ULTRASOUND_SCAN_TYPES,
  type BreastUltrasoundReport,
  type EarlyObstetricsUltrasoundReport,
  type ObstetricScanImageKey,
  type ScrotalUltrasoundReport,
  type TransvaginalUltrasoundReport,
} from "../data/ultrasoundScan";
import { INVESTIGATION_METADATA_HINTS } from "../data/investigationFormHints";
import InvestigationDateTimePicker, {
  buildInvestigationDateTimeDefault,
} from "./InvestigationDateTimePicker";
import EarlyObstetricsUltrasoundForm from "./EarlyObstetricsUltrasoundForm";
import {
  BreechPresentationDiagram,
  TransversePresentationDiagram,
  VertexPresentationDiagram,
} from "./ObstetricsReferenceSidebar";

const fieldClass =
  "h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#573FD1] focus:outline-none focus:ring-1 focus:ring-[#573FD1]/20";

const ussLabelClass =
  "flex w-[7.5rem] shrink-0 items-center justify-center rounded border border-[#6B8EC7] px-2 py-2 text-center text-sm font-medium text-[#4A6FA5] sm:w-[8.5rem]";

const ussTextareaClass =
  "w-full rounded-xl border border-[#A8C4E8] bg-white px-4 py-3 text-center text-sm text-gray-900 placeholder:text-center placeholder:text-gray-400 focus:border-[#573FD1] focus:outline-none focus:ring-1 focus:ring-[#573FD1]/20";

const ussMeasureInputClass =
  "h-11 w-full rounded-lg border border-[#A8C4E8] bg-white px-3 pr-10 text-sm text-gray-900 focus:border-[#573FD1] focus:outline-none focus:ring-1 focus:ring-[#573FD1]/20";

type Props = {
  patientName: string;
  requestedByDefault?: string;
  requestDateDefault?: string;
  requestTimeDefault?: string;
  onConfirmed?: (payload: {
    scanType: string;
    scanImages: ObstetricScanImageKey[];
    breastReport: BreastUltrasoundReport | null;
    scrotalReport: ScrotalUltrasoundReport | null;
    transvaginalReport: TransvaginalUltrasoundReport | null;
    earlyObstetricsReport: EarlyObstetricsUltrasoundReport | null;
    requestDateTime: string;
    resultDateTime: string;
    requestedBy: string;
    doneBy: string;
  }) => void;
};

function PresentationPreview({ imageKey }: { imageKey: ObstetricScanImageKey }) {
  if (imageKey === "breech") {
    return <BreechPresentationDiagram className="h-36 w-auto" />;
  }
  if (imageKey === "cephalic") {
    return <VertexPresentationDiagram className="h-36 w-auto" />;
  }
  return <TransversePresentationDiagram className="h-36 w-auto" />;
}

function UssReportField({
  label,
  value,
  onChange,
  rows,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows: number;
}) {
  return (
    <div className="flex items-start gap-3 sm:gap-4">
      <div className={ussLabelClass}>{label}</div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder="enter text here..........."
        className={ussTextareaClass}
        aria-label={label}
      />
    </div>
  );
}

function TesticleMeasureField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="min-w-0 flex-1">
      <label className="mb-2 block text-sm font-medium text-[#4A6FA5]">
        {label}
      </label>
      <div className="relative">
        <input
          type="text"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={ussMeasureInputClass}
          aria-label={label}
        />
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-gray-500">
          mm
        </span>
      </div>
    </div>
  );
}

export default function UltrasoundScanResultForm({
  patientName,
  requestedByDefault = "",
  requestDateDefault = "",
  requestTimeDefault = "",
  onConfirmed,
}: Props) {
  const defaultRequest = buildInvestigationDateTimeDefault(
    requestDateDefault,
    requestTimeDefault,
  );

  const [scanType, setScanType] = useState("");
  const [scanImages, setScanImages] = useState<ObstetricScanImageKey[]>([]);
  const [breastReport, setBreastReport] = useState<BreastUltrasoundReport>(
    EMPTY_BREAST_ULTRASOUND_REPORT,
  );
  const [scrotalReport, setScrotalReport] = useState<ScrotalUltrasoundReport>(
    EMPTY_SCROTAL_ULTRASOUND_REPORT,
  );
  const [transvaginalReport, setTransvaginalReport] =
    useState<TransvaginalUltrasoundReport>(EMPTY_TRANSVAGINAL_ULTRASOUND_REPORT);
  const [earlyObstetricsReport, setEarlyObstetricsReport] =
    useState<EarlyObstetricsUltrasoundReport>(EMPTY_EARLY_OBSTETRICS_REPORT);
  const [requestDateTime, setRequestDateTime] = useState(defaultRequest);
  const [resultDateTime, setResultDateTime] = useState("");
  const [requestedBy, setRequestedBy] = useState(requestedByDefault);
  const [doneBy, setDoneBy] = useState("");

  const isObstetrics = isObstetricUltrasoundType(scanType);
  const isBreast = isBreastUltrasoundType(scanType);
  const isScrotal = isScrotalUltrasoundType(scanType);
  const isTransvaginal = isTransvaginalUltrasoundType(scanType);
  const isEarlyObstetrics = isEarlyObstetricsUltrasoundType(scanType);

  const handleScanTypeChange = (value: string) => {
    setScanType(value);
    if (!isObstetricUltrasoundType(value)) {
      setScanImages([]);
    }
    if (!isBreastUltrasoundType(value)) {
      setBreastReport(EMPTY_BREAST_ULTRASOUND_REPORT);
    }
    if (!isScrotalUltrasoundType(value)) {
      setScrotalReport(EMPTY_SCROTAL_ULTRASOUND_REPORT);
    }
    if (!isTransvaginalUltrasoundType(value)) {
      setTransvaginalReport(EMPTY_TRANSVAGINAL_ULTRASOUND_REPORT);
    }
    if (!isEarlyObstetricsUltrasoundType(value)) {
      setEarlyObstetricsReport(EMPTY_EARLY_OBSTETRICS_REPORT);
    }
  };

  const handleScanImageSelect = (value: string) => {
    if (!value) return;
    const key = value as ObstetricScanImageKey;
    setScanImages((prev) => {
      if (prev.includes(key)) return prev;
      return [...prev, key];
    });
  };

  const updateBreastReport = (
    field: keyof BreastUltrasoundReport,
    value: string,
  ) => {
    setBreastReport((prev) => ({ ...prev, [field]: value }));
  };

  const updateScrotalReport = (
    field: keyof ScrotalUltrasoundReport,
    value: string,
  ) => {
    setScrotalReport((prev) => ({ ...prev, [field]: value }));
  };

  const updateTransvaginalReport = (
    field: keyof TransvaginalUltrasoundReport,
    value: string,
  ) => {
    setTransvaginalReport((prev) => ({ ...prev, [field]: value }));
  };

  const updateEarlyObstetricsReport = (
    field: keyof EarlyObstetricsUltrasoundReport,
    value: string,
  ) => {
    setEarlyObstetricsReport((prev) => ({ ...prev, [field]: value }));
  };

  const handleConfirm = () => {
    if (!scanType) {
      toast.error("Select an ultrasound type from the drop down list.");
      return;
    }
    if (isObstetricUltrasoundType(scanType) && scanImages.length === 0) {
      toast.error("Select an ultrasound scan image from the drop down list.");
      return;
    }
    if (isBreastUltrasoundType(scanType)) {
      if (
        !breastReport.comment.trim() ||
        !breastReport.impression.trim() ||
        !breastReport.recommendation.trim()
      ) {
        toast.error(
          "Complete Comment, Impression, and Recommendation for Breast USS.",
        );
        return;
      }
    }
    if (isScrotalUltrasoundType(scanType)) {
      if (
        !scrotalReport.leftTesticleMm.trim() ||
        !scrotalReport.rightTesticleMm.trim() ||
        !scrotalReport.comment.trim() ||
        !scrotalReport.impression.trim() ||
        !scrotalReport.recommendation.trim()
      ) {
        toast.error(
          "Complete LT, RT, Comment, Impression, and Recommendation for Scrotal USS.",
        );
        return;
      }
    }
    if (isTransvaginalUltrasoundType(scanType)) {
      if (
        !transvaginalReport.comment.trim() ||
        !transvaginalReport.impression.trim() ||
        !transvaginalReport.recommendation.trim()
      ) {
        toast.error(
          "Complete Comment, Impression, and Recommendation for Transvaginal USS.",
        );
        return;
      }
    }
    if (isEarlyObstetricsUltrasoundType(scanType)) {
      if (!earlyObstetricsReport.impression.trim()) {
        toast.error("Enter Impression for Early Obstetrics USS.");
        return;
      }
    }
    if (!requestDateTime.trim()) {
      toast.error("Enter date and time of investigation request.");
      return;
    }
    if (!resultDateTime.trim()) {
      toast.error("Enter date and time of investigation result.");
      return;
    }
    if (!requestedBy.trim() || !doneBy.trim()) {
      toast.error("Enter investigation requested by and done by.");
      return;
    }

    onConfirmed?.({
      scanType,
      scanImages,
      breastReport: isBreastUltrasoundType(scanType)
        ? {
            comment: breastReport.comment.trim(),
            impression: breastReport.impression.trim(),
            recommendation: breastReport.recommendation.trim(),
          }
        : null,
      scrotalReport: isScrotalUltrasoundType(scanType)
        ? {
            leftTesticleMm: scrotalReport.leftTesticleMm.trim(),
            rightTesticleMm: scrotalReport.rightTesticleMm.trim(),
            comment: scrotalReport.comment.trim(),
            impression: scrotalReport.impression.trim(),
            recommendation: scrotalReport.recommendation.trim(),
          }
        : null,
      transvaginalReport: isTransvaginalUltrasoundType(scanType)
        ? {
            comment: transvaginalReport.comment.trim(),
            impression: transvaginalReport.impression.trim(),
            recommendation: transvaginalReport.recommendation.trim(),
          }
        : null,
      earlyObstetricsReport: isEarlyObstetricsUltrasoundType(scanType)
        ? Object.fromEntries(
            Object.entries(earlyObstetricsReport).map(([key, value]) => [
              key,
              value.trim(),
            ]),
          ) as EarlyObstetricsUltrasoundReport
        : null,
      requestDateTime: requestDateTime.trim(),
      resultDateTime: resultDateTime.trim(),
      requestedBy: requestedBy.trim(),
      doneBy: doneBy.trim(),
    });
    toast.success("Ultrasound scan confirmed.");
  };

  return (
    <div className="flex min-h-0 min-w-0 flex-1 overflow-hidden">
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <p className="sr-only">Result entry for {patientName}</p>

        <div className="bg-[#573FD1] px-4 py-4 text-center">
          <h1 className="text-base font-bold uppercase tracking-wide text-white sm:text-lg">
            Medical Imaging Form Entry
          </h1>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-4 lg:p-5 xl:p-6">
          <div className="relative mb-4">
            <select
              value={scanType}
              onChange={(e) => handleScanTypeChange(e.target.value)}
              className={`${fieldClass} appearance-none pr-12 ${
                scanType
                  ? "font-medium not-italic text-gray-900"
                  : "italic text-gray-500"
              }`}
              aria-label="Ultrasound Type"
            >
              <option value="">
                select Ultrasound Type from a drop down list
              </option>
              {ULTRASOUND_SCAN_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <ChevronRight
              className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500"
              aria-hidden
            />
          </div>

          {isObstetrics ? (
            <div className="mb-8 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
              <div className="bg-[#573FD1] px-4 py-3 text-center">
                <h2 className="text-sm font-bold uppercase tracking-wide text-white sm:text-base">
                  {OBSTETRICS_ULTRASOUND_TITLE}
                </h2>
              </div>
              <div className="space-y-5 p-4 sm:p-5">
                <div className="relative">
                  <select
                    value=""
                    onChange={(e) => handleScanImageSelect(e.target.value)}
                    className={`${fieldClass} appearance-none pr-12 italic text-gray-500`}
                    aria-label="Ultrasound scan images"
                  >
                    <option value="">
                      select Ultrasound scan images from a drop down list
                    </option>
                    {OBSTETRIC_SCAN_IMAGES.filter(
                      (image) => !scanImages.includes(image.key),
                    ).map((image) => (
                      <option key={image.key} value={image.key}>
                        {image.label}
                      </option>
                    ))}
                  </select>
                  <ChevronRight
                    className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500"
                    aria-hidden
                  />
                </div>

                {scanImages.length === 0 ? (
                  <div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        disabled
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#573FD1] text-[#573FD1] opacity-30"
                        aria-label="Previous ultrasound image"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <div className="grid min-w-0 flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
                        {[0, 1].map((index) => (
                          <div
                            key={`placeholder-${index}`}
                            className="flex min-h-[11rem] flex-col items-center justify-center rounded-lg border-2 border-[#573FD1] bg-white px-3 py-4"
                          >
                            <span
                              className="text-5xl font-bold leading-none text-[#573FD1]"
                              aria-hidden
                            >
                              !
                            </span>
                          </div>
                        ))}
                      </div>
                      <button
                        type="button"
                        disabled
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#573FD1] text-[#573FD1] opacity-30"
                        aria-label="Next ultrasound image"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                    <p className="mt-3 text-center text-xs font-medium text-gray-600">
                      Ultrasound Selection Images
                    </p>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {scanImages.map((imageKey) => {
                      const image = OBSTETRIC_SCAN_IMAGES.find(
                        (item) => item.key === imageKey,
                      );
                      if (!image) return null;
                      return (
                        <div
                          key={image.key}
                          className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
                        >
                          <div className="bg-[#573FD1] px-4 py-3 text-center">
                            <h3 className="text-sm font-bold uppercase tracking-wide text-white sm:text-base">
                              {image.headerTitle}
                            </h3>
                          </div>
                          <div className="flex min-h-[12rem] flex-col items-center justify-center px-4 py-5">
                            <PresentationPreview imageKey={image.key} />
                            <p className="mt-3 text-center text-xs font-semibold text-gray-700">
                              {image.label}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          ) : null}

          {isEarlyObstetrics ? (
            <EarlyObstetricsUltrasoundForm
              values={earlyObstetricsReport}
              onChange={updateEarlyObstetricsReport}
            />
          ) : null}

          {isBreast ? (
            <div className="mb-8 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
              <div className="bg-[#573FD1] px-4 py-3 text-center">
                <h2 className="text-sm font-bold uppercase tracking-wide text-white sm:text-base">
                  {BREAST_ULTRASOUND_TITLE}
                </h2>
              </div>
              <div className="space-y-5 p-4 sm:p-5">
                <UssReportField
                  label="Comment"
                  value={breastReport.comment}
                  onChange={(value) => updateBreastReport("comment", value)}
                  rows={6}
                />
                <UssReportField
                  label="Impression"
                  value={breastReport.impression}
                  onChange={(value) => updateBreastReport("impression", value)}
                  rows={4}
                />
                <UssReportField
                  label="Recommendation"
                  value={breastReport.recommendation}
                  onChange={(value) =>
                    updateBreastReport("recommendation", value)
                  }
                  rows={3}
                />
              </div>
            </div>
          ) : null}

          {isScrotal ? (
            <div className="mb-8 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
              <div className="bg-[#573FD1] px-4 py-3 text-center">
                <h2 className="text-sm font-bold uppercase tracking-wide text-white sm:text-base">
                  {SCROTAL_ULTRASOUND_TITLE}
                </h2>
              </div>
              <div className="space-y-5 p-4 sm:p-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                  <TesticleMeasureField
                    label="Left Testicles (LT)"
                    value={scrotalReport.leftTesticleMm}
                    onChange={(value) =>
                      updateScrotalReport("leftTesticleMm", value)
                    }
                  />
                  <TesticleMeasureField
                    label="Right Testicles (RT)"
                    value={scrotalReport.rightTesticleMm}
                    onChange={(value) =>
                      updateScrotalReport("rightTesticleMm", value)
                    }
                  />
                </div>
                <UssReportField
                  label="Comment"
                  value={scrotalReport.comment}
                  onChange={(value) => updateScrotalReport("comment", value)}
                  rows={5}
                />
                <UssReportField
                  label="Impression"
                  value={scrotalReport.impression}
                  onChange={(value) => updateScrotalReport("impression", value)}
                  rows={4}
                />
                <UssReportField
                  label="Recommendation"
                  value={scrotalReport.recommendation}
                  onChange={(value) =>
                    updateScrotalReport("recommendation", value)
                  }
                  rows={4}
                />
              </div>
            </div>
          ) : null}

          {isTransvaginal ? (
            <div className="mb-8 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
              <div className="bg-[#573FD1] px-4 py-3 text-center">
                <h2 className="text-sm font-bold uppercase tracking-wide text-white sm:text-base">
                  {TRANSVAGINAL_ULTRASOUND_TITLE}
                </h2>
              </div>
              <div className="space-y-5 p-4 sm:p-5">
                <UssReportField
                  label="Comment"
                  value={transvaginalReport.comment}
                  onChange={(value) =>
                    updateTransvaginalReport("comment", value)
                  }
                  rows={6}
                />
                <UssReportField
                  label="Impression"
                  value={transvaginalReport.impression}
                  onChange={(value) =>
                    updateTransvaginalReport("impression", value)
                  }
                  rows={4}
                />
                <UssReportField
                  label="Recommendation"
                  value={transvaginalReport.recommendation}
                  onChange={(value) =>
                    updateTransvaginalReport("recommendation", value)
                  }
                  rows={4}
                />
              </div>
            </div>
          ) : null}

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-8">
            <InvestigationDateTimePicker
              label="Date | Time Of Investigation Request"
              value={requestDateTime}
              onChange={setRequestDateTime}
              defaultDate={requestDateDefault}
              defaultTime={requestTimeDefault}
              hintText={INVESTIGATION_METADATA_HINTS.requestDateTime}
            />
            <InvestigationDateTimePicker
              label="Date | Time Of Investigation Result"
              value={resultDateTime}
              onChange={setResultDateTime}
              hintText={INVESTIGATION_METADATA_HINTS.resultDateTime}
            />
            <div className="min-w-0 flex-1">
              <label className="mb-2 block text-[13px] font-medium uppercase tracking-wide text-gray-800">
                Investigation Requested By
              </label>
              <input
                type="text"
                value={requestedBy}
                onChange={(e) => setRequestedBy(e.target.value)}
                className={fieldClass}
                aria-label="Investigation requested by"
              />
              <span className="mt-1 block text-[10px] italic leading-snug text-gray-500 sm:text-xs">
                {INVESTIGATION_METADATA_HINTS.requestedBy}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <label className="mb-2 block text-[13px] font-medium uppercase tracking-wide text-gray-800">
                Investigation Done By
              </label>
              <input
                type="text"
                value={doneBy}
                onChange={(e) => setDoneBy(e.target.value)}
                className={fieldClass}
                aria-label="Investigation done by"
              />
              <span className="mt-1 block text-[10px] italic leading-snug text-gray-500 sm:text-xs">
                {INVESTIGATION_METADATA_HINTS.doneBy}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <label className="mb-2 block text-[13px] font-medium uppercase tracking-wide text-gray-800">
                Investigation Type
              </label>
              <input
                type="text"
                value="Radiology"
                readOnly
                className={`${fieldClass} bg-gray-50 text-gray-700`}
              />
            </div>
            <div className="min-w-0 flex-1">
              <label className="mb-2 block text-[13px] font-medium uppercase tracking-wide text-gray-800">
                Investigation Name
              </label>
              <input
                type="text"
                value={scanType || ULTRASOUND_INVESTIGATION_NAME}
                readOnly
                className={`${fieldClass} bg-gray-50 text-gray-700`}
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end border-t border-gray-200 pt-6">
            <button
              type="button"
              onClick={handleConfirm}
              className="h-[45px] min-w-[175px] rounded-lg bg-[#573FD1] px-10 text-[15px] font-semibold tracking-[-0.3px] text-white transition hover:bg-[#4a35b8]"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
