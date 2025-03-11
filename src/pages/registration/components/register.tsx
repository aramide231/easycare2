import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

const PatientForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    phone: "",
    maritalStatus: "",
    dob: "",
    age: "",
    religion: "",
    picture: null,
  });

  const [step, setStep] = useState(1);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: any) => {
    setFormData({ ...formData, picture: e.target.files[0] });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg">
      {/* Step Progress */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="flex items-center gap-2">
          <div
            className={`px-4 py-2 rounded-lg font-semibold ${
              step >= 1 ? "bg-purple-600 text-white" : "text-gray-400 border border-gray-300"
            }`}
          >
            1. Patient Info
          </div>
          <div className={`h-[2px] w-12 ${step >= 2 ? "bg-purple-600" : "bg-gray-300"}`}></div>
        </div>
        <div
          className={`px-4 py-2 rounded-lg font-semibold ${
            step >= 2 ? "bg-purple-600 text-white" : "text-gray-400 border border-gray-300"
          }`}
        >
          2. Insurance Info
        </div>
        <div className={`h-[2px] w-12 ${step >= 3 ? "bg-purple-600" : "bg-gray-300"}`}></div>
        <div
          className={`px-4 py-2 rounded-lg font-semibold ${
            step >= 3 ? "bg-purple-600 text-white" : "text-gray-400 border border-gray-300"
          }`}
        >
          3. Emergency Info
        </div>
      </div>

      {/* Form Section */}
      {step === 1 && (
        <>
          <h2 className="text-xl font-bold mb-2">Step 1</h2>
          <p className="text-gray-600 mb-4">Patient Information</p>
          <hr className="py-2"/>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-gray-700 font-medium">First Name</label>
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
              <label className="text-gray-700 font-medium">Middle Name</label>
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
              <label className="text-gray-700 font-medium">Phone Number</label>
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
              <label className="text-gray-700 font-medium">Marital Status</label>
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
              <label className="text-gray-700 font-medium">Date Of Birth</label>
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
              <label className="text-gray-700 font-medium">Upload a Picture</label>
              <div className="border p-2 rounded-lg mt-1 flex items-center gap-2">
                <input type="file" onChange={handleFileChange} className="hidden" id="file-upload" />
                <label
                  htmlFor="file-upload"
                  className="flex items-center gap-2 cursor-pointer text-gray-500"
                >
                  <FaCloudUploadAlt className="text-gray-500" /> Not more than 3 MB
                </label>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Buttons */}
      <div className="flex justify-between mt-6">
        <button
          className="bg-gray-300 text-gray-600 px-6 py-2 rounded-lg"
          onClick={() => setStep(step - 1)}
          disabled={step === 1}
        >
          Back
        </button>
        <button
          className="bg-purple-600 text-white px-6 py-2 rounded-lg"
          onClick={() => setStep(step + 1)}
          disabled={step === 3}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PatientForm;
