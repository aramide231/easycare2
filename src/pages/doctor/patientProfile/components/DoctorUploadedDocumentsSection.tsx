import UploadedDocumentsSection from "@/components/patient/UploadedDocumentsSection";

type Props = {
  figmaLayout?: boolean;
  viewMode: "upload" | "list";
  patientName: string;
  patientId: string;
  phoneNumber?: string;
};

export default function DoctorUploadedDocumentsSection({
  figmaLayout,
  viewMode,
  patientName,
  patientId,
  phoneNumber,
}: Props) {
  return (
    <UploadedDocumentsSection
      variant="doctor"
      patientName={patientName}
      patientId={patientId}
      phoneNumber={phoneNumber}
      viewMode={viewMode}
      hidePanelPicker={figmaLayout}
    />
  );
}
