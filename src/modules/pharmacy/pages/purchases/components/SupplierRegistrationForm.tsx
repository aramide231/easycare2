import { useState } from "react";
import { Info } from "lucide-react";
import { toast } from "react-toastify";
import {
  formFieldInputClass,
  formFieldSelectClass,
} from "@/pages/doctor/patientProfile/lib/formFieldStyles";
import { SUPPLIER_TITLES, type SupplierFormValues } from "../data/purchasesFigma";
import CountryCodeSelect from "./CountryCodeSelect";

type Props = {
  onConfirm: (values: SupplierFormValues) => void;
};

const EMPTY_FORM: SupplierFormValues = {
  supplierName: "",
  title: "Miss",
  orgName: "",
  phoneCountryIso: "ng",
  phoneCountryCode: "+234",
  phoneNumber: "",
  alternatePhoneCountryIso: "ng",
  alternatePhoneCountryCode: "+234",
  alternatePhoneNumber: "",
  invoiceNumber: "",
  email: "",
  officeAddress: "",
};

function PhoneField({
  label,
  countryIso,
  onCountryChange,
  value,
  onChange,
}: {
  label: string;
  countryIso: string;
  onCountryChange: (iso: string, dial: string) => void;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="flex h-[45px] overflow-visible rounded-[8px] border-[0.5px] border-black bg-[#FAFAFA] focus-within:border-[#573FD1] focus-within:ring-1 focus-within:ring-[#573FD1]">
        <CountryCodeSelect
          value={countryIso}
          onChange={onCountryChange}
          ariaLabel={`${label} country code`}
        />
        <input
          type="tel"
          value={value}
          onChange={(e) =>
            onChange(e.target.value.replace(/[^0-9]/g, "").slice(0, 12))
          }
          className="h-full w-full rounded-r-[8px] bg-transparent px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
          placeholder="8012345678"
        />
      </div>
    </div>
  );
}

export default function SupplierRegistrationForm({ onConfirm }: Props) {
  const [form, setForm] = useState<SupplierFormValues>(EMPTY_FORM);

  const handleConfirm = () => {
    if (
      !form.supplierName.trim() ||
      !form.orgName.trim() ||
      !form.phoneNumber.trim() ||
      !form.invoiceNumber.trim()
    ) {
      toast.error("Fill in supplier name, organization, phone, and invoice.");
      return;
    }

    onConfirm({
      ...form,
      supplierName: form.supplierName.trim(),
      orgName: form.orgName.trim(),
      invoiceNumber: form.invoiceNumber.trim(),
      email: form.email.trim(),
      officeAddress: form.officeAddress.trim(),
    });
    setForm(EMPTY_FORM);
    toast.success("Supplier registered.");
  };

  return (
    <div className="mb-8 w-full max-w-5xl rounded-lg border border-gray-200 bg-white p-6 shadow-sm md:p-8">
      <h2 className="text-base font-bold uppercase tracking-wide text-gray-900">
        New Supplier Registration Form
      </h2>
      <p className="mb-6 mt-1 text-sm text-gray-500">
        Supply the following information
      </p>

      <div className="space-y-4">
        {/* Row 1: Name + Title | Organization */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="grid grid-cols-[minmax(0,1fr)_110px] gap-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Supplier&apos;s Name
              </label>
              <input
                type="text"
                value={form.supplierName}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, supplierName: e.target.value }))
                }
                className={formFieldInputClass}
                placeholder="-Enter supplier's name-"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Title
              </label>
              <select
                value={form.title}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, title: e.target.value }))
                }
                className={formFieldSelectClass}
              >
                {SUPPLIER_TITLES.map((title) => (
                  <option key={title} value={title}>
                    {title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Supplier&apos;s Organization Name
            </label>
            <input
              type="text"
              value={form.orgName}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, orgName: e.target.value }))
              }
              className={formFieldInputClass}
              placeholder="-Enter company's name-"
            />
          </div>
        </div>

        {/* Row 2: Phone | Alternate Phone */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <PhoneField
            label="Supplier's Phone Number"
            countryIso={form.phoneCountryIso}
            onCountryChange={(iso, dial) =>
              setForm((prev) => ({
                ...prev,
                phoneCountryIso: iso,
                phoneCountryCode: dial,
              }))
            }
            value={form.phoneNumber}
            onChange={(phoneNumber) =>
              setForm((prev) => ({ ...prev, phoneNumber }))
            }
          />
          <PhoneField
            label="Supplier's Alternate Phone Number"
            countryIso={form.alternatePhoneCountryIso}
            onCountryChange={(iso, dial) =>
              setForm((prev) => ({
                ...prev,
                alternatePhoneCountryIso: iso,
                alternatePhoneCountryCode: dial,
              }))
            }
            value={form.alternatePhoneNumber}
            onChange={(alternatePhoneNumber) =>
              setForm((prev) => ({ ...prev, alternatePhoneNumber }))
            }
          />
        </div>

        {/* Row 3: Invoice | Email */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Invoice Number
            </label>
            <input
              type="text"
              value={form.invoiceNumber}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, invoiceNumber: e.target.value }))
              }
              className={formFieldInputClass}
              placeholder="-Enter invoice number-"
            />
            <p className="mt-1.5 flex items-start gap-1.5 text-xs text-gray-500">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
              <span>
                See invoice number on the paper received during purchase
              </span>
            </p>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Supplier&apos;s Email Address
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, email: e.target.value }))
              }
              className={formFieldInputClass}
              placeholder="-Enter supplier's email address-"
            />
          </div>
        </div>

        {/* Row 4: Office Address full width */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Supplier&apos;s Office Address
          </label>
          <input
            type="text"
            value={form.officeAddress}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, officeAddress: e.target.value }))
            }
            className={formFieldInputClass}
            placeholder="-Enter office address of the supplier-"
          />
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <button
          type="button"
          onClick={handleConfirm}
          className="w-full max-w-lg rounded-lg bg-[#573FD1] px-8 py-3 text-sm font-semibold text-white hover:bg-[#4a35b8]"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
