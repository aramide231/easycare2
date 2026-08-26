import type { SupplierRow } from "../data/purchasesFigma";

type Props = {
  rows: SupplierRow[];
};

export default function SuppliersDetailsTable({ rows }: Props) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-800">
        Suppliers Details
      </h2>

      <div className="overflow-x-auto border-t border-gray-200 pt-4">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-[#D4D4D4] text-xs uppercase text-gray-500">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium">S/N</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium">
                Date | Time
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium">
                Supplier&apos;s Name
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium">
                Supplier&apos;s Org Name
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium">
                Supplier&apos;s Office Address
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium">
                Supplier&apos;s Phone No
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium">
                Invoice Number
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows.map((row, index) => (
                <tr
                  key={row.id}
                  className={`border-b border-[#D4D4D4] ${
                    index % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]"
                  }`}
                >
                  <td className="whitespace-nowrap px-4 py-3">{index + 1}</td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <div>{row.date}</div>
                    <div className="text-xs text-gray-500">{row.time}</div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-900">
                    {row.supplierName}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">{row.orgName}</td>
                  <td className="px-4 py-3">{row.officeAddress}</td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {row.phoneNumber}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {row.invoiceNumber}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-10 text-center text-sm text-gray-500"
                >
                  No suppliers registered yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
