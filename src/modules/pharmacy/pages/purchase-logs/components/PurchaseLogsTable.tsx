import { useEffect, useMemo, useRef, useState } from "react";
import ExportButton from "@pharmacy/shared/ExportButton";
import DateRangeFilter from "@/components/ui/DateRangeFilter";
import LogSearchBar from "@pharmacy/shared/components/LogSearchBar";
import PharmacyTablePagination from "../../components/PharmacyTablePagination";
import {
  PURCHASE_LOG_ROWS,
  PURCHASE_LOGS_DEFAULT_RANGE,
  type PurchaseLogRow,
} from "../data/purchaseLogsFigma";

const PAGE_SIZE = 10;
const FIGMA_TOTAL_PAGES = 70;

export default function PurchaseLogsTable() {
  const tableRef = useRef<HTMLTableElement>(null);
  const [rows] = useState<PurchaseLogRow[]>(() => PURCHASE_LOG_ROWS);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dateRange, setDateRange] = useState({
    startDate: PURCHASE_LOGS_DEFAULT_RANGE.startDate,
    endDate: PURCHASE_LOGS_DEFAULT_RANGE.endDate,
  });

  const filtered = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return rows.filter((row) => row.medication.toLowerCase().includes(q));
  }, [rows, searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, dateRange]);

  const paginatedRows = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  useEffect(() => {
    if (currentPage > FIGMA_TOTAL_PAGES) {
      setCurrentPage(FIGMA_TOTAL_PAGES);
    }
  }, [currentPage]);

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:gap-6">
        <h1 className="shrink-0 text-xl font-bold text-gray-800">
          Purchase Logs
        </h1>
        <LogSearchBar
          placeholder="Search for medications A-Z list from the database"
          value={searchTerm}
          onChange={setSearchTerm}
          className="w-full flex-1"
        />
        <div className="flex shrink-0 items-center gap-3">
          <DateRangeFilter
            value={dateRange}
            onChange={setDateRange}
            align="right"
          />
          <ExportButton reportTitle="Purchase Logs" tableRef={tableRef} />
        </div>
      </div>

      <div className="overflow-x-auto border-t border-gray-200 pt-4">
        <table ref={tableRef} className="min-w-full text-left text-sm">
          <thead className="border-b border-[#D4D4D4] text-xs uppercase text-gray-500">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium">S/N</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium">
                Date | Time
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium">
                Medication
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium">
                Opening Stock
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium">
                No of Packs Pur.
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium">
                Total Quantity
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium">
                Expiry Date
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium">
                Cost Price (N)
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium">
                Selling Price (N)
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedRows.length > 0 ? (
              paginatedRows.map((row, index) => (
                <tr
                  key={row.id}
                  className={`border-b border-[#D4D4D4] ${
                    index % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]"
                  }`}
                >
                  <td className="whitespace-nowrap px-4 py-3">
                    {(currentPage - 1) * PAGE_SIZE + index + 1}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <div>{row.date}</div>
                    <div className="text-xs text-gray-500">{row.time}</div>
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {row.medication}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {row.openingStock}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {row.packsPurchased}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {row.totalQuantity}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {row.expiryDate}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {row.costPrice}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {row.sellingPrice}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={9}
                  className="px-4 py-10 text-center text-sm text-gray-500"
                >
                  No purchase logs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <PharmacyTablePagination
        currentPage={currentPage}
        totalPages={FIGMA_TOTAL_PAGES}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
