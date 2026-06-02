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
  <div
    className={`flex h-[4.25rem] w-full cursor-pointer flex-col items-center justify-center rounded-md border px-1 py-2 transition ${
      selected
        ? "border-[#573FD1] bg-purple-100 shadow-sm"
        : "border-purple-100/80 bg-purple-50/80 hover:border-purple-200 hover:bg-purple-50"
    }`}
    onClick={onClick}
  >
    <Icon className="h-4 w-4 shrink-0 text-[#573FD1]" />
    <p className="mt-1.5 line-clamp-2 text-center text-[10px] font-medium leading-tight text-gray-700">
      {label}
    </p>
  </div>
);

export default SelectCategoryCard;
