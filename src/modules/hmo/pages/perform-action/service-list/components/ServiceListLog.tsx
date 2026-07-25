import { useMemo, useRef, useState } from "react";
import { ClipboardList, Plus, Search } from "lucide-react";
import { toast } from "react-toastify";
import { HMO_PAGE_SIZE } from "@hmo/pages/shared/lib/pagination";
import { usePaginatedList } from "@/hooks/usePaginatedList";
import TablePagination from "@hmo/shared/components/TablePagination";
import ServiceFormModal from "./ServiceFormModal";
import {
  buildMockHmoServiceListRecords,
  formatServiceAmount,
  getServiceStatusClass,
  getServiceStatusDotClass,
  type HmoServiceListRecord,
} from "../data/mockHmoServiceListRecords";

const editBtnClass =
  "rounded-lg border-[0.5px] border-[#573FD1] bg-[#EEECFA] px-2 py-1 text-xs font-semibold tracking-[-0.24px] text-[#573FD1]";

const deleteBtnClass =
  "rounded-lg border-[0.5px] border-[#FC3131] bg-[#FFCFCC] px-2 py-1 text-xs font-semibold tracking-[-0.24px] text-[#FF3B30]";

const ServiceListLog = () => {
  const tableRef = useRef<HTMLTableElement>(null);
  const [records, setRecords] = useState(() => buildMockHmoServiceListRecords());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(1);
  const [modalMode, setModalMode] = useState<"add" | "edit" | null>(null);
  const [editingRecord, setEditingRecord] = useState<HmoServiceListRecord | null>(
    null,
  );

  const filteredRecords = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return records;

    return records.filter(
      (record) =>
        record.serviceName.toLowerCase().includes(query) ||
        record.serviceCategory.toLowerCase().includes(query),
    );
  }, [records, searchQuery]);

  const { currentPage, setCurrentPage, totalPages, paginatedItems, pageSize } =
    usePaginatedList(filteredRecords, HMO_PAGE_SIZE);

  const openAddModal = () => {
    setEditingRecord(null);
    setModalMode("add");
  };

  const openEditModal = (record: HmoServiceListRecord) => {
    setEditingRecord(record);
    setModalMode("edit");
  };

  const closeModal = () => {
    setModalMode(null);
    setEditingRecord(null);
  };

  const handleConfirm = (
    payload: Omit<HmoServiceListRecord, "id"> & { id?: number },
  ) => {
    if (payload.id) {
      setRecords((prev) =>
        prev.map((record) =>
          record.id === payload.id
            ? {
                id: payload.id!,
                serviceName: payload.serviceName,
                serviceCategory: payload.serviceCategory,
                amount: payload.amount,
                status: payload.status,
              }
            : record,
        ),
      );
      toast.success("Service updated successfully.");
      return;
    }

    const nextId = records.reduce((max, record) => Math.max(max, record.id), 0) + 1;
    const newRecord: HmoServiceListRecord = {
      id: nextId,
      serviceName: payload.serviceName,
      serviceCategory: payload.serviceCategory,
      amount: payload.amount,
      status: payload.status,
    };

    setRecords((prev) => [newRecord, ...prev]);
    setSelectedId(newRecord.id);
    setCurrentPage(1);
    toast.success("Service added successfully.");
  };

  const handleDelete = (record: HmoServiceListRecord) => {
    setRecords((prev) => prev.filter((item) => item.id !== record.id));
    if (selectedId === record.id) {
      setSelectedId(null);
    }
    toast.success(`${record.serviceName} removed from service list.`);
  };

  const handleUpdate = () => {
    toast.success("Service list updated successfully.");
  };

  return (
    <>
      <div className="rounded-[15px] border border-[#D4D4D4] bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 border-b border-[#D4D4D4] pb-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <h1 className="shrink-0 text-base font-semibold tracking-[-0.32px] text-black">
              Service List
            </h1>

            <div className="relative w-full max-w-[386px]">
              <div className="flex h-8 items-center gap-2 rounded-lg border-[0.5px] border-[#8E8E93] px-3">
                <Search className="h-5 w-5 shrink-0 text-[#808080]" />
                <span className="h-3.5 w-px shrink-0 bg-[#D4D4D4]" aria-hidden />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => {
                    setSearchQuery(event.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search with service name, category...."
                  className="min-w-0 flex-1 border-0 bg-transparent text-sm font-light tracking-[-0.28px] text-black placeholder:text-[#808080] focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-4">
            <button
              type="button"
              onClick={handleUpdate}
              className="h-[35px] rounded-[10px] border border-[#573FD1] bg-[#F8F8F8] px-4 text-sm font-medium tracking-[-0.28px] text-[#573FD1]"
            >
              Update
            </button>
            <button
              type="button"
              onClick={openAddModal}
              className="flex h-[35px] items-center gap-1 rounded-[10px] bg-[#573FD1] px-4 text-sm font-medium text-[#FDFDFD]"
            >
              <Plus className="h-5 w-5" />
              Add New Service
            </button>
          </div>
        </div>

        {filteredRecords.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <ClipboardList className="mb-4 h-24 w-24 text-[#573FD1]/30" />
            <h2 className="mb-3 text-2xl font-semibold tracking-[-0.48px] text-black">
              No Service List Yet
            </h2>
            <p className="max-w-md text-base leading-relaxed text-[#626262]">
              You don&apos;t have any service list yet, Check back later.
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table
                ref={tableRef}
                className="min-w-[1000px] w-full text-left text-sm"
              >
                <thead className="border-b border-[#D4D4D4] text-xs font-medium uppercase tracking-[-0.24px] text-[#A5A5A5]">
                  <tr>
                    <th className="px-4 py-3">S/N</th>
                    <th className="px-4 py-3">SERVICE NAME</th>
                    <th className="px-4 py-3">SERVICE CATEGORY</th>
                    <th className="px-4 py-3">AMOUNT</th>
                    <th className="px-4 py-3">STATUS</th>
                    <th className="px-4 py-3">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedItems.map((record, index) => {
                    const isSelected = selectedId === record.id;
                    return (
                      <tr
                        key={record.id}
                        onClick={() => setSelectedId(record.id)}
                        className={`cursor-pointer border-b border-[#D4D4D4] transition-colors hover:bg-[#F8F8F8] ${
                          isSelected ? "bg-[#EDEDED]" : "bg-white"
                        }`}
                      >
                        <td className="px-4 py-3 text-[15px] tracking-[-0.3px] text-black">
                          {(currentPage - 1) * pageSize + index + 1}
                        </td>
                        <td className="px-4 py-3 text-[15px] tracking-[-0.3px] text-black">
                          {record.serviceName}
                        </td>
                        <td className="px-4 py-3 text-[15px] tracking-[-0.3px] text-black">
                          {record.serviceCategory}
                        </td>
                        <td className="px-4 py-3 text-[15px] tracking-[-0.3px] text-black">
                          {formatServiceAmount(record.amount)}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-medium ${getServiceStatusClass(record.status)}`}
                          >
                            <span
                              className={`h-2 w-2 rounded-full ${getServiceStatusDotClass(record.status)}`}
                            />
                            {record.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              className={editBtnClass}
                              onClick={(event) => {
                                event.stopPropagation();
                                openEditModal(record);
                              }}
                            >
                              EDIT
                            </button>
                            <button
                              type="button"
                              className={deleteBtnClass}
                              onClick={(event) => {
                                event.stopPropagation();
                                handleDelete(record);
                              }}
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

            <TablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              className="mt-6"
            />
          </>
        )}
      </div>

      {modalMode && (
        <ServiceFormModal
          mode={modalMode}
          record={editingRecord ?? undefined}
          onClose={closeModal}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
};

export default ServiceListLog;
