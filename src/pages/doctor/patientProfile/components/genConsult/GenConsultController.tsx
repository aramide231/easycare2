import { ChevronDown } from "lucide-react";
import {
  shouldShowGenConsultConsultationType,
} from "../../config/genConsultPatientTypes";
import {
  GEN_CONSULT_CONSULTATION_TYPES,
  getGenConsultTypeById,
} from "../../config/genConsultTypes";
import {
  setGenConsultConsultationType,
  setGenConsultPatientType,
  useGenConsultSession,
} from "../../hooks/genConsultSession";
import NairaAmountInput from "../category/NairaAmountInput";
import { formFieldSelectClass } from "../../lib/formFieldStyles";
import GenConsultPatientTypeSelect from "./GenConsultPatientTypeSelect";

export default function GenConsultController() {
  const { patientTypeId, consultationTypeId } = useGenConsultSession();
  const showConsultationType =
    shouldShowGenConsultConsultationType(patientTypeId);
  const selectedConsultation = getGenConsultTypeById(consultationTypeId);

  return (
    <div className="mb-4 space-y-4 rounded-lg border border-[#573FD1]/20 bg-purple-50/40 p-4">
      <div>
        <label className="mb-1 block text-sm font-semibold text-gray-800">
          Select Patient Type
        </label>
        <GenConsultPatientTypeSelect
          value={patientTypeId}
          onChange={setGenConsultPatientType}
        />
      </div>

      {showConsultationType ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-[minmax(0,1fr)_160px] sm:items-end">
          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-800">
              Select Consultation Type
            </label>
            <div className="relative">
              <select
                value={consultationTypeId ?? ""}
                onChange={(e) =>
                  setGenConsultConsultationType(e.target.value || null)
                }
                className={`${formFieldSelectClass} pr-10`}
              >
                <option value="">-Select an Option-</option>
                {GEN_CONSULT_CONSULTATION_TYPES.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
                aria-hidden
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-800">
              Amount
            </label>
            <NairaAmountInput
              readOnly
              value={
                selectedConsultation ? String(selectedConsultation.price) : ""
              }
              placeholder="0"
              className="text-gray-700"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
