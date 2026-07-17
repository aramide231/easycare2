import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { Plus } from "lucide-react";

import InputField from "./components/InputField";

import type { PatientData } from "./Registration";

const MARITAL_STATUS = [
  "Single",
  "Married",
  "Divorced",
  "Widow",
  "Widower",
  "Others",
];

const NIGERIA_STATES = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
  "Federal Capital Territory (FCT)",
];

type Props = {
  formData: PatientData;
  handleChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  handleFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePhoneChange?: (value: string) => void;
};
export default function PatientInfoRegistration({
  handleChange,
  handleFileChange,
  handlePhoneChange,
  formData,
}: Props) {
  return (
    <div className="flex flex-col">
      <div>
        <p className="text-txt-muted text-sm">Step 1</p>
        <h2 className="font-medium">Patient Information</h2>
        <div className="mt-4 w-full border-b border-[#A5A5A5]" />
      </div>
      {/* First & Middle Name */}
      <div className="flex gap-10">
        <InputField
          label="First Name"
          placeholder="John"
          value={formData?.firstName}
          name="firstName"
          handleChange={handleChange}
        />
        <InputField
          label="Middle Name"
          placeholder="Eg: Thuranus"
          value={formData?.middleName}
          name="middleName"
          handleChange={handleChange}
        />
      </div>

      {/* Last Name & Phone Number */}
      <div className="flex gap-10">
        <InputField
          label="Surname"
          placeholder="Eg: Doe"
          value={formData?.surname}
          name="surname"
          handleChange={handleChange}
        />
        <div className="flex flex-col mt-6">
          <label>Phone Number</label>
          <PhoneInput
            country={"ng"}
            placeholder="Phone Number"
            containerClass="!w-[290px] mt-2"
            inputClass="!w-[290px] outline outline-[#A5A5A5] focus:outline-txt px-4 py-5 rounded-lg"
            enableSearch={true}
            value={formData?.phone}
            // name="phone"
            onChange={handlePhoneChange}
          />
        </div>
      </div>

      {/* Gender & Email Address */}
      <div className="flex gap-10">
        <div className="flex flex-col mt-6">
          <label>Gender</label>
          <select
            className="w-[290px] mt-2 outline outline-[#A5A5A5] focus:outline-txt px-4 py-2 rounded-md"
            value={formData?.gender}
            name="gender"
            onChange={handleChange}
          >
            <option value="">Select a Type</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <InputField
          label="Email Address"
          placeholder="johndoe@gmail.com"
          value={formData?.email}
          name="email"
          handleChange={handleChange}
        />
      </div>

      {/* Date Of Birth & Age */}
      <div className="flex gap-10">
        <div className="flex gap-10">
          <InputField
            label="Date Of Birth"
            placeholder="Date of birth"
            value={formData?.dob}
            type="date"
            name="dob"
            handleChange={handleChange}
          />

          <div className="flex flex-col mt-6">
            <label>Age</label>
            <div className="outline outline-[#A5A5A5] focus:outline-txt px-4 py-2 mt-2 w-[290px] rounded-md bg-gray-50">
              {formData?.age || "0 years, 0 months, 0 days"}
            </div>
          </div>
        </div>

        {/* <InputField
          label="Age"
          placeholder=""
          type="number"
          value={formData?.age}
          name="age"
          handleChange={handleChange}
        /> */}
      </div>

      {/* State of Origin & Marital Status */}
      <div className="flex gap-10">
        <div className="flex flex-col mt-6">
          <label>State Of Origin</label>
          <select
            className="w-[290px] outline outline-[#A5A5A5] focus:outline-txt px-4 py-2 mt-2 rounded-md"
            value={formData?.stateOfOrigin}
            name="stateOfOrigin"
            onChange={handleChange}
          >
            <option value="">Select a Type</option>
            {NIGERIA_STATES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col mt-6">
          <label>Marital Status</label>
          <select
            className="w-[290px] outline outline-[#A5A5A5] focus:outline-txt px-4 py-2 mt-2 rounded-md"
            value={formData?.maritalStatus}
            name="maritalStatus"
            onChange={handleChange}
          >
            <option value="">Select a Type</option>
            {MARITAL_STATUS.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Religion & Occupation */}
      <div className="flex gap-10">
        <div className="flex flex-col mt-6">
          <label>Religion</label>
          <select
            className="w-[290px] mt-2 outline outline-[#A5A5A5] focus:outline-txt px-4 py-2 rounded-md"
            value={formData?.religion}
            name="religion"
            onChange={handleChange}
          >
            <option value="">Select a Type</option>
            <option value="Christian">Christian</option>
            <option value="Muslim">Muslim</option>
            <option value="Traditional">Traditional</option>
          </select>
        </div>
        <InputField
          label="Occupation"
          placeholder="Student, Civil servant...."
          value={formData?.occupation}
          name="occupation"
          handleChange={handleChange}
        />
      </div>

      <div className="flex flex-col mt-6">
        <label>Home Address</label>
        <input
          className="w-full outline outline-[#A5A5A5] focus:outline-txt px-4 py-2 mt-2 rounded-md"
          placeholder="Street number, Street name, Junction, Town//City, State, Country"
          value={formData?.address}
          name="address"
          onChange={handleChange}
        />
      </div>

      <div className="mt-6">
        <p>Upload Profile Picture</p>
        <label className="mt-2 w-full border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-50">
          <Plus className="w-6 h-6 mb-2" />
          <span>Click or drag image here</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            name="picture"
            onChange={handleFileChange}
          />
        </label>
      </div>
    </div>
  );
}
