import { useState } from "react";

export const useMedicalTable = (tableKey: string) => {
  const [tables, setTables] = useState<Record<string, any[]>>({});
  const history = tables[tableKey] || [];

  const save = (data: any) => {
  setTables(prev => {
    const currentTable = prev[tableKey] || [];

    return {
      ...prev,
      [tableKey]: [
        ...currentTable,
        {
          sn: currentTable.length + 1,
          dateTime: new Date().toLocaleString(),
          patientType: "IN-PATIENT",
          ...data,
        },
      ],
    };
  });
};

  const remove = (index: number) => {
  setTables(prev => {
    const updated = (prev[tableKey] || [])
      .filter((_: any, i: number) => i !== index)
      .map((item: any, i: number) => ({
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
