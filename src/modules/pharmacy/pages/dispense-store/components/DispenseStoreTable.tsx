import { useEffect, useMemo, useRef, useState } from "react";
import ExportButton from "@pharmacy/shared/ExportButton";
import DateRangeFilter from "@/components/ui/DateRangeFilter";
import LogSearchBar from "@pharmacy/shared/components/LogSearchBar";
import { getTotalPages } from "@pharmacy/shared/lib/pagination";
import PharmacyAlphabetPagination from "../../components/PharmacyAlphabetPagination";
import {
  DISPENSE_STORE_DEFAULT_RANGE,
  DISPENSE_STORE_ROWS,
  type DispenseStoreRow,
} from "../data/dispenseStoreFigma";

const PAGE_SIZE = 10;

export default function DispenseStoreTable() {
  const tableRef = useRef<HTMLTableElement>(null);
  const [rows] = useState<DispenseStoreRow[]>(() => DISPENSE_STORE_ROWS);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [dateRange, setDateRange] = useState({
    startDate: DISPENSE_STORE_DEFAULT_RANGE.startDate,
    endDate: DISPENSE_STORE_DEFAULT_RANGE.endDate,
  });

  const filtered = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return rows.filter((row) => {
      const matchesSearch =
        row.name.toLowerCase().includes(q) ||
        row.medCategory.toLowerCase().includes(q) ||
        row.medType.toLowerCase().includes(q);
      const matchesLetter = activeLetter
        ? row.name.toUpperCase().startsWith(activeLetter)
        : true;
      return matchesSearch && matchesLetter;
    });
  }, [rows, searchTerm, activeLetter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeLetter, dateRange]);

  const totalPages = Math.max(1, getTotalPages(filtered.length, PAGE_SIZE));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedRows = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <LogSearchBar
          placeholder="Search for medications A-Z list from the database"
          value={searchTerm}
          onChange={setSearchTerm}
          className="w-full lg:max-w-xl"
        />
        <div className="flex shrink-0 items-center gap-3">
          <DateRangeFilter
            value={dateRange}
            onChange={setDateRange}
            align="right"
          />
          <ExportButton reportTitle="Dispense Store" tableRef={tableRef} />
        </div>
      </div>

      <div className="overflow-x-auto border-t border-gray-200 pt-4">
        <table ref={tableRef} className="min-w-full text-left text-sm">
          <thead className="border-b border-[#D4D4D4] text-xs uppercase text-gray-500">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium">S/N</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium">Name</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium">
                Med. Category
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium">
                Med. Type
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium">
                Cost Price (N)
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium">
                Selling Price (N)
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium">
                Expiry Date
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
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {row.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {row.medCategory}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">{row.medType}</td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {row.costPrice}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {row.sellingPrice}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {row.expiryDate}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-10 text-center text-sm text-gray-500"
                >
                  No medications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <PharmacyAlphabetPagination
        activeLetter={activeLetter}
        onLetterChange={setActiveLetter}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
