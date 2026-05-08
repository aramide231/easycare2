import { useState, ChangeEvent, FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa";
// useAuth not required in this component

type PatientData = {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  email?: string;
  phone?: string;
  maritalStatus?: string;
  dob?: string;
  age?: string;
  religion?: string;
  picture?: File | null;
  patientType?: string;
  insuranceProvider?: string;
  insuranceGroupNumber?: string;
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

type PatientFormProps = {
  patientData?: PatientData;
};

const PatientForm: React.FC<PatientFormProps> = ({ patientData }) => {
  // creationOfPatient is not used in this component
  const navigate = useNavigate();
  const location = useLocation();
  const isEditMode = location.pathname.includes("/edit");

  const [formData, setFormData] = useState<PatientData>({
    firstName: patientData?.firstName || "",
    lastName: patientData?.lastName || "",
    middleName: patientData?.middleName || "",
    email: patientData?.email || "",
    phone: patientData?.phone || "",
    maritalStatus: patientData?.maritalStatus || "",
    dob: patientData?.dob || "",
    age: patientData?.age || "",
    religion: patientData?.religion || "",
    picture: patientData?.picture || null,
    patientType: patientData?.patientType || "",
    insuranceProvider: patientData?.insuranceProvider || "",
    insuranceGroupNumber: patientData?.insuranceGroupNumber || "",
    patientId: patientData?.patientId || "",
    insurancePolicyNumber: patientData?.insurancePolicyNumber || "",
    employerName: patientData?.employerName || "",
    treatmentGuide: patientData?.treatmentGuide || "",
    planType: patientData?.planType || "",
    eligibility: patientData?.eligibility || "",
    emergencyContactName: patientData?.emergencyContactName || "",
    emergencyContactPhone: patientData?.emergencyContactPhone || "",
    emergencyContactRelationship:
      patientData?.emergencyContactRelationship || "",
  });

  const [step, setStep] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        picture: e.target.files![0],
      }));
    }
  };

  const handleSubmit = (
    e: FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    // Get current patients from localStorage
    const storedPatients = JSON.parse(localStorage.getItem("patients") || "[]");

    // // Append new patient
    const updatedPatients = [...storedPatients, formData];

    // // Save back to localStorage
    localStorage.setItem("patients", JSON.stringify(updatedPatients));


    setIsSubmitted(true)

  };

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-lg">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          {isEditMode ? "Edit a Profile" : "Create a Profile"}
        </h1>
        <p className="text-gray-500 mt-2">
          {isEditMode
            ? "Update the information below to edit the patient's profile"
            : "Fill the form to create a patient's profile"}
        </p>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-center gap-3 mb-8">
        {["Patient Info", "Insurance Info", "Emergency Info"].map(
          (label, index) => {
            const stepNumber = index + 1;
            return (
              <div key={stepNumber} className="flex items-center gap-2">
                <div
                  className={`px-4 py-2 rounded-lg font-semibold ${step >= stepNumber
                      ? "bg-purple-600 text-white"
                      : "text-gray-400 border border-gray-300"
                    }`}
                >
                  {stepNumber}. {label}
                </div>
                {stepNumber < 3 && (
                  <div
                    className={`h-[2px] w-12 ${step > stepNumber ? "bg-purple-600" : "bg-gray-300"
                      }`}
                  />
                )}
              </div>
            );
          }
        )}
      </div>
      {!isSubmitted ? (
        <>
          {step === 1 && (
            <>
              <h2 className="text-sm text-gray-400 mb-2">Step 1</h2>
              <p className="text-lg font-semibold text-gray-800 mb-4">
                Patient Information
              </p>
              <hr className="mb-6" />

              <div className="grid grid-cols-2 gap-6">
                {[
                  {
                    label: "First Name",
                    name: "firstName",
                    placeholder: "Eg: John",
                  },
                  {
                    label: "Last Name",
                    name: "lastName",
                    placeholder: "Eg: Doe",
                  },
                  {
                    label: "Middle Name",
                    name: "middleName",
                    placeholder: "Eg: Thuranus",
                  },
                  {
                    label: "Phone Number",
                    name: "phone",
                    placeholder: "+234 | 8012345678",
                  },
                  {
                    label: "Email",
                    name: "email",
                    placeholder: "Eg: Johndoe@gmail.com",
                    type: "email",
                  },
                  {
                    label: "Marital Status",
                    name: "maritalStatus",
                    type: "select",
                    options: ["Single", "Married"],
                  },
                  { label: "Date Of Birth", name: "dob", type: "date" },
                  {
                    label: "Age",
                    name: "age",
                    placeholder: "49",
                    type: "number",
                  },
                  {
                    label: "Religion",
                    name: "religion",
                    type: "select",
                    options: ["Christianity", "Islam", "Other"],
                  },
                ].map((field, idx) => (
                  <div key={idx}>
                    <label className="text-gray-700 font-medium">
                      {field.label}
                    </label>
                    {field.type === "select" ? (
                      <select
                        name={field.name}
                        value={
  typeof formData[field.name as keyof PatientData] === "string" ||
  typeof formData[field.name as keyof PatientData] === "number"
    ? (formData[field.name as keyof PatientData] as string | number)
    : ""
}

                        onChange={handleChange}
                        className="w-full border p-2 rounded-lg mt-1"
                      >
                        <option value="">Select a type</option>
                        {field.options?.map((opt) => (
                          <option key={opt} value={opt.toLowerCase()}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type || "text"}
                        name={field.name}
                        value={
  typeof formData[field.name as keyof PatientData] === "string" ||
  typeof formData[field.name as keyof PatientData] === "number"
    ? (formData[field.name as keyof PatientData] as string | number)
    : ""
}

                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className="w-full border p-2 rounded-lg mt-1"
                      />
                    )}
                  </div>
                ))}
                <div>
                  <label className="text-gray-700 font-medium">
                    Upload a Picture
                  </label>
                  <div className="border p-3 rounded-lg mt-1 flex items-center gap-3 bg-gray-50">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="flex items-center gap-2 cursor-pointer text-gray-500"
                    >
                      <FaCloudUploadAlt className="text-gray-500" />
                      <span>Click to upload (Max 3MB)</span>
                    </label>
                  </div>
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-sm text-gray-400 mb-2">Step 2</h2>
              <p className="text-lg font-semibold text-gray-800 mb-4">
                Patient Insurance Information
              </p>
              <hr className="mb-6" />

              <div className="grid grid-cols-2 gap-6">
                {[
                  {
                    label: "Patient Type",
                    name: "patientType",
                    type: "select",
                    options: ["Inpatient", "Outpatient", "Emergency"],
                  },
                  {
                    label: "Insurance Provider Name",
                    name: "insuranceProvider",
                    type: "select",
                    options: ["HMO Plus", "Zenith Care", "FirstMed"],
                  },
                  {
                    label: "Insurance Group Number",
                    name: "insuranceGroupNumber",
                    type: "select",
                    options: ["A1", "B2", "C3"],
                  },
                  {
                    label: "Patient Id",
                    name: "patientId",
                    placeholder: "Eg: 012345",
                  },
                  {
                    label: "Insurance Policy Number",
                    name: "insurancePolicyNumber",
                    placeholder: "Eg: dkk37483",
                  },
                  {
                    label: "Patient's Employer Name",
                    name: "employerName",
                    placeholder: "Eg: Company XYZ",
                  },
                  {
                    label: "Treatment Guide",
                    name: "treatmentGuide",
                    type: "select",
                    options: ["Inpatient", "Outpatient", "Emergency"],
                  },
                  {
                    label: "Patient's Plan Type",
                    name: "planType",
                    placeholder: "Eg: HMO, PPO",
                  },
                  {
                    label: "Eligibility",
                    name: "eligibility",
                    type: "select",
                    options: ["Yes", "No", "Not Yet"],
                  },
                ].map((field, idx) => (
                  <div key={idx}>
                    <label className="text-gray-700 font-medium">
                      {field.label}
                    </label>
                    {field.type === "select" ? (
                      <select
                        name={field.name}
                        value={
                          typeof formData[field.name as keyof PatientData] === "string" ||
                            typeof formData[field.name as keyof PatientData] === "number"
                            ? (formData[field.name as keyof PatientData] as string | number)
                            : ""
                        }

                        onChange={handleChange}
                        className="w-full border p-2 rounded-lg mt-1"
                      >
                        <option value="">Select one</option>
                        {field.options?.map((opt) => (
                          <option key={opt} value={opt.toLowerCase()}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        name={field.name}
                        value={
  typeof formData[field.name as keyof PatientData] === "string" ||
  typeof formData[field.name as keyof PatientData] === "number"
    ? (formData[field.name as keyof PatientData] as string | number)
    : ""
}

                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className="w-full border p-2 rounded-lg mt-1"
                      />
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-sm text-gray-400 mb-2">Step 3</h2>
              <p className="text-lg font-semibold text-gray-800 mb-4">
                Emergency Information
              </p>
              <hr className="mb-6" />

              <div className="grid grid-cols-2 gap-6">
                {[
                  {
                    label: "Full Name",
                    name: "emergencyContactName",
                    placeholder: "Eg: Jude Okoya",
                  },
                  {
                    label: "Phone Number",
                    name: "emergencyContactPhone",
                    placeholder: "+234 | 8123456789",
                  },
                  {
                    label: "Relationship to Patient",
                    name: "emergencyContactRelationship",
                    placeholder: "Eg: Father, Sister",
                  },
                ].map((field, idx) => (
                  <div key={idx}>
                    <label className="text-gray-700 font-medium">
                      {field.label}
                    </label>
                    <input
                      type="text"
                      name={field.name}
                      value={
  typeof formData[field.name as keyof PatientData] === "string" ||
  typeof formData[field.name as keyof PatientData] === "number"
    ? (formData[field.name as keyof PatientData] as string | number)
    : ""
}

                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className="w-full border p-2 rounded-lg mt-1"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg disabled:opacity-50"
              onClick={() => setStep(step - 1)}
              disabled={step === 1}
            >
              Back
            </button>
            {step < 3 ? (
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
                onClick={() => setStep(step + 1)}
              >
                Next
              </button>
            ) : (
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
                onClick={handleSubmit}
              >
                {isEditMode ? "Update Profile" : "Create Profile"}
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="text-center mt-20">
          <h1 className="text-xl font-bold mb-4">Patient Profile Updated</h1>
          <p className="text-gray-600 mb-8">
            You can now access your dashboard and manage your patient care.
          </p>
          <button
            onClick={() => navigate("/frontdesk/dashboard")}
            className="bg-purple-600 text-white px-10 py-3 rounded-lg"
          >
            Go to Dashboard
          </button>
        </div>
      )}
    </div>
  );
};

export default PatientForm;
