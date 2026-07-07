import { useEffect, useMemo, useState } from "react";
import { PAGE_SIZE } from "@/constant/pagination";
import { getTotalPages } from "@/pages/nurse/shared/lib/pagination";

export function usePaginatedList<T>(
  items: T[],
  pageSize: number = PAGE_SIZE,
) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = getTotalPages(items.length, pageSize);

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, currentPage, pageSize]);

  useEffect(() => {
    setCurrentPage(1);
  }, [items.length]);

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedItems,
    pageSize,
  };
}
