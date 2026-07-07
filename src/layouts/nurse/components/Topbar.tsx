/**
 * Nurse top bar — includes patient search bar + modal (self-contained for handoff).
 *
 * External deps still required by the app:
 * - @/context/AuthContext (useAuth)
 * - @/assets/image/haywhy.jpg
 * - @/pages/nurse/dashboard/data/mockPatients (buildMockPatients)
 * - ./Clock, @/components/header/AppGridMenu, @/components/header/ProfileMenu
 */
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import clientimage from "@/assets/image/haywhy.jpg";
import AppGridMenu from "@/components/header/AppGridMenu";
import ProfileMenu from "@/components/header/ProfileMenu";
import {
  buildMockPatients,
  type Patient,
} from "@/pages/nurse/dashboard/data/mockPatients";
import Clock from "./Clock";

// ---------------------------------------------------------------------------
// Search — anchor positioning
// ---------------------------------------------------------------------------

type SearchAnchorRect = {
  top: number;
  left: number;
  width: number;
};

function getContentBounds(): Pick<SearchAnchorRect, "left" | "width"> | null {
  const panelRegion = document.querySelector("[data-search-panel-region]");
  if (panelRegion) {
    const bounds = panelRegion.getBoundingClientRect();
    return { left: bounds.left, width: bounds.width };
  }

  const pageContent = document.querySelector("[data-app-page-content]");
  if (pageContent) {
    const bounds = pageContent.getBoundingClientRect();
    const style = window.getComputedStyle(pageContent);
    const paddingLeft = parseFloat(style.paddingLeft) || 0;
    const paddingRight = parseFloat(style.paddingRight) || 0;
    return {
      left: bounds.left + paddingLeft,
      width: bounds.width - paddingLeft - paddingRight,
    };
  }

  const main = document.querySelector("main");
  if (!main) return null;

  const bounds = main.getBoundingClientRect();
  const inset = window.matchMedia("(min-width: 768px)").matches ? 24 : 16;
  return {
    left: bounds.left + inset,
    width: bounds.width - inset * 2,
  };
}

function useSearchAnchorPosition(
  anchorRef: RefObject<HTMLElement | null>,
  open: boolean,
) {
  const [rect, setRect] = useState<SearchAnchorRect | null>(null);

  useEffect(() => {
    if (!open) {
      setRect(null);
      return;
    }

    const update = () => {
      const header =
        anchorRef.current?.closest("header") ??
        document.querySelector("header");
      const contentBounds = getContentBounds();

      if (!header || !contentBounds) return;

      const headerBounds = header.getBoundingClientRect();

      setRect({
        top: headerBounds.bottom + 12,
        left: contentBounds.left,
        width: Math.max(contentBounds.width, 320),
      });
    };

    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);

    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [anchorRef, open]);

  return rect;
}

// ---------------------------------------------------------------------------
// Search — pagination helpers
// ---------------------------------------------------------------------------

const SEARCH_PAGE_SIZE = 20;

type PaginationItem = number | "ellipsis";

function getTotalPages(totalItems: number, pageSize: number): number {
  if (totalItems <= 0 || pageSize <= 0) return 0;
  return Math.ceil(totalItems / pageSize);
}

function getPaginationItems(
  currentPage: number,
  totalPages: number,
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

function usePaginatedList<T>(items: T[], pageSize = SEARCH_PAGE_SIZE) {
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

  return { currentPage, setCurrentPage, totalPages, paginatedItems };
}

function SearchTablePagination({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}) {
  if (totalPages <= 1) return null;

  const items = getPaginationItems(currentPage, totalPages);

  return (
    <nav
      className={`flex flex-wrap items-center justify-end gap-2 border-t border-gray-200 pt-4 ${className}`}
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
            className={`flex h-9 min-w-9 items-center justify-center rounded-md border px-2 text-sm font-medium transition ${
              item === currentPage
                ? "border-[#573FD1] bg-[#573FD1] text-white shadow-sm"
                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            {item}
          </button>
        ),
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
}

// ---------------------------------------------------------------------------
// Search — modal
// ---------------------------------------------------------------------------

const SEARCH_PATIENTS = buildMockPatients();

function formatPatientSex(gender: string): string {
  if (gender === "M" || gender.toLowerCase() === "male") return "Male";
  if (gender === "F" || gender.toLowerCase() === "female") return "Female";
  return gender;
}

function PatientSearchModal({
  open,
  onClose,
  initialQuery = "",
  anchorRef,
}: {
  open: boolean;
  onClose: () => void;
  initialQuery?: string;
  anchorRef: RefObject<HTMLElement | null>;
}) {
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
            <SearchTablePagination
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
}

// ---------------------------------------------------------------------------
// Search — top bar input
// ---------------------------------------------------------------------------

function HeaderPatientSearch({ className = "" }: { className?: string }) {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [query, setQuery] = useState("");

  const openSearch = () => setModalOpen(true);

  return (
    <>
      <div ref={anchorRef} className={`relative h-12 w-full ${className}`}>
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center gap-3 pl-4">
          <Search
            className="h-[18px] w-[18px] text-gray-500"
            strokeWidth={2.5}
          />
          <span className="pb-0.5 text-lg font-light text-gray-300">|</span>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={openSearch}
          onClick={openSearch}
          onKeyDown={(e) => {
            if (e.key === "Enter") openSearch();
          }}
          placeholder="Search Patients ID"
          className="h-12 w-full cursor-pointer rounded-lg border border-gray-200 bg-white pl-14 pr-4 text-sm text-gray-900 placeholder:text-gray-500 focus:border-2 focus:border-[#573FD1] focus:outline-none"
        />
      </div>

      <PatientSearchModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initialQuery={query}
        anchorRef={anchorRef}
      />
    </>
  );
}

// ---------------------------------------------------------------------------
// Top bar
// ---------------------------------------------------------------------------

const breadcrumbPatterns = [
  /^\/nurse\/notifications$/,
  /^\/nurse\/admission$/,
  /^\/nurse\/discharge$/,
  /^\/nurse\/available-ward$/,
  /^\/nurse\/child-birth$/,
  /^\/nurse\/immunization$/,
  /^\/nurse\/ante-natal$/,
  /^\/nurse\/post-natal$/,
  /^\/nurse\/family-planning$/,
  /^\/nurse\/dispensed-drugs$/,
  /^\/nurse\/report-writing$/,
  /^\/nurse\/make-request$/,
  /^\/nurse\/reminder$/,
  /^\/nurse\/reports\/.+/,
  /^\/nurse\/patient-profile\/.+/,
  /^\/nurse\/previous-patient-records\/.+/,
];

const nurseReportLabels: Record<string, string> = {
  "child-birth": "Child Birth",
  immunization: "Immunization",
  "ante-natal": "Ante Natal",
  "post-natal": "Post Natal",
  "family-planning": "Family Planning",
  "dispensed-drugs": "Dispensed Drugs",
  "report-writing": "Report Writing",
  requisition: "Requisition",
  admission: "Admission",
  discharge: "Discharge",
};

const Topbar = () => {
  const location = useLocation();

  const isBreadcrumbPage = breadcrumbPatterns.some((pattern) =>
    pattern.test(location.pathname),
  );

  const isDashboard =
    location.pathname === "/nurse" || location.pathname === "/nurse/dashboard";

  const renderBreadcrumbs = () => {
    const pathParts = location.pathname.split("/").filter(Boolean);
    const reportSegment =
      pathParts[0] === "nurse" && pathParts[1] === "reports"
        ? pathParts[2]
        : pathParts[1];
    const reportLabel =
      reportSegment && nurseReportLabels[reportSegment]
        ? nurseReportLabels[reportSegment]
        : null;

    if (reportLabel) {
      return (
        <div className="flex h-10 min-w-0 items-center gap-1 text-sm text-gray-500">
          <span>Report</span>
          <span className="mx-1 shrink-0 text-gray-400">&gt;</span>
          <span className="truncate capitalize">{reportLabel}</span>
        </div>
      );
    }

    const isPatientProfile = /^\/nurse\/patient-profile\/.+/.test(
      location.pathname,
    );
    const isPreviousRecords = /^\/nurse\/previous-patient-records\/.+/.test(
      location.pathname,
    );

    const trailParts =
      isPatientProfile || isPreviousRecords ? pathParts.slice(0, -1) : pathParts;

    const breadcrumbItems = [
      { name: "Dashboard", path: "/nurse" },
      ...trailParts.slice(1).map((part, index, parts) => {
        const fullPath = `/nurse/${parts.slice(0, index + 1).join("/")}`;
        const formatted =
          part === "previous-patient-records"
            ? "Prev Medical History"
            : Number.isNaN(Number(part))
              ? part.replace(/-/g, " ")
              : `ID: ${part}`;
        return { name: formatted, path: fullPath };
      }),
    ];

    return (
      <div className="flex h-10 min-w-0 items-center gap-1 text-sm text-gray-500">
        {breadcrumbItems.map((crumb, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          return (
            <span
              key={`${crumb.path}-${index}`}
              className="flex min-w-0 items-center gap-1"
            >
              {!isLast ? (
                <Link
                  to={crumb.path}
                  className="truncate capitalize text-[#573FD1] hover:underline"
                >
                  {crumb.name}
                </Link>
              ) : (
                <span className="truncate capitalize">{crumb.name}</span>
              )}
              {!isLast && <span className="mx-1 shrink-0 text-gray-400">&gt;</span>}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <header className="w-full shrink-0 border-b border-gray-200 bg-white">
      <div
        className={`grid min-h-[84px] w-full items-center gap-4 px-5 py-4 md:gap-6 md:px-8 ${
          isDashboard
            ? "grid-cols-[42%_1fr_auto]"
            : "grid-cols-[minmax(0,60%)_1fr_auto]"
        }`}
      >
        <div
          className={`flex min-w-0 items-center gap-3 md:gap-5 ${
            isDashboard ? "w-full" : "w-full justify-self-start"
          }`}
        >
          {isBreadcrumbPage && (
            <div className="max-w-[10rem] shrink-0 md:max-w-[14rem]">
              {renderBreadcrumbs()}
            </div>
          )}

          <div
            className={
              isDashboard ? "w-full" : "min-w-[16rem] w-full flex-1 md:min-w-[22rem]"
            }
          >
            <HeaderPatientSearch />
          </div>
        </div>

        <div className={`px-2 ${isDashboard ? "flex justify-center" : "justify-self-center"}`}>
          <Clock />
        </div>

        <div className="flex shrink-0 items-center justify-end gap-4 md:gap-6 justify-self-end">
          <AppGridMenu />
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
};

export default Topbar;
