import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { INVESTIGATION_ALPHABET } from "../data/investigationListFigma";

type Props = {
  activeLetter: string | null;
  onLetterChange: (letter: string | null) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
};

export default function InvestigationAlphabetPagination({
  activeLetter,
  onLetterChange,
  currentPage,
  totalPages,
  onPageChange,
  className,
}: Props) {
  return (
    <nav
      className={cn(
        "flex flex-col gap-3 border-t border-gray-200 pt-4 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
      aria-label="Alphabet pagination"
    >
      <div className="flex items-center justify-between gap-2 sm:justify-start">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 sm:hidden"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="hide-scrollbar flex max-w-full items-center gap-1.5 overflow-x-auto pb-1">
        {INVESTIGATION_ALPHABET.map((letter) => (
          <button
            key={letter}
            type="button"
            onClick={() =>
              onLetterChange(activeLetter === letter ? null : letter)
            }
            aria-pressed={activeLetter === letter}
            className={cn(
              "flex h-8 min-w-8 shrink-0 items-center justify-center rounded-md border px-2 text-xs font-semibold transition",
              activeLetter === letter
                ? "border-[#573FD1] bg-[#573FD1] text-white"
                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
            )}
          >
            {letter}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="hidden items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 sm:inline-flex"
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}
