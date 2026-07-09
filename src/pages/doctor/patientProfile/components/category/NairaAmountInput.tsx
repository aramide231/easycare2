import { formFieldInputClass } from "../../lib/formFieldStyles";

export function sanitizeAmountDigits(value: string): string {
  return value.replace(/\D/g, "");
}

export function formatAmountDigitsDisplay(digits: string): string {
  if (!digits) return "";
  const amount = Number(digits);
  if (!Number.isFinite(amount)) return "";
  return amount.toLocaleString();
}

export function parseAmountDigits(value: string): number | null {
  const cleaned = sanitizeAmountDigits(value);
  if (!cleaned) return null;
  const amount = Number(cleaned);
  return Number.isFinite(amount) && amount > 0 ? amount : null;
}

type Props = {
  value: string;
  onChange?: (digits: string) => void;
  readOnly?: boolean;
  placeholder?: string;
  className?: string;
};

export default function NairaAmountInput({
  value,
  onChange,
  readOnly = false,
  placeholder = "0",
  className = "",
}: Props) {
  const displayValue = formatAmountDigitsDisplay(value);

  return (
    <div className="relative">
      <span
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-600"
        aria-hidden
      >
        ₦
      </span>
      <input
        type="text"
        inputMode="numeric"
        readOnly={readOnly}
        value={displayValue}
        placeholder={placeholder}
        onChange={(e) => onChange?.(sanitizeAmountDigits(e.target.value))}
        className={`${formFieldInputClass} pl-8 ${readOnly ? "bg-gray-100" : ""} ${className}`}
      />
    </div>
  );
}
