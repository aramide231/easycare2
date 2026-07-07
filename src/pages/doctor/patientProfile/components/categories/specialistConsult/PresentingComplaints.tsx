import { useAuth } from "@/context/AuthContext";
import PresentingComplaintsReadOnly from "../shared/PresentingComplaintsReadOnly";
import PresentingComplaintsEditable from "../shared/PresentingComplaintsEditable";

const TABLE_COLUMNS = [
  { key: "sn", label: "SN" },
  { key: "dateTime", label: "DATE | TIME" },
  { key: "patientType", label: "PATIENT TYPE" },
  { key: "complaints", label: "COMPLAINTS" },
  { key: "complaintHistory", label: "COMPLAINT HISTORY" },
  { key: "enteredBy", label: "ENTERED BY" },
];

export default function PresentingComplaints() {
  const { user } = useAuth();
  const isDoctor = user?.userRole === "doctor";

  if (isDoctor) {
    return (
      <PresentingComplaintsEditable
        tableKey="SPECIALIST CONSULT — PRESENTING COMPLAINTS"
        title="PRESENTING COMPLAINTS DETAILS"
        columns={TABLE_COLUMNS}
        fields={[
          {
            name: "complaints",
            label: "Complaints",
            placeholder: "Enter complaints...",
          },
          {
            name: "complaintHistory",
            label: "Complaint History",
            type: "text",
            placeholder: "Enter complaint history...",
          },
        ]}
      />
    );
  }

  return (
    <PresentingComplaintsReadOnly
      tableKey="SPECIALIST CONSULT — PRESENTING COMPLAINTS"
      title="PRESENTING COMPLAINTS DETAILS"
      columns={TABLE_COLUMNS}
    />
  );
}
