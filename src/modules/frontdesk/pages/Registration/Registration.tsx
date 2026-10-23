import { ChangeEvent, useState } from "react";
import { useLocation } from "react-router-dom";
import ActiveFormBar from "./components/ActiveFormBar";
import FormHeader from "./components/FormHeader";
import PatientInfoRegistration from "./PatientInfoRegistration";
import PatientInsuranceReg from "./PatientInsuranceReg";
import PatientEmergencyReg from "./PatientEmergencyReg";
import PatientRegSuccess from "./PatientRegSuccess";

export type PatientData = {
  firstName?: string;
  surname?: string;
  middleName?: string;
  gender?: string;
  email?: string;
  phone?: string;
  maritalStatus?: string;
  dob?: string;
  stateOfOrigin?: string;
  age?: string;
  religion?: string;
  occupation?: string;
  address?: string;
  picture?: File | null;
  patientType?: string;
  insuranceProvider?: string;
  insuranceProviderCode?: string;
  patientId?: string;
  insurancePolicyNumber?: string;
  employerName?: string;
  treatmentGuide?: string;
  planType?: string;
  eligibility?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelationship?: string;
};

const EMPTY_FORM: PatientData = {
  firstName: "",
  surname: "",
  middleName: "",
  gender: "",
  email: "",
  phone: "",
  maritalStatus: "",
  dob: "",
  stateOfOrigin: "",
  age: "",
  religion: "",
  occupation: "",
  address: "",
  picture: null,
  patientType: "",
  insuranceProvider: "",
  insuranceProviderCode: "",
  patientId: "",
  insurancePolicyNumber: "",
  employerName: "",
  treatmentGuide: "",
  planType: "",
  eligibility: "",
  emergencyContactName: "",
  emergencyContactPhone: "",
  emergencyContactRelationship: "",
};

type RouteState = {
  mode?: "edit";
  initialData?: Partial<PatientData>;
} | null;

export default function Registration() {
  const location = useLocation();
  const routeState = (location.state as RouteState) ?? null;
  const isEditMode = routeState?.mode === "edit";

  const [formData, setFormData] = useState<PatientData>({
    ...EMPTY_FORM,
    ...(routeState?.initialData ?? {}),
  });

  const [step, setStep] = useState(1);

  function calculateAge(dob: string): {
    years: number;
    months: number;
    days: number;
  } {
    if (!dob) return { years: 0, months: 0, days: 0 };

    const birthDate = new Date(dob);
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    return { years, months, days };
  }

  // Handle text/select input change
  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;

    if (name === "dob") {
      const { years, months, days } = calculateAge(value);
      const formattedAge = `${years} years, ${months} months, ${days} days`;

      setFormData((prev) => ({
        ...prev,
        dob: value,
        age: formattedAge,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  }

  // Handle phone input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, picture: file }));
  };

  const handlePhoneChange = (value: string) => {
    setFormData({ ...formData, phone: value });
  };

  // Simple validation per step
  const validateStep = () => {
    if (step === 1) {
      return (
        formData.firstName &&
        formData.surname &&
        formData.gender &&
        formData.phone &&
        formData.address
      );
    }
    if (step === 2) {
      if (formData.patientType === "PRIVATE") return true;
      return (
        formData.insuranceProvider &&
        formData.insurancePolicyNumber &&
        formData.planType
      );
    }
    if (step === 3) {
      return (
        formData.emergencyContactName &&
        formData.emergencyContactPhone &&
        formData.emergencyContactRelationship
      );
    }
    return false;
  };

  // Handle submit
  const handleSubmit = async () => {
    console.log("Form Submitted:", formData);
    setStep(4); // success page
  };

  // Handle next button with validation
  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
    } else {
      alert("Please fill all required fields before continuing.");
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-10">
      <div className="mb-6 space-y-6">
        <FormHeader
          title={isEditMode ? "Edit Patient Profile" : "Create a Profile"}
          subtitle={
            isEditMode
              ? "Update the patient's information below"
              : "Fill the form to create a patient's profile"
          }
        />
        <ActiveFormBar currentStep={step} />
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
        {step === 1 && (
          <PatientInfoRegistration
            formData={formData}
            handleChange={handleChange}
            handleFileChange={handleFileChange}
            handlePhoneChange={handlePhoneChange}
          />
        )}

        {step === 2 && (
          <PatientInsuranceReg
            formData={formData}
            handleChange={handleChange}
          />
        )}

        {step === 3 && (
          <PatientEmergencyReg
            formData={formData}
            handleChange={handleChange}
            handlePhoneChange={handlePhoneChange}
          />
        )}

        {step === 4 && <PatientRegSuccess />}

        {step < 4 && (
          <div className="flex items-center justify-between pt-2">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="rounded-lg border border-[#A5A5A5] px-6 py-2 cursor-pointer hover:bg-gray-50"
              >
                Back
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="rounded-lg border bg-primary px-6 py-2 text-white cursor-pointer hover:bg-primary/90"
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="rounded-lg border bg-primary px-6 py-2 text-white cursor-pointer hover:bg-primary/90"
              >
                {isEditMode ? "Update Patient" : "Submit"}
              </button>
            )}
          </div>
        )}
      </form>
    </div>
  );
}
