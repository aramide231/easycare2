import { useRef, useState } from "react";
import { ChevronDown, Info, Upload } from "lucide-react";
import { toast } from "react-toastify";
import {
  HMO_ORGANISATION_OPTIONS,
  PRE_AUTH_OPTIONS,
  type HmoRegistrationRecord,
  type HmoType,
} from "../data/mockHmoRegistrationRecords";

export type HmoRegistrationFormValues = {
  name: string;
  code: string;
  organisationName: string;
  preAuthCode: (typeof PRE_AUTH_OPTIONS)[number];
  officeAddress: string;
  mobileNumber: string;
  contactNumber: string;
  email: string;
  tariffFileName: string;
};

const emptyForm: HmoRegistrationFormValues = {
  name: "",
  code: "",
  organisationName: "",
  preAuthCode: "YES",
  officeAddress: "",
  mobileNumber: "",
  contactNumber: "",
  email: "",
  tariffFileName: "",
};

type Props = {
  onSubmit: (record: HmoRegistrationRecord) => void;
};

const fieldClass =
  "h-11 w-full rounded-lg border-[0.5px] border-black bg-[#FAFAFA] px-4 text-[15px] text-black outline-none placeholder:italic placeholder:text-[#808080] focus:border-[#573FD1]";

const selectClass =
  "h-11 w-full appearance-none rounded-lg border-[0.5px] border-black bg-[#FAFAFA] px-4 pr-10 text-[15px] text-black outline-none focus:border-[#573FD1]";

const HmoRegistrationForm = ({ onSubmit }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<HmoRegistrationFormValues>(emptyForm);

  const update = <K extends keyof HmoRegistrationFormValues>(
    key: K,
    value: HmoRegistrationFormValues[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    update("tariffFileName", file?.name ?? "");
  };

  const handleConfirm = () => {
    if (!form.name.trim() || !form.code.trim()) {
      toast.error("HMO name and code are required.");
      return;
    }

    onSubmit({
      id: `hmo-${Date.now()}`,
      name: form.name.trim().toUpperCase(),
      code: form.code.trim().toUpperCase(),
      hmoType: "HMO" as HmoType,
      preAuthCode: form.preAuthCode,
      officeAddress: form.officeAddress.trim() || "—",
      phoneNumber: form.mobileNumber.trim() || form.contactNumber.trim() || "—",
      contactPerson: form.contactNumber.trim() || "—",
      email: form.email.trim() || "—",
    });

    setForm(emptyForm);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast.success("HMO registered successfully.");
  };

  return (
    <div className="w-full rounded-[10px] border-[0.5px] border-[#A5A5A5] bg-white p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold tracking-[-0.4px] text-black">
          NEW HMO REGISTRATION FORM
        </h2>
        <p className="mt-1 text-base font-light tracking-[-0.32px] text-[#626262]">
          Enter the credentials of your HMO form
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <label className="block space-y-1.5">
            <span className="text-[15px] tracking-[-0.3px] text-black">
              HMO Name
            </span>
            <input
              type="text"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="-Enter HMO name-"
              className={fieldClass}
            />
          </label>

          <label className="block space-y-1.5">
            <span className="text-[15px] tracking-[-0.3px] text-black">
              HMO Code
            </span>
            <input
              type="text"
              value={form.code}
              onChange={(e) => update("code", e.target.value)}
              placeholder="-Enter insurance code-"
              className={fieldClass}
            />
            <span className="flex items-center gap-1 text-xs italic tracking-[-0.24px] text-[#626262]">
              <Info className="h-4 w-4 shrink-0" />
              Abbreviate first letter of the each words
            </span>
          </label>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <label className="block space-y-1.5">
            <span className="text-[15px] tracking-[-0.3px] text-black">
              HMO Organisation Name
            </span>
            <div className="relative">
              <select
                value={form.organisationName}
                onChange={(e) => update("organisationName", e.target.value)}
                className={`${selectClass} ${!form.organisationName ? "italic text-[#808080]" : ""}`}
              >
                <option value="">-Select an Option-</option>
                {HMO_ORGANISATION_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-gray-500" />
            </div>
          </label>

          <label className="block space-y-1.5">
            <span className="text-[15px] tracking-[-0.3px] text-black">
              Pre-Authorization Code
            </span>
            <div className="relative">
              <select
                value={form.preAuthCode}
                onChange={(e) =>
                  update(
                    "preAuthCode",
                    e.target.value as HmoRegistrationFormValues["preAuthCode"],
                  )
                }
                className={selectClass}
              >
                {PRE_AUTH_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-gray-500" />
            </div>
          </label>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <label className="block space-y-1.5">
            <span className="text-[15px] tracking-[-0.3px] text-black">
              HMO Office Address
            </span>
            <input
              type="text"
              value={form.officeAddress}
              onChange={(e) => update("officeAddress", e.target.value)}
              placeholder="-Enter HMO office address-"
              className={fieldClass}
            />
          </label>

          <label className="block space-y-1.5">
            <span className="text-[15px] tracking-[-0.3px] text-black">
              HMO Mobile Number
            </span>
            <div className="flex h-11 items-center gap-2 rounded-lg border-[0.5px] border-black bg-[#FAFAFA] px-4">
              <span className="text-base text-[#A5A5A5]">+234</span>
              <span className="text-[#A5A5A5]">|</span>
              <input
                type="tel"
                value={form.mobileNumber}
                onChange={(e) => update("mobileNumber", e.target.value)}
                placeholder="8012345678"
                className="min-w-0 flex-1 bg-transparent text-[15px] text-black outline-none placeholder:text-[#A5A5A5]"
              />
            </div>
          </label>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <label className="block space-y-1.5">
            <span className="text-[15px] tracking-[-0.3px] text-black">
              HMO Contact Number
            </span>
            <input
              type="text"
              value={form.contactNumber}
              onChange={(e) => update("contactNumber", e.target.value)}
              placeholder="-Enter HMO contact number-"
              className={fieldClass}
            />
          </label>

          <label className="block space-y-1.5">
            <span className="text-[15px] tracking-[-0.3px] text-black">
              HMO Email Address
            </span>
            <input
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="-Enter HMO email address-"
              className={fieldClass}
            />
          </label>
        </div>

        <label className="block space-y-1.5">
          <span className="text-[15px] tracking-[-0.3px] text-black">
            Upload HMO Tariff
          </span>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex h-11 w-full items-center justify-between rounded-lg border-[0.5px] border-black bg-[#FAFAFA] px-4 text-left"
          >
            <span className="truncate text-[15px] italic text-[#808080]">
              {form.tariffFileName || "-Leadway HMO Sample Tariff.xls-"}
            </span>
            <Upload className="h-5 w-5 shrink-0 text-[#573FD1]" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.xls,.xlsx"
            className="hidden"
            onChange={handleFileChange}
          />
          <span className="flex items-center gap-1 text-xs italic tracking-[-0.24px] text-[#626262]">
            <Info className="h-4 w-4 shrink-0" />
            format .CSV
          </span>
        </label>

        <div className="flex justify-center pt-2">
          <button
            type="button"
            onClick={handleConfirm}
            className="h-10 w-full max-w-[458px] rounded-lg border border-[#573FD1] bg-[#573FD1] text-[15px] font-semibold tracking-[-0.3px] text-white transition hover:bg-[#4a35b8]"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default HmoRegistrationForm;
