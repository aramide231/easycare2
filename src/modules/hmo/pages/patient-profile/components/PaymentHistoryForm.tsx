import { useState } from "react";
import { HMO_PAGE_SIZE } from "@hmo/pages/shared/lib/pagination";
import { usePaginatedList } from "@/hooks/usePaginatedList";
import TablePagination from "@hmo/shared/components/TablePagination";
import {
  buildMockPaymentHistoryRecords,
  getPaymentTypeBadgeClass,
  type PaymentHistoryRecord,
} from "../data/mockPaymentHistoryData";
import PaymentHistoryViewModal from "./PaymentHistoryViewModal";

type Props = {
  patientDisplayName: string;
};

const viewBtnClass =
  "rounded-lg border-[0.5px] border-[#00C851] bg-[#E6FAEE] px-2 py-1 text-xs font-medium tracking-[-0.24px] text-[#33D374]";

const PaymentHistoryForm = ({ patientDisplayName }: Props) => {
  const [records] = useState(() => buildMockPaymentHistoryRecords());
  const [selectedRecord, setSelectedRecord] =
    useState<PaymentHistoryRecord | null>(null);

  const { currentPage, setCurrentPage, totalPages, paginatedItems, pageSize } =
    usePaginatedList(records, HMO_PAGE_SIZE);

  return (
    <>
      <div className="rounded-[10px] border-[0.5px] border-[#A5A5A5] p-5">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-[#D4D4D4]">
                <th className="px-4 py-3 text-xs font-medium tracking-[-0.24px] text-[#A5A5A5]">
                  S/N
                </th>
                <th className="px-4 py-3 text-xs font-medium tracking-[-0.24px] text-[#A5A5A5]">
                  TYPE
                </th>
                <th className="px-4 py-3 text-xs font-medium tracking-[-0.24px] text-[#A5A5A5]">
                  DATE | TIME
                </th>
                <th className="px-4 py-3 text-xs font-medium tracking-[-0.24px] text-[#A5A5A5]">
                  REMARK
                </th>
                <th className="px-4 py-3 text-xs font-medium tracking-[-0.24px] text-[#A5A5A5]">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedItems.map((record, index) => {
                const sn = (currentPage - 1) * pageSize + index + 1;
                const isFirstRow = index === 0;

                return (
                  <tr
                    key={record.id}
                    className={`border-b border-[#D4D4D4] last:border-b-0 ${
                      isFirstRow ? "bg-[#EDEDED]" : "bg-white"
                    }`}
                  >
                    <td className="px-4 py-4 text-[15px] tracking-[-0.3px] text-black">
                      {sn}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-lg py-1 pl-1.5 pr-2 text-xs font-medium ${getPaymentTypeBadgeClass(
                          record.type,
                        )}`}
                      >
                        <span
                          className={`h-2 w-2 rounded-full ${
                            record.type === "Deposit"
                              ? "bg-[#00C851]"
                              : "bg-[#FF3B30]"
                          }`}
                        />
                        {record.type}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-[15px] tracking-[-0.3px] text-black">
                          {record.date}
                        </span>
                        <span className="text-xs tracking-[-0.24px] text-[#626262]">
                          {record.time}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-[15px] font-medium text-[#00C851]">
                      {record.remark}
                    </td>
                    <td className="px-4 py-4">
                      <button
                        type="button"
                        onClick={() => setSelectedRecord(record)}
                        className={viewBtnClass}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          className="mt-4 border-[#D4D4D4]"
        />
      </div>

      <PaymentHistoryViewModal
        open={Boolean(selectedRecord)}
        record={selectedRecord}
        patientDisplayName={patientDisplayName}
        onClose={() => setSelectedRecord(null)}
      />
    </>
  );
};

export default PaymentHistoryForm;
