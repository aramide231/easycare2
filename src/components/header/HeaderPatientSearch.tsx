import { useRef, useState } from "react";
import { Search } from "lucide-react";
import PatientSearchModal from "./PatientSearchModal";

type Props = {
  className?: string;
};

const HeaderPatientSearch = ({ className = "" }: Props) => {
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
};

export default HeaderPatientSearch;
