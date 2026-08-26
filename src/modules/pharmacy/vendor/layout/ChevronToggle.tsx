import { ChevronDown } from "lucide-react";

interface ChevronToggleProps {
  isOpen: boolean;
  className?: string;
}

export default function ChevronToggle({
  isOpen,
  className = "",
}: ChevronToggleProps) {
  return (
    <ChevronDown
      size={16}
      className={`text-gray-400 transition-transform duration-200 ${
        isOpen ? "rotate-180" : "rotate-0"
      } ${className}`}
    />
  );
}
