import { useState } from "react";

export function useMedicalRemarkView() {
  const [selectedRow, setSelectedRow] = useState<Record<string, unknown> | null>(
    null
  );

  return {
    selectedRow,
    isOpen: selectedRow !== null,
    openRow: setSelectedRow,
    close: () => setSelectedRow(null),
  };
}
