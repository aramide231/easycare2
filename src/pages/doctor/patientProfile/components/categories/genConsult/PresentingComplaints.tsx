import { useAuth } from "@/context/AuthContext";
import PresentingComplaintsReadOnly from "../shared/PresentingComplaintsReadOnly";
import PresentingComplaintsEditable from "../shared/PresentingComplaintsEditable";

const TABLE_COLUMNS = [
  { key: "sn", label: "SN" },
  { key: "dateTime", label: "DATE | TIME" },
  { key: "patientType", label: "PATIENT TYPE" },
  { key: "complaintHistory", label: "COMPLAINT HISTORY" },
  { key: "enteredBy", label: "ENTERED BY" },
];

export default function GenConsultPresentingComplaints() {
  const { user } = useAuth();
  const isDoctor = user?.userRole === "doctor";

  if (isDoctor) {
    return (
      <PresentingComplaintsEditable
        tableKey="GEN CONSULT — PRESENTING COMPLAINTS"
        columns={TABLE_COLUMNS}
        fields={[
          {
            name: "complaintHistory",
            label: "Complaint History",
            placeholder: "Enter complaint history...",
          },
        ]}
      />
    );
  }

  return (
    <PresentingComplaintsReadOnly
      tableKey="GEN CONSULT — PRESENTING COMPLAINTS"
      columns={TABLE_COLUMNS}
    />
  );
}
