import PhoneInput from "react-phone-input-2";
import InputField from "./components/InputField";

import type { PatientData } from "./Registration";

type Props = {
  formData?: PatientData;
  handleChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;

  handlePhoneChange?: (value: string) => void;
};

export default function PatientEmergencyReg({
  formData,
  handleChange,
  handlePhoneChange,
}: Props) {
  return (
    <div>
      <div>
        <p className="text-txt-muted text-sm">Step 3</p>
        <h2 className="font-medium">Emergency Information</h2>
        <div className="mt-4 w-full border-b border-[#A5A5A5]" />
      </div>
      <div className="w-full flex flex-col mt-10">
        <label>Full Name</label>
        <input
          placeholder="Eg: Jude Okoye Doe"
          value={formData?.emergencyContactName}
          name="emergencyContactName"
          type="text"
          onChange={handleChange}
          className="outline outline-[#A5A5A5] focus:outline-txt px-4 py-2 mt-2 w-full rounded-md"
        />
      </div>
      <div className="flex gap-10">
        <div className="flex flex-col mt-4">
          <label className="mb-2">Phone Number</label>
          <PhoneInput
            country={"ng"}
            placeholder="Phone Number"
            containerClass="!w-[290px] "
            inputClass="!w-[290px] outline outline-[#A5A5A5] focus:outline-txt px-4 py-5 rounded-lg"
            enableSearch={true}
            value={formData?.emergencyContactPhone}
            name="emergencyContactPhone"
            onChange={handlePhoneChange}
          />
        </div>
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
