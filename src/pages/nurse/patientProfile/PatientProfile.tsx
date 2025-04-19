import { useState } from "react";
import { useParams, useLocation } from "react-router-dom";

const PatientProfile = () => {
  const { id } = useParams();
  const location = useLocation();
  const patient = location.state?.patient;

  const [step, setStep] = useState<number>(1);

  if (!patient) {
    return <p className="text-red-500">Patient data not found.</p>;
  }

  return (
    <div className="flex w-full gap-6 p-6 border rounded-xl shadow-md bg-white">
      {/* Left Side */}
      <div className="flex-1  pr-6 border-r">
        {/* Patient Image & Name */}
        <div className="flex items-center gap-3 mb-6 border p-3 rounded-lg">
          <img
            src=""
            alt="Patient"
            className="w-14 h-14 rounded-full object-cover bg-gray-200"
          />
          <div>
            <h2 className="text-lg font-semibold">
              {patient.firstName} {patient.lastName}
            </h2>
            <p className="text-gray-500 text-sm">ID: {patient.patientId}</p>
          </div>
        </div>

        {/* Personal Details */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-700 mb-2">PERSONAL DETAILS</h3>
          <div className="space-y-1 text-gray-600 text-sm">
            <p>Last Name: {patient.lastName}</p>
            <p>First Name: {patient.firstName}</p>
            <p>Middle Name: OluwaPac</p>
            <p>Phone No: {patient.phoneNumber}</p>
            <p>Email: {patient.email || "Not available"}</p>
            <p>Gender: {patient.gender}</p>
            <p>Age: {patient.age}</p>
            <p>Marital Status: Married</p>
            <p>Address: 2, Omega lane, Lekki, Lagos.</p>
          </div>
        </div>

        <hr className="my-3" />

        {/* Insurance Details */}
        <div className="max-h-64 overflow-auto">
          <h3 className="font-semibold text-gray-700 mb-2">
            INSURANCE DETAILS
          </h3>
          <div className="space-y-1 text-gray-600 text-sm">
            <p>Insurance Type: HMO</p>
            <p>Insurance Group No: LDW/200</p>
            <p>Employer Name: 7up Bottling Company</p>
            <p>Eligibility: Active</p>
            <p>Insurance Provider Name: Leadway HMO</p>
            <p>Treatment Guide: Fee for service</p>
            <p>Policy No: bd2345</p>
            <p>Patient Type: Gen. consult</p>
            <p>Address: 2, Omega lane, Lekki, Lagos.</p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-[2]">
        {/* Stepper */}
        <div className="flex items-center justify-center gap-3 mb-8">
          {[
            "Health Information",
            "Financial Information",
            "Attach Documents",
          ].map((label, index) => {
            const stepNumber = index + 1;
            return (
              <div key={stepNumber} className="flex items-center gap-2">
                <div
                  className={`px-4 py-2 rounded-lg font-semibold ${
                    step >= stepNumber
                      ? "bg-purple-600 text-white"
                      : "text-gray-400 border border-gray-300"
                  }`}
                >
                  {label}
                </div>
                {stepNumber < 3 && (
                  <div
                    className={`h-[2px] w-12 ${
                      step > stepNumber ? "bg-purple-600" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        <hr className="my-3" />

        {/* Step Content */}
        <div className="mt-6">
          {step === 1 && (
            <h2 className="text-sm text-gray-400 mb-2">
              Step 1 - Health Information
            </h2>
          )}
          {step === 2 && (
            <h2 className="text-sm text-gray-400 mb-2">
              Step 2 - Financial Information
            </h2>
          )}
          {step === 3 && (
            <h2 className="text-sm text-gray-400 mb-2">
              Step 3 - Attach Documents
            </h2>
          )}
        </div>

        {/* Step Navigation */}
        <div className="flex justify-between mt-8">
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg disabled:opacity-50"
            onClick={() => setStep(step - 1)}
            disabled={step === 1}
          >
            Back
          </button>
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
            onClick={() =>
              step < 3 ? setStep(step + 1) : alert("Submit logic here")
            }
          >
            {step < 3 ? "Next" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
