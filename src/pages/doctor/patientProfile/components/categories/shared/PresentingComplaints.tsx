import { useAuth } from "@/context/AuthContext";
import PresentingComplaintsReadOnly from "./PresentingComplaintsReadOnly";
import PresentingComplaintsEditable from "./PresentingComplaintsEditable";

const TABLE_COLUMNS = [
  { key: "sn", label: "SN" },
  { key: "dateTime", label: "DATE | TIME" },
  { key: "patientType", label: "PATIENT TYPE" },
  { key: "complaint", label: "COMPLAINTS / HISTORY OF PRESENTING COMPLAINTS" },
  { key: "enteredBy", label: "ENTERED BY" },
];

export default function PresentingComplaints() {
  const { user } = useAuth();
  const isDoctor = user?.userRole === "doctor";

  if (isDoctor) {
    return (
      <PresentingComplaintsEditable
        tableKey="PRESENTING COMPLAINTS"
        columns={TABLE_COLUMNS}
        fields={[
          {
            name: "complaint",
            label: "Complaints / History of Presenting Complaints",
            placeholder: "Enter complaints and history...",
          },
        ]}
      />
    );
  }

  return (
    <PresentingComplaintsReadOnly
      tableKey="PRESENTING COMPLAINTS"
      columns={TABLE_COLUMNS}
    />
  );
}
