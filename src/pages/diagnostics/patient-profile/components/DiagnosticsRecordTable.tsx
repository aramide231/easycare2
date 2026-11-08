import InvestigationResultContent from "@/pages/doctor/patientProfile/components/category/InvestigationResultContent";
import CategoryMedicalTable from "@/pages/doctor/patientProfile/components/category/CategoryMedicalTable";
import MedicalRemarkViewPanel, {
  rowHasUploadedResult,
} from "@/pages/doctor/patientProfile/components/category/MedicalRemarkViewPanel";
import { categoryDetailsTitle } from "@/pages/doctor/patientProfile/config/categoryFieldTypes";
import { useMedicalRemarkView } from "@/pages/doctor/patientProfile/hooks/useMedicalRemarkView";
import { useMedicalTable } from "@/pages/doctor/patientProfile/hooks/useMedicalTable";
import type { DiagnosticsRecordConfig } from "../data/diagnosticsRecordRegistry";

type Props = {
  sectionName: string;
  config: DiagnosticsRecordConfig;
};

export default function DiagnosticsRecordTable({
  sectionName,
  config,
}: Props) {
  const { history } = useMedicalTable(config.tableKey);
  const remarkView = useMedicalRemarkView();

  return (
    <>
      <CategoryMedicalTable
        title={categoryDetailsTitle(sectionName)}
        columns={config.columns}
        rows={history}
        linkColumns={config.linkColumns}
        onLinkClick={
          config.linkColumns?.length
            ? (row) => remarkView.openRow(row)
            : undefined
        }
        emptyMessage={`No ${sectionName.toLowerCase()} recorded yet.`}
      />

      {config.remarkType === "investigation" ? (
        <MedicalRemarkViewPanel
          open={remarkView.isOpen}
          onClose={remarkView.close}
          title="Investigation Results"
          subtitle={
            remarkView.selectedRow
              ? String(remarkView.selectedRow.investigation ?? "")
              : undefined
          }
          hasResult={
            remarkView.selectedRow
              ? rowHasUploadedResult(remarkView.selectedRow)
              : false
          }
        >
          {remarkView.selectedRow ? (
            <InvestigationResultContent
              investigationName={String(
                remarkView.selectedRow.investigation ?? ""
              )}
              dateTime={String(remarkView.selectedRow.dateTime ?? "")}
            />
          ) : null}
        </MedicalRemarkViewPanel>
      ) : null}

      {config.remarkType === "procedure" ? (
        <MedicalRemarkViewPanel
          open={remarkView.isOpen}
          onClose={remarkView.close}
          title="Procedure Report"
          subtitle={
            remarkView.selectedRow
              ? String(remarkView.selectedRow.procedure ?? "")
              : undefined
          }
          hasResult={
            remarkView.selectedRow
              ? rowHasUploadedResult(remarkView.selectedRow)
              : false
          }
        >
          {remarkView.selectedRow ? (
            <div className="space-y-4">
              <div className="rounded-lg border border-[#573FD1]/20 bg-purple-50/50 px-4 py-3">
                <p className="text-sm font-semibold text-gray-900">
                  {String(remarkView.selectedRow.procedure ?? "")}
                </p>
                <p className="text-xs text-gray-600">
                  {String(remarkView.selectedRow.dateTime ?? "")}
                </p>
              </div>
              <p className="text-sm text-gray-700">
                Procedure completed as documented.
              </p>
            </div>
          ) : null}
        </MedicalRemarkViewPanel>
      ) : null}
    </>
  );
}
