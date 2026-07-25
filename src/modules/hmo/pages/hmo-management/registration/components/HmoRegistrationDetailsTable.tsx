import { useMemo, useRef, useState } from "react";
import { HMO_PAGE_SIZE } from "@hmo/pages/shared/lib/pagination";
import { getPatientTypeClass } from "@hmo/pages/shared/lib/patientTypeStyles";
import { usePaginatedList } from "@/hooks/usePaginatedList";
import TablePagination from "@hmo/shared/components/TablePagination";
import type { HmoRegistrationRecord } from "../data/mockHmoRegistrationRecords";
import HmoRegistrationDetailCard from "./HmoRegistrationDetailCard";

type Props = {
  records: HmoRegistrationRecord[];
  onDelete?: (id: string) => void;
};

const HmoRegistrationDetailsTable = ({ records, onDelete }: Props) => {
  const tableWrapRef = useRef<HTMLDivElement>(null);
  const hideTimerRef = useRef<number | null>(null);

  const [hoveredRecord, setHoveredRecord] = useState<HmoRegistrationRecord | null>(
    null,
  );
  const [cardTop, setCardTop] = useState(0);

  const { currentPage, setCurrentPage, totalPages, paginatedItems } =
    usePaginatedList(records, HMO_PAGE_SIZE);

  const startIndex = useMemo(
    () => (currentPage - 1) * HMO_PAGE_SIZE,
    [currentPage],
  );

  const clearHideTimer = () => {
    if (hideTimerRef.current !== null) {
      window.clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  };

  const showCardForRow = (
    record: HmoRegistrationRecord,
    rowElement: HTMLTableRowElement,
  ) => {
    clearHideTimer();
    const wrap = tableWrapRef.current;
    if (!wrap) return;

    const wrapRect = wrap.getBoundingClientRect();
    const rowRect = rowElement.getBoundingClientRect();
    const nextTop = rowRect.top - wrapRect.top + wrap.scrollTop;
    const maxTop = Math.max(0, wrap.scrollHeight - 320);

    setHoveredRecord(record);
    setCardTop(Math.min(Math.max(0, nextTop - 8), maxTop));
  };

  const scheduleHideCard = () => {
    clearHideTimer();
    hideTimerRef.current = window.setTimeout(() => {
      setHoveredRecord(null);
    }, 120);
  };

  return (
    <div
      ref={tableWrapRef}
      className="relative w-full rounded-[15px] border border-[#D4D4D4] bg-white p-5"
      onMouseLeave={scheduleHideCard}
    >
      <div className="mb-4 border-b border-[#D4D4D4] pb-4">
        <h3 className="text-base font-semibold tracking-[-0.32px] text-black">
          HMO DETAILS
        </h3>
      </div>

      <div className="overflow-x-auto pr-[290px]">
        <table className="min-w-[1240px] w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-[#D4D4D4]">
              {[
                "S/N",
                "HMO NAME",
                "HMO CODE",
                "HMO-TYPE",
                "PRE-AUTH CODE",
                "HMO OFFICE ADDRESS",
                "HMO PHONE NO",
                "HMO CONTACT PERSON",
                "HMO EMAIL ADDRESS",
                "ACTION",
              ].map((header) => (
                <th
                  key={header}
                  className="px-4 py-3 text-xs font-medium tracking-[-0.24px] text-[#A5A5A5]"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedItems.map((record, index) => {
              const isHovered = hoveredRecord?.id === record.id;

              return (
                <tr
                  key={record.id}
                  className={`border-b border-[#D4D4D4] transition-colors last:border-b-0 ${
                    isHovered ? "bg-[#EEECFA]" : "hover:bg-[#EEECFA]/70"
                  }`}
                  onMouseEnter={(event) =>
                    showCardForRow(record, event.currentTarget)
                  }
                >
                  <td className="px-4 py-4 text-[15px] tracking-[-0.3px] text-black">
                    {startIndex + index + 1}
                  </td>
                  <td className="px-4 py-4 text-[15px] tracking-[-0.3px] text-black">
                    {record.name}
                  </td>
                  <td className="px-4 py-4 text-[15px] tracking-[-0.3px] text-black">
                    {record.code}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex rounded-lg border-[0.5px] px-2 py-1 text-xs font-medium tracking-[-0.24px] ${getPatientTypeClass(record.hmoType)}`}
                    >
                      {record.hmoType}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-[15px] tracking-[-0.3px] text-black">
                    {record.preAuthCode}
                  </td>
                  <td className="px-4 py-4 text-[15px] tracking-[-0.3px] text-black">
                    {record.officeAddress}
                  </td>
                  <td className="px-4 py-4 text-[15px] tracking-[-0.3px] text-black">
                    {record.phoneNumber}
                  </td>
                  <td className="px-4 py-4 text-[15px] tracking-[-0.3px] text-black">
                    {record.contactPerson}
                  </td>
                  <td className="px-4 py-4 text-[15px] tracking-[-0.3px] text-black">
                    {record.email}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onMouseEnter={(event) => {
                          const row = event.currentTarget.closest("tr");
                          if (row instanceof HTMLTableRowElement) {
                            showCardForRow(record, row);
                          }
                        }}
                        className="rounded-lg border border-[#00C851] bg-[#E6FAEE] px-2 py-1 text-xs font-semibold tracking-[-0.24px] text-[#00C851]"
                      >
                        VIEW
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete?.(record.id)}
                        className="rounded-lg border border-[#FC3131] bg-[#FFCFCC] px-2 py-1 text-xs font-semibold tracking-[-0.24px] text-[#FF3B30]"
                      >
                        DELETE
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {hoveredRecord && (
        <div
          className="pointer-events-auto absolute right-5 z-20"
          style={{ top: cardTop }}
          onMouseEnter={clearHideTimer}
          onMouseLeave={scheduleHideCard}
        >
          <HmoRegistrationDetailCard record={hoveredRecord} />
        </div>
      )}

      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        className="mt-4 border-t-0 pt-2"
      />
    </div>
  );
};

export default HmoRegistrationDetailsTable;
