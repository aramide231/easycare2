import { createContext, useContext } from "react";

export const HealthCategoryContext = createContext<string | null>(null);
export function categoryStorageKey(category: string | null, label: string) {
  return category === "Neo Natal Care" && ["VITAL SIGNS", "DIAGNOSIS", "INVESTIGATION", "PROCEDURE"].includes(label)
    ? `NEO NATAL::${label}` : label;
}
export function useCategoryStorageKey(label: string) {
  return categoryStorageKey(useContext(HealthCategoryContext), label);
}
