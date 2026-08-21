import { useEffect, useMemo, useState } from "react";
import { Calendar, Share2 } from "lucide-react";
import LogSearchBar from "@/pages/diagnostics-and-radiologist/shared/components/LogSearchBar";
import { getTotalPages } from "@/pages/diagnostics-and-radiologist/shared/lib/pagination";
import {
  INVESTIGATION_LIST_ROWS,
  type InvestigationCatalogRow,
} from "../data/investigationListFigma";
import InvestigationAlphabetPagination from "./InvestigationAlphabetPagination";
import AddInvestigationModal from "./AddInvestigationModal";
import EditInvestigationModal from "./EditInvestigationModal";
import UploadInvestigationModal from "./UploadInvestigationModal";

const PAGE_SIZE = 9;

export default function InvestigationListTable() {
  const [rows, setRows] = useState<InvestigationCatalogRow[]>(
    () => INVESTIGATION_LIST_ROWS,
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [addOpen, setAddOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [editingRow, setEditingRow] = useState<InvestigationCatalogRow | null>(
    null,
  );

  const filtered = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();
    return rows.filter((row) => {
      const matchesSearch =
        !q ||
        row.name.toLowerCase().includes(q) ||
        row.amount.toLowerCase().includes(q) ||
        row.updatedBy.toLowerCase().includes(q);
      const matchesLetter = activeLetter
        ? row.name.toUpperCase().startsWith(activeLetter)
        : true;
      return matchesSearch && matchesLetter;
    });
  }, [rows, searchTerm, activeLetter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeLetter]);

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

  const handleDelete = (id: number) => {
    setRows((prev) => prev.filter((row) => row.id !== id));
  };

  const handleAdd = (row: Omit<InvestigationCatalogRow, "id">) => {
    setRows((prev) => [
      ...prev,
      {
        id: Math.max(0, ...prev.map((item) => item.id)) + 1,
        ...row,
      },
    ]);
  };

  const handleEditSave = (id: number, amount: string) => {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, amount } : row)),
    );
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-wrap items-center justify-end gap-3">
        <button
          type="button"
          className="rounded-md border border-[#573FD1] bg-white px-4 py-2 text-sm font-medium text-[#573FD1] hover:bg-[#573FD1]/5"
        >
          Update
        </button>
        <button
          type="button"
          onClick={() => setUploadOpen(true)}
          className="rounded-md border border-[#573FD1] bg-white px-4 py-2 text-sm font-medium text-[#573FD1] hover:bg-[#573FD1]/5"
        >
          Upload
        </button>
        <button
          type="button"
          onClick={() => setAddOpen(true)}
          className="rounded-md bg-[#573FD1] px-4 py-2 text-sm font-semibold text-white hover:bg-[#4a35b8]"
        >
          + Add
        </button>
      </div>

      <div className="w-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex flex-col gap-4 border-b border-gray-200 pb-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center">
            <h1 className="shrink-0 text-xl font-bold text-gray-800">
              Investigation List
            </h1>
            <LogSearchBar
              placeholder="Search investigation name here...."
              value={searchTerm}
              onChange={setSearchTerm}
            />
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-[#573FD1] bg-white px-3 py-2 text-sm font-medium text-[#573FD1] transition hover:bg-purple-50"
            >
              <Calendar className="h-4 w-4" />
              25/03/2025 - 28/03/2025
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-[#573FD1] bg-white px-3 py-2 text-sm font-medium text-[#573FD1] transition hover:bg-purple-50"
            >
              <Share2 className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-[#D4D4D4] text-xs uppercase text-gray-500">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium">S/N</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium">
                  Investigation Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium">
                  Amount
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium">
                  Last Update
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium">
                  Updated By
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
                    className="border-b border-[#D4D4D4] bg-white transition hover:bg-gray-50"
                  >
                    <td className="whitespace-nowrap px-4 py-3">
                      {(currentPage - 1) * PAGE_SIZE + index + 1}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {row.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      {row.amount}
                    </td>
                    <td className="px-4 py-3">
                      <div>{row.lastUpdateDate}</div>
                      <div className="text-xs text-gray-500">
                        {row.lastUpdateTime}
                      </div>
                    </td>
                    <td className="px-4 py-3">{row.updatedBy}</td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingRow(row)}
                          className="rounded-md border border-green-600 px-3 py-1 text-xs font-semibold uppercase text-green-600 hover:bg-green-50"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(row.id)}
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
                    colSpan={6}
                    className="px-4 py-10 text-center text-sm text-gray-500"
                  >
                    No investigations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <InvestigationAlphabetPagination
          activeLetter={activeLetter}
          onLetterChange={setActiveLetter}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      <AddInvestigationModal
        isOpen={addOpen}
        onClose={() => setAddOpen(false)}
        onAdd={handleAdd}
      />

      <UploadInvestigationModal
        isOpen={uploadOpen}
        onClose={() => setUploadOpen(false)}
      />

      {editingRow ? (
        <EditInvestigationModal
          key={editingRow.id}
          row={editingRow}
          isOpen={Boolean(editingRow)}
          onClose={() => setEditingRow(null)}
          onSave={handleEditSave}
        />
      ) : null}
    </div>
  );
}
