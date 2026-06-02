import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  buildMockAdmissions,
  type AdmissionRecord,
} from "@/pages/nurse/admission/data/mockAdmissions";
import { actionIdToRemark } from "@/pages/nurse/admission/lib/actionToRemark";
import type { DischargedPatientRecord } from "@/pages/nurse/discharge/data/mockDischargedPatients";
import {
  createAdmissionReportEntry,
  createDischargeReportEntry,
  type AdmissionReportEntry,
  type DischargeReportEntry,
} from "@/pages/nurse/reports/data/reportTypes";

function formatDischargeDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("en-GB", { month: "short" });
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

function formatDischargeTime(date: Date): string {
  return date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function admissionToDischarged(
  admission: AdmissionRecord,
  actionId: string,
  dischargedBy: string
): DischargedPatientRecord {
  const now = new Date();
  return {
    id: admission.id,
    name: admission.name,
    patientId: admission.patientId,
    phoneNumber: admission.phoneNumber,
    gender: admission.gender,
    patientType: admission.patientType,
    age: admission.age,
    dateOfAdmission: admission.dateOfAdmission,
    timeOfAdmission: admission.timeOfAdmission,
    remark: actionIdToRemark(actionId),
    dischargeDate: formatDischargeDate(now),
    dischargeTime: formatDischargeTime(now),
    noOfDays: "2 days",
    dischargedBy,
  };
}

function dischargedToAdmission(
  record: DischargedPatientRecord
): AdmissionRecord {
  return {
    id: record.id,
    name: record.name,
    patientId: record.patientId,
    phoneNumber: record.phoneNumber,
    gender: record.gender,
    patientType: record.patientType,
    age: record.age,
    dateOfAdmission: record.dateOfAdmission,
    timeOfAdmission: record.timeOfAdmission,
    ward: "Not Yet Assigned",
    admittedBy: record.dischargedBy,
  };
}

type PatientManagementContextValue = {
  admissions: AdmissionRecord[];
  dischargedPatients: DischargedPatientRecord[];
  admissionReports: AdmissionReportEntry[];
  dischargeReports: DischargeReportEntry[];
  setAdmissions: React.Dispatch<React.SetStateAction<AdmissionRecord[]>>;
  assignPatientToWard: (
    admission: AdmissionRecord,
    wardName: string,
    performedBy: string
  ) => void;
  dischargeFromAdmission: (
    admission: AdmissionRecord,
    actionId: string,
    performedBy: string
  ) => void;
  readmitPatient: (
    record: DischargedPatientRecord,
    performedBy: string
  ) => void;
};

const PatientManagementContext =
  createContext<PatientManagementContextValue | null>(null);

export function PatientManagementProvider({ children }: { children: ReactNode }) {
  const [admissions, setAdmissions] = useState<AdmissionRecord[]>(() =>
    buildMockAdmissions()
  );
  const [dischargedPatients, setDischargedPatients] = useState<
    DischargedPatientRecord[]
  >([]);
  const [admissionReports, setAdmissionReports] = useState<
    AdmissionReportEntry[]
  >([]);
  const [dischargeReports, setDischargeReports] = useState<
    DischargeReportEntry[]
  >([]);

  const assignPatientToWard = useCallback(
    (admission: AdmissionRecord, wardName: string, performedBy: string) => {
      setAdmissions((prev) =>
        prev.map((row) =>
          row.id === admission.id ? { ...row, ward: wardName } : row
        )
      );
      setAdmissionReports((prev) => [
        createAdmissionReportEntry({
          patientName: admission.name,
          patientId: admission.patientId,
          action: "Assigned to Ward",
          ward: wardName,
          performedBy,
          physicianName: admission.admittedBy,
        }),
        ...prev,
      ]);
    },
    []
  );

  const dischargeFromAdmission = useCallback(
    (admission: AdmissionRecord, actionId: string, performedBy: string) => {
      const discharged = admissionToDischarged(
        admission,
        actionId,
        performedBy
      );
      setAdmissions((prev) => prev.filter((row) => row.id !== admission.id));
      setDischargedPatients((prev) => [discharged, ...prev]);
      setDischargeReports((prev) => [
        createDischargeReportEntry({
          patientName: admission.name,
          patientId: admission.patientId,
          action: actionIdToRemark(actionId),
          dateOfAdmission: `${admission.dateOfAdmission} ${admission.timeOfAdmission}`,
          dischargeDate: discharged.dischargeDate,
          dischargeTime: discharged.dischargeTime,
          noOfDays: discharged.noOfDays,
          performedBy,
          physicianName: admission.admittedBy,
        }),
        ...prev,
      ]);
    },
    []
  );

  const readmitPatient = useCallback(
    (record: DischargedPatientRecord, performedBy: string) => {
      const admission = dischargedToAdmission(record);
      setDischargedPatients((prev) => prev.filter((row) => row.id !== record.id));
      setAdmissions((prev) => [admission, ...prev]);
      setAdmissionReports((prev) => [
        createAdmissionReportEntry({
          patientName: record.name,
          patientId: record.patientId,
          action: "Re-Admitted",
          ward: "Not Yet Assigned",
          performedBy,
          physicianName: record.dischargedBy,
        }),
        ...prev,
      ]);
    },
    []
  );

  const value = useMemo(
    () => ({
      admissions,
      dischargedPatients,
      admissionReports,
      dischargeReports,
      setAdmissions,
      assignPatientToWard,
      dischargeFromAdmission,
      readmitPatient,
    }),
    [
      admissions,
      dischargedPatients,
      admissionReports,
      dischargeReports,
      assignPatientToWard,
      dischargeFromAdmission,
      readmitPatient,
    ]
  );

  return (
    <PatientManagementContext.Provider value={value}>
      {children}
    </PatientManagementContext.Provider>
  );
}

export function usePatientManagement() {
  const context = useContext(PatientManagementContext);
  if (!context) {
    throw new Error(
      "usePatientManagement must be used within PatientManagementProvider"
    );
  }
  return context;
}
