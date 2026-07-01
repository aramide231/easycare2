import { useEffect, useMemo, useState } from "react";
import LogSearchBar from "@/pages/nurse/shared/components/LogSearchBar";
import TablePagination from "@/pages/nurse/shared/components/TablePagination";
import { PAGE_SIZE } from "@/constant/pagination";
import { getTotalPages } from "@/pages/nurse/shared/lib/pagination";
import {
  formatWardBedAmount,
  getWardBedSearchLabel,
  type WardBed,
} from "@/pages/nurse/patient-management/admission/data/mockWardBeds";
import {
  getWardBedStatus,
  sortWardBedsGrouped,
  type WardBedStatus,
} from "@/pages/nurse/patient-management/admission/lib/wardBeds";
import { WARD_DEFINITIONS } from "@/pages/nurse/patient-management/admission/data/mockWards";
import { usePatientManagement } from "@/pages/nurse/shared/context/PatientManagementContext";
import ModalCloseButton from "@/components/ui/ModalCloseButton";
import AddWardSuccessModal from "./AddWardSuccessModal";

type WardBedFormState = {
  wardName: string;
  bedNumber: string;
  amount: string;
};

const emptyForm: WardBedFormState = {
  wardName: WARD_DEFINITIONS[0]?.name ?? "",
  bedNumber: "",
  amount: "",
};

const getStatusClass = (status: WardBedStatus): string => {
  if (status === "AVAILABLE") {
    return "border border-[#00C851] bg-[#e6faee] text-[#00C851]";
  }
  return "border border-[#FA7401] bg-[#FFF1E6] text-[#FA7401]";
};

const WardBedsLog = () => {
  const {
    wardBeds,
    refreshWardBedsFromAdmissions,
    addWardBed,
    updateWardBed,
    deleteWardBed,
  } = usePatientManagement();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState<"add" | "edit" | null>(null);
  const [editingBed, setEditingBed] = useState<WardBed | null>(null);
  const [form, setForm] = useState<WardBedFormState>(emptyForm);
  const [successModal, setSuccessModal] = useState<{
    wardName: string;
    bedNumber: string;
  } | null>(null);

  const filteredBeds = useMemo(() => {
    const query = search.trim().toLowerCase();
    const beds = sortWardBedsGrouped(wardBeds);
    if (!query) return beds;

    return beds.filter((bed) => getWardBedSearchLabel(bed).includes(query));
  }, [wardBeds, search]);

  const totalPages = getTotalPages(filteredBeds.length, PAGE_SIZE);

  const paginatedBeds = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredBeds.slice(start, start + PAGE_SIZE);
  }, [filteredBeds, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const openAddForm = () => {
    setEditingBed(null);
    setForm(emptyForm);
    setFormOpen("add");
  };

  const openEditForm = (bed: WardBed) => {
    setEditingBed(bed);
    setForm({
      wardName: bed.wardName,
      bedNumber: bed.bedNumber,
      amount: String(bed.amount),
    });
    setFormOpen("edit");
  };

  const closeForm = () => {
    setFormOpen(null);
    setEditingBed(null);
    setForm(emptyForm);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const amount = Number(form.amount);
    if (!form.wardName.trim() || !form.bedNumber.trim() || Number.isNaN(amount)) {
      return;
    }

    if (formOpen === "add") {
      const wardName = form.wardName.trim();
      const bedNumber = form.bedNumber.trim();

      addWardBed({
        wardName,
        bedNumber,
        amount,
      });
      setCurrentPage(1);
      closeForm();
      setSuccessModal({ wardName, bedNumber });
      return;
    }

    if (formOpen === "edit" && editingBed) {
      updateWardBed(editingBed.id, {
        wardName: form.wardName.trim(),
        bedNumber: form.bedNumber.trim(),
        amount,
      });
    }

    closeForm();
  };

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex min-w-0 flex-1 flex-col gap-3 lg:flex-row lg:items-center">
          <h1 className="shrink-0 whitespace-nowrap text-xl font-bold text-gray-800">
            Available Ward Beds
          </h1>
          <LogSearchBar
            placeholder="Search ward-bed name here"
            value={search}
            onChange={setSearch}
          />
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={refreshWardBedsFromAdmissions}
            className="rounded-lg border border-[#573FD1] px-4 py-2 text-sm font-medium text-[#573FD1] transition-colors hover:bg-[#573FD1]/5"
          >
            Update
          </button>
          <button
            type="button"
            onClick={openAddForm}
            className="rounded-lg bg-[#573FD1] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#4a35b8]"
          >
            + Add New Ward
          </button>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-[#D4D4D4] text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-2 font-medium">S/N</th>
                <th className="px-4 py-2 font-medium">WARD-BED NAME</th>
                <th className="px-4 py-2 font-medium">WARD-BED NUMBER</th>
                <th className="px-4 py-2 font-medium">AMOUNT</th>
                <th className="px-4 py-2 font-medium">STATUS</th>
                <th className="px-4 py-2 font-medium">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {paginatedBeds.length > 0 ? (
                paginatedBeds.map((bed, index) => {
                  const status = getWardBedStatus(bed);
                  const isSelected = selectedRowId === bed.id;

                  return (
                    <tr
                      key={bed.id}
                      onClick={() => setSelectedRowId(bed.id)}
                      className={`cursor-pointer border-b border-[#D4D4D4] ${
                        isSelected ? "bg-gray-100" : "bg-white"
                      }`}
                    >
                      <td className="px-4 py-3 font-medium">
                        {(currentPage - 1) * PAGE_SIZE + index + 1}
                      </td>
                      <td className="px-4 py-3 font-medium">{bed.wardName}</td>
                      <td className="px-4 py-3">{bed.bedNumber}</td>
                      <td className="px-4 py-3">
                        {formatWardBedAmount(bed.amount)}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${getStatusClass(status)}`}
                        >
                          <span className="h-2 w-2 rounded-full bg-current" />
                          {status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              openEditForm(bed);
                            }}
                            className="rounded-md bg-[#E7EBF3] px-3 py-1.5 text-xs font-semibold text-[#573FD1]"
                          >
                            EDIT
                          </button>
                          <button
                            type="button"
                            disabled={status === "NOT AVAILABLE"}
                            onClick={(event) => {
                              event.stopPropagation();
                              deleteWardBed(bed.id);
                            }}
                            className="rounded-md bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            DELETE
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="bg-gray-50 py-12 text-center text-sm text-gray-500"
                  >
                    {search
                      ? `No ward beds found for "${search}"`
                      : "No ward beds available."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {filteredBeds.length > 0 && (
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            className="mt-6"
          />
        )}
      </div>

      {formOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          role="dialog"
          aria-modal="true"
          onClick={closeForm}
        >
          <form
            onSubmit={handleFormSubmit}
            className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <h2 className="text-lg font-bold text-gray-900">
                {formOpen === "add" ? "Add New Ward Bed" : "Edit Ward Bed"}
              </h2>
              <ModalCloseButton onClick={closeForm} />
            </div>

            <label className="mb-2 block text-sm font-medium text-gray-700">
              Ward Name
            </label>
            <select
              value={form.wardName}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, wardName: event.target.value }))
              }
              className="mb-4 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#573FD1] focus:ring-2 focus:ring-[#573FD1]/20"
            >
              {WARD_DEFINITIONS.map((ward) => (
                <option key={ward.id} value={ward.name}>
                  {ward.name}
                </option>
              ))}
            </select>

            <label className="mb-2 block text-sm font-medium text-gray-700">
              Ward-Bed Number
            </label>
            <input
              value={form.bedNumber}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, bedNumber: event.target.value }))
              }
              placeholder="Bed 1"
              className="mb-4 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#573FD1] focus:ring-2 focus:ring-[#573FD1]/20"
            />

            <label className="mb-2 block text-sm font-medium text-gray-700">
              Amount
            </label>
            <input
              value={form.amount}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, amount: event.target.value }))
              }
              placeholder="7500"
              type="number"
              min="0"
              step="0.01"
              className="mb-6 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#573FD1] focus:ring-2 focus:ring-[#573FD1]/20"
            />

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={closeForm}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-[#573FD1] px-4 py-2 text-sm font-medium text-white"
              >
                {formOpen === "add" ? "Add Bed" : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      )}

      <AddWardSuccessModal
        wardName={successModal?.wardName ?? ""}
        bedNumber={successModal?.bedNumber ?? ""}
        open={Boolean(successModal)}
        onDismiss={() => setSuccessModal(null)}
      />
    </div>
  );
};

export default WardBedsLog;
