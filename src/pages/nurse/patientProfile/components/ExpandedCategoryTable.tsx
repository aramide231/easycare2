// components/PresentingComplaintsTable.tsx

import React from "react";

type expandedCategoryTableProps = {
  title: string;
  columns: string[];
  rows: string[][];
};

const ExpandedCategoryTable: React.FC<expandedCategoryTableProps> = ({
  title,
  columns,
  rows,
}) => {
  return (
    <div className="mt-6 relative">
      <div className="overflow-x-auto hide-scrollbar transition-all duration-300 ease-in-out">
        <h2 className="font-semibold text-lg mb-2">{title}</h2>
        <table className="min-w-max w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  className="px-4 py-2 whitespace-nowrap font-semibold text-gray-700"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="even:bg-gray-50">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-4 py-2 whitespace-nowrap">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpandedCategoryTable;
