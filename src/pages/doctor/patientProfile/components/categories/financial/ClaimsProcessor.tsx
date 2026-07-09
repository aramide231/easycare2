import { useCallback, useState, type Dispatch, type SetStateAction } from "react";
import {
  formFieldInputClass,
  formFieldSelectClass,
  formFieldTextareaClass,
} from "../../../lib/formFieldStyles";
import { usePendingCategoryDraft } from "../../../hooks/usePendingCategoryDraft";

type ClaimAction = "" | "Decline" | "Pend" | "Accept";

type ClaimLineItem = {
  details: string;
  cost: string;
  paAuthCode: string;
  action: ClaimAction;
};

const CLAIM_ACTION_OPTIONS: ClaimAction[] = ["Decline", "Pend", "Accept"];

const CLAIM_ROW_GRID_CLASS =
  "grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,2fr)_minmax(110px,1fr)_minmax(130px,1fr)_minmax(120px,1fr)_minmax(100px,auto)] md:items-center";

function formatClaimCost(cost: string): string {
  const amount = Number(cost.replace(/\D/g, ""));
  if (!Number.isFinite(amount) || amount <= 0) return "";
  return `N ${amount.toLocaleString()}`;
}

function actionToStatus(action: ClaimAction): string {
  if (action === "Decline") return "DECLINED";
  if (action === "Pend") return "PEND";
  if (action === "Accept") return "ACCEPT";
  return "";
}

function ClaimStatusBadge({ action }: { action: ClaimAction }) {
  const status = actionToStatus(action);
  if (!status) {
    return <span className="text-sm text-gray-400">—</span>;
  }

  const toneClass =
    action === "Decline"
      ? "bg-red-500 text-white"
      : action === "Pend"
        ? "bg-yellow-400 text-gray-900"
        : "bg-green-500 text-white";

  return (
    <span
      className={`inline-flex min-w-[88px] items-center justify-center rounded-md px-3 py-2 text-xs font-bold uppercase tracking-wide ${toneClass}`}
    >
      {status}
    </span>
  );
}

function ClaimSectionHeader({ title }: { title: string }) {
  return (
    <div className="border-b border-gray-200 pb-0 pt-2">
      <span className="inline-block rounded-t-md bg-[#573FD1] px-4 py-2 text-xs font-bold uppercase tracking-wide text-white shadow-sm">
        {title}
      </span>
    </div>
  );
}

function ClaimLineRows({
  items,
  onChange,
  emptyMessage,
}: {
  items: ClaimLineItem[];
  onChange: (index: number, field: keyof ClaimLineItem, value: string) => void;
  emptyMessage: string;
}) {
  if (items.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-gray-400">{emptyMessage}</p>
    );
  }

  return (
    <div className="space-y-3">
      <div className={`hidden ${CLAIM_ROW_GRID_CLASS} px-1 text-xs font-semibold uppercase tracking-wide text-gray-500 md:grid`}>
        <span>Details</span>
        <span>Cost</span>
        <span>P.Auth Code</span>
        <span>Action</span>
        <span>Status</span>
      </div>

      {items.map((item, index) => (
        <div key={`${item.details}-${index}`} className={CLAIM_ROW_GRID_CLASS}>
          <div className="min-w-0">
            <p className="mb-1 text-xs font-semibold uppercase text-gray-500 md:hidden">
              Details
            </p>
            <input
              type="text"
              readOnly
              value={item.details}
              className={`${formFieldInputClass} bg-gray-100`}
            />
          </div>

          <div className="min-w-0">
            <p className="mb-1 text-xs font-semibold uppercase text-gray-500 md:hidden">
              Cost
            </p>
            <input
              type="text"
              readOnly
              value={formatClaimCost(item.cost)}
              className={`${formFieldInputClass} bg-gray-100`}
            />
          </div>

          <div className="min-w-0">
            <p className="mb-1 text-xs font-semibold uppercase text-gray-500 md:hidden">
              P.Auth Code
            </p>
            <input
              type="text"
              value={item.paAuthCode}
              onChange={(e) => onChange(index, "paAuthCode", e.target.value)}
              placeholder="Enter PA Code"
              className={formFieldInputClass}
            />
          </div>

          <div className="min-w-0">
            <p className="mb-1 text-xs font-semibold uppercase text-gray-500 md:hidden">
              Action
            </p>
            <select
              value={item.action}
              onChange={(e) => onChange(index, "action", e.target.value)}
              className={formFieldSelectClass}
            >
              <option value="">-Select-</option>
              {CLAIM_ACTION_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="min-w-0">
            <p className="mb-1 text-xs font-semibold uppercase text-gray-500 md:hidden">
              Status
            </p>
            <ClaimStatusBadge action={item.action} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ClaimsProcessor() {
  const [presentingComplaints, setPresentingComplaints] = useState("");
  const [clinicalDiagnosis, setClinicalDiagnosis] = useState("");
  const [consultations, setConsultations] = useState<ClaimLineItem[]>([]);
  const [investigations, setInvestigations] = useState<ClaimLineItem[]>([]);

  const clearForm = useCallback(() => {
    setPresentingComplaints("");
    setClinicalDiagnosis("");
    setConsultations([]);
    setInvestigations([]);
  }, []);

  usePendingCategoryDraft(
    "CLAIMS PROCESSOR",
    () => {
      const hasContent =
        presentingComplaints.trim() ||
        clinicalDiagnosis.trim() ||
        consultations.length > 0 ||
        investigations.length > 0;

      if (!hasContent) return null;

      return {
        presentingComplaints,
        clinicalDiagnosis,
        consultations: JSON.stringify(consultations),
        investigations: JSON.stringify(investigations),
      };
    },
    [presentingComplaints, clinicalDiagnosis, consultations, investigations],
    clearForm
  );

  const updateLineItems = (
    setter: Dispatch<SetStateAction<ClaimLineItem[]>>,
    index: number,
    field: keyof ClaimLineItem,
    value: string
  ) => {
    setter((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  return (
    <div className="space-y-6 text-sm">
      <div className="min-w-0">
        <label className="mb-1 block text-sm font-semibold uppercase tracking-wide text-gray-800">
          Presenting Complaints
        </label>
        <textarea
          rows={5}
          value={presentingComplaints}
          onChange={(e) => setPresentingComplaints(e.target.value)}
          placeholder="Enter presenting complaints"
          className={formFieldTextareaClass}
        />
      </div>

      <div className="min-w-0">
        <label className="mb-1 block text-sm font-semibold uppercase tracking-wide text-gray-800">
          Clinical Diagnosis
        </label>
        <input
          type="text"
          value={clinicalDiagnosis}
          onChange={(e) => setClinicalDiagnosis(e.target.value)}
          placeholder="Enter clinical diagnosis"
          className={formFieldInputClass}
        />
      </div>

      <div className="space-y-3">
        <ClaimSectionHeader title="Consultation" />
        <ClaimLineRows
          items={consultations}
          emptyMessage="No consultation items yet."
          onChange={(index, field, value) =>
            updateLineItems(setConsultations, index, field, value)
          }
        />
      </div>

      <div className="space-y-3">
        <ClaimSectionHeader title="Investigations" />
        <ClaimLineRows
          items={investigations}
          emptyMessage="No investigation items yet."
          onChange={(index, field, value) =>
            updateLineItems(setInvestigations, index, field, value)
          }
        />
      </div>
    </div>
  );
}
