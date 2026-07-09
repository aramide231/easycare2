const SelectCategoryCard = ({
  icon: Icon,
  label,
  selected,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  selected?: boolean;
  onClick?: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex h-[4.25rem] w-full cursor-pointer flex-col items-center justify-center rounded-md border px-1 py-2 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#573FD1] ${
      selected
        ? "border-[#573FD1] bg-[#573FD1] shadow-sm"
        : "border-purple-100/80 bg-purple-50/80 hover:border-purple-200 hover:bg-purple-50"
    }`}
  >
    <Icon
      className={`h-4 w-4 shrink-0 ${selected ? "text-white" : "text-[#573FD1]"}`}
    />
    <p
      className={`mt-1.5 line-clamp-2 text-center text-[10px] font-medium leading-tight ${
        selected ? "text-white" : "text-gray-700"
      }`}
    >
      {label}
    </p>
  </button>
);

export default SelectCategoryCard;
