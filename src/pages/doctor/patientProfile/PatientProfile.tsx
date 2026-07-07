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
  FaHistory,
  FaCloudUploadAlt,
} from "react-icons/fa";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import clientimage from "@/assets/image/haywhy.jpg";
import SelectCategoryCard from "./components/SelectCategoryCard";
import CategoryFormAccordion from "./components/CategoryFormAccordion";
import SpecialistConsultTypeSelector from "./components/SpecialistConsultTypeSelector";
import { getSubCategories } from "./config/subCategoryMap";
import ComingSoonPage from "@/components/ui/ComingSoonPage";
import DoctorUploadedDocumentsSection from "./components/DoctorUploadedDocumentsSection";
import {
  financialCategoryComponents,
  FINANCIAL_TABLE_KEYS,
} from "./components/FinancialCategoryRenderer";
import { useAuth } from "@/context/AuthContext";
import {
  areAllSectionsFilled,
  clearPendingSectionEntries,
  commitPendingCategoryEntries,
  getSectionEntryCount,
  getUnfilledSectionLabels,
  getUserSavedSectionLabels,
  resetUserSavedSections,
} from "./hooks/useMedicalTable";
import EmptyFormAlertModal from "./components/EmptyFormAlertModal";
import FormPreviewModal from "./components/FormPreviewModal";
import FlagPatientModal from "./components/FlagPatientModal";
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
  <span className={`text-lg font-bold leading-none ${className ?? ""}`}>₦</span>
);

const DoctorPatientProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const patient = location.state?.patient ?? MOCK_PATIENT;

  const [step, setStep] = useState<number>(1);
  const [isFlagged, setIsFlagged] = useState(Boolean(patient.flagged));
  const [showFlagModal, setShowFlagModal] = useState(false);
  const [emptyAlertAction, setEmptyAlertAction] = useState<
    "preview" | "submit" | null
  >(null);
  const [emptyAlertUnfilledSections, setEmptyAlertUnfilledSections] = useState<
    string[]
  >([]);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewSections, setPreviewSections] = useState<
    { label: string; count: number }[]
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

  const activeFormSections = getSubCategories(selectedHealthCategory);

  const isSpecialistConsult = selectedHealthCategory === "Specialist Consult";
  const isComingSoonCategory =
    selectedHealthCategory === "Family Planning" ||
    selectedHealthCategory === "Fertility Clinics";

  const financeCategories = [
    { icon: FaPiggyBank, label: "Account Review" },
    { icon: FaMoneyBill, label: "Admission Bill" },
    { icon: NairaCategoryIcon, label: "Service Fee" },
    { icon: FaUserCog, label: "Claims Processor" },
    { icon: FaRecordVinyl, label: "Receipt" },
    { icon: FaLocationArrow, label: "Payment History" },
    { icon: FaBookReader, label: "Invoice" },
  ];

  const tabLabels = [
    "Health Information",
    "Financial Information",
    "Attach Documents",
  ] as const;

  const categories = [
    { icon: FaBaby, label: "Ante Natal Care" },
    { icon: FaBaby, label: "Child Birth" },
    { icon: FaUserFriends, label: "Family Planning" },
    { icon: FaSeedling, label: "Fertility Clinics" },
    { icon: FaPeopleCarry, label: "Immunization" },
    { icon: FaRecycle, label: "Gen Consult" },
    { icon: FaSmile, label: "Neo Natal Care" },
    { icon: FaBaby, label: "Post Natal Care" },
    { icon: FaSnowman, label: "Specialist Consult" },
    { icon: FaHandScissors, label: "Surgical" },
  ];

  const toggleCategory = (label: string) => {
    setExpandedCategories((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label],
    );
  };

  const categorySectionLabels = activeFormSections.map(
    (section) => section.label,
  );

  useEffect(() => {
    if (!selectedHealthCategory || isComingSoonCategory) return;
    clearPendingSectionEntries(
      getSubCategories(selectedHealthCategory).map((section) => section.label),
    );
    resetUserSavedSections(
      getSubCategories(selectedHealthCategory).map((section) => section.label),
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

  const hasFilledActiveForm = () => {
    if (step === 1 && isSpecialistConsult && !selectedConsultationType) {
      return false;
    }
    return areAllSectionsFilled(getActiveSectionKeys());
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
    setEmptyAlertUnfilledSections(
      getUnfilledSectionLabels(getActiveSectionKeys()),
    );
    setEmptyAlertAction(action);
  };

  const handlePreview = () => {
    if (!hasFilledActiveForm()) {
      showIncompleteFormAlert("preview");
      return;
    }

    flushPendingCategoryEntries();

    const savedLabels = getUserSavedSectionLabels(getActiveSectionKeys());
    setPreviewCategoryName(getActiveCategoryName());
    setPreviewSections(
      savedLabels.map((label) => ({
        label,
        count: getSectionEntryCount(label),
      })),
    );
    setShowPreviewModal(true);
  };

  const handleSubmit = () => {
    if (step === 3) {
      toast.success("Documents confirmed successfully!");
      return;
    }

    if (!hasFilledActiveForm()) {
      showIncompleteFormAlert("submit");
      return;
    }

    flushPendingCategoryEntries();

    if (step === 1 && selectedHealthCategory) {
      setSubmittedHealthCategory(selectedHealthCategory);
    }
    if (step === 2 && selectedFinancialCategory) {
      setSubmittedFinancialCategory(selectedFinancialCategory);
    }

    toast.success(`${getActiveCategoryName()} submitted successfully!`);
  };

  const handleFlagPatient = () => {
    if (!isFlagged) {
      setIsFlagged(true);
      toast.success("Patient flagged. Add your comment below.");
    }
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

  const categoryGridClass = "grid-cols-3 sm:grid-cols-4 lg:grid-cols-5";
  const financeGridClass =
    "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-7";

  const showPreviewSubmit =
    (step === 1 && selectedHealthCategory && !isComingSoonCategory) ||
    (step === 2 && Boolean(selectedFinancialCategory));

  return (
    <div className="flex min-h-[calc(100dvh-5.75rem)] w-full min-w-0 rounded-xl border border-gray-200 bg-white shadow-sm">
      <div
        className={`relative shrink-0 self-start overflow-hidden border-r border-gray-200 bg-white transition-[width] duration-300 ease-in-out ${
          isDetailsOpen ? "w-64" : "w-10"
        }`}
      >
        <div
          className={`sticky top-0 flex h-[calc(100dvh-5.75rem)] max-h-[calc(100dvh-5.75rem)] w-64 flex-col p-3 pr-2 transition-transform duration-300 ease-in-out ${
            isDetailsOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex min-h-0 flex-1 flex-col">
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
              <div className="py-1">
                <button
                  type="button"
                  onClick={() => setIsPersonalDetailsOpen((prev) => !prev)}
                  className="relative w-full border-b-2 border-[#573FD1] py-3 text-left"
                >
                  <span className="absolute -bottom-0.5 left-0 z-10 max-w-[min(100%,14rem)] rounded-t-md bg-[#573FD1] px-4 py-2 text-xs font-bold uppercase tracking-wide text-white shadow-sm">
                    Personal Details
                  </span>
                  <div className="flex min-h-[2.25rem] items-center justify-end pr-1">
                    {isPersonalDetailsOpen ? (
                      <ChevronUp className="h-4 w-4 shrink-0 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-4 w-4 shrink-0 text-gray-500" />
                    )}
                  </div>
                </button>
                {isPersonalDetailsOpen && (
                  <div className="space-y-1.5 pt-3 text-sm text-gray-600">
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

              <div className="py-1">
                <button
                  type="button"
                  onClick={() => setIsInsuranceDetailsOpen((prev) => !prev)}
                  className="relative w-full border-b-2 border-[#573FD1] py-3 text-left"
                >
                  <span className="absolute -bottom-0.5 left-0 z-10 max-w-[min(100%,14rem)] rounded-t-md bg-[#573FD1] px-4 py-2 text-xs font-bold uppercase tracking-wide text-white shadow-sm">
                    Insurance Details
                  </span>
                  <div className="flex min-h-[2.25rem] items-center justify-end pr-1">
                    {isInsuranceDetailsOpen ? (
                      <ChevronUp className="h-4 w-4 shrink-0 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-4 w-4 shrink-0 text-gray-500" />
                    )}
                  </div>
                </button>
                {isInsuranceDetailsOpen && (
                  <div className="space-y-1.5 pt-3 text-sm text-gray-600">
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

            <button
              type="button"
              onClick={handleFlagPatient}
              className={`relative z-10 mt-4 flex shrink-0 cursor-pointer items-center gap-2 text-sm font-medium transition ${
                isFlagged
                  ? "text-red-600 hover:text-red-700"
                  : "text-orange-500 hover:text-orange-600"
              }`}
            >
              <FaFlag className="text-base" />
              {isFlagged ? "View Flag Report" : "Flag Patient"}
            </button>
            <button
              type="button"
              onClick={handlePreviousPatientRecords}
              className="relative z-10 mt-2 flex shrink-0 cursor-pointer items-center gap-2 text-left text-sm font-medium text-[#573FD1] transition hover:text-[#4a35b8]"
            >
              <FaHistory className="text-base" />
              Previous Patient Records
            </button>
          </div>
        </div>

        {!isDetailsOpen && (
          <button
            type="button"
            onClick={() => setIsDetailsOpen(true)}
            className="absolute inset-y-0 left-0 z-20 flex w-10 flex-col items-center border-r border-purple-100 bg-purple-50 pt-4 transition hover:bg-purple-100"
            aria-label="Show patient details"
            title="Show patient details"
          >
            <ChevronRight className="h-5 w-5 shrink-0 text-[#573FD1]" />
          </button>
        )}
      </div>

      <div className="relative flex min-h-[calc(100dvh-5.75rem)] min-w-0 flex-1 flex-col overflow-hidden p-4 lg:p-5 xl:p-6">
        <div className="mb-5 w-full shrink-0 overflow-x-auto">
          <div className="flex flex-nowrap items-center justify-center gap-2 px-1">
            {tabLabels.map((label, index) => {
              const stepNumber = index + 1;
              const isActive = step === stepNumber;
              return (
                <div
                  key={stepNumber}
                  className="flex shrink-0 items-center gap-2"
                >
                  <button
                    type="button"
                    onClick={() => goToStep(stepNumber)}
                    className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold transition ${
                      isActive
                        ? "bg-[#573FD1] text-white shadow-sm"
                        : step > stepNumber
                          ? "bg-purple-100 text-[#573FD1]"
                          : "border border-gray-300 bg-white text-gray-500"
                    }`}
                  >
                    {label}
                  </button>
                  {stepNumber < 3 && (
                    <div
                      className={`h-0.5 w-10 shrink-0 ${
                        step > stepNumber ? "bg-[#573FD1]" : "bg-gray-300"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <hr className="mb-3 shrink-0 border-gray-200" />

        <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
          {step === 1 && (
            <>
              <h2 className="text-sm text-gray-400">Step 1</h2>
              <h3 className="mb-2 font-semibold text-gray-700">Select category</h3>
              <div className={`relative mb-4 grid shrink-0 gap-2 ${categoryGridClass}`}>
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
                        item.label === "Specialist Consult" ? "dental" : null,
                      );
                    }}
                  />
                ))}
              </div>

              <h2 className="mt-4 text-sm text-gray-400">Step 2</h2>
              <h3 className="mb-2 font-semibold text-gray-700">
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
                <div className="relative min-w-0 rounded-lg border border-gray-300 p-4">
                  {!selectedHealthCategory ? (
                    <div className="flex flex-col items-center justify-center px-4 py-16 text-center text-sm text-gray-400">
                      <p className="text-black">Text Field Goes Here</p>
                      <p className="text-gray-400">
                        Becomes Active when a category is clicked
                      </p>
                    </div>
                  ) : isComingSoonCategory ? (
                    <ComingSoonPage title={selectedHealthCategory} />
                  ) : (
                    <CategoryFormAccordion
                      sections={activeFormSections}
                      expandedCategories={expandedCategories}
                      onToggle={toggleCategory}
                      healthCategory={selectedHealthCategory}
                    />
                  )}
                </div>
              )}

              {isSpecialistConsult && (
                <>
                  <h2 className="mt-4 text-sm text-gray-400">Step 3</h2>
                  <h3 className="mb-2 font-semibold text-gray-700">
                    Fill Category Form
                  </h3>
                  <div className="relative min-w-0 rounded-lg border border-gray-300 p-4">
                    {!selectedHealthCategory ? (
                      <div className="flex flex-col items-center justify-center px-4 py-16 text-center text-sm text-gray-400">
                        <p className="text-black">Text Field Goes Here</p>
                        <p className="text-gray-400">
                          Becomes Active when a category is clicked
                        </p>
                      </div>
                    ) : (
                      <CategoryFormAccordion
                        sections={activeFormSections}
                        expandedCategories={expandedCategories}
                        onToggle={toggleCategory}
                        healthCategory={selectedHealthCategory}
                      />
                    )}
                  </div>
                </>
              )}
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="mb-2 text-sm text-gray-400">Step 1</h2>
              <h3 className="mb-2 font-semibold text-gray-700">Select category</h3>
              <div className={`relative mb-4 grid shrink-0 gap-2 ${financeGridClass}`}>
                {financeCategories.map((item, index) => (
                  <SelectCategoryCard
                    key={index}
                    icon={item.icon}
                    label={item.label}
                    selected={selectedFinancialCategory === item.label}
                    onClick={() => setSelectedFinancialCategory(item.label)}
                  />
                ))}
              </div>
              <h2 className="mt-2 text-sm text-gray-400">Step 2</h2>
              <h3 className="mb-2 font-semibold text-gray-700">Fill Category Form</h3>
              <div className="relative min-w-0 rounded-lg border border-gray-300 p-4">
                {!selectedFinancialCategory ? (
                  <div className="flex flex-col items-center justify-center px-4 py-16 text-center text-sm text-gray-400">
                    <p className="text-black">Text Field Goes Here</p>
                    <p className="text-gray-400">
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
              <h2 className="mb-2 text-sm text-gray-400">Step 1</h2>
              <h3 className="mb-2 font-semibold text-gray-700">Select category</h3>
              <div className={`relative mb-4 grid shrink-0 gap-2 ${categoryGridClass}`}>
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

              <h2 className="mt-4 text-sm text-gray-400">Step 2</h2>
              <h3 className="mb-2 font-semibold text-gray-700">
                {selectedDocumentsCategory === "Upload Files"
                  ? "Upload Documents"
                  : selectedDocumentsCategory === "Uploaded Files"
                    ? "View Uploaded Files"
                    : "Fill Category Form"}
              </h3>
              <div className="relative min-w-0 rounded-lg border border-gray-300 p-4">
                {!selectedDocumentsCategory ? (
                  <div className="flex flex-col items-center justify-center px-4 py-16 text-center text-sm text-gray-400">
                    <p className="text-black">Text Field Goes Here</p>
                    <p className="text-gray-400">
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

        <div className="mt-4 flex shrink-0 items-center justify-between border-t border-gray-100 pt-4">
          {showPreviewSubmit ? (
            <>
              <button
                type="button"
                className="rounded-lg border border-gray-300 bg-white px-8 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                onClick={handlePreview}
              >
                Preview
              </button>
              <button
                type="button"
                disabled={isCurrentFormSubmitted}
                className={`rounded-lg px-8 py-2.5 text-sm font-semibold text-white shadow-sm ${
                  isCurrentFormSubmitted
                    ? "cursor-not-allowed bg-gray-300"
                    : "bg-[#573FD1] hover:bg-[#4a35b0]"
                }`}
                onClick={handleSubmit}
              >
                Submit
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="rounded-lg border border-gray-300 bg-gray-100 px-8 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60"
                onClick={() => goToStep(step - 1)}
                disabled={step === 1}
              >
                Back
              </button>
              <button
                type="button"
                className="rounded-lg bg-[#573FD1] px-10 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#4a35b0]"
                onClick={() => (step < 3 ? goToStep(step + 1) : handleSubmit())}
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
      <ToastContainer position="bottom-center" autoClose={2500} />
    </div>
  );
};

export default DoctorPatientProfile;
