import { useState, useEffect } from "react";
import InputField from "./components/InputField";
import type { PatientData } from "./Registration";

const PATIENT_TYPE = [
  "PRIVATE",
  "COMPANY",
  "HMO",
  "NHIS",
  "FAMILY",
  "STAFF",
  "WALK-IN",
];
const TREATMENT_GUIDE = ["Capitated", "Fee For Service", "NHIS", "Private"];
const ELIGIBILITY = ["Active", "Not-Active"];

const PROVIDER_MAP: Record<string, { [providerName: string]: string }> = {
  HMO: {
    "A&M HEALTHCARE TRUST LIMITED": "AMHT",
    "AIICO MULTISHIELD NIGERIA LIMITED": "AIICO",
    "ALLEANZA HEALTH MANAGEMENT LIMITED": "ALLZA",
    "ALLY HEALTHCARE LIMITED": "ALLY",
    "AMAN HEALTH MAINTENANCE ORGANIZATIONS": "AMAN",
    "ANCHOR HMO INTERNATIONAL COMPANY LIMITED": "ANCHOR",
    "ALL PROGRESSIVE PARTY": "APC",
    "ASHMED INTEGRATED HEALTH SERVICES LTD.": "ASHMED",
    "AVON HEALTHCARE LIMITED": "AVON",
    "AXA MANSARD HEALTH LIMITED": "AXA",
    "BASTION HEALTH LIMITED": "BAST",
    "BONITAS HEALTH MAINTENANCE LIMITED": "BONI",
    "CENTURY MEDICAID SERVICES LIMITED": "CENMED",
    "CLEARLINE INTERNATIONAL LIMITED": "CL",
    "DEFENCE HEALTH MAINTENANCE LIMITED": "DEF",
    "DELOG MEDICAL SERVICES LIMITED": "DELOG",
    "DOHEEC INTERNATIONAL HEALTHCARE LIMITED HMO": "DOHEEC",
    "DOT HMO LIMITED": "DOT",
    "FOUNTAIN HEALTHCARE LIMITED": "FTNHLTH",
    "GNI HEALTHCARE LTD": "GNI",
    "GORAH HEALTHCARE LTD": "GORAH",
    "GREENBAY HEALTHCARE SERVICES LIMITED": "GBAY",
    "GREENFIELD HEALTH MANAGEMENT LTD": "GFIELD",
    "GROOMING HEALTH MANAGEMENT LIMITED": "GROOM",
    "HALLMARK HEALTH SERVICES LIMITED": "HLLMRK",
    "HEALTH ASSUR LIMITED": "HASSUR",
    "Health Partners Limited": "HPTNERS",
    "HEALTHCARE INTERNATIONAL LIMITED": "HLTHCARE",
    "HEALTHSPRING HMO": "HLTHSP",
    "HYGEIA HMO LIMITED": "HYG",
    "INTEGRATED HEALTHCARE": "INT",
    "INTERNATIONAL HEALTH MGT SERVICES": "INTL",
    "IVES MEDICARE": "IVES",
    "KENNEDIA HMO LIMITED": "KEN",
    "LAGOS STATE HEALTH MANAGEMENT AGENCY": "LASHMA",
    "LEADWAY HEALTH LIMITED": "LDWAY",
    "LIFE WORTH MEDICARE LTD": "LWORTH",
    "LIFESAVER HEALTHCARE LIMITED": "LSAVER",
    "MAAYOIT HEALTH CARE LIMITED": "MAYHLTH",
    "MARINA MEDICAL SERVICES HMO LIMITED": "MARINA",
    "MARKFEMA NIGERIA LTD": "MRKFEMA",
    "MASSLIFE HEALTHCARE LIMITED": "MASLF",
    "MB & O HEALTHCARE SERVICES LIMITED": "MBO",
    "MEDEXIA LIMITED": "MEDX",
    "MEDICARE ALLIANCE LIMITED": "MDCARE",
    "MEDIPLAN HEALTHCARE LIMITED": "MDPLAN",
    "METROHEALTH HMO LIMITED": "MTROHLTH",
    "NEM HEALTH LIMITED": "NEM",
    "NNPC-HMO LIMITED": "NNPC",
    "NONSUCH MEDICARE LIMITED": "NONS",
    "NOOR HEALTH LTD": "NOOR",
    "NOVO HEALTH AFRICA LIMITED": "NOVO",
    "OCEANIC HEALTH MANAGEMENT LIMITED": "OCHLTH",
    "PERAMARE HEALTH MANAGEMENT COMPANY LIMITED": "PMARE",
    "PHILLIPS HEALTH MANAGEMENT SERVICES LIMITED": "PHIL",
    "POLICE HEALTH MAINTENANCE LIMITED": "POL",
    "PRECIOUS HEALTHCARE LIMITED": "PRE",
    "PREPAID MEDICARE SERVICES LTD.": "PREMED",
    "PRINCETON HEALTH": "PRIHLTH",
    "PROHEALTH HMO LTD": "PROHLTH",
    "REDCARE HEALTH SERVICES LIMITED": "RED",
    "REGENIX HEALTH CARE SERVICE LIMITED": "REG",
    "RELIANCE HMO LIMITED": "REL",
    "RODING HEALTHCARE LTD.": "ROD",
    "RONSBERGER NIGERIA LTD.": "RONS",
    "ROTHAUGE HEALTHCARE LIMITED": "ROTH",
    "ROYAL HEALTH MAINTENANCE SERVICES LTD.": "ROYAL",
    "SALUS TRUST GTE": "SALUS",
    "SERAPH HMO LIMITED": "SERAPH",
    "SKYDA HEALTH LIMITED": "SKYDA",
    "SONGHAI HEALTH TRUST": "SGHAI",
    "SPRINGTIDE HEALTHCARE SERVICES LTD.": "SPRTIDE",
    "STERLING HEALTH MANAGED CARE SERVICES LIMITED": "STERL",
    "SUNU HEALTH NIGERIA LIMITED": "SUNU",
    "SYNERGY WELLCARE MEDICAID LIMITED": "SYN",
    "TOTAL HEALTH TRUST LIMITED": "THT",
    "ULTIMATE HEALTH MANAGEMENT SERVICES LTD": "ULTM",
    "UNITED COMPREHENSIVE HEALTH MANAGERS LTD.": "UCH",
    "UNITED HEALTHCARE INTERNATIONAL LIMITED": "UHC",
    "VENUS MEDICARE LTD": "VENUS",
    "VERITAS HEALTHCARE LIMITED": "VERITAS",
    "WELL HEALTH NETWORK LIMITED": "WLLHLTH",
    "WELLNESS HEALTH MANAGEMENT SERVICES LIMITED": "WLLNS",
    "ZUMA HEALTH TRUST": "ZUMA",
  },
  COMPANY: {
    "EXCELLENT SCHOOL LEADER": "EXC",
    "FIDELITY PENSION MANAGERS LTD": "FDLTYPM",
    "FIRST BANK PLC": "FBN",
    "GREEN EAGLE CORK SEALS NIG LTD": "GECS",
    "GREEN FUELS LTD": "GFL",
    "HURLAG TECH LTD": "HLG",
    "MAY & BAKER LTD": "MB",
    "NAHCO AVIANCE": "NA",
    "NEW AGE ENERGY LTD": "NAE",
    "NEW COVENANT BAPTIST CHURCH": "NCVB",
    "PEDROS BAR LTD": "PBAR",
    "PRECISE MEDICAL DIAGNOSTIX": "PMD",
    "STARFIELD INTERNATIONAL SCHOOL": "STR",
    "UNIVERSAL WHITE HALL SCHOOLS": "UWH",
    "DUFIL PRIMA FOODS": "DUFIL",
  },
  NHIS: {
    "AIICO MULTISHIELD HEALTHCARE LTD NHIS": "AIICO/NHIS",
    "CLEARLINE HEALTHCARE LTD NHIS": "CL/NHIS",
    "HEALTHCARE INTERNATIONAL LTD NHIS": "HCI/NHIS",
    "HEALTHSTONE LTD NHIS": "HLTHST/NHIS",
    "HEALTHWYSE GLOBAL SERVICES LTD NHIS": "HW/NHIS",
    "Hygeia NHIS": "HYG/NHIS",
    "IHMS NHIS": "IHMS/NHIS",
    "INTEGRATED HEALTHCARE LTD NHIS": "IHC/NHIS",
    "IVES MEDICARE LTD": "IVES/NHIS",
    "MEDIPLAN HEALTHCARE LTD NHIS": "MDPLAN/NHIS",
    "NNPC GROUP NHIS": "NNPC/NHIS",
    "NONSUCH HEALTHCARE LTD NHIS": "NONS/NHIS",
    "POLICE HMO (NHIS)": "POL/NHIS",
    "PRECIOUS HEALTHCARE LIMITED NHIS": "PRE/NHIS",
    "PRINCETON HEALTHCARE LTD NHIS": "PRI/NHIS",
    "REDCARE NHIS": "RED/NHIS",
    "REGENIX HEALTHCARE SERVICES LTD NHIS": "REG/NHIS",
    "RONSBERGER HEALTHCARE LTD NHIS": "RONS/NHIS",
    "SONGHAI HEALTHTRUST LTD NHIS": "SGHAI/NHIS",
    "SUNU (MHS) HEALTH SERVICE LTD NHIS": "SUNU/NHIS",
    "TOTAL HEALTH TRUST NHIS": "THT/NHIS",
    "ULTIMATE HEALTHCARE LTD NHIS": "ULTM/NHIS",
    "UNITED COMPREHENSIVE HEALTH MANAGERS LTD NHIS": "UCH/NHIS",
    "UNITED HEALTHCARE LTD NHIS": "UHC/NHIS",
    "VENUS MEDICARE LTD (ZENITH) NHIS": "VENUS/NHIS",
    "WELLNESS HMO NHIS": "WEL/NHIS",
    "ZUMA HEALTH TRUST NHIS": "ZUMA/NHIS",
  },
};

type Props = {
  formData: PatientData;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
};

export default function PatientInsuranceReg({ formData, handleChange }: Props) {
  const [providerNames, setProviderNames] = useState<string[]>([]);
  const [providerCode, setProviderCode] = useState<string>("");

  // Update Provider Name list when PatientType changes
  useEffect(() => {
    const patientTypeValue = formData?.patientType || "";
    if (patientTypeValue && PROVIDER_MAP[patientTypeValue]) {
      setProviderNames(Object.keys(PROVIDER_MAP[patientTypeValue]));
    } else {
      setProviderNames([]);
    }
  }, [formData?.patientType]);

  // Auto-update Provider Code when Provider Name changes
  useEffect(() => {
    const typeKey = formData?.patientType || "";
    const providerName = formData?.insuranceProvider || "";
    if (typeKey && providerName && PROVIDER_MAP[typeKey]) {
      setProviderCode(PROVIDER_MAP[typeKey][providerName] || "");
    } else {
      setProviderCode("");
    }
  }, [formData?.insuranceProvider, formData?.patientType]);

  return (
    <div>
      <p className="text-txt-muted text-sm">Step 2</p>
      <h2 className="font-medium">Patient Insurance Information</h2>
      <div className="mt-4 w-full border-b border-[#A5A5A5]" />

      <div className="flex gap-10">
        {/* Patient Type */}
        <div className="flex flex-col mt-6">
          <label>Patient Type</label>
          <select
            className="w-[290px] mt-2 outline outline-[#A5A5A5] focus:outline-txt px-4 py-2 rounded-md"
            value={formData?.patientType}
            name="patientType"
            onChange={handleChange}
          >
            <option value="">Select a type</option>
            {PATIENT_TYPE.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Provider Name */}
        <div className="flex flex-col mt-6">
          <label>Insurance Provider Name</label>
          <select
            className="w-[290px] mt-2 outline outline-[#A5A5A5] focus:outline-txt px-4 py-2 rounded-md"
            value={formData?.insuranceProvider}
            name="insuranceProvider"
            onChange={handleChange}
            disabled={!providerNames.length}
          >
            <option value="">Select an Organization</option>
            {providerNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-10">
        {/* Auto-filled Code */}
        <InputField
          label="Insurance Provider Code"
          placeholder="Auto-filled"
          value={providerCode}
          name="insuranceProviderCode"
          readOnly
        />

        {/* Patient ID */}
        <InputField
          label="Patient ID"
          placeholder="P-2025001"
          value={formData?.patientId}
          name="patientId"
          handleChange={handleChange}
        />
      </div>

      <div className="flex gap-10">
        <InputField
          label="Insurance Policy Number"
          placeholder="Eg: 012345"
          value={formData?.insurancePolicyNumber}
          name="insurancePolicyNumber"
          handleChange={handleChange}
        />

        <InputField
          label="Patient's Employer Name"
          placeholder="Eg: 7up Bottling Company"
          value={formData?.employerName}
          name="employerName"
          handleChange={handleChange}
        />
      </div>

      <div className="flex gap-10">
        <div className="flex flex-col mt-6">
          <label>Treatment Guide</label>
          <select
            className="w-[290px] mt-2 outline outline-[#A5A5A5] focus:outline-txt px-4 py-2 rounded-md"
            value={formData?.treatmentGuide}
            name="treatmentGuide"
            onChange={handleChange}
          >
            <option value="">Select one</option>
            {TREATMENT_GUIDE.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <InputField
          label="Patient Plan Type"
          placeholder="Eg: DashfsAAHFAH"
          value={formData?.planType}
          name="planType"
          handleChange={handleChange}
        />
      </div>

      <div className="flex gap-10">
        <div className="flex flex-col mt-6">
          <label>Eligibility</label>
          <select
            className="w-[290px] mt-2 outline outline-[#A5A5A5] focus:outline-txt px-4 py-2 rounded-md"
            value={formData?.eligibility}
            name="eligibility"
            onChange={handleChange}
          >
            <option value="">Select one</option>
            {ELIGIBILITY.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="w-[290px]" />
      </div>
    </div>
  );
}

// import InputField from "./components/InputField";
// import type { PatientData } from "./Registration";

// const PATIENT_TYPE = [
//   "Private",
//   "Company",
//   "HMO",
//   "NHIS",
//   "Family",
//   "Staff",
//   "Walk-In",
// ];

// const INSURANCE_PROV_NAME = ["placeholder"];
// const INSURANCE_PROV_CODE = ["placeholder"];
// const TREATMENT_GUIDE = ["Capitated", "Fee For Service", "NHIS", "Private"];
// const ELIGIBILITY = ["Active", "Not-Active"];

// type Props = {
//   formData?: PatientData;
//   handleChange?: (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => void;
//   handleFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   handlePhoneChange?: (value: string) => void;
// };

// export default function PatientInsuranceReg({ formData, handleChange }: Props) {
//   return (
//     <div>
//       <div>
//         <p className="text-txt-muted text-sm">Step 2</p>
//         <h2 className="font-medium">Patient Insurance Information</h2>
//         <div className="mt-4 w-full border-b border-[#A5A5A5]" />
//       </div>

//       <div className="flex gap-10">
//         {/* Patient Type */}
//         <div className="flex flex-col mt-6">
//           <label>Patient Type</label>
//           <select
//             className="w-[290px] mt-2 outline outline-[#A5A5A5] focus:outline-txt px-4 py-2 rounded-md"
//             value={formData?.patientType}
//             name="patientType"
//             onChange={handleChange}
//           >
//             <option value="">Select a type</option>
//             {PATIENT_TYPE.map((type) => (
//               <option value={type}>{type}</option>
//             ))}
//           </select>
//         </div>
//         {/* Insurance Provider Name */}
//         <div className="flex flex-col mt-6">
//           <label> Insurance Provider Name</label>
//           <select
//             className="w-[290px] mt-2 outline outline-[#A5A5A5] focus:outline-txt px-4 py-2 rounded-md"
//             value={formData?.insuranceProvider}
//             name="insuranceProvider"
//             onChange={handleChange}
//           >
//             <option value="">Select an Organization</option>

//             {INSURANCE_PROV_NAME.map((type) => (
//               <option value={type}>{type}</option>
//             ))}
//           </select>
//         </div>
//       </div>

//       <div className="flex gap-10">
//         {/* Insurance Group Number */}
//         <div className="flex flex-col mt-6">
//           <label>Insurance Provider Code</label>
//           <select
//             className="w-[290px] mt-2 outline outline-[#A5A5A5] focus:outline-txt px-4 py-2 rounded-md"
//             value={formData?.insuranceProviderCode}
//             name="insuranceProviderCode"
//             onChange={handleChange}
//           >
//             <option value="">Select one</option>
//             {INSURANCE_PROV_CODE.map((type) => (
//               <option value={type}>{type}</option>
//             ))}
//           </select>
//         </div>
//         {/* Insurance Provider Name */}

//         {/* Patient ID */}
//         <InputField
//           label="Patient ID"
//           placeholder="P-2025001"
//           value={formData?.patientId}
//           name="patientId"
//           handleChange={handleChange}
//         />
//       </div>

//       <div className="flex gap-10">
//         {/* Insurance Policy Number */}
//         <InputField
//           label="Insurance Policy Number"
//           placeholder="Eg: 012345"
//           value={formData?.insurancePolicyNumber}
//           name="insurancePolicyNumber"
//           handleChange={handleChange}
//         />
//         <InputField
//           label="Patient's Employer Name"
//           placeholder="Eg: 7up Bottling Company"
//           value={formData?.employerName}
//           name="employerName"
//           handleChange={handleChange}
//         />
//       </div>

//       <div className="flex gap-10">
//         {/* Insurance Group Number */}
//         <div className="flex flex-col mt-6">
//           <label>Treatment Guide</label>
//           <select
//             className="w-[290px] mt-2 outline outline-[#A5A5A5] focus:outline-txt px-4 py-2 rounded-md"
//             value={formData?.treatmentGuide}
//             name="treatmentGuide"
//             onChange={handleChange}
//           >
//             <option value="">Select one</option>

//             {TREATMENT_GUIDE.map((type) => (
//               <option value={type}>{type}</option>
//             ))}
//           </select>
//         </div>
//         <InputField
//           label="Patient Plan Type"
//           placeholder="Eg: DashfsAAHFAH"
//           value={formData?.planType}
//           name="planType"
//           handleChange={handleChange}
//         />
//       </div>

//       <div className="flex gap-10">
//         <div className="flex flex-col mt-6">
//           <label>Eligibility</label>
//           <select
//             className="w-[290px] mt-2 outline outline-[#A5A5A5] focus:outline-txt px-4 py-2 rounded-md"
//             value={formData?.eligibility}
//             name="eligibility"
//             onChange={handleChange}
//           >
//             <option value="">Select one</option>
//             {ELIGIBILITY.map((type) => (
//               <option value={type}>{type}</option>
//             ))}
//           </select>
//         </div>
//         <div className="w-[290px]"></div>
//       </div>
//     </div>
//   );
// }
