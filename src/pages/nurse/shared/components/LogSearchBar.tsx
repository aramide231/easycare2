type Props = {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

const LogSearchBar = ({ placeholder, value, onChange, className }: Props) => {
  return (
    <div
      className={`flex w-full min-w-0 flex-1 items-center rounded-xl border border-[#D4D4D4] bg-white sm:max-w-md ${className ?? ""}`}
    >
      <svg
        className="ml-3 h-4 w-4 shrink-0 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
        />
      </svg>
      <span className="mx-3 h-5 w-px shrink-0 bg-[#D4D4D4]" aria-hidden />
      <input
        type="search"
        className="min-w-0 flex-1 border-0 bg-transparent py-2.5 pr-4 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-0"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default LogSearchBar;
