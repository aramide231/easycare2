import { useEffect } from "react";
import {
  setPendingSectionEntry,
  subscribeSectionFormClear,
} from "./useMedicalTable";

/** Syncs local form state to pending draft; clears on category Submit. */
export function usePendingCategoryDraft(
  tableKey: string,
  buildDraft: () => Record<string, string> | null,
  deps: React.DependencyList,
  onClear: () => void
) {
  useEffect(() => {
    setPendingSectionEntry(tableKey, buildDraft());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    return subscribeSectionFormClear(tableKey, onClear);
  }, [tableKey, onClear]);
}
