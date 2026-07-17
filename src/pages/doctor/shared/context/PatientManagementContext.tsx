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
} from "@doctor-shared/admission/data/mockAdmissions";
import {
  buildInitialWardBeds,
  type WardBed,
} from "@doctor-shared/admission/data/mockWardBeds";
import { syncWardBedsWithAdmissions } from "@doctor-shared/admission/lib/wardBeds";
import { actionIdToRemark } from "@doctor-shared/admission/lib/actionToRemark";
import type { DischargedPatientRecord } from "@doctor-shared/discharge/data/mockDischargedPatients";
import {
  createAdmissionReportEntry,
  createDischargeReportEntry,
  type AdmissionReportEntry,
  type DischargeReportEntry,
} from "@doctor-shared/reports/data/reportTypes";

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
  wardBeds: WardBed[];
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
  refreshWardBedsFromAdmissions: () => void;
  addWardBed: (input: {
    wardName: string;
    bedNumber: string;
    amount: number;
  }) => void;
  updateWardBed: (
    id: string,
    input: { wardName: string; bedNumber: string; amount: number }
  ) => void;
  deleteWardBed: (id: string) => void;
};

const PatientManagementContext =
  createContext<PatientManagementContextValue | null>(null);

type ProviderProps = {
  children: ReactNode;
  initialDischarged?: DischargedPatientRecord[];
};

export function PatientManagementProvider({
  children,
  initialDischarged = [],
}: ProviderProps) {
  const [admissions, setAdmissions] = useState<AdmissionRecord[]>(() =>
    buildMockAdmissions()
  );
  const [wardBeds, setWardBeds] = useState<WardBed[]>(() =>
    syncWardBedsWithAdmissions(buildInitialWardBeds(), buildMockAdmissions())
  );
  const [dischargedPatients, setDischargedPatients] = useState<
    DischargedPatientRecord[]
  >(() => initialDischarged);
  const [admissionReports, setAdmissionReports] = useState<
    AdmissionReportEntry[]
  >([]);
  const [dischargeReports, setDischargeReports] = useState<
    DischargeReportEntry[]
  >([]);

  const refreshWardBedsFromAdmissions = useCallback(() => {
    setWardBeds((prev) => syncWardBedsWithAdmissions(prev, admissions));
  }, [admissions]);

  const addWardBed = useCallback(
    (input: { wardName: string; bedNumber: string; amount: number }) => {
      setWardBeds((prev) => [
        ...prev,
        {
          id: `ward-bed-${Date.now()}`,
          wardName: input.wardName,
          bedNumber: input.bedNumber,
          amount: input.amount,
          occupiedByPatientId: null,
        },
      ]);
    },
    []
  );

  const updateWardBed = useCallback(
    (
      id: string,
      input: { wardName: string; bedNumber: string; amount: number }
    ) => {
      setWardBeds((prev) =>
        prev.map((bed) =>
          bed.id === id
            ? {
                ...bed,
                wardName: input.wardName,
                bedNumber: input.bedNumber,
                amount: input.amount,
              }
            : bed
        )
      );
    },
    []
  );

  const deleteWardBed = useCallback((id: string) => {
    setWardBeds((prev) => prev.filter((bed) => bed.id !== id));
  }, []);

  const assignPatientToWard = useCallback(
    (admission: AdmissionRecord, wardName: string, performedBy: string) => {
      setAdmissions((prev) => {
        const next = prev.map((row) =>
          row.id === admission.id ? { ...row, ward: wardName } : row
        );
        setWardBeds((beds) => syncWardBedsWithAdmissions(beds, next));
        return next;
      });
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
      setAdmissions((prev) => {
        const next = prev.filter((row) => row.id !== admission.id);
        setWardBeds((beds) => syncWardBedsWithAdmissions(beds, next));
        return next;
      });
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
      setAdmissions((prev) => {
        const next = [admission, ...prev];
        setWardBeds((beds) => syncWardBedsWithAdmissions(beds, next));
        return next;
      });
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
      wardBeds,
      setAdmissions,
      assignPatientToWard,
      dischargeFromAdmission,
      readmitPatient,
      refreshWardBedsFromAdmissions,
      addWardBed,
      updateWardBed,
      deleteWardBed,
    }),
    [
      admissions,
      dischargedPatients,
      admissionReports,
      dischargeReports,
      wardBeds,
      assignPatientToWard,
      dischargeFromAdmission,
      readmitPatient,
      refreshWardBedsFromAdmissions,
      addWardBed,
      updateWardBed,
      deleteWardBed,
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
