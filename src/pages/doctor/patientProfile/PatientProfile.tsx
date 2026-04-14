import { useState } from "react";
import {
  FaSmile,
  FaHandScissors,
  FaBaby,
  FaBookReader,
  FaLocationArrow,
  FaMapPin,
  FaMoneyBill,
  FaPeopleCarry,
  FaPiggyBank,
  FaRecordVinyl,
  FaRecycle,
  FaSnowman,
  FaUserFriends,
} from "react-icons/fa";
import { useLocation } from "react-router-dom";
import SelectCategoryCard from "./components/SelectCategoryCard";
import { ChevronDown, ChevronUp } from "lucide-react";
import { CategoryRenderer } from "./components/CategoryRenderer";

const DoctorPatientProfile = () => {
  // const { id } = useParams();
  const location = useLocation();
  const patient = location.state?.patient;

  const [step, setStep] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<CategoryLabel | null>(null);

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

  type CategoryLabel = (typeof categories)[number]["label"];

  const toggleCategory = (label: CategoryLabel) => {
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

  const DocumentCategories = [
    {
      icon: FaMapPin,
      label: "Uploaded Files",
    },
  ];

  const subCategoryMap: Record<string, { label: string }[]> = {
    "Ante Natal Care": [
      { label: "VITAL SIGNS" },
      { label: "PREVIOUS MEDICAL HISTORY" },
      { label: "FAMILY MEDICAL HISTORY" },
      { label: "NEW ANTENATAL BOOKING" },
      { label: "PREVIOUS PREGNANCY HISTORY" },
      { label: "PRESENTING COMPLAINTS" },
      { label: "PHYSICAL EXAMINATION" },
      { label: "DIAGNOSIS" },
      { label: "INVESTIGATION" },
      { label: "PROCEDURE" },
      { label: "MEDICATION" },
      { label: "FOLLOW-UP VISIT" },
    ],

    "Child Birth": [
      { label: "STAGE 1: LABOUR" },
      { label: "STAGE 2: PUSHING & BIRTHING" },
      { label: "STAGE 3: DELIVERY OF PLACENTA" },
      { label: "STAGE 4: DELIVERY NOTE" },
    ],

    "Family Planning": [
      // { label: "CONTRACEPTIVE HISTORY" },
      // { label: "METHOD SELECTED" },
      // { label: "FOLLOW-UP" },
    ],

    "Immunization": [
      { label: "VITAL SIGNS" },
      { label: "VACCINE ADMINISTRATION" },
      { label: "MEDICATION" },
      { label: "FOLLOW-UP" },
      { label: "CLINICAL NOTES" },
   ],

    "Gen Consult": [
      { label: "VITAL SIGNS" },
      { label: "PRESENTING COMPLAINTS" },
      { label: "PHYSICAL EXAMINATION" },
      { label: "DIAGNOSIS" },
      { label: "INVESTIGATION" },
      { label: "MEDICATION" },
      { label: "PROCEDURE" },
      { label: "REPORT WRITING" },
      { label: "IN-TAKE CHART" },
      { label: "OUTPUT CHART" },
      { label: "NURSING DISPENSES" },
      { label: "PHARMACY DISPENSE" },
    ],

    "Neo Natal Care": [
      { label: "VITAL SIGNS" },
      { label: "DIAGNOSIS" },
      { label: "INVESTIGATION" },
      { label: "PROCEDURE" },
      { label: "MEDICATION" },
    ],

    "Post Natal Care": [
      { label: "VITAL SIGNS" },
      { label: "PRESENTING COMPLAINTS" },
      { label: "PHYSICAL EXAMINATION" },
      { label: "INVESTIGATION" },
      { label: "MEDICATION" },
    ],

    "Specialist Consult": [
      { label: "PRESENTING COMPLAINTS" },
      { label: "PREVIOUS DENTAL HISTORY" },
      { label: "PREVIOUS DENTAL MEDICATION" },
    ],

    "Surgical": [
      { label: "PRE-OPERATION NOTE" },
      { label: "P0ST-OPERATION NOTE" },
      { label: "P0ST-OPERATION ORDERS" },
    ],

  };


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
    <div className="flex w-full gap-6 p-6 border rounded-xl shadow-md bg-white">
      {/* Left Side */}
      <div className="flex-1 max-h-full pr-6 border-r">
        {/* Patient Image & Name */}
        <div className="flex bg-purple-100 items-center gap-3 mb-6 border p-3 rounded-lg">
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
            <>
              <h2 className="text-sm text-gray-400 ">Step 1</h2>
              <h3 className="text-gray-700 font-semibold mb-2">
                Select category
              </h3>
              <div className="flex flex-wrap gap-4">
                {categories.map((item, index) => (
                  <SelectCategoryCard
                    key={index}
                    icon={item.icon}
                    label={item.label}
                    selected={selectedCategory === item.label}
                    onClick={() => setSelectedCategory(item.label)}
                  />
                ))}
              </div>

              <h2 className="text-sm text-gray-400 mt-4">Step 2</h2>
              <h3 className="font-semibold text-gray-700 mb-2">
                Fill Category Form
              </h3>

              <div className="relative flex flex-col h-[300px] border border-gray-300 rounded-lg overflow-hidden">
                {!selectedCategory ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-gray-400 text-sm px-4 text-center">
                    <p className="text-black">Text Field Goes Here</p>
                    <p className="text-gray-400">
                      /Becomes Active when a category is clicked
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col w-full h-full overflow-y-auto divide-y divide-gray-200">
           
                    {subCategoryMap[selectedCategory || ""]?.map((cat, idx) => (
                      <div key={idx} className="py-5">
                        <div
                          className={` ${
                            expandedCategory === cat.label &&
                            "bg-white border-b-gray-400 pb-4"
                          }`}
                        >
                          <button
                            onClick={() => toggleCategory(cat.label)}
                            className={`relative w-full px-4 py-3 text-left text-sm font-medium border-b-2 border-purple-400 ${
                              expandedCategory === cat.label
                                ? "text-white"
                                : "text-gray-900 hover:bg-gray-50"
                            }`}
                          >
                            {/* Tab-like label sitting on the border */}
                            <span className="absolute -bottom-[2px] left-1 bg-purple-400 text-white w-[300px] rounded-t-md px-4 py-2 z-10 text-sm shadow-md">
                              {cat.label}
                            </span>

                            {/* Chevron icon aligned right */}
                            <div className="flex justify-end items-center">
                              {expandedCategory === cat.label ? (
                                <ChevronUp className="w-4 h-4 ml-auto pr-1" />
                              ) : (
                                <ChevronDown className="w-4 h-4 ml-auto pr-1" />
                              )}
                            </div>
                          </button>
                        </div>

                        {expandedCategory === cat.label && CategoryRenderer[cat.label]}
                      </div>
                    ))}

                  </div>
                )}
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <h2 className="text-sm text-gray-400 mb-2">Step 1</h2>
              <h3 className="text-gray-700 font-semibold mb-2">
                Select category
              </h3>
              <div className=" flex flex-wrap gap-4">
                {FinaceCategories.map((item, index) => (
                  <SelectCategoryCard
                    key={index}
                    icon={item.icon}
                    label={item.label}
                    selected={selectedCategory === item.label}
                    onClick={() => setSelectedCategory(item.label)}
                  />
                ))}
              </div>
              <h2 className="text-sm text-gray-400 mt-2">Step 2</h2>
              <h3 className="text-gray-700 font-semibold mb-2">
                Fill Category Form
              </h3>
              <div className="relative flex flex-col h-[300px]">
                {!selectedCategory ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-gray-400 text-sm px-4 text-center">
                    <p className="text-black">Text Field Goes Here</p>
                    <p className="text-gray-400">
                      /Becomes Active when a category is clicked
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col w-full h-full overflow-y-auto divide-y divide-gray-200">
           
                    {subCategoryMap[selectedCategory || ""]?.map((cat, idx) => (
                      <div key={idx} className="py-5">
                        <div
                          className={` ${
                            expandedCategory === cat.label &&
                            "bg-white border-b-gray-400 pb-4"
                          }`}
                        >
                          <button
                            onClick={() => toggleCategory(cat.label)}
                            className={`relative w-full px-4 py-3 text-left text-sm font-medium border-b-2 border-purple-400 ${
                              expandedCategory === cat.label
                                ? "text-white"
                                : "text-gray-900 hover:bg-gray-50"
                            }`}
                          >
                            {/* Tab-like label sitting on the border */}
                            <span className="absolute -bottom-[2px] left-1 bg-purple-400 text-white w-[300px] rounded-t-md px-4 py-2 z-10 text-sm shadow-md">
                              {cat.label}
                            </span>

                            {/* Chevron icon aligned right */}
                            <div className="flex justify-end items-center">
                              {expandedCategory === cat.label ? (
                                <ChevronUp className="w-4 h-4 ml-auto pr-1" />
                              ) : (
                                <ChevronDown className="w-4 h-4 ml-auto pr-1" />
                              )}
                            </div>
                          </button>
                        </div>

                        {expandedCategory === cat.label && CategoryRenderer[cat.label]}
                      </div>
                    ))}

                  </div>
                )}

                {/* <textarea
                  className="w-full h-full resize-none border border-gray-300 rounded-lg p-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-transparent"
                  placeholder="Enter category-specific information here..."
                /> */}
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <h2 className="text-sm text-gray-400 mb-2">Step 1</h2>
              <h3 className="text-gray-700 font-semibold mb-2">
                Attached Documents
              </h3>
              <div className=" flex flex-wrap gap-4">
                {DocumentCategories.map((item, index) => (
                  <SelectCategoryCard
                    key={index}
                    icon={item.icon}
                    label={item.label}
                    selected={selectedCategory === item.label}
                    onClick={() => setSelectedCategory(item.label)}
                  />
                ))}
              </div>
              <h2 className="text-sm text-gray-400 mb-2">Step 2</h2>
              <h3 className="text-gray-700 font-semibold mb-2">
                View Uploaded Files
              </h3>

              <div className="relative flex flex-col h-[300px] overflow-auto">
                {!selectedCategory && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-gray-400 text-sm px-4 text-center">
                    <strong className="text-black">Table Goes Here</strong>
                    <br />
                    /Becomes Active when a category is clicked
                  </div>
                )}

                {selectedCategory && (
                  <table className="w-full text-sm text-left text-gray-700 border border-gray-300 rounded-lg overflow-hidden">
                    <thead className="bg-gray-100 sticky top-0">
                      <tr>
                        <th className="p-3 border-b">
                          <input type="checkbox" />
                        </th>
                        <th className="p-3 border-b text-sm text-gray-300">
                          DOCUMENT
                        </th>
                        <th className="p-3 border-b text-sm text-gray-300">
                          DATE UPLOADED{" "}
                        </th>
                        <th className="p-3 border-b text-sm text-gray-300">
                          UPLOADED BY
                        </th>
                        <th className="p-3 border-b text-sm text-gray-300">
                          ACTION
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-gray-50">
                        <td className="p-3 border-b">
                          <input type="checkbox" />
                        </td>
                        <td className="p-3 border-b">
                          <div className="flex flex-col">
                            <span className="font-medium">
                              {patient.name} Malaria Result
                            </span>
                            <span className="text-xs text-gray-500">
                              {patient.patientId} | {patient.phoneNumber}
                            </span>
                          </div>
                        </td>
                        <td className="p-3 border-b">
                          <div className="flex flex-col">
                            <span>{patient.lastSeen}</span>
                            <span className="text-xs text-gray-500">
                              {patient.time}
                            </span>
                          </div>
                        </td>
                        <td className="p-3 border-b">
                          <p>Titilayo Olayinka</p>
                        </td>
                        <td className="p-3 border-b space-x-2">
                          <button className="px-2 py-1 text-xs bg-green-200 text-green-700 rounded hover:bg-green-600">
                            View
                          </button>
                          <button className="px-2 py-1 text-xs bg-red-200 text-red-700 rounded hover:bg-red-600">
                            Delete
                          </button>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="p-3 border-b">
                          <input type="checkbox" />
                        </td>
                        <td className="p-3 border-b">
                          <div className="flex flex-col">
                            <span className="font-medium">
                              {patient.name} Pelvic Scan
                            </span>
                            <span className="text-xs text-gray-500">
                              {patient.patientId} | {patient.phoneNumber}
                            </span>
                          </div>
                        </td>
                        <td className="p-3 border-b">
                          <div className="flex flex-col">
                            <span>{patient.lastSeen}</span>
                            <span className="text-xs text-gray-500">
                              {patient.time}
                            </span>
                          </div>
                        </td>
                        <td className="p-3 border-b">
                          <p>Titilayo Olayinka</p>
                        </td>
                        <td className="p-3 border-b space-x-2">
                          <button className="px-2 py-1 text-xs bg-green-200 text-green-700 rounded hover:bg-green-600">
                            View
                          </button>
                          <button className="px-2 py-1 text-xs bg-red-200 text-red-700 rounded hover:bg-red-600">
                            Delete
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </div>
            </>
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

export default DoctorPatientProfile;
