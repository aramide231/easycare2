import { X, Printer } from "lucide-react";
import {
  formatAmount,
  type RequisitionRecord,
} from "../data/mockRequisitionRecords";

type Props = {
  record: RequisitionRecord;
  open: boolean;
  onClose: () => void;
};

const RequisitionViewModal = ({ record, open, onClose }: Props) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label="Close preview"
        onClick={onClose}
      />
      <aside
        className="relative flex h-full w-full max-w-xl flex-col bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="requisition-view-title"
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2
            id="requisition-view-title"
            className="text-lg font-bold text-gray-900"
          >
            Requisition Details
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          <div className="mb-6 rounded-lg border border-purple-100 bg-purple-50 px-4 py-3">
            <p className="text-sm font-semibold uppercase text-gray-900">
              {record.name}
            </p>
            <p className="text-xs text-gray-600">
              {record.mobileNo} | {record.gender}
            </p>
            <p className="mt-1 text-xs text-gray-600">
              <span className="font-medium text-gray-700">ID:</span> {record.id}
            </p>
          </div>

          <dl className="space-y-4 text-sm">
            <div className="flex justify-between gap-4 border-b border-gray-100 pb-3">
              <dt className="text-gray-500">Date</dt>
              <dd className="font-medium text-gray-900">{record.dateLabel}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-gray-100 pb-3">
              <dt className="text-gray-500">Time</dt>
              <dd className="font-medium text-gray-900">{record.timeLabel}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-gray-100 pb-3">
              <dt className="text-gray-500">Patient Type</dt>
              <dd className="font-medium text-gray-900">{record.patientType}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-gray-100 pb-3">
              <dt className="text-gray-500">Amount</dt>
              <dd className="font-medium text-gray-900">
                {formatAmount(record.amount)}
              </dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-gray-100 pb-3">
              <dt className="text-gray-500">Staff</dt>
              <dd className="text-right font-medium text-gray-900">
                <div>{record.staffName}</div>
                <div className="text-xs font-normal text-gray-500">
                  {record.staffMobile}
                </div>
              </dd>
            </div>
            {record.remark && (
              <div className="flex justify-between gap-4 border-b border-gray-100 pb-3">
                <dt className="text-gray-500">Remark</dt>
                <dd className="max-w-[60%] text-right font-medium text-gray-900">
                  {record.remark}
                </dd>
              </div>
            )}
          </dl>

          <div className="mt-6">
            <h3 className="mb-3 text-sm font-semibold text-gray-800">
              Requested Items
            </h3>
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                  <tr>
                    <th className="px-3 py-2 font-medium">Item</th>
                    <th className="px-3 py-2 font-medium">Qty</th>
                    <th className="px-3 py-2 font-medium">Unit</th>
                    <th className="px-3 py-2 font-medium">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {record.items.map((item) => (
                    <tr key={item.name} className="border-t border-gray-100">
                      <td className="px-3 py-2">{item.name}</td>
                      <td className="px-3 py-2">{item.quantity}</td>
                      <td className="px-3 py-2">{item.unit}</td>
                      <td className="px-3 py-2">
                        {formatAmount(item.quantity * item.unitPrice)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 px-6 py-4">
          <button
            type="button"
            onClick={() => window.print()}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#573FD1] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#4a35b8]"
          >
            <Printer className="h-4 w-4" />
            Print
          </button>
        </div>
      </aside>
    </div>
  );
};

export default RequisitionViewModal;
