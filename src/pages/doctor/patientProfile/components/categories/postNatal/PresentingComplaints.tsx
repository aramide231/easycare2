import { useAuth } from "@/context/AuthContext";
import PresentingComplaintsReadOnly from "../shared/PresentingComplaintsReadOnly";
import PresentingComplaintsEditable from "../shared/PresentingComplaintsEditable";

const TABLE_COLUMNS = [
  { key: "sn", label: "SN" },
  { key: "dateTime", label: "DATE | TIME" },
  { key: "patientType", label: "PATIENT TYPE" },
  { key: "complaint", label: "COMPLAINTS / HISTORY OF PRESENTING COMPLAINTS" },
  { key: "enteredBy", label: "ENTERED BY" },
];

export default function PostNatalPresentingComplaints() {
  const { user } = useAuth();
  const isDoctor = user?.userRole === "doctor";

  if (isDoctor) {
    return (
      <PresentingComplaintsEditable
        tableKey="POST NATAL — PRESENTING COMPLAINTS"
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
      tableKey="POST NATAL — PRESENTING COMPLAINTS"
      columns={TABLE_COLUMNS}
    />
  );
}
