export type AdmissionReportEntry = {
  id: string;
  patientName: string;
  patientId: string;
  action: "Admitted" | "Assigned to Ward" | "Re-Admitted";
  ward?: string;
  date: string;
  time: string;
  performedBy: string;
  physicianName: string;
};

export type DischargeReportEntry = {
  id: string;
  patientName: string;
  patientId: string;
  action: string;
  dateOfAdmission: string;
  timeOfAdmission: string;
  dischargeDate: string;
  dischargeTime: string;
  noOfDays: string;
  performedBy: string;
  physicianName: string;
};

function formatReportDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("en-GB", { month: "short" });
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

function formatReportTime(date: Date): string {
  return date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function createAdmissionReportEntry(
  data: Omit<AdmissionReportEntry, "id" | "date" | "time"> & {
    date?: string;
    time?: string;
  }
): AdmissionReportEntry {
  const now = new Date();
  return {
    id: `adm-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    date: data.date ?? formatReportDate(now),
    time: data.time ?? formatReportTime(now),
    ...data,
  };
}

export function createDischargeReportEntry(
  data: Omit<DischargeReportEntry, "id">
): DischargeReportEntry {
  return {
    id: `dsh-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    ...data,
  };
}
