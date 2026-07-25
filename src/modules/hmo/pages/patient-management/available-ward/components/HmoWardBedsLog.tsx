import { useMemo, useState } from "react";
import { HMO_PAGE_SIZE } from "@hmo/pages/shared/lib/pagination";
import { usePaginatedList } from "@/hooks/usePaginatedList";
import LogSearchBar from "@hmo/shared/components/LogSearchBar";
import TablePagination from "@hmo/shared/components/TablePagination";
import {
  buildMockHmoWardBeds,
  formatHmoWardBedAmount,
  getHmoWardBedStatusClass,
} from "../data/mockHmoWardBeds";

const HmoWardBedsLog = () => {
  const allBeds = useMemo(() => buildMockHmoWardBeds(), []);
  const [search, setSearch] = useState("");

  const filteredBeds = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return allBeds;

    return allBeds.filter(
      (bed) =>
        bed.wardName.toLowerCase().includes(q) ||
        bed.bedNumber.toLowerCase().includes(q) ||
        bed.status.toLowerCase().includes(q),
    );
  }, [allBeds, search]);

  const { currentPage, setCurrentPage, totalPages, paginatedItems, pageSize } =
    usePaginatedList(filteredBeds, HMO_PAGE_SIZE);

  return (
    <div className="rounded-[15px] border border-[#D4D4D4] bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-bold text-gray-800">Available Ward</h1>
        <LogSearchBar
          placeholder="Search with ward name or bed number"
          value={search}
          onChange={(value) => {
            setSearch(value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-[#D4D4D4] text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-2 font-medium">SN</th>
              <th className="px-4 py-2 font-medium">WARD NAME</th>
              <th className="px-4 py-2 font-medium">BED NUMBER</th>
              <th className="px-4 py-2 font-medium">AMOUNT</th>
              <th className="px-4 py-2 font-medium">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.map((bed, index) => (
              <tr key={bed.id} className="border-b border-[#D4D4D4] bg-white">
                <td className="px-4 py-3 font-medium">
                  {(currentPage - 1) * pageSize + index + 1}
                </td>
                <td className="px-4 py-3">{bed.wardName}</td>
                <td className="px-4 py-3">{bed.bedNumber}</td>
                <td className="px-4 py-3">{formatHmoWardBedAmount(bed.amount)}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-md px-2 py-1 text-xs font-medium ${getHmoWardBedStatusClass(bed.status)}`}
                  >
                    {bed.status}
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
        className="mt-4 border-[#D4D4D4]"
      />
    </div>
  );
};

export default HmoWardBedsLog;
