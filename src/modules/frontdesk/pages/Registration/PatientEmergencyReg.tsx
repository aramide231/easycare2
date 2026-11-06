import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import InputField from "./components/InputField";
import type { PatientData } from "./Registration";

type Props = {
  formData?: PatientData;
  handleChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  handlePhoneChange?: (value: string) => void;
};

export default function PatientEmergencyReg({
  formData,
  handleChange,
  handlePhoneChange,
}: Props) {
  return (
    <div className="flex flex-col gap-6">
      {/* Step heading */}
      <div>
        <p className="text-sm text-txt-muted">Step 3</p>
        <h2 className="font-medium">Emergency Information</h2>
        <div className="mt-4 w-full border-b border-[#A5A5A5]" />
      </div>

      <div className="grid grid-cols-1 gap-x-12 gap-y-6 sm:grid-cols-2">
        {/* Full Name — spans both columns */}
        <div className="flex flex-col gap-2 sm:col-span-2">
          <label className="text-sm font-medium text-txt">Full Name</label>
          <input
            placeholder="Eg: Jude Okoye Doe"
            value={formData?.emergencyContactName}
            name="emergencyContactName"
            type="text"
            onChange={handleChange}
            className="w-full rounded-md px-4 py-2 outline outline-[#A5A5A5] focus:outline-txt focus:outline-2"
          />
        </div>

        {/* Phone Number */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-txt">Phone Number</label>
          <PhoneInput
            country={"ng"}
            placeholder="Phone Number"
            containerClass="!w-full"
            inputClass="!w-full rounded-lg outline outline-[#A5A5A5] focus:outline-txt px-4 py-5"
            enableSearch={true}
            value={formData?.emergencyContactPhone}
            name="emergencyContactPhone"
            onChange={handlePhoneChange}
          />
        </div>

        {/* Relationship */}
        <InputField
          label="Relationship to Patient"
          placeholder="Eg: Brother"
          value={formData?.emergencyContactRelationship}
          name="emergencyContactRelationship"
          handleChange={handleChange}
        />
      </div>
    </div>
  );
}
