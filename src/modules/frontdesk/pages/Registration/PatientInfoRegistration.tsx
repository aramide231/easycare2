import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Plus } from "lucide-react";
import InputField from "./components/InputField";
import type { PatientData } from "./Registration";

const MARITAL_STATUS = ["Single", "Married", "Divorced", "Separated"];

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

// Shared label + select wrapper that fills its grid cell
function SelectField({
  label,
  name,
  value,
  onChange,
  children,
}: {
  label: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-txt">{label}</label>
      <select
        className="w-full rounded-md px-4 py-2 border-2 focus:outline-txt focus:outline-2"
        name={name}
        value={value}
        onChange={onChange}
      >
        {children}
      </select>
    </div>
  );
}

export default function PatientInfoRegistration({
  handleChange,
  handleFileChange,
  handlePhoneChange,
  formData,
}: Props) {
  return (
    <div className="flex flex-col gap-6">
      {/* Step heading */}
      <div>
        <p className="text-sm text-txt-muted">Step 1</p>
        <h2 className="font-medium">Patient Information</h2>
        <div className="mt-4 w-full border-b border-[#A5A5A5]" />
      </div>

      <div className="grid grid-cols-1 gap-x-12 gap-y-6 sm:grid-cols-2">
        {/* First Name */}
        <InputField
          label="First Name"
          placeholder="John"
          value={formData?.firstName}
          name="firstName"
          handleChange={handleChange}
        />

        {/* Middle Name */}
        <InputField
          label="Middle Name"
          placeholder="Eg: Thuranus"
          value={formData?.middleName}
          name="middleName"
          handleChange={handleChange}
        />

        {/* Surname */}
        <InputField
          label="Surname"
          placeholder="Eg: Doe"
          value={formData?.surname}
          name="surname"
          handleChange={handleChange}
        />

        {/* Phone Number */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-txt">Phone Number</label>
          <PhoneInput
            country={"ng"}
            placeholder="Phone Number"
            containerClass="!w-full"
            inputClass="!w-full rounded-lg outline outline-[#A5A5A5] focus:outline-txt px-4 py-5"
            enableSearch={true}
            value={formData?.phone}
            onChange={handlePhoneChange}
          />
        </div>

        {/* Gender */}
        <SelectField
          label="Gender"
          name="gender"
          value={formData?.gender}
          onChange={handleChange}
        >
          <option value="">Select a Type</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </SelectField>

        {/* Email */}
        <InputField
          label="Email Address"
          placeholder="johndoe@gmail.com"
          value={formData?.email}
          name="email"
          handleChange={handleChange}
        />

        {/* Date of Birth */}
        <InputField
          label="Date Of Birth"
          placeholder="Date of birth"
          value={formData?.dob}
          type="date"
          name="dob"
          handleChange={handleChange}
        />

        {/* Age (auto-calculated, read-only) */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-txt">Age</label>
          <div className="w-full rounded-md bg-gray-50 px-4 py-2 border-2">
            {formData?.age || "0 years, 0 months, 0 days"}
          </div>
        </div>

        {/* State of Origin */}
        <SelectField
          label="State Of Origin"
          name="stateOfOrigin"
          value={formData?.stateOfOrigin}
          onChange={handleChange}
        >
          <option value="">Select a Type</option>
          {NIGERIA_STATES.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </SelectField>

        {/* Marital Status */}
        <SelectField
          label="Marital Status"
          name="maritalStatus"
          value={formData?.maritalStatus}
          onChange={handleChange}
        >
          <option value="">Select a Type</option>
          {MARITAL_STATUS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </SelectField>

        {/* Religion */}
        <SelectField
          label="Religion"
          name="religion"
          value={formData?.religion}
          onChange={handleChange}
        >
          <option value="">Select a Type</option>
          <option value="Christian">Christian</option>
          <option value="Muslim">Muslim</option>
          <option value="Traditional">Traditional</option>
        </SelectField>

        {/* Occupation */}
        <InputField
          label="Occupation"
          placeholder="Student, Civil servant...."
          value={formData?.occupation}
          name="occupation"
          handleChange={handleChange}
        />

        {/* Home Address — full width */}
        <div className="flex flex-col gap-2 sm:col-span-2">
          <label className="text-sm font-medium text-txt">Home Address</label>
          <input
            className="w-full rounded-md px-4 py-2 border-2 focus:outline-txt focus:outline-2"
            placeholder="Street number, Street name, Junction, Town/City, State, Country"
            value={formData?.address}
            name="address"
            onChange={handleChange}
          />
        </div>

        {/* Upload Picture — full width */}
        <div className="sm:col-span-2">
          <p className="mb-2 text-sm font-medium text-txt">
            Upload Profile Picture{" "}
            <span className="text-txt-muted text-xs">(optional)</span>
          </p>
          <label className="flex w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#A5A5A5] p-6 text-gray-400 hover:bg-gray-50">
            <Plus className="mb-2 h-6 w-6" />
            <span>
              {formData?.picture
                ? formData.picture.name
                : "Click or drag image here (200kb max size)"}
            </span>
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
    </div>
  );
}
