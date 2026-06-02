import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { VITAL_SIGNS_SEED } from "../data/vitalSignsSeed";

function formatMedicalDateTime(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("en-GB", { month: "short" });
  const year = date.getFullYear();
  const time = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return `${day}-${month}-${year} ${time}`;
}

const INITIAL_TABLES: Record<string, Record<string, unknown>[]> = {
  "VITAL SIGNS": [...VITAL_SIGNS_SEED],
};

export const useMedicalTable = (tableKey: string) => {
  const { user } = useAuth();
  const [tables, setTables] = useState<Record<string, Record<string, unknown>[]>>(
    () => ({
      ...INITIAL_TABLES,
    })
  );
  const history = tables[tableKey] || [];

  const save = (data: Record<string, string>) => {
    const enteredBy = user?.fullName ?? "Unknown User";
    setTables((prev) => {
      const currentTable = prev[tableKey] || [];

      return {
        ...prev,
        [tableKey]: [
          ...currentTable,
          {
            sn: currentTable.length + 1,
            dateTime: formatMedicalDateTime(new Date()),
            patientType: "IN-PATIENT",
            enteredBy,
            ...data,
          },
        ],
      };
    });
  };

  const remove = (index: number) => {
    setTables((prev) => {
      const updated = (prev[tableKey] || [])
        .filter((_, i) => i !== index)
        .map((item, i) => ({
          ...item,
          sn: i + 1,
        }));

      return {
        ...prev,
        [tableKey]: updated,
      };
    });
  };

  return {
    history,
    save,
    remove,
  };
};
