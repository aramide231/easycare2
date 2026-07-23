import { useState } from "react";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { HMO_PAGE_SIZE } from "@hmo/pages/shared/lib/pagination";
import { usePaginatedList } from "@/hooks/usePaginatedList";
import TablePagination from "@hmo/shared/components/TablePagination";
import type { ServiceFeeRow } from "../data/mockServiceFeeData";

type FormState = {
  service: string;
  price: string;
  duration: string;
  amount: string;
};

const EMPTY_FORM: FormState = {
  service: "",
  price: "",
  duration: "",
  amount: "",
};

type Props = {
  title: string;
  rows: ServiceFeeRow[];
  isOpen: boolean;
  onToggle: () => void;
  onRowsChange: (rows: ServiceFeeRow[]) => void;
};

const inputClass =
  "h-11 w-full rounded-lg border border-black/50 bg-[#FAFAFA] px-5 text-[15px] tracking-[-0.3px] text-gray-900 placeholder:text-[#A5A5A5] focus:border-[#573FD1] focus:outline-none";

const ServiceFeeSection = ({
  title,
  rows,
  isOpen,
  onToggle,
  onRowsChange,
}: Props) => {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const { currentPage, setCurrentPage, totalPages, paginatedItems, pageSize } =
    usePaginatedList(rows, HMO_PAGE_SIZE);

  const handleAdd = () => {
    const service = form.service.trim();
    const price = form.price.trim();
    const duration = form.duration.trim();
    const amount = form.amount.trim();

    if (!service || !price || !duration || !amount) {
      toast.info("Fill in service, price, duration, and amount.");
      return;
    }

    onRowsChange([
      ...rows,
      {
        id: `${title}-${Date.now()}`,
        service,
        price,
        duration,
        amount,
      },
    ]);
    setForm(EMPTY_FORM);
    toast.success("Service fee added.");
  };

  const handleDelete = (id: string) => {
    onRowsChange(rows.filter((row) => row.id !== id));
  };

  return (
    <div className="py-3 first:pt-0 last:pb-0">
      <button
        type="button"
        onClick={onToggle}
        className="relative w-full border-b-2 border-[#573FD1] py-3 text-left"
      >
        <span className="absolute -bottom-0.5 left-0 z-10 max-w-[min(100%,20rem)] rounded-t-md bg-[#573FD1] px-4 py-2 text-xs font-bold uppercase tracking-wide text-white shadow-sm">
          {title}
        </span>
        <div className="flex min-h-[2.25rem] items-center justify-end pr-1">
          {isOpen ? (
            <ChevronUp className="h-4 w-4 shrink-0 text-gray-500" />
          ) : (
            <ChevronDown className="h-4 w-4 shrink-0 text-gray-500" />
          )}
        </div>
      </button>

      {isOpen && (
        <div className="pt-3">
          <div className="rounded-[15px] border border-[#D4D4D4] p-5">
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-[15px] uppercase tracking-[-0.3px] text-black">
                  Service
                </label>
                <input
                  type="text"
                  value={form.service}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, service: e.target.value }))
                  }
                  placeholder="Enter service"
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <label className="mb-2 block text-[15px] uppercase tracking-[-0.3px] text-black">
                    Price
                  </label>
                  <input
                    type="text"
                    value={form.price}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, price: e.target.value }))
                    }
                    placeholder="Enter Price"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-[15px] uppercase tracking-[-0.3px] text-black">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={form.duration}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, duration: e.target.value }))
                    }
                    placeholder="Enter duration"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-[15px] uppercase tracking-[-0.3px] text-black">
                    Amount
                  </label>
                  <input
                    type="text"
                    value={form.amount}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, amount: e.target.value }))
                    }
                    placeholder="Enter Amount"
                    className={inputClass}
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={handleAdd}
                    className="h-10 w-full rounded-lg bg-[#573FD1] text-[15px] font-semibold tracking-[-0.3px] text-white hover:bg-[#4a35b0]"
                  >
                    Add
                  </button>
                </div>
              </div>

              <hr className="border-[#D4D4D4]" />

              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b border-[#D4D4D4]">
                      <th className="px-4 py-3 text-xs font-medium uppercase tracking-[-0.24px] text-[#A5A5A5]">
                        S/N
                      </th>
                      <th className="px-4 py-3 text-xs font-medium uppercase tracking-[-0.24px] text-[#A5A5A5]">
                        Service
                      </th>
                      <th className="px-4 py-3 text-xs font-medium uppercase tracking-[-0.24px] text-[#A5A5A5]">
                        Price
                      </th>
                      <th className="px-4 py-3 text-xs font-medium uppercase tracking-[-0.24px] text-[#A5A5A5]">
                        Duration
                      </th>
                      <th className="px-4 py-3 text-xs font-medium uppercase tracking-[-0.24px] text-[#A5A5A5]">
                        Amount
                      </th>
                      <th className="w-12 px-4 py-3" />
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedItems.map((row, index) => (
                      <tr
                        key={row.id}
                        className="border-b border-[#D4D4D4] last:border-b-0"
                      >
                        <td className="px-4 py-4 text-[15px] tracking-[-0.3px] text-black">
                          {(currentPage - 1) * pageSize + index + 1}
                        </td>
                        <td className="px-4 py-4 text-[15px] tracking-[-0.3px] text-black">
                          {row.service}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-[15px] tracking-[-0.3px] text-black">
                          {row.price}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-[15px] tracking-[-0.3px] text-black">
                          {row.duration}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-center text-[15px] tracking-[-0.3px] text-black">
                          {row.amount}
                        </td>
                        <td className="px-4 py-4">
                          <button
                            type="button"
                            onClick={() => handleDelete(row.id)}
                            className="text-[#FF3B30] hover:text-red-700"
                            aria-label={`Delete ${row.service}`}
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
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
                className="border-[#D4D4D4]"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceFeeSection;
