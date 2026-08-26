import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getCountryByIso,
  SUPPLIER_COUNTRY_CODES,
  type CountryDialOption,
} from "../data/supplierCountryCodes";

type Props = {
  value: string;
  onChange: (iso: string, dial: string) => void;
  ariaLabel: string;
};

function CountryFlag({ iso, name }: { iso: string; name: string }) {
  return (
    <img
      src={`https://flagcdn.com/w40/${iso}.png`}
      srcSet={`https://flagcdn.com/w80/${iso}.png 2x`}
      alt=""
      title={name}
      width={20}
      height={15}
      className="h-[15px] w-5 shrink-0 rounded-[2px] object-cover"
      loading="lazy"
    />
  );
}

export default function CountryCodeSelect({
  value,
  onChange,
  ariaLabel,
}: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const selected = getCountryByIso(value);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const filtered = SUPPLIER_COUNTRY_CODES.filter((country) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      country.name.toLowerCase().includes(q) ||
      country.dial.includes(q) ||
      country.iso.includes(q)
    );
  });

  const handleSelect = (country: CountryDialOption) => {
    onChange(country.iso, country.dial);
    setOpen(false);
    setQuery("");
  };

  return (
    <div ref={containerRef} className="relative h-full shrink-0">
      <button
        type="button"
        aria-label={ariaLabel}
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-full items-center gap-1.5 border-r border-gray-300 bg-transparent px-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100/80"
      >
        <CountryFlag iso={selected.iso} name={selected.name} />
        <span>{selected.dial}</span>
        <ChevronDown className="h-3.5 w-3.5 text-gray-500" aria-hidden />
      </button>

      {open ? (
        <div className="absolute left-0 top-[calc(100%+4px)] z-50 w-72 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl">
          <div className="border-b border-gray-100 p-2">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search country"
              className="h-9 w-full rounded-md border border-gray-200 bg-gray-50 px-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-[#573FD1] focus:outline-none focus:ring-1 focus:ring-[#573FD1]"
              autoFocus
            />
          </div>
          <ul className="max-h-56 overflow-y-auto py-1">
            {filtered.length > 0 ? (
              filtered.map((country) => (
                <li key={`${country.iso}-${country.dial}`}>
                  <button
                    type="button"
                    onClick={() => handleSelect(country)}
                    className={cn(
                      "flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm hover:bg-gray-50",
                      country.iso === selected.iso
                        ? "bg-[#573FD1]/10 font-medium text-[#573FD1]"
                        : "text-gray-700"
                    )}
                  >
                    <CountryFlag iso={country.iso} name={country.name} />
                    <span className="w-12 shrink-0 tabular-nums">
                      {country.dial}
                    </span>
                    <span className="truncate">{country.name}</span>
                  </button>
                </li>
              ))
            ) : (
              <li className="px-3 py-4 text-center text-sm text-gray-500">
                No countries found.
              </li>
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
