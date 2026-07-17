import { ChangeEvent, useState } from "react";
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

export default function Registration() {
  const [formData, setFormData] = useState<PatientData>({
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
    <div className="pt-15 space-y-10 lg:flex flex-col items-center">
      <FormHeader />
      <ActiveFormBar currentStep={step} />

      <form onSubmit={(e) => e.preventDefault()}>
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
      </form>

      {step < 4 && (
        <div className="flex justify-between gap-[480px]">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="py-1 px-4 border rounded-lg border-[#A5A5A5] cursor-pointer"
            >
              Back
            </button>
          ) : (
            <div></div>
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="py-1 px-4 border rounded-lg bg-primary text-white cursor-pointer hover:bg-primary/90"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="py-1 px-4 border rounded-lg bg-primary text-white cursor-pointer hover:bg-primary/90"
            >
              Submit
            </button>
          )}
        </div>
      )}
    </div>
  );
}
