import { useEffect, useMemo, useState } from "react";
import { Calendar, Plus, RefreshCw, Share2, Upload } from "lucide-react";
import LogSearchBar from "../../shared/components/LogSearchBar";
import { getTotalPages } from "../../shared/lib/pagination";
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
      <div className="flex flex-wrap items-center justify-end gap-4">
        <button
          type="button"
          className="inline-flex h-[35px] items-center gap-1 rounded-[10px] border border-[#573FD1] bg-white px-2.5 text-[14px] font-medium text-[#573FD1] transition hover:bg-[#573FD1]/5"
        >
          <RefreshCw className="h-4 w-4" />
          Update
        </button>
        <button
          type="button"
          onClick={() => setUploadOpen(true)}
          className="inline-flex h-[35px] items-center gap-1 rounded-[10px] border border-[#573FD1] bg-white px-2.5 text-[14px] font-medium text-[#573FD1] transition hover:bg-[#573FD1]/5"
        >
          <Upload className="h-5 w-5" />
          Upload
        </button>
        <button
          type="button"
          onClick={() => setAddOpen(true)}
          className="inline-flex h-[35px] items-center gap-1 rounded-[10px] bg-[#573FD1] px-2.5 text-[14px] font-medium text-white transition hover:bg-[#4a35b8]"
        >
          <Plus className="h-5 w-5" />
          Add
        </button>
      </div>

      <div className="flex w-full flex-col rounded-[15px] border border-[#D4D4D4] bg-white px-[30px] pb-5 pt-6 shadow-sm">
        <div className="mb-4 flex flex-col gap-4 border-b border-[#D4D4D4] pb-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex min-w-0 flex-1 flex-col gap-4 sm:flex-row sm:items-center">
            <h1 className="shrink-0 text-[16px] font-semibold tracking-[-0.32px] text-black">
              Investigation List
            </h1>
            <LogSearchBar
              placeholder="Search investigation name here...."
              value={searchTerm}
              onChange={setSearchTerm}
              className="sm:max-w-md"
            />
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-[10px] border-[0.5px] border-[#573FD1] bg-[#EEECFA] px-3 py-1.5 text-sm font-medium text-[#573FD1]"
            >
              <Calendar className="h-4 w-4" />
              <span>25/03/2025 - 28/03/2025</span>
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-[10px] border-[0.5px] border-[#573FD1] bg-[#EEECFA] px-3 py-1.5 text-sm font-medium text-[#573FD1]"
            >
              <Share2 className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead className="border-b border-[#D4D4D4] text-[12px] font-medium uppercase tracking-[-0.24px] text-[#A5A5A5]">
              <tr>
                <th className="h-11 px-4">S/N</th>
                <th className="h-11 px-4">Investigation Name</th>
                <th className="h-11 px-4">Amount</th>
                <th className="h-11 px-4">Last Update</th>
                <th className="h-11 px-4">Updated By</th>
                <th className="h-11 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedRows.length > 0 ? (
                paginatedRows.map((row, index) => (
                  <tr
                    key={row.id}
                    className={`h-[55px] border-b border-[#D4D4D4] ${
                      index === 0
                        ? "bg-[#EDEDED]"
                        : index % 2 === 0
                          ? "bg-white"
                          : "bg-[#FAFAFA]"
                    }`}
                  >
                    <td className="px-4 text-[15px]">
                      {(currentPage - 1) * PAGE_SIZE + index + 1}
                    </td>
                    <td className="px-4 text-[15px] tracking-[-0.3px] text-black">
                      {row.name}
                    </td>
                    <td className="px-4 text-[15px]">{row.amount}</td>
                    <td className="px-4">
                      <div className="text-[15px]">{row.lastUpdateDate}</div>
                      <div className="text-[12px] text-[#626262]">
                        {row.lastUpdateTime}
                      </div>
                    </td>
                    <td className="px-4 text-[15px]">{row.updatedBy}</td>
                    <td className="px-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingRow(row)}
                          className="rounded-md border border-[#2E7D32] px-3 py-1 text-xs font-semibold uppercase text-[#2E7D32] transition hover:bg-green-50"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(row.id)}
                          className="rounded-md border border-[#D32F2F] px-3 py-1 text-xs font-semibold uppercase text-[#D32F2F] transition hover:bg-red-50"
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
          className="mt-4 border-0"
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
