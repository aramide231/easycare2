import { useState } from "react";
import {
  FaBaby,
  FaBookReader,
  FaFlag,
  FaHandScissors,
  FaLocationArrow,
  FaMoneyBill,
  FaPeopleCarry,
  FaPiggyBank,
  FaRecordVinyl,
  FaRecycle,
  FaSmile,
  FaSnowman,
  FaSeedling,
  FaUserFriends,
} from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clientimage from "@/assets/image/haywhy.jpg";
import SelectCategoryCard from "./components/SelectCategoryCard";
import CategoryFormAccordion from "./components/CategoryFormAccordion";
import ComingSoonPage from "@/components/ui/ComingSoonPage";
import UploadedDocumentsSection from "@/components/patient/UploadedDocumentsSection";
import { getSubCategories } from "@/pages/doctor/patientProfile/config/subCategoryMap";
import ConsultationTypeSelector from "@/pages/doctor/patientProfile/components/categories/specialistConsult/ConsultationTypeSelector";
import ClaimsProcessor from "@/pages/doctor/patientProfile/components/financial/ClaimsProcessor";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NursePatientProfile = () => {
  // const { id } = useParams();
  const location = useLocation();
  const patient = location.state?.patient;

  const [step, setStep] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(
    null
  );
  const [consultationType, setConsultationType] = useState("Dental Consultation");
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);

  const activeFormSections = getSubCategories(selectedCategory);
  const isComingSoonCategory =
    selectedCategory === "Family Planning" ||
    selectedCategory === "Fertility Clinics";

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
    setExpandedCategory((prev) => (prev === label ? null : label));
  };

  if (!patient) {
    return <p className="text-red-500">Patient data not found.</p>;
  }

  const FinaceCategories = [
    {
      icon: FaPiggyBank,
      label: "Account Review",
    },
    {
      icon: FaMoneyBill,
      label: "Admission Bill",
    },
    {
      icon: FaUserFriends,
      label: "Claims Processor",
    },
    {
      icon: FaBookReader,
      label: "Invoice",
    },
    {
      icon: FaRecordVinyl,
      label: "Reciept",
    },
    {
      icon: FaLocationArrow,
      label: "Payment History",
    },
  ];

  const categoryGridClass = isDetailsOpen
    ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
    : "grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10";

  const financeGridClass = isDetailsOpen
    ? "max-w-3xl grid-cols-4"
    : "grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-6";

  return (
    <div className="flex min-h-[calc(100dvh-7rem)] w-full max-w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Left column — collapsible patient info */}
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
            <h3 className="mb-2 text-xs font-bold tracking-wide text-gray-800">
              PERSONAL DETAILS
            </h3>
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
          </div>

          <hr className="border-gray-200" />

          <div>
            <h3 className="mb-2 text-xs font-bold tracking-wide text-gray-800">
              INSURANCE DETAILS
            </h3>
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
          </div>
        </div>

        <button
          type="button"
          className="mt-4 flex shrink-0 items-center gap-2 text-sm font-medium text-orange-500 hover:text-orange-600"
        >
          <FaFlag className="text-base" />
          Flag Patient
        </button>
        </div>
      </div>

      {/* Right column — form area */}
      <div className="relative flex min-w-0 flex-1 flex-col p-4 sm:p-6">
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
                · {patient.patientId}
              </span>
            </span>
          </button>
        )}
        <div className="mb-5 flex shrink-0 items-center justify-center gap-2">
          {[
            "Health Information",
            "Financial Information",
            "Attached Documents",
          ].map((label, index) => {
            const stepNumber = index + 1;
            const isActive = step >= stepNumber;
            return (
              <div key={stepNumber} className="flex items-center gap-2">
                <div
                  className={`rounded-lg px-4 py-2 text-sm font-semibold ${
                    isActive
                      ? "bg-[#573FD1] text-white shadow-sm"
                      : "border border-gray-300 bg-white text-gray-500"
                  }`}
                >
                  {label}
                </div>
                {stepNumber < 3 && (
                  <div
                    className={`h-0.5 w-10 ${
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
        <div className="mt-2 flex flex-1 flex-col">
          {step === 1 && (
            <div className="flex flex-1 flex-col">
              <h2 className="shrink-0 text-xs text-gray-400">Step 1</h2>
              <h3 className="mb-1.5 shrink-0 text-sm font-semibold text-gray-800">
                Select category
              </h3>
              <div className={`mb-4 grid shrink-0 gap-2 ${categoryGridClass}`}>
                {categories.map((item, index) => (
                  <SelectCategoryCard
                    key={index}
                    icon={item.icon}
                    label={item.label}
                    selected={selectedCategory === item.label}
                    onClick={() => {
                      setSelectedCategory(item.label);
                      setExpandedCategory(null);
                    }}
                  />
                ))}
              </div>

              {selectedCategory === "Specialist Consult" ? (
                <ConsultationTypeSelector
                  value={consultationType}
                  onChange={setConsultationType}
                />
              ) : (
                <>
                  <h2 className="shrink-0 text-xs text-gray-400">Step 2</h2>
                  <h3 className="mb-1.5 shrink-0 text-sm font-semibold text-gray-800">
                    Fill Category Form
                  </h3>
                </>
              )}

              <div className="relative flex flex-1 flex-col rounded-lg border border-gray-200 bg-white p-4">
                {!selectedCategory ? (
                  <div className="pointer-events-none flex flex-col items-center justify-center px-4 py-16 text-center text-sm">
                    <p className="font-medium text-gray-900">
                      Text Field Goes Here
                    </p>
                    <p className="mt-1 text-gray-400">
                      Becomes Active when a category is clicked
                    </p>
                  </div>
                ) : isComingSoonCategory ? (
                  <ComingSoonPage title={selectedCategory} />
                ) : activeFormSections.length === 0 ? (
                  <div className="flex flex-1 items-center justify-center p-8 text-center text-sm text-gray-500">
                    Forms for {selectedCategory} will be added soon.
                  </div>
                ) : (
                  <CategoryFormAccordion
                    sections={activeFormSections}
                    expandedCategory={expandedCategory}
                    onToggle={toggleCategory}
                    selectedCategory={selectedCategory}
                  />
                )}
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
              <h2 className="mb-2 shrink-0 text-sm text-gray-400">Step 1</h2>
              <h3 className="text-gray-700 font-semibold mb-2">
                Select category
              </h3>
              <div className={`mb-2 grid shrink-0 gap-2 ${financeGridClass}`}>
                {FinaceCategories.map((item, index) => (
                  <SelectCategoryCard
                    key={index}
                    icon={item.icon}
                    label={item.label}
                    selected={selectedCategory === item.label}
                    onClick={() => {
                      setSelectedCategory(item.label);
                      setExpandedCategory(null);
                    }}
                  />
                ))}
              </div>
              <h2 className="shrink-0 text-xs text-gray-400">Step 2</h2>
              <h3 className="mb-1.5 shrink-0 text-sm font-semibold text-gray-800">
                Fill Category Form
              </h3>
              <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
                {!selectedCategory && (
                  <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-sm">
                    <p className="font-medium text-gray-900">
                      Text Field Goes Here
                    </p>
                    <p className="mt-1 text-gray-400">
                      Becomes Active when a category is clicked
                    </p>
                  </div>
                )}
                {selectedCategory === "Claims Processor" && (
                  <div className="min-h-0 flex-1 overflow-y-auto p-4">
                    <ClaimsProcessor />
                  </div>
                )}
                {selectedCategory &&
                  selectedCategory !== "Claims Processor" && (
                    <div className="min-h-0 flex-1 overflow-y-auto p-4">
                      <ComingSoonPage title={selectedCategory} />
                    </div>
                  )}
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="flex flex-1 flex-col">
              <h2 className="shrink-0 text-xs text-gray-400">Step 1</h2>
              <h3 className="mb-4 shrink-0 text-sm font-semibold text-gray-800">
                Upload File
              </h3>
              <UploadedDocumentsSection
                patientName={`${patient.firstName} ${patient.lastName}`}
                patientId={patient.patientId}
                phoneNumber={patient.phoneNumber}
              />
            </div>
          )}
        </div>

        <div className="mt-4 flex shrink-0 items-center justify-between border-t border-gray-100 pt-4">
          <button
            type="button"
            className="rounded-lg border border-gray-300 bg-gray-100 px-8 py-2.5 text-sm font-medium text-gray-500 disabled:cursor-not-allowed disabled:opacity-60"
            onClick={() => setStep(step - 1)}
            disabled={step === 1}
          >
            Back
          </button>
          <button
            type="button"
            className="rounded-lg bg-[#573FD1] px-10 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#4a35b0]"
            onClick={() =>
              step < 3 ? setStep(step + 1) : alert("Submit logic here")
            }
          >
            {step < 3 ? "Next" : "Submit"}
          </button>
        </div>
      </div>
      <ToastContainer position="bottom-center" autoClose={2500} />
    </div>
  );
};

export default NursePatientProfile;
