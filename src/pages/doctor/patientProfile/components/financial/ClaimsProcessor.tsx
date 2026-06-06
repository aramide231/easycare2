import { useMemo, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import { CLAIMS_PROCESSOR_SEED } from "../../data/claimsProcessorSeed";
import ClaimStatusBadge from "./ClaimStatusBadge";
import {
  actionToStatus,
  formatClaimCurrency,
  type ClaimAction,
  type ClaimLineItem,
  type ClaimMedicationItem,
  type ClaimsProcessorData,
} from "./claimsProcessorTypes";
import {
  genConsultInputClass,
  genConsultLabelClass,
  genConsultSelectClass,
  genConsultTextareaClass,
} from "../categories/genConsult/genConsultStyles";

const CLAIM_ACTIONS: { value: ClaimAction; label: string }[] = [
  { value: "", label: "-Select-" },
  { value: "Decline", label: "Decline" },
  { value: "Hold", label: "Hold" },
  { value: "Accept", label: "Accept" },
];

const DOSAGE_OPTIONS = ["STAT", "OD", "BD", "TDS", "QDS", "NOCTE"];
const INTERVAL_OPTIONS = ["Days", "Weeks", "Months"];
const DURATION_OPTIONS = ["1", "2", "3", "5", "7", "14"];

function formatProcessedOn(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const time = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return `${day}/${month}/${year} | ${time}`;
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-3 border-b-2 border-[#573FD1] pb-0">
      <span className="inline-block rounded-t-md bg-[#573FD1] px-4 py-2 text-xs font-bold uppercase tracking-wide text-white">
        {title}
      </span>
    </div>
  );
}

const inputClass = genConsultInputClass.replace("max-w-[354px]", "max-w-none");
const selectClass = genConsultSelectClass.replace("max-w-[354px]", "max-w-none");
const textareaClass = genConsultTextareaClass.replace(
  "max-w-[354px]",
  "max-w-none",
);

type ServiceRowProps = {
  item: ClaimLineItem;
  onChange: (id: string, patch: Partial<ClaimLineItem>) => void;
};

function ClaimServiceRow({ item, onChange }: ServiceRowProps) {
  const handleActionChange = (action: ClaimAction) => {
    onChange(item.id, { action, status: actionToStatus(action) });
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-12 md:items-end">
        <div className="md:col-span-5">
          <label className={genConsultLabelClass}>Details</label>
          <input
            type="text"
            value={item.details}
            readOnly
            className={`${inputClass} bg-gray-50`}
          />
        </div>
        <div className="md:col-span-2">
          <label className={genConsultLabelClass}>Cost</label>
          <input
            type="text"
            value={formatClaimCurrency(item.cost)}
            readOnly
            className={`${inputClass} bg-gray-100 font-semibold`}
          />
        </div>
        <div className="md:col-span-5">
          <label className={genConsultLabelClass}>P.Auth Code</label>
          <input
            type="text"
            value={item.paAuthCode}
            onChange={(e) => onChange(item.id, { paAuthCode: e.target.value })}
            placeholder="Enter PA Code"
            className={inputClass}
          />
        </div>
      </div>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 md:max-w-md">
        <div>
          <label className={genConsultLabelClass}>Action</label>
          <select
            value={item.action}
            onChange={(e) => handleActionChange(e.target.value as ClaimAction)}
            className={selectClass}
          >
            {CLAIM_ACTIONS.map((opt) => (
              <option key={opt.label} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={genConsultLabelClass}>Status</label>
          <ClaimStatusBadge status={item.status} />
        </div>
      </div>
    </div>
  );
}

type MedicationRowProps = {
  item: ClaimMedicationItem;
  onChange: (id: string, patch: Partial<ClaimMedicationItem>) => void;
};

function ClaimMedicationRow({ item, onChange }: MedicationRowProps) {
  const handleActionChange = (action: ClaimAction) => {
    onChange(item.id, { action, status: actionToStatus(action) });
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        <div>
          <label className={genConsultLabelClass}>Details</label>
          <input
            type="text"
            value={item.details}
            readOnly
            className={`${inputClass} bg-gray-50`}
          />
        </div>
        <div>
          <label className={genConsultLabelClass}>Strength</label>
          <input
            type="text"
            value={item.strength}
            readOnly
            className={`${inputClass} bg-gray-50`}
          />
        </div>
        <div>
          <label className={genConsultLabelClass}>Dosage</label>
          <select value={item.dosage} disabled className={selectClass}>
            {DOSAGE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={genConsultLabelClass}>Intervals</label>
          <select value={item.intervals} disabled className={selectClass}>
            {INTERVAL_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={genConsultLabelClass}>Duration</label>
          <select value={item.duration} disabled className={selectClass}>
            {DURATION_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-12 md:items-end">
        <div className="md:col-span-1">
          <label className={genConsultLabelClass}>Qty</label>
          <input
            type="text"
            value={item.qty}
            readOnly
            className={`${inputClass} bg-gray-50`}
          />
        </div>
        <div className="md:col-span-2">
          <label className={genConsultLabelClass}>Period (Days)</label>
          <input
            type="text"
            value={item.period}
            readOnly
            className={`${inputClass} bg-gray-50`}
          />
        </div>
        <div className="md:col-span-2">
          <label className={genConsultLabelClass}>Cost</label>
          <input
            type="text"
            value={formatClaimCurrency(item.cost)}
            readOnly
            className={`${inputClass} bg-gray-100 font-semibold`}
          />
        </div>
        <div className="md:col-span-3">
          <label className={genConsultLabelClass}>P.Auth Code</label>
          <input
            type="text"
            value={item.paAuthCode}
            onChange={(e) => onChange(item.id, { paAuthCode: e.target.value })}
            placeholder="Enter PA Code"
            className={inputClass}
          />
        </div>
        <div className="md:col-span-2">
          <label className={genConsultLabelClass}>Action</label>
          <select
            value={item.action}
            onChange={(e) => handleActionChange(e.target.value as ClaimAction)}
            className={selectClass}
          >
            {CLAIM_ACTIONS.map((opt) => (
              <option key={opt.label} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2">
          <label className={genConsultLabelClass}>Status</label>
          <ClaimStatusBadge status={item.status} />
        </div>
      </div>
    </div>
  );
}

function updateLineItems<T extends ClaimLineItem>(
  items: T[],
  id: string,
  patch: Partial<T>,
): T[] {
  return items.map((item) => (item.id === id ? { ...item, ...patch } : item));
}

export default function ClaimsProcessor() {
  const { user } = useAuth();
  const [data, setData] = useState<ClaimsProcessorData>(CLAIMS_PROCESSOR_SEED);
  const processedOn = useMemo(() => formatProcessedOn(new Date()), []);
  const processedBy = (user?.fullName ?? "JOHN DOE").toUpperCase();

  const totalFee = useMemo(() => {
    const allCosts = [
      ...data.consultations,
      ...data.investigations,
      ...data.medications,
      ...data.procedures,
    ].map((item) => item.cost);
    return allCosts.reduce((sum, cost) => sum + cost, 0);
  }, [data]);

  const updateConsultation = (id: string, patch: Partial<ClaimLineItem>) => {
    setData((prev) => ({
      ...prev,
      consultations: updateLineItems(prev.consultations, id, patch),
    }));
  };

  const updateInvestigation = (id: string, patch: Partial<ClaimLineItem>) => {
    setData((prev) => ({
      ...prev,
      investigations: updateLineItems(prev.investigations, id, patch),
    }));
  };

  const updateMedication = (
    id: string,
    patch: Partial<ClaimMedicationItem>,
  ) => {
    setData((prev) => ({
      ...prev,
      medications: updateLineItems(prev.medications, id, patch),
    }));
  };

  const updateProcedure = (id: string, patch: Partial<ClaimLineItem>) => {
    setData((prev) => ({
      ...prev,
      procedures: updateLineItems(prev.procedures, id, patch),
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleConfirm = () => {
    toast.success("Claims processed successfully.");
  };

  return (
    <div className="space-y-6 pb-4">
      <SectionHeader title="Presenting Complaints" />
      <textarea
        value={data.presentingComplaints}
        readOnly
        className={`${textareaClass} min-h-[100px] bg-gray-50`}
      />

      <SectionHeader title="Clinical Diagnosis" />
      <input
        type="text"
        value={data.clinicalDiagnosis}
        readOnly
        className={`${inputClass} bg-gray-50`}
      />

      <SectionHeader title="Consultation" />
      <div className="space-y-3">
        {data.consultations.map((item) => (
          <ClaimServiceRow
            key={item.id}
            item={item}
            onChange={updateConsultation}
          />
        ))}
      </div>

      <SectionHeader title="Investigations" />
      <div className="space-y-3">
        {data.investigations.map((item) => (
          <ClaimServiceRow
            key={item.id}
            item={item}
            onChange={updateInvestigation}
          />
        ))}
      </div>

      <SectionHeader title="Medication" />
      <div className="space-y-3">
        {data.medications.map((item) => (
          <ClaimMedicationRow
            key={item.id}
            item={item}
            onChange={updateMedication}
          />
        ))}
      </div>

      <SectionHeader title="Procedure" />
      <div className="space-y-3">
        {data.procedures.length === 0 ? (
          <p className="text-sm text-gray-500">No procedures recorded.</p>
        ) : (
          data.procedures.map((item) => (
            <ClaimServiceRow
              key={item.id}
              item={item}
              onChange={updateProcedure}
            />
          ))
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 border-t border-gray-200 pt-6 md:grid-cols-2">
        <div>
          <label className={genConsultLabelClass}>Physician&apos;s Name</label>
          <input
            type="text"
            value={data.physicianName}
            readOnly
            className={`${inputClass} bg-gray-50`}
          />
        </div>
        <div>
          <label className={genConsultLabelClass}>Processed On</label>
          <input
            type="text"
            value={processedOn}
            readOnly
            className={`${inputClass} bg-gray-50`}
          />
        </div>
        <div>
          <label className={genConsultLabelClass}>Processed By</label>
          <input
            type="text"
            value={processedBy}
            readOnly
            className={`${inputClass} bg-gray-50 uppercase`}
          />
        </div>
        <div>
          <label className={genConsultLabelClass}>Patient&apos;s Signature</label>
          <input
            type="text"
            value={data.patientSignature}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                patientSignature: e.target.value,
              }))
            }
            placeholder="Sign Here"
            className={inputClass}
          />
        </div>
        <div className="md:col-span-2">
          <label className={genConsultLabelClass}>Total Fee</label>
          <input
            type="text"
            value={formatClaimCurrency(totalFee)}
            readOnly
            className={`${inputClass} max-w-md bg-gray-100 text-base font-bold`}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 pt-4">
        <button
          type="button"
          onClick={handlePrint}
          className="rounded-lg border-2 border-[#573FD1] bg-white px-10 py-2.5 text-sm font-semibold text-[#573FD1] hover:bg-purple-50"
        >
          Print
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          className="rounded-lg bg-[#573FD1] px-10 py-2.5 text-sm font-semibold text-white hover:bg-[#4a35b0]"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
