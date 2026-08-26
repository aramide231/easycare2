import { useEffect, useMemo, useRef, useState } from "react";
import ExportButton from "@pharmacy/shared/ExportButton";
import DateRangeFilter from "@/components/ui/DateRangeFilter";
import LogSearchBar from "@pharmacy/shared/components/LogSearchBar";
import { getTotalPages } from "@pharmacy/shared/lib/pagination";
import PharmacyAlphabetPagination from "../../components/PharmacyAlphabetPagination";
import { registerMainStoreHandlers } from "../lib/mainStoreActions";
import {
  MAIN_STORE_DEFAULT_RANGE,
  MAIN_STORE_ROWS,
  type MainStoreRow,
} from "../data/mainStoreFigma";
import AddMainStoreModal from "./AddMainStoreModal";

const PAGE_SIZE = 10;

export default function MainStoreTable() {
  const tableRef = useRef<HTMLTableElement>(null);
  const [rows, setRows] = useState<MainStoreRow[]>(() => MAIN_STORE_ROWS);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalMode, setModalMode] = useState<"add" | "edit" | null>(null);
  const [editingRow, setEditingRow] = useState<MainStoreRow | null>(null);
  const [dateRange, setDateRange] = useState({
    startDate: MAIN_STORE_DEFAULT_RANGE.startDate,
    endDate: MAIN_STORE_DEFAULT_RANGE.endDate,
  });

  const closeModal = () => {
    setModalMode(null);
    setEditingRow(null);
  };

  useEffect(() => {
    return registerMainStoreHandlers({
      onAdd: () => {
        setEditingRow(null);
        setModalMode("add");
      },
    });
  }, []);

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

  const handleConfirm = (values: Omit<MainStoreRow, "id">) => {
    if (modalMode === "edit" && editingRow) {
      setRows((prev) =>
        prev.map((row) =>
          row.id === editingRow.id ? { ...row, ...values } : row
        )
      );
      return;
    }

    setRows((prev) => [
      ...prev,
      {
        id: Math.max(0, ...prev.map((item) => item.id)) + 1,
        ...values,
      },
    ]);
  };

  const handleDeleteRow = (id: number) => {
    setRows((prev) => prev.filter((row) => row.id !== id));
  };

  return (
    <>
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
            <ExportButton reportTitle="Main Store" tableRef={tableRef} />
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
                  Action
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
                      {row.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      {row.medCategory}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      {row.medType}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      {row.costPrice}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      {row.sellingPrice}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingRow(row);
                            setModalMode("edit");
                          }}
                          className="rounded-md border border-green-600 px-3 py-1 text-xs font-semibold uppercase text-green-600 hover:bg-green-50"
                        >
                          Update
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteRow(row.id)}
                          className="rounded-md border border-red-600 px-3 py-1 text-xs font-semibold uppercase text-red-600 hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
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

      <AddMainStoreModal
        isOpen={modalMode !== null}
        mode={modalMode === "edit" ? "edit" : "add"}
        initialRow={editingRow}
        onClose={closeModal}
        onConfirm={handleConfirm}
        onDelete={
          editingRow
            ? () => {
                handleDeleteRow(editingRow.id);
              }
            : undefined
        }
      />
    </>
  );
}
