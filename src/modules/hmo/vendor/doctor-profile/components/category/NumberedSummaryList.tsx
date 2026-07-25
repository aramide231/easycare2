import { X } from "lucide-react";

type Item = {
  id: string;
  text: string;
  meta?: string;
  metaRight?: string;
};

type Props = {
  items: Item[];
  onRemove?: (id: string) => void;
  removeAriaLabel?: (item: Item) => string;
};

/** Shared 1. 2. 3. picked-list layout for Investigation, Procedure, Medication. */
export default function NumberedSummaryList({
  items,
  onRemove,
  removeAriaLabel,
}: Props) {
  if (items.length === 0) return null;

  return (
    <ul className="divide-y divide-gray-200 rounded-lg border border-gray-200">
      {items.map((item, index) => (
        <li
          key={item.id}
          className="flex items-center gap-3 px-3 py-2.5 text-sm"
        >
          <span className="w-6 shrink-0 font-medium text-gray-500">
            {index + 1}.
          </span>
          <span className="min-w-0 flex-1 font-medium text-gray-800">
            {item.text}
          </span>
          {item.meta ? (
            <span className="shrink-0 text-gray-500">{item.meta}</span>
          ) : null}
          {item.metaRight ? (
            <span className="shrink-0 text-gray-600">{item.metaRight}</span>
          ) : null}
          {onRemove ? (
            <button
              type="button"
              onClick={() => onRemove(item.id)}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-500 hover:bg-red-50 hover:text-red-600"
              aria-label={removeAriaLabel?.(item) ?? `Remove ${item.text}`}
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
