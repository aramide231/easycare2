export type PaginationItem = number | "ellipsis";

/** Page number buttons with ellipsis (e.g. 1, 2, 3, 4, …, 20). */
export function getPaginationItems(
  currentPage: number,
  totalPages: number
): PaginationItem[] {
  if (totalPages <= 0) return [];
  if (totalPages === 1) return [1];
  if (totalPages <= 6) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, "ellipsis", totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      "ellipsis",
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "ellipsis",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "ellipsis",
    totalPages,
  ];
}

export function getTotalPages(totalItems: number, pageSize: number): number {
  if (totalItems <= 0 || pageSize <= 0) return 0;
  return Math.ceil(totalItems / pageSize);
}
