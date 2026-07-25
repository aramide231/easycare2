import { useMemo, useRef } from "react";
import { HMO_PAGE_SIZE } from "@hmo/pages/shared/lib/pagination";
import { usePaginatedList } from "@/hooks/usePaginatedList";
import TablePagination from "@hmo/shared/components/TablePagination";
import { getPatientTypeClass } from "@hmo/pages/shared/lib/patientTypeStyles";
import {
  buildMockHmoReminderRecords,
  getReminderStatusClass,
} from "../data/mockHmoReminderRecords";

const HmoViewReminders = () => {
  const tableRef = useRef<HTMLTableElement>(null);
  const records = useMemo(() => buildMockHmoReminderRecords(), []);

  const { currentPage, setCurrentPage, totalPages, paginatedItems, pageSize } =
    usePaginatedList(records, HMO_PAGE_SIZE);

  return (
    <>
      <div className="overflow-x-auto border-t border-[#D4D4D4] pt-4">
        <table ref={tableRef} className="min-w-[720px] w-full text-left text-sm">
          <thead className="border-b border-[#D4D4D4] text-xs font-medium uppercase tracking-[-0.24px] text-[#A5A5A5]">
            <tr>
              <th className="px-4 py-3">SN</th>
              <th className="px-4 py-3">PATIENT&apos;S NAME / ID</th>
              <th className="px-4 py-3">REMINDER TIME</th>
              <th className="px-4 py-3">PATIENT TYPE</th>
              <th className="px-4 py-3">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.map((record, index) => (
              <tr
                key={record.id}
                className="border-b border-[#D4D4D4] bg-white transition-colors hover:bg-[#F8F8F8]"
              >
                <td className="px-4 py-3 text-[15px] tracking-[-0.3px] text-black">
                  {(currentPage - 1) * pageSize + index + 1}
                </td>
                <td className="px-4 py-3">
                  <div className="text-[15px] tracking-[-0.3px] text-black">
                    {record.name}
                  </div>
                  <div className="text-xs tracking-[-0.24px] text-[#626262]">
                    {record.patientId} | {record.phoneNumber}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-[15px] tracking-[-0.3px] text-black">
                    {record.reminderDate}
                  </div>
                  <div className="text-xs tracking-[-0.24px] text-[#626262]">
                    {record.reminderTime}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-lg border px-2 py-1 text-xs font-medium ${getPatientTypeClass(record.patientType)}`}
                  >
                    {record.patientType}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-lg border px-2 py-1 text-xs font-medium ${getReminderStatusClass(record.status)}`}
                  >
                    {record.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        className="mt-6"
      />
    </>
  );
};

export default HmoViewReminders;
