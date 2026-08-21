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
        "flex flex-wrap items-center justify-end gap-1.5 border-t border-[#D4D4D4] pt-4",
        className,
      )}
      aria-label="Alphabet pagination"
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="mr-1 inline-flex items-center gap-1 rounded-lg border border-[#D4D4D4] bg-white px-3 py-2 text-[15px] font-semibold text-black transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft className="h-3.5 w-3.5" />
        Back
      </button>

      {INVESTIGATION_ALPHABET.map((letter) => (
        <button
          key={letter}
          type="button"
          onClick={() =>
            onLetterChange(activeLetter === letter ? null : letter)
          }
          aria-pressed={activeLetter === letter}
          className={cn(
            "flex h-[34px] min-w-[34px] items-center justify-center rounded-lg border px-2 text-[15px] font-semibold transition",
            activeLetter === letter
              ? "border-[#573FD1] bg-[#573FD1] text-white"
              : "border-[#D4D4D4] bg-white text-black hover:bg-gray-50",
          )}
        >
          {letter}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="ml-1 inline-flex items-center gap-1 rounded-lg border border-[#D4D4D4] bg-white px-3 py-2 text-[15px] font-semibold text-black transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
        <ChevronRight className="h-3.5 w-3.5" />
      </button>
    </nav>
  );
}
