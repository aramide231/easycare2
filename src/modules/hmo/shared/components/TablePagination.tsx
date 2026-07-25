import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { getPaginationItems } from "../lib/pagination";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
};

const TablePagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: Props) => {
  if (totalPages < 1) return null;

  const items = getPaginationItems(currentPage, totalPages);

  return (
    <nav
      className={cn(
        "flex flex-wrap items-center justify-end gap-2 border-t border-gray-200 pt-4",
        className
      )}
      aria-label="Pagination"
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft className="h-4 w-4" />
        Back
      </button>

      {items.map((item, index) =>
        item === "ellipsis" ? (
          <span
            key={`ellipsis-${index}`}
            className="flex h-9 min-w-9 items-center justify-center px-1 text-sm text-gray-500"
          >
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            onClick={() => onPageChange(item)}
            aria-current={item === currentPage ? "page" : undefined}
            className={cn(
              "flex h-9 min-w-9 items-center justify-center rounded-md border px-2 text-sm font-medium transition",
              item === currentPage
                ? "border-[#573FD1] bg-[#573FD1] text-white shadow-sm"
                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            )}
          >
            {item}
          </button>
        )
      )}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
};

export default TablePagination;
