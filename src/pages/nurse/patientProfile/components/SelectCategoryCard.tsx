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
    className={`flex flex-col items-center justify-center w-[22%] min-w-[150px] h-32 cursor-pointer border rounded-lg shadow-md ${
      selected ? "bg-purple-200 border-purple-600" : "bg-purple-100"
    }`}
    onClick={onClick}
  >
    <div className="text-2xl text-purple-600">
      <Icon />
    </div>
    <p className="mt-1 text-xs text-gray-700 text-center">{label}</p>
  </div>
);

export default SelectCategoryCard;
