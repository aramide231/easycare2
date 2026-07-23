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
    className={`flex h-[90px] w-full min-w-0 cursor-pointer flex-col items-center justify-center rounded-[10px] border px-5 py-4 transition ${
      selected
        ? "border-[#573FD1] bg-[#573FD1] text-white"
        : "border-transparent bg-[#EDE9FE] hover:bg-purple-100"
    }`}
  >
    <Icon
      className={`text-xl ${selected ? "text-white" : "text-[#573FD1]"}`}
    />
    <p
      className={`mt-1 line-clamp-2 text-center text-[10px] font-medium leading-tight ${
        selected ? "text-white" : "text-[#573FD1]"
      }`}
    >
      {label}
    </p>
  </button>
);

export default SelectCategoryCard;
