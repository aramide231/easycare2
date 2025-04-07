import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa";

const PatientForm = ({ patientData }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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

  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: any) => {
    setFormData({ ...formData, picture: e.target.files[0] });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg">
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="flex items-center gap-2">
          <div
            className={`px-4 py-2 rounded-lg font-semibold ${
              step >= 1
                ? "bg-purple-600 text-white"
                : "text-gray-400 border border-gray-300"
            }`}
          >
            1. Patient Info
          </div>
          <div
            className={`h-[2px] w-12 ${
              step >= 2 ? "bg-purple-600" : "bg-gray-300"
            }`}
          ></div>
        </div>
        <div
          className={`px-4 py-2 rounded-lg font-semibold ${
            step >= 2
              ? "bg-purple-600 text-white"
              : "text-gray-400 border border-gray-300"
          }`}
        >
          2. Insurance Info
        </div>
        <div
          className={`h-[2px] w-12 ${
            step >= 3 ? "bg-purple-600" : "bg-gray-300"
          }`}
        ></div>
        <div
          className={`px-4 py-2 rounded-lg font-semibold ${
            step >= 3
              ? "bg-purple-600 text-white"
              : "text-gray-400 border border-gray-300"
          }`}
        >
          3. Emergency Info
        </div>
      </div>
      {!isSubmitted ? (
        <>
          {step === 1 && (
            <>
              <h2 className="text-sm text-gray-400 mb-2">Step 1</h2>
              <p className="font-bold mb-4">Patient Information</p>
              <hr className="py-2" />

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-gray-700 font-medium">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Eg: John"
                    className="w-full border p-2 rounded-lg mt-1"
                  />
                </div>
                <div>
                  <label className="text-gray-700 font-medium">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Eg: Doe"
                    className="w-full border p-2 rounded-lg mt-1"
                  />
                </div>
                <div>
                  <label className="text-gray-700 font-medium">
                    Middle Name
                  </label>
                  <input
                    type="text"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                    placeholder="Eg: Thuranus"
                    className="w-full border p-2 rounded-lg mt-1"
                  />
                </div>
                <div>
                  <label className="text-gray-700 font-medium">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+234 | 8012345678"
                    className="w-full border p-2 rounded-lg mt-1"
                  />
                </div>
                <div>
                  <label className="text-gray-700 font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Eg: Johnddoe@gmail.com"
                    className="w-full border p-2 rounded-lg mt-1"
                  />
                </div>
                <div>
                  <label className="text-gray-700 font-medium">
                    Marital Status
                  </label>
                  <select
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={handleChange}
                    className="w-full border p-2 rounded-lg mt-1"
                  >
                    <option value="">Select a type</option>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                  </select>
                </div>
                <div>
                  <label className="text-gray-700 font-medium">
                    Date Of Birth
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full border p-2 rounded-lg mt-1"
                  />
                </div>
                <div>
                  <label className="text-gray-700 font-medium">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="49"
                    className="w-full border p-2 rounded-lg mt-1"
                  />
                </div>
                <div>
                  <label className="text-gray-700 font-medium">Religion</label>
                  <select
                    name="religion"
                    value={formData.religion}
                    onChange={handleChange}
                    className="w-full border p-2 rounded-lg mt-1"
                  >
                    <option value="">Select a type</option>
                    <option value="christianity">Christianity</option>
                    <option value="islam">Islam</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-gray-700 font-medium">
                    Upload a Picture
                  </label>
                  <div className="border p-2 rounded-lg mt-1 flex items-center gap-2">
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
                      <FaCloudUploadAlt className="text-gray-500" /> Not more
                      than 3 MB
                    </label>
                  </div>
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-sm text-gray-400 mb-2">Step 2</h2>
              <p className="font-bold mb-4">Patient Insurance Information</p>
              <hr className="py-2" />

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-gray-700 font-medium">
                    Patient Type
                  </label>
                  <select
                    name="patientType"
                    value={formData.patientType}
                    onChange={handleChange}
                    className="w-full border p-2 rounded-lg mt-1"
                  >
                    <option className="text-gray-700 font-medium" value="">
                      Select a Type
                    </option>
                    <option value="inpatient">Inpatient</option>
                    <option value="outpatient">Outpatient</option>
                    <option value="emergency">Emergency</option>
                  </select>
                </div>

                <div>
                  <label className="text-gray-700 font-medium">
                    Insurance Provider Name
                  </label>
                  <select
                    name="Insurance Provider Name"
                    value={formData.patientType}
                    onChange={handleChange}
                    className="w-full border p-2 rounded-lg mt-1"
                  >
                    <option value="">Select an organization</option>
                    <option value="inpatient">Inpatient</option>
                    <option value="outpatient">Outpatient</option>
                    <option value="emergency">Emergency</option>
                  </select>
                </div>

                <div>
                  <label className="text-gray-700 font-medium">
                    Insurance Group Number
                  </label>
                  <select
                    name="Insurance Group Number"
                    value={formData.patientType}
                    onChange={handleChange}
                    className="w-full border p-2 rounded-lg mt-1"
                  >
                    <option value="">Select one</option>
                    <option value="inpatient">Inpatient</option>
                    <option value="outpatient">Outpatient</option>
                    <option value="emergency">Emergency</option>
                  </select>
                </div>
                <div>
                  <label className="text-gray-700 font-medium">
                    Patient Id
                  </label>
                  <input
                    type="text"
                    name="patientId"
                    value={formData.patientId}
                    onChange={handleChange}
                    placeholder="Eg: 012345"
                    className="w-full border p-2 rounded-lg mt-1"
                  />
                </div>
                <div>
                  <label className="text-gray-700 font-medium">
                    Insurance Policy Number
                  </label>
                  <input
                    name="insurance policy number"
                    value={formData.insurancePolicyNumber}
                    onChange={handleChange}
                    placeholder="Eg: dkk37483"
                    className="w-full border p-2 rounded-lg mt-1"
                  />
                </div>
                <div>
                  <label className="text-gray-700 font-medium">
                    Patient's Employer Name
                  </label>
                  <input
                    name="employerName"
                    value={formData.employerName}
                    onChange={handleChange}
                    placeholder="Eg: Company XYZ"
                    className="w-full border p-2 rounded-lg mt-1"
                  />
                </div>
                <div>
                  <label className="text-gray-700 font-medium">
                    Treatment Guide
                  </label>
                  <select
                    name="treatmentGuide"
                    value={formData.treatmentGuide}
                    onChange={handleChange}
                    className="w-full border p-2 rounded-lg mt-1"
                  >
                    <option value="">Select one</option>
                    <option value="inpatient">Inpatient</option>
                    <option value="outpatient">Outpatient</option>
                    <option value="emergency">Emergency</option>
                  </select>
                </div>
                <div>
                  <label className="text-gray-700 font-medium">
                    Patients Plan Type
                  </label>
                  <input
                    name="planType"
                    value={formData.planType}
                    onChange={handleChange}
                    placeholder="Eg: HMO, PPO"
                    className="w-full border p-2 rounded-lg mt-1"
                  />
                </div>
                <div>
                  <label className="text-gray-700 font-medium">
                    Eligibility
                  </label>
                  <select
                    name="eligibility"
                    value={formData.eligibility}
                    onChange={handleChange}
                    className="w-full border p-2 rounded-lg mt-1"
                  >
                    <option value="">Select one</option>
                    <option value="inpatient">YES</option>
                    <option value="outpatient">NO</option>
                    <option value="emergency">not yet</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-sm text-gray-400 mb-2">Step 3</h2>
              <p className="font-bold mb-4">Emergency Information</p>
              <hr className="py-2" />

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-gray-700 font-medium">Full Name</label>
                  <input
                    type="text"
                    name="emergencyContactName"
                    value={formData.emergencyContactName}
                    onChange={handleChange}
                    placeholder="Eg: Jude Okoya"
                    className="w-full col-span-2 border p-2 rounded-lg mt-1"
                  />
                </div>
                <div>
                  <label className="text-gray-700 font-medium">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="emergencyContactPhone"
                    value={formData.emergencyContactPhone}
                    onChange={handleChange}
                    placeholder="+234 | 8123456789"
                    className="w-full border p-2 rounded-lg mt-1"
                  />
                </div>
                <div>
                  <label className="text-gray-700 font-medium">
                    Relationship to Patient
                  </label>
                  <input
                    type="text"
                    name="emergencyContactRelationship"
                    value={formData.emergencyContactRelationship}
                    onChange={handleChange}
                    placeholder="Eg: Father, Sister"
                    className="w-full border p-2 rounded-lg mt-1"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-6">
            <button
              className="bg-gray-300 text-gray-600 px-6 py-2 rounded-lg"
              onClick={() => setStep(step - 1)}
              disabled={step === 1}
            >
              Back
            </button>
            {step < 3 ? (
              <button
                className="bg-purple-600 text-white px-6 py-2 rounded-lg"
                onClick={() => setStep(step + 1)}
              >
                Next
              </button>
            ) : (
              <button
                className="bg-purple-600 text-white px-6 py-2 rounded-lg"
                onClick={handleSubmit}
              >
                Update Profile
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="text-center mt-20">
          <h1 className="text-xl font-bold  mb-4">
            Patient Profile Created Updated
          </h1>
          <p className="text-gray-600 mb-8">
            You can now access your dashboard and manage your patient care.
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-purple-600 text-white px-20 py-3 rounded-lg"
          >
            Go to Dashboard
          </button>
        </div>
      )}
    </div>
  );
};

export default PatientForm;
