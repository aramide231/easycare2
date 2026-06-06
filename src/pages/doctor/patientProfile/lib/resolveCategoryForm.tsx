import { CategoryRenderer } from "../components/CategoryRenderer";
import { categoryRegistry } from "../components/categoryRegistry";

/** Prefer category-specific form (e.g. Gen Consult Figma) over shared renderer. */
export function resolveCategoryForm(
  category: string | null,
  sectionLabel: string,
): React.ReactNode | undefined {
  if (category && categoryRegistry[category]?.[sectionLabel]) {
    return categoryRegistry[category][sectionLabel];
  }
  return CategoryRenderer[sectionLabel];
}
