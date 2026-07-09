import {
  getInvestigationResultReport,
  type InvestigationResultReport,
} from "../../data/investigationResultsSeed";

type Props = {
  investigationName: string;
  dateTime?: string;
};

export default function InvestigationResultContent({
  investigationName,
  dateTime,
}: Props) {
  const report =
    getInvestigationResultReport(investigationName) ??
    buildFallbackReport(investigationName, dateTime);

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-[#573FD1]/20 bg-purple-50/50 px-4 py-3">
        <p className="text-sm font-semibold text-gray-900">{report.investigation}</p>
        {report.reportedAt ? (
          <p className="text-xs text-gray-600">Reported: {report.reportedAt}</p>
        ) : null}
        {report.reportedBy ? (
          <p className="text-xs text-gray-600">{report.reportedBy}</p>
        ) : null}
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-2 font-medium">Parameter</th>
              <th className="px-4 py-2 font-medium">Result</th>
              <th className="px-4 py-2 font-medium">Reference</th>
            </tr>
          </thead>
          <tbody>
            {report.lines.map((line, index) => (
              <tr
                key={`${line.parameter}-${index}`}
                className={index % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]"}
              >
                <td className="px-4 py-3 text-gray-800">{line.parameter}</td>
                <td className="px-4 py-3 font-medium text-gray-900">
                  {line.value}
                  {line.unit ? (
                    <span className="ml-1 text-xs font-normal text-gray-500">
                      {line.unit}
                    </span>
                  ) : null}
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {line.reference ?? "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function buildFallbackReport(
  investigationName: string,
  dateTime?: string
): InvestigationResultReport {
  return {
    investigation: investigationName,
    reportedAt: dateTime,
    lines: [
      {
        parameter: "Status",
        value: "Completed",
        reference: "—",
      },
    ],
  };
}
