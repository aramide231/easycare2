import { useEffect, useState } from "react";
import {
  FaSmile,
  FaHandScissors,
  FaBaby,
  FaBookReader,
  FaFlag,
  FaLocationArrow,
  FaMoneyBill,
  FaPeopleCarry,
  FaPiggyBank,
  FaRecordVinyl,
  FaRecycle,
  FaSeedling,
  FaSnowman,
  FaUserFriends,
  FaUserCog,
  FaFileAlt,
  FaCloudUploadAlt,
} from "react-icons/fa";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Undo2 } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import clientimage from "@doctor-shared/assets/image/haywhy.jpg";
import SelectCategoryCard from "./components/SelectCategoryCard";
import CategoryFormAccordion from "./components/CategoryFormAccordion";
import SpecialistConsultTypeSelector from "./components/SpecialistConsultTypeSelector";
import { getSubCategories } from "./config/subCategoryMap";
import ComingSoonPage from "@doctor-shared/components/ComingSoonPage";
import DoctorUploadedDocumentsSection from "./components/DoctorUploadedDocumentsSection";
import {
  financialCategoryComponents,
  FINANCIAL_TABLE_KEYS,
} from "./components/FinancialCategoryRenderer";
import { useAuth } from "@doctor-shared/context/useAuth";
import {
  areAllSectionsFilled,
  clearPendingSectionEntries,
  commitPendingCategoryEntries,
  getSectionEntryCount,
  getSectionTableRows,
  getUnfilledSectionLabels,
  getUserSavedSectionLabels,
  hasAnySectionFilled,
  isSectionFilled,
  resetUserSavedSections,
} from "./hooks/useMedicalTable";
import EmptyFormAlertModal from "./components/EmptyFormAlertModal";
import FormPreviewModal from "./components/FormPreviewModal";
import {
  buildPreviewSectionLines,
  sectionSupportsNumberedPreview,
} from "./lib/previewSectionLines";
import FlagPatientModal from "./components/FlagPatientModal";
import { useClinicianPatientFlags } from "@doctor-shared/components/FlagProfileReport";
import GenConsultController from "./components/genConsult/GenConsultController";
import GenConsultQueueModal from "./components/genConsult/GenConsultQueueModal";
import { isQueuedForClinicianVisitToday } from "./data/genConsultQueueSeed";
import {
  GEN_CONSULT_STRICT_SECTIONS,
  isCasualGenConsultPatientType,
  isGenConsultSessionReady,
  requiresStrictGenConsultSections,
  setGenConsultModeActive,
  shouldSkipQueueCheckForGenConsult,
  useGenConsultSession,
} from "./hooks/genConsultSession";
import { shouldShowGenConsultConsultationType } from "./config/genConsultPatientTypes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MOCK_PATIENT = {
  id: 1,
  firstName: "Abiola",
  lastName: "Adebayo",
  patientId: "P-2025001",
  phoneNumber: "09012345678",
  lastSeen: "15-Feb-2020",
  time: "10:25 AM",
  gender: "M",
  age: 31,
  patientType: "COMPANY",
  visitType: "GEN. CONSULT",
  staffName: "Titilayo Olayinka",
  flagged: false,
  bloodPressure: "120/80",
  name: "Abiola Adebayo",
};

const NairaCategoryIcon = ({ className }: { className?: string }) => (
  <span className={`text-lg font-bold leading-none ${className ?? ""}`}>â‚¦</span>
);

const DoctorPatientProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const patient = location.state?.patient ?? MOCK_PATIENT;

  const [step, setStep] = useState<number>(1);
  const [showFlagModal, setShowFlagModal] = useState(false);
  const { reports: flagReports } = useClinicianPatientFlags(patient);
  const flagCount = flagReports.length;
  const [emptyAlertAction, setEmptyAlertAction] = useState<
    "preview" | "submit" | null
  >(null);
  const [emptyAlertUnfilledSections, setEmptyAlertUnfilledSections] = useState<
    string[]
  >([]);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewSections, setPreviewSections] = useState<
    {
      label: string;
      count: number;
      lines?: { text: string; meta?: string }[];
    }[]
  >([]);
  const [previewCategoryName, setPreviewCategoryName] = useState("");
  const [submittedHealthCategory, setSubmittedHealthCategory] = useState<
    string | null
  >(null);
  const [submittedFinancialCategory, setSubmittedFinancialCategory] = useState<
    string | null
  >(null);
  const [selectedHealthCategory, setSelectedHealthCategory] = useState<
    string | null
  >(null);
  const [selectedFinancialCategory, setSelectedFinancialCategory] = useState<
    string | null
  >(null);
  const [selectedDocumentsCategory, setSelectedDocumentsCategory] = useState<
    string | null
  >(null);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [selectedConsultationType, setSelectedConsultationType] = useState<
    string | null
  >(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);
  const [isPersonalDetailsOpen, setIsPersonalDetailsOpen] = useState(true);
  const [isInsuranceDetailsOpen, setIsInsuranceDetailsOpen] = useState(true);
  const [showGenConsultQueueModal, setShowGenConsultQueueModal] = useState(false);
  const [highlightedGenConsultSections, setHighlightedGenConsultSections] =
    useState<string[]>([]);

  const genConsultSession = useGenConsultSession();

  const activeFormSections = getSubCategories(selectedHealthCategory);

  const isGenConsult = selectedHealthCategory === "Gen Consult";
  const isSpecialistConsult = false;
  const isComingSoonCategory =
    selectedHealthCategory === "Family Planning" ||
    selectedHealthCategory === "Fertility Clinics" ||
    selectedHealthCategory === "Specialist Consult";

  const financeCategories = [
    {
      icon: FaPiggyBank,
      label: "Account Review",
    },
    {
      icon: FaMoneyBill,
      label: "Admission Bill",
    },
    {
      icon: NairaCategoryIcon,
      label: "Service Fee",
    },
    {
      icon: FaUserCog,
      label: "Claims Processor",
    },
    {
      icon: FaRecordVinyl,
      label: "Receipt",
    },
    {
      icon: FaLocationArrow,
      label: "Payment History",
    },
    {
      icon: FaBookReader,
      label: "Invoice",
    },
  ];

  const tabLabels = [
    "Health Information",
    "Financial Information",
    "Attached Documents",
  ] as const;

  const categories = [
    {
      icon: FaBaby,
      label: "Ante Natal Care",
    },
    {
      icon: FaBaby,
      label: "Child Birth",
    },
    {
      icon: FaUserFriends,
      label: "Family Planning",
    },
    {
      icon: FaSeedling,
      label: "Fertility Clinics",
    },
    {
      icon: FaPeopleCarry,
      label: "Immunization",
    },
    {
      icon: FaRecycle,
      label: "Gen Consult",
    },
    {
      icon: FaSmile,
      label: "Neo Natal Care",
    },
    {
      icon: FaBaby,
      label: "Post Natal Care",
    },
    {
      icon: FaSnowman,
      label: "Specialist Consult",
    },
    {
      icon: FaHandScissors,
      label: "Surgical",
    },
  ];

  const toggleCategory = (label: string) => {
    setExpandedCategories((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const categorySectionLabels = activeFormSections.map((section) => section.label);

  useEffect(() => {
    setGenConsultModeActive(isGenConsult);
    if (!isGenConsult) {
      setHighlightedGenConsultSections([]);
    }
  }, [isGenConsult]);

  useEffect(() => {
    if (!selectedHealthCategory || isComingSoonCategory) return;
    clearPendingSectionEntries(
      getSubCategories(selectedHealthCategory).map((section) => section.label)
    );
    resetUserSavedSections(
      getSubCategories(selectedHealthCategory).map((section) => section.label)
    );
  }, [selectedHealthCategory, isComingSoonCategory]);

  useEffect(() => {
    if (!selectedFinancialCategory) return;
    const tableKey = FINANCIAL_TABLE_KEYS[selectedFinancialCategory];
    if (tableKey) {
      clearPendingSectionEntries([tableKey]);
      resetUserSavedSections([tableKey]);
    }
  }, [selectedFinancialCategory]);

  const isCurrentFormSubmitted =
    (step === 1 &&
      selectedHealthCategory !== null &&
      submittedHealthCategory === selectedHealthCategory) ||
    (step === 2 &&
      selectedFinancialCategory !== null &&
      submittedFinancialCategory === selectedFinancialCategory);

  const getGenConsultUnfilledLabels = (sectionKeys: string[]): string[] => {
    if (!genConsultSession.patientTypeId) {
      return ["SELECT PATIENT TYPE"];
    }

    if (
      shouldShowGenConsultConsultationType(genConsultSession.patientTypeId) &&
      !genConsultSession.consultationTypeId
    ) {
      return ["SELECT CONSULTATION TYPE"];
    }

    if (requiresStrictGenConsultSections()) {
      return getUnfilledSectionLabels([...GEN_CONSULT_STRICT_SECTIONS]);
    }

    if (isCasualGenConsultPatientType()) {
      return hasAnySectionFilled(sectionKeys)
        ? []
        : ["AT LEAST ONE SUB-CATEGORY WITH ENTRIES"];
    }

    return [];
  };

  const hasFilledActiveForm = () => {
    if (step === 1 && isSpecialistConsult && !selectedConsultationType) {
      return false;
    }
    const sectionKeys = getActiveSectionKeys();

    if (step === 1 && isGenConsult) {
      if (!isGenConsultSessionReady()) return false;
      if (requiresStrictGenConsultSections()) {
        return GEN_CONSULT_STRICT_SECTIONS.every((label) =>
          isSectionFilled(label)
        );
      }
      return hasAnySectionFilled(sectionKeys);
    }

    return areAllSectionsFilled(sectionKeys);
  };

  const getActiveSectionKeys = (): string[] => {
    if (step === 1 && selectedHealthCategory && !isComingSoonCategory) {
      return categorySectionLabels;
    }
    if (step === 2 && selectedFinancialCategory) {
      const tableKey = FINANCIAL_TABLE_KEYS[selectedFinancialCategory];
      return tableKey ? [tableKey] : [];
    }
    return [];
  };

  const getActiveCategoryName = () => {
    if (step === 1) return selectedHealthCategory ?? "";
    if (step === 2) return selectedFinancialCategory ?? "";
    return "Attached Documents";
  };

  const goToStep = (nextStep: number) => {
    setStep(nextStep);
    setExpandedCategories([]);
  };

  const flushPendingCategoryEntries = () => {
    const enteredBy = user?.fullName ?? "Unknown User";
    const doctor = user?.fullName ? `Dr. ${user.fullName}` : "Unknown Doctor";
    commitPendingCategoryEntries(enteredBy, doctor);
  };

  const showIncompleteFormAlert = (action: "preview" | "submit") => {
    const sectionKeys = getActiveSectionKeys();
    let unfilled = isGenConsult
      ? getGenConsultUnfilledLabels(sectionKeys)
      : getUnfilledSectionLabels(sectionKeys);

    if (isGenConsult && requiresStrictGenConsultSections()) {
      setHighlightedGenConsultSections(
        getUnfilledSectionLabels([...GEN_CONSULT_STRICT_SECTIONS])
      );
    } else {
      setHighlightedGenConsultSections([]);
    }

    setEmptyAlertUnfilledSections(unfilled);
    setEmptyAlertAction(action);
  };

  const validateAncEligibility = (): boolean => {
    if (step !== 1 || selectedHealthCategory !== "Ante Natal Care") {
      return true;
    }
    const genderRaw = String(patient?.gender ?? "").trim().toLowerCase();
    if (genderRaw === "m" || genderRaw === "male") {
      toast.error(
        "Permission denied: Cannot submit under Ante Natal Care (ANC) when patient gender is Male."
      );
      return false;
    }
    const ageNum = Number.parseFloat(
      String(patient?.age ?? "").replace(/[^\d.]/g, "")
    );
    if (
      (genderRaw === "f" || genderRaw === "female") &&
      Number.isFinite(ageNum) &&
      ageNum < 10
    ) {
      toast.error(
        "Permission denied: Cannot submit under Ante Natal Care (ANC) when female patient age is below 10 years."
      );
      return false;
    }
    return true;
  };

  const handlePreview = () => {
    const sectionKeys = getActiveSectionKeys();
    flushPendingCategoryEntries();

    const allCandidateLabels =
      step === 1 && selectedHealthCategory && !isComingSoonCategory
        ? categorySectionLabels
        : sectionKeys;

    const savedSet = new Set(getUserSavedSectionLabels(allCandidateLabels));
    const labelsWithEntries = allCandidateLabels.filter(
      (label) => savedSet.has(label) || getSectionEntryCount(label) > 0
    );

    if (labelsWithEntries.length === 0) {
      showIncompleteFormAlert("preview");
      return;
    }

    setPreviewCategoryName(getActiveCategoryName());
    setPreviewSections(
      labelsWithEntries.map((label) => {
        const rows = getSectionTableRows(label);
        return {
          label,
          count: rows.length,
          lines: sectionSupportsNumberedPreview(label)
            ? buildPreviewSectionLines(label, rows)
            : undefined,
        };
      })
    );
    setShowPreviewModal(true);
  };

  const handleSubmit = () => {
    if (step === 3) {
      toast.success("Documents confirmed successfully!");
      return;
    }

    if (!validateAncEligibility()) {
      return;
    }

    const sectionKeys = getActiveSectionKeys();

    if (
      step === 1 &&
      isGenConsult &&
      !shouldSkipQueueCheckForGenConsult() &&
      hasAnySectionFilled(sectionKeys) &&
      !isQueuedForClinicianVisitToday(patient.patientId)
    ) {
      setShowGenConsultQueueModal(true);
      return;
    }

    if (!hasFilledActiveForm()) {
      showIncompleteFormAlert("submit");
      return;
    }

    setHighlightedGenConsultSections([]);
    flushPendingCategoryEntries();

    if (step === 1 && selectedHealthCategory) {
      setSubmittedHealthCategory(selectedHealthCategory);
    }
    if (step === 2 && selectedFinancialCategory) {
      setSubmittedFinancialCategory(selectedFinancialCategory);
    }

    toast.success(
      `${getActiveCategoryName()} submitted successfully!`
    );
  };

  const handleFlagPatient = () => {
    setShowFlagModal(true);
  };

  const handlePreviousPatientRecords = () => {
    navigate(`/doctor/previous-patient-records/${patient.patientId}`, {
      state: { patient },
    });
  };

  if (!patient) {
    return <p className="text-red-500">Patient data not found.</p>;
  }

  const FinancialFormComponent = selectedFinancialCategory
    ? financialCategoryComponents[selectedFinancialCategory]
    : null;

  const categoryGridClass = isDetailsOpen
    ? "grid w-full grid-cols-[repeat(auto-fill,minmax(170px,1fr))] gap-[10px]"
    : "grid w-full grid-cols-2 gap-[10px] sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5";

  const financeGridClass = categoryGridClass;

  const showPreviewSubmit =
    (step === 1 && selectedHealthCategory && !isComingSoonCategory) ||
    (step === 2 && Boolean(selectedFinancialCategory));

  ////////////////  TO BE LATER USED FOR OTHER CATEGORIES  ////////////////

  // const diagnosiscolumns = ["SN", "PATIENT TYPE", "DIAGNOSIS", "DOCTOR"];

  // const diagnosisRows = [
  //   ["1", "2025-04-21 | 10:30 AM", "Malaria R/O Sepsis", "Dr. Chibuzo Akewe"],
  // ];

  // const investigstionColums = [
  //   "S/N",
  //   "DATE | TIME",
  //   "PATIENT TYPE",
  //   "INVESTIGATION",
  //   "AMOUNT",
  // ];

  // const investigationRows = [
  //   ["1", "2025-04-21 | 10:30 AM", "Out-Patient", "HVS", "N 4,000.00"],
  // ];

  // const medicationColumns = [
  //   "SN",
  //   "MEDICATION",
  //   "D.FORM",
  //   "DURATION",
  //   "DOSAGE",
  //   "DURATION",
  //   "PERIOD",
  //   "QTY",
  //   "AMOUNT",
  // ];

  // const medicationRows = [
  //   ["1", "Vitamin A", "Tablets", "2", "BD", "3", "Days", "1", "4000"],
  //   ["2", "Cough Syrup", "Syrup", "1", "TDS", "1", "Days", "1", "4000"],
  //   ["3", "PCM", "Injection", "1", "STAT", "1", "Days", "1", "4000"],
  // ];




  return (
    <div className="relative flex min-h-[calc(100dvh-7rem)] w-full min-w-0 max-w-full rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Left column â€” collapsible patient info (matches nursing profile) */}
      <div
        className={`relative flex shrink-0 flex-col border-r border-gray-200 transition-[width] duration-300 ease-in-out ${
          isDetailsOpen ? "w-80 p-4 pr-3" : "w-0 overflow-hidden border-r-0 p-0"
        }`}
      >
        <div
          className={`flex min-h-0 flex-1 flex-col ${
            isDetailsOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <button
            type="button"
            onClick={() => setIsDetailsOpen(false)}
            className="mb-3 flex w-full shrink-0 items-center gap-3 rounded-lg border border-purple-100 bg-purple-50 p-3 text-left transition hover:border-[#573FD1]/30 hover:bg-purple-100"
            aria-label="Hide patient details"
            title="Hide patient details"
          >
            <img
              src={clientimage}
              alt="Patient"
              className="h-14 w-14 shrink-0 rounded-full object-cover"
            />
            <div className="min-w-0 flex-1">
              <h2 className="truncate text-base font-semibold text-gray-900">
                {patient.firstName} {patient.lastName}
              </h2>
              <p className="text-sm text-gray-500">ID: {patient.patientId}</p>
            </div>
            <ChevronLeft className="h-5 w-5 shrink-0 text-[#573FD1]" />
          </button>

          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto pr-1">
            <div>
              <button
                type="button"
                onClick={() => setIsPersonalDetailsOpen((prev) => !prev)}
                className="mb-2 flex w-full items-center justify-between text-left"
                aria-expanded={isPersonalDetailsOpen}
              >
                <h3 className="text-xs font-bold tracking-wide text-gray-800">
                  PERSONAL DETAILS
                </h3>
                {isPersonalDetailsOpen ? (
                  <ChevronUp className="h-4 w-4 shrink-0 text-gray-400" />
                ) : (
                  <ChevronDown className="h-4 w-4 shrink-0 text-gray-400" />
                )}
              </button>
              {isPersonalDetailsOpen && (
                <div className="space-y-1.5 text-sm text-gray-600">
                  <p>
                    <span className="font-medium text-gray-700">Last Name:</span>{" "}
                    {patient.lastName}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">First Name:</span>{" "}
                    {patient.firstName}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">Middle Name:</span>{" "}
                    OluwaPac
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">Phone NO:</span>{" "}
                    {patient.phoneNumber}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">Email:</span>{" "}
                    {patient.email || "Not available"}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">Gender:</span>{" "}
                    {patient.gender}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">Age:</span>{" "}
                    {patient.age}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">Marital Status:</span>{" "}
                    Married
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">Address:</span> 2,
                    Omega lane, Lekki, Lagos.
                  </p>
                </div>
              )}
            </div>

            <hr className="border-gray-200" />

            <div>
              <button
                type="button"
                onClick={() => setIsInsuranceDetailsOpen((prev) => !prev)}
                className="mb-2 flex w-full items-center justify-between text-left"
                aria-expanded={isInsuranceDetailsOpen}
              >
                <h3 className="text-xs font-bold tracking-wide text-gray-800">
                  INSURANCE DETAILS
                </h3>
                {isInsuranceDetailsOpen ? (
                  <ChevronUp className="h-4 w-4 shrink-0 text-gray-400" />
                ) : (
                  <ChevronDown className="h-4 w-4 shrink-0 text-gray-400" />
                )}
              </button>
              {isInsuranceDetailsOpen && (
                <div className="space-y-1.5 text-sm text-gray-600">
                  <p>
                    <span className="font-medium text-gray-700">Insurance Type:</span>{" "}
                    HMO
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">Insurance Group No:</span>{" "}
                    LDW/200
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">Employer Name:</span>{" "}
                    7up Bottling Company
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">Eligibility:</span>{" "}
                    <span className="text-green-600">Active</span>
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">
                      Insurance Provider Name:
                    </span>{" "}
                    Leadway HMO
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">Treatment Guide:</span>{" "}
                    Fee for service
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">Policy No:</span> bd2345
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">Patient Type:</span>{" "}
                    {patient.visitType || "Gen. consult"}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-auto shrink-0 space-y-3 pt-4">
            <button
              type="button"
              onClick={handleFlagPatient}
              className="flex w-full items-center justify-between gap-2 rounded-lg border border-orange-200 bg-orange-50 px-3 py-2.5 text-sm font-medium text-orange-600 transition hover:bg-orange-100"
            >
              <span className="flex items-center gap-2">
                <FaFlag className="text-base" />
                Flag Profile
              </span>
              <span className="rounded-md bg-white px-2 py-0.5 text-xs font-semibold text-orange-600 ring-1 ring-orange-200">
                {flagCount}
              </span>
            </button>
            <button
              type="button"
              onClick={handlePreviousPatientRecords}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#573FD1] bg-purple-50 px-3 py-2.5 text-sm font-medium text-[#573FD1] transition hover:bg-purple-100"
            >
              <Undo2 className="h-4 w-4 shrink-0" strokeWidth={2.25} />
              Prev. Patient Records
            </button>
          </div>
        </div>
      </div>

      {/* Right column â€” health / financial / documents */}
      <div
        className={`relative flex min-w-0 flex-1 flex-col p-4 sm:p-6 ${
          isDetailsOpen ? "" : "w-full"
        }`}
      >
        {!isDetailsOpen && (
          <button
            type="button"
            onClick={() => setIsDetailsOpen(true)}
            className="mb-3 flex w-fit max-w-full shrink-0 items-center gap-2 truncate rounded-lg border border-purple-100 bg-purple-50 px-3 py-2 text-left text-sm font-medium text-gray-900 transition hover:border-[#573FD1]/30 hover:bg-purple-100"
            aria-label="Show patient details"
            title="Show patient details"
          >
            <ChevronRight className="h-4 w-4 shrink-0 text-[#573FD1]" />
            <span className="truncate">
              {patient.firstName} {patient.lastName}
              <span className="ml-2 font-normal text-gray-500">
                Â· {patient.patientId}
              </span>
            </span>
          </button>
        )}
        <div
          className={`mb-5 flex w-full shrink-0 items-center ${
            isDetailsOpen
              ? "justify-center gap-2 sm:gap-3"
              : "mx-auto max-w-5xl gap-2 sm:gap-3"
          }`}
        >
          {tabLabels.map((label, index) => {
            const stepNumber = index + 1;
            const isActive = step === stepNumber;
            const tabClass = `rounded-lg py-2 text-center text-sm font-semibold transition ${
              isDetailsOpen ? "px-4" : "min-w-0 flex-1 px-3"
            } ${
              isActive
                ? "bg-[#573FD1] text-white shadow-sm"
                : "border border-gray-300 bg-white text-gray-500 hover:border-[#573FD1]/40 hover:text-[#573FD1]"
            }`;

            if (isDetailsOpen) {
              return (
                <div key={stepNumber} className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => goToStep(stepNumber)}
                    className={tabClass}
                  >
                    {label}
                  </button>
                  {stepNumber < 3 && (
                    <div
                      className={`h-0.5 w-10 ${
                        step > stepNumber ? "bg-[#573FD1]" : "bg-gray-300"
                      }`}
                    />
                  )}
                </div>
              );
            }

            return (
              <div key={stepNumber} className="contents">
                <button
                  type="button"
                  onClick={() => goToStep(stepNumber)}
                  className={tabClass}
                >
                  {label}
                </button>
                {stepNumber < 3 && (
                  <div
                    className={`h-0.5 w-6 shrink-0 sm:w-8 ${
                      step > stepNumber ? "bg-[#573FD1]" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        <hr className="mb-3 shrink-0 border-gray-200" />

        {/* Step Content */}
        <div className="mt-2 flex w-full min-w-0 flex-1 flex-col">
          {step === 1 && (
            <>
              <h2 className="shrink-0 text-xs text-gray-400">Step 1</h2>
              <h3 className="mb-1.5 shrink-0 text-sm font-semibold text-gray-800">
                Select category
              </h3>
              <div className={`relative mb-4 shrink-0 ${categoryGridClass}`}>
                {categories.map((item, index) => (
                  <SelectCategoryCard
                    key={index}
                    icon={item.icon}
                    label={item.label}
                    selected={selectedHealthCategory === item.label}
                    onClick={() => {
                      setSelectedHealthCategory(item.label);
                      setExpandedCategories([]);
                      setSelectedConsultationType(
                        item.label === "Specialist Consult" ? "dental" : null
                      );
                    }}
                  />
                ))}
              </div>

              <h2 className="shrink-0 text-xs text-gray-400">Step 2</h2>
              <h3 className="mb-1.5 shrink-0 text-sm font-semibold text-gray-800">
                {isSpecialistConsult
                  ? "Select Consultation type"
                  : "Fill Category Form"}
              </h3>

              {isSpecialistConsult && selectedHealthCategory && (
                <div className="mb-4">
                  <SpecialistConsultTypeSelector
                    value={selectedConsultationType}
                    onChange={setSelectedConsultationType}
                  />
                </div>
              )}

              {!isSpecialistConsult && (
                <>
                  <div className="relative flex w-full min-w-0 flex-1 flex-col rounded-lg border border-gray-200 bg-white p-4">
                    {!selectedHealthCategory ? (
                      <div className="pointer-events-none flex flex-col items-center justify-center px-4 py-16 text-center text-sm">
                        <p className="font-medium text-gray-900">Text Field Goes Here</p>
                        <p className="mt-1 text-gray-400">
                          Becomes Active when a category is clicked
                        </p>
                      </div>
                    ) : isComingSoonCategory ? (
                      <ComingSoonPage title={selectedHealthCategory} />
                    ) : (
                      <>
                        {isGenConsult ? <GenConsultController /> : null}
                        <CategoryFormAccordion
                          sections={activeFormSections}
                          expandedCategories={expandedCategories}
                          onToggle={toggleCategory}
                          healthCategory={selectedHealthCategory}
                          highlightedSections={highlightedGenConsultSections}
                        />
                      </>
                    )}
                  </div>
                </>
              )}

              {isSpecialistConsult && (
                <>
                  <h2 className="shrink-0 text-xs text-gray-400">Step 3</h2>
                  <h3 className="mb-1.5 shrink-0 text-sm font-semibold text-gray-800">
                    Fill Category Form
                  </h3>

                  <div className="relative flex w-full min-w-0 flex-1 flex-col rounded-lg border border-gray-200 bg-white p-4">
                    <CategoryFormAccordion
                      sections={activeFormSections}
                      expandedCategories={expandedCategories}
                      onToggle={toggleCategory}
                      healthCategory={selectedHealthCategory}
                    />
                  </div>
                </>
              )}
            </>
          )}
          {step === 2 && (
            <>
              <h2 className="shrink-0 text-xs text-gray-400">Step 1</h2>
              <h3 className="mb-1.5 shrink-0 text-sm font-semibold text-gray-800">
                Select category
              </h3>
              <div className={`relative mb-4 shrink-0 ${financeGridClass}`}>
                {financeCategories.map((item, index) => (
                  <SelectCategoryCard
                    key={index}
                    icon={item.icon}
                    label={item.label}
                    selected={selectedFinancialCategory === item.label}
                    onClick={() => {
                      setSelectedFinancialCategory(item.label);
                    }}
                  />
                ))}
              </div>
              <h2 className="shrink-0 text-xs text-gray-400">Step 2</h2>
              <h3 className="mb-1.5 shrink-0 text-sm font-semibold text-gray-800">
                Fill Category Form
              </h3>
              <div className="relative flex w-full min-w-0 flex-1 flex-col rounded-lg border border-gray-200 bg-white p-4">
                {!selectedFinancialCategory ? (
                  <div className="pointer-events-none flex flex-col items-center justify-center px-4 py-16 text-center text-sm">
                    <p className="font-medium text-gray-900">Text Field Goes Here</p>
                    <p className="mt-1 text-gray-400">
                      Becomes Active when a category is clicked
                    </p>
                  </div>
                ) : FinancialFormComponent ? (
                  <FinancialFormComponent />
                ) : (
                  <ComingSoonPage title={selectedFinancialCategory} />
                )}
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <h2 className="shrink-0 text-xs text-gray-400">Step 1</h2>
              <h3 className="mb-1.5 shrink-0 text-sm font-semibold text-gray-800">
                Select category
              </h3>
              <div
                className={`relative mb-4 shrink-0 ${categoryGridClass}`}
              >
                <SelectCategoryCard
                  icon={FaCloudUploadAlt}
                  label="Upload Files"
                  selected={selectedDocumentsCategory === "Upload Files"}
                  onClick={() => setSelectedDocumentsCategory("Upload Files")}
                />
                <SelectCategoryCard
                  icon={FaFileAlt}
                  label="Uploaded Files"
                  selected={selectedDocumentsCategory === "Uploaded Files"}
                  onClick={() => setSelectedDocumentsCategory("Uploaded Files")}
                />
              </div>

              <h2 className="shrink-0 text-xs text-gray-400">Step 2</h2>
              <h3 className="mb-1.5 shrink-0 text-sm font-semibold text-gray-800">
                {selectedDocumentsCategory === "Upload Files"
                  ? "Upload Documents"
                  : selectedDocumentsCategory === "Uploaded Files"
                    ? "View Uploaded Files"
                    : "Fill Category Form"}
              </h3>
              <div className="relative flex w-full min-w-0 flex-1 flex-col rounded-lg border border-gray-200 bg-white p-4">
                {!selectedDocumentsCategory ? (
                  <div className="pointer-events-none flex flex-col items-center justify-center px-4 py-16 text-center text-sm">
                    <p className="font-medium text-gray-900">Text Field Goes Here</p>
                    <p className="mt-1 text-gray-400">
                      Becomes Active when a category is clicked
                    </p>
                  </div>
                ) : (
                  <DoctorUploadedDocumentsSection
                    figmaLayout
                    viewMode={
                      selectedDocumentsCategory === "Upload Files"
                        ? "upload"
                        : "list"
                    }
                    patientName={`${patient.firstName} ${patient.lastName}`}
                    patientId={patient.patientId}
                    phoneNumber={patient.phoneNumber}
                  />
                )}
              </div>
            </>
          )}
        </div>

        {/* Step Navigation */}
        <div className="mt-4 flex shrink-0 items-center justify-between border-t border-gray-100 pt-4">
          {showPreviewSubmit ? (
            <div className="ml-auto flex flex-wrap items-center justify-end gap-3">
              <button
                type="button"
                className="rounded-lg border border-[#573FD1] bg-white px-10 py-2.5 text-sm font-semibold text-[#573FD1] shadow-sm transition hover:bg-purple-50"
                onClick={handlePreview}
              >
                Preview
              </button>
              <button
                type="button"
                disabled={isCurrentFormSubmitted}
                className={`rounded-lg px-10 py-2.5 text-sm font-semibold text-white shadow-sm ${
                  isCurrentFormSubmitted
                    ? "cursor-not-allowed bg-gray-300"
                    : "bg-[#573FD1] hover:bg-[#4a35b0]"
                }`}
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          ) : (
            <>
              <button
                type="button"
                className="rounded-lg border border-gray-300 bg-white px-10 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                onClick={() => goToStep(step - 1)}
                disabled={step === 1}
              >
                Back
              </button>
              <button
                type="button"
                className="rounded-lg bg-[#573FD1] px-10 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#4a35b0]"
                onClick={() =>
                  step < 3 ? goToStep(step + 1) : handleSubmit()
                }
              >
                {step < 3 ? "Next" : "Confirm"}
              </button>
            </>
          )}
        </div>
      </div>
      <EmptyFormAlertModal
        open={emptyAlertAction !== null}
        action={emptyAlertAction ?? "submit"}
        unfilledSections={emptyAlertUnfilledSections}
        onClose={() => {
          setEmptyAlertAction(null);
          setEmptyAlertUnfilledSections([]);
        }}
      />
      <FormPreviewModal
        open={showPreviewModal}
        categoryName={previewCategoryName}
        sections={previewSections}
        onClose={() => setShowPreviewModal(false)}
      />
      <FlagPatientModal
        open={showFlagModal}
        onClose={() => setShowFlagModal(false)}
        patient={patient}
      />
      <GenConsultQueueModal
        open={showGenConsultQueueModal}
        patientName={`${patient.firstName} ${patient.lastName}`}
        onClose={() => setShowGenConsultQueueModal(false)}
      />
      <ToastContainer position="bottom-center" autoClose={2500} />
    </div>
  );
};

export default DoctorPatientProfile;
