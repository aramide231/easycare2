import { useEffect, useMemo, useState, type RefObject } from "react";
import { createPortal } from "react-dom";
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import clientimage from "@/assets/image/haywhy.jpg";
import TablePagination from "@/pages/nurse/shared/components/TablePagination";
import { usePaginatedList } from "@/hooks/usePaginatedList";
import { useSearchAnchorPosition } from "@/hooks/useSearchAnchorPosition";
import {
  buildMockPatients,
  type Patient,
} from "@/pages/nurse/dashboard/data/mockPatients";

type Props = {
  open: boolean;
  onClose: () => void;
  initialQuery?: string;
  anchorRef: RefObject<HTMLElement | null>;
};

const SEARCH_PATIENTS = buildMockPatients();

function formatPatientSex(gender: string): string {
  if (gender === "M" || gender.toLowerCase() === "male") return "Male";
  if (gender === "F" || gender.toLowerCase() === "female") return "Female";
  return gender;
}

const PatientSearchModal = ({
  open,
  onClose,
  initialQuery = "",
  anchorRef,
}: Props) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState(initialQuery);
  const anchorRect = useSearchAnchorPosition(anchorRef, open);

  useEffect(() => {
    if (open) setQuery(initialQuery);
  }, [open, initialQuery]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SEARCH_PATIENTS;
    return SEARCH_PATIENTS.filter(
      (patient) =>
        patient.name.toLowerCase().includes(q) ||
        patient.patientId.toLowerCase().includes(q) ||
        patient.phoneNumber.includes(q),
    );
  }, [query]);

  const { currentPage, setCurrentPage, totalPages, paginatedItems } =
    usePaginatedList(filtered);

  useEffect(() => {
    setCurrentPage(1);
  }, [query, setCurrentPage]);

  const handleSelect = (patient: Patient) => {
    const role = user?.userRole?.toLowerCase() || "nurse";
    navigate(`/${role}/patient-profile/${patient.patientId}`, {
      state: { patient },
    });
    onClose();
  };

  if (!open || !anchorRect) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100]">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label="Close search"
        onClick={onClose}
      />

      <div
        className="absolute flex max-h-[min(78vh,calc(100vh-80px))] min-h-[min(560px,78vh)] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl"
        style={{
          top: anchorRect.top,
          left: anchorRect.left,
          width: anchorRect.width,
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Search patients"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50"
          aria-label="Close search"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="px-5 py-4 pr-14">
          <div className="relative min-w-0">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center gap-3 pl-4">
              <Search
                className="h-[18px] w-[18px] text-gray-500"
                strokeWidth={2.5}
              />
              <span className="pb-0.5 text-lg font-light text-gray-300">|</span>
            </div>
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Patients ID"
              className="h-12 w-full rounded-lg border border-gray-200 bg-white pl-14 pr-4 text-sm text-gray-900 placeholder:text-gray-500 focus:border-2 focus:border-[#573FD1] focus:outline-none"
            />
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto border-t border-gray-100 px-3 py-1">
          {paginatedItems.length === 0 ? (
            <p className="px-4 py-10 text-center text-sm text-gray-500">
              No patients found for &quot;{query}&quot;
            </p>
          ) : (
            paginatedItems.map((patient) => (
              <button
                key={patient.id}
                type="button"
                onClick={() => handleSelect(patient)}
                className="flex w-full items-center justify-between gap-4 rounded-lg px-3 py-3.5 text-left transition hover:bg-purple-50"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <img
                    src={clientimage}
                    alt=""
                    className="h-10 w-10 shrink-0 rounded-full object-cover"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-gray-900">
                      {patient.name}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-gray-500">
                      {patient.patientId} | {patient.phoneNumber} |{" "}
                      {formatPatientSex(patient.gender)}
                    </p>
                  </div>
                </div>
                <p className="hidden shrink-0 text-right text-xs text-gray-500 sm:block">
                  {patient.lastSeen} | {patient.time}
                </p>
              </button>
            ))
          )}
        </div>

        {filtered.length > 0 && (
          <div className="border-t border-gray-100 px-4 py-3">
            <TablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              className="border-t-0 pt-0"
            />
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
};

export default PatientSearchModal;
