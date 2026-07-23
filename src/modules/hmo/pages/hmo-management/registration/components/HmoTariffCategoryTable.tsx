import { useMemo, useState } from "react";
import { Pencil } from "lucide-react";
import { toast } from "react-toastify";
import { HMO_PAGE_SIZE } from "@hmo/pages/shared/lib/pagination";
import { usePaginatedList } from "@/hooks/usePaginatedList";
import TablePagination from "@hmo/shared/components/TablePagination";
import {
  formatHmoTariffAmount,
  type HmoTariffCategory,
  type HmoTariffItem,
} from "../data/mockHmoTariffData";
import HmoTariffEditModal from "./HmoTariffEditModal";

type Props = {
  category: HmoTariffCategory;
  onUpdateItems: (categoryId: string, items: HmoTariffItem[]) => void;
};

const HmoTariffCategoryTable = ({ category, onUpdateItems }: Props) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [editingItem, setEditingItem] = useState<HmoTariffItem | null>(null);

  const { currentPage, setCurrentPage, totalPages, paginatedItems, pageSize } =
    usePaginatedList(category.items, HMO_PAGE_SIZE);

  const allSelected = useMemo(
    () =>
      paginatedItems.length > 0 &&
      paginatedItems.every((item) => selectedIds.has(item.id)),
    [paginatedItems, selectedIds],
  );

  const toggleAll = () => {
    if (allSelected) {
      setSelectedIds(new Set());
      return;
    }

    setSelectedIds(new Set(paginatedItems.map((item) => item.id)));
  };

  const toggleOne = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleUpdate = () => {
    if (selectedIds.size === 0) {
      toast.info(`Select at least one item in ${category.title}.`);
      return;
    }

    toast.success(`${category.title} tariff updated successfully.`);
    setSelectedIds(new Set());
  };

  const handleSaveEdit = (updated: HmoTariffItem) => {
    onUpdateItems(
      category.id,
      category.items.map((item) => (item.id === updated.id ? updated : item)),
    );
    toast.success("Tariff item updated.");
  };

  return (
    <>
      <div className="w-full rounded-[15px] border border-[#D4D4D4] bg-white p-5">
        <div className="mb-4 flex items-center justify-between border-b border-[#D4D4D4] px-2.5 pb-4">
          <h3 className="text-base font-semibold tracking-[-0.32px] text-black">
            {category.title}
          </h3>
          <button
            type="button"
            onClick={handleUpdate}
            className="h-[35px] min-w-[95px] rounded-[10px] bg-[#573FD1] px-4 text-sm font-medium text-[#FDFDFD]"
          >
            Update
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[940px] w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-[#D4D4D4]">
                <th className="w-[113px] px-4 py-3">
                  <button
                    type="button"
                    onClick={toggleAll}
                    aria-label="Select all rows"
                    className={`flex h-[30px] w-[30px] items-center justify-center rounded-[10px] border border-[#D4D4D4] ${
                      allSelected ? "bg-[#573FD1]" : "bg-white"
                    }`}
                  >
                    {allSelected && (
                      <span className="text-xs font-bold text-white">✓</span>
                    )}
                  </button>
                </th>
                {["S/N", "SERVICE", ...(category.showTypeColumn ? ["TYPE"] : []), "AMOUNT", "ACTION"].map(
                  (header) => (
                    <th
                      key={header}
                      className="px-4 py-3 text-xs font-medium tracking-[-0.24px] text-[#A5A5A5]"
                    >
                      {header}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {paginatedItems.map((item, index) => {
                const isSelected = selectedIds.has(item.id);

                return (
                  <tr
                    key={item.id}
                    className="border-b border-[#D4D4D4] last:border-b-0"
                  >
                    <td className="px-4 py-4">
                      <button
                        type="button"
                        onClick={() => toggleOne(item.id)}
                        aria-label={`Select row ${index + 1}`}
                        className={`flex h-[30px] w-[30px] items-center justify-center rounded-[10px] border border-[#D4D4D4] ${
                          isSelected ? "bg-[#573FD1]" : "bg-white"
                        }`}
                      >
                        {isSelected && (
                          <span className="text-xs font-bold text-white">✓</span>
                        )}
                      </button>
                    </td>
                    <td className="px-4 py-4 text-[15px] tracking-[-0.3px] text-black">
                      {(currentPage - 1) * pageSize + index + 1}
                    </td>
                    <td
                      className={`px-4 py-4 text-[15px] tracking-[-0.3px] text-black ${
                        category.showTypeColumn ? "" : "min-w-[320px]"
                      }`}
                    >
                      {item.service}
                    </td>
                    {category.showTypeColumn && (
                      <td className="px-4 py-4 text-[15px] tracking-[-0.3px] text-black">
                        {item.type ?? "—"}
                      </td>
                    )}
                    <td className="px-4 py-4 text-[15px] tracking-[-0.3px] text-black">
                      {formatHmoTariffAmount(item.amount)}
                    </td>
                    <td className="px-4 py-4">
                      <button
                        type="button"
                        onClick={() => setEditingItem(item)}
                        className="rounded-lg p-1 text-[#573FD1] hover:bg-[#EEECFA]"
                        aria-label={`Edit ${item.service}`}
                      >
                        <Pencil className="h-5 w-5" />
                      </button>
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
          className="mt-4 border-[#D4D4D4]"
        />
      </div>

      {editingItem && (
        <HmoTariffEditModal
          item={editingItem}
          showTypeColumn={category.showTypeColumn}
          onClose={() => setEditingItem(null)}
          onSave={handleSaveEdit}
        />
      )}
    </>
  );
};

export default HmoTariffCategoryTable;
