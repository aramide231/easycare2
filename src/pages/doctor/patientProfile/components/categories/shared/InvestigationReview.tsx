import { categoryDetailsTitle } from "@/pages/doctor/patientProfile/config/categoryFieldTypes";
import { useMedicalTable } from "@/pages/doctor/patientProfile/hooks/useMedicalTable";
import { useMedicalRemarkView } from "@/pages/doctor/patientProfile/hooks/useMedicalRemarkView";
import CategoryMedicalTable from "@/pages/doctor/patientProfile/components/category/CategoryMedicalTable";
import InvestigationResultContent from "@/pages/doctor/patientProfile/components/category/InvestigationResultContent";
import MedicalRemarkViewPanel, {
  rowHasUploadedResult,
} from "@/pages/doctor/patientProfile/components/category/MedicalRemarkViewPanel";

const investigationTableColumns = [
  { key: "sn", label: "SN" },
  { key: "dateTime", label: "DATE | TIME" },
  { key: "patientType", label: "PATIENT TYPE" },
  { key: "investigation", label: "INVESTIGATION" },
  { key: "amount", label: "AMOUNT" },
  { key: "result", label: "RESULT" },
  { key: "doctor", label: "DOCTOR" },
];

/** Nurse: review investigation history (table only). */
export default function InvestigationReview({
  tableKey = "INVESTIGATION",
  noun = "Investigation",
}: {
  tableKey?: string;
  noun?: string;
}) {
  const { history } = useMedicalTable(tableKey);
  const remarkView = useMedicalRemarkView();

  const tableRows = history.map((row) => ({
    ...row,
    result: "VIEW",
  }));

  return (
    <>
      <CategoryMedicalTable
        title={categoryDetailsTitle(tableKey)}
        columns={investigationTableColumns}
        rows={tableRows}
        linkColumns={["result"]}
        onLinkClick={(row) => remarkView.openRow(row)}
      />

      <MedicalRemarkViewPanel
        open={remarkView.isOpen}
        onClose={remarkView.close}
        title={`${noun} Results`}
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
            investigationName={String(remarkView.selectedRow.investigation ?? "")}
            dateTime={String(remarkView.selectedRow.dateTime ?? "")}
            doctor={String(remarkView.selectedRow.doctor ?? "")}
          />
        ) : null}
      </MedicalRemarkViewPanel>
    </>
  );
}
