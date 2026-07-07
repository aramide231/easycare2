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
  DEFAULT_ADMISSION_VITALS,
  type AdmissionRecord,
} from "@/pages/nurse/patient-management/admission/data/mockAdmissions";
import { calculateStayDuration } from "@/lib/dateTime";
import { buildMockWardBeds, type WardBed } from "@/pages/nurse/patient-management/admission/data/mockWardBeds";
import { WARD_DEFINITIONS } from "@/pages/nurse/patient-management/admission/data/mockWards";
import {
  assignAdmissionToWardBed,
  buildWardAvailability,
  releaseAdmissionBed,
  sortWardBedsGrouped,
  syncAdmissionsWithBeds,
  syncWardBedsWithAdmissions,
  type WardAvailability,
} from "@/pages/nurse/patient-management/admission/lib/wardBeds";
import { actionIdToRemark } from "@/pages/nurse/patient-management/admission/lib/actionToRemark";
import type { DischargedPatientRecord } from "@/pages/nurse/patient-management/discharge/data/mockDischargedPatients";
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

function createInitialState() {
  const admissions = buildMockAdmissions();
  const wardBeds = sortWardBedsGrouped(
    syncWardBedsWithAdmissions(buildMockWardBeds(), admissions),
  );
  return {
    admissions: syncAdmissionsWithBeds(admissions, wardBeds),
    wardBeds,
  };
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
    noOfDays: calculateStayDuration(
      admission.dateOfAdmission,
      admission.timeOfAdmission,
      now,
    ),
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
    assignedBedId: null,
    admittedBy: record.dischargedBy,
    vitalSigns: { ...DEFAULT_ADMISSION_VITALS },
    treatmentCategory: "Gen Consult",
  };
}

type NewWardBedInput = {
  wardName: string;
  bedNumber: string;
  amount: number;
};

type WardBedUpdates = Partial<
  Pick<WardBed, "wardName" | "bedNumber" | "amount">
>;

type PatientManagementContextValue = {
  admissions: AdmissionRecord[];
  wardBeds: WardBed[];
  dischargedPatients: DischargedPatientRecord[];
  admissionReports: AdmissionReportEntry[];
  dischargeReports: DischargeReportEntry[];
  wardAvailability: WardAvailability[];
  setAdmissions: React.Dispatch<React.SetStateAction<AdmissionRecord[]>>;
  assignPatientToWard: (
    admission: AdmissionRecord,
    wardName: string,
    performedBy: string
  ) => boolean;
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
  addWardBed: (input: NewWardBedInput) => void;
  updateWardBed: (bedId: string, updates: WardBedUpdates) => boolean;
  deleteWardBed: (bedId: string) => boolean;
};

const PatientManagementContext =
  createContext<PatientManagementContextValue | null>(null);

export function PatientManagementProvider({ children }: { children: ReactNode }) {
  const initialState = useMemo(() => createInitialState(), []);
  const [admissions, setAdmissions] = useState<AdmissionRecord[]>(
    () => initialState.admissions
  );
  const [wardBeds, setWardBeds] = useState<WardBed[]>(
    () => initialState.wardBeds
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

  const wardAvailability = useMemo(
    () => buildWardAvailability(wardBeds, WARD_DEFINITIONS, admissions),
    [wardBeds, admissions]
  );

  const assignPatientToWard = useCallback(
    (admission: AdmissionRecord, wardName: string, performedBy: string) => {
      let assigned = false;
      let assignedBedId: string | null = null;

      setWardBeds((prevBeds) => {
        const result = assignAdmissionToWardBed(prevBeds, admission, wardName);
        assigned = result.assigned;
        assignedBedId = result.assignedBedId;
        return result.beds;
      });

      if (!assigned || !assignedBedId) return false;

      setAdmissions((prev) =>
        prev.map((row) =>
          row.id === admission.id
            ? { ...row, ward: wardName, assignedBedId }
            : row
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

      return true;
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

      setWardBeds((prev) => releaseAdmissionBed(prev, admission.id));
      setAdmissions((prev) => prev.filter((row) => row.id !== admission.id));
      setDischargedPatients((prev) => [discharged, ...prev]);
      setDischargeReports((prev) => [
        createDischargeReportEntry({
          patientName: admission.name,
          patientId: admission.patientId,
          action: actionIdToRemark(actionId),
          dateOfAdmission: admission.dateOfAdmission,
          timeOfAdmission: admission.timeOfAdmission,
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

  const refreshWardBedsFromAdmissions = useCallback(() => {
    setWardBeds((prevBeds) => {
      const syncedBeds = sortWardBedsGrouped(
        syncWardBedsWithAdmissions(prevBeds, admissions),
      );
      setAdmissions(syncAdmissionsWithBeds(admissions, syncedBeds));
      return syncedBeds;
    });
  }, [admissions]);

  const addWardBed = useCallback((input: NewWardBedInput) => {
    const slug = `${input.wardName}-${input.bedNumber}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-");

    setWardBeds((prev) =>
      sortWardBedsGrouped([
        ...prev,
        {
          id: `${slug}-${Date.now()}`,
          wardName: input.wardName,
          bedNumber: input.bedNumber,
          amount: input.amount,
          occupiedByAdmissionId: null,
        },
      ]),
    );
  }, []);

  const updateWardBed = useCallback((bedId: string, updates: WardBedUpdates) => {
    let updated = false;

    setWardBeds((prev) =>
      sortWardBedsGrouped(
        prev.map((bed) => {
          if (bed.id !== bedId) return bed;
          updated = true;
          return { ...bed, ...updates };
        }),
      ),
    );

    return updated;
  }, []);

  const deleteWardBed = useCallback((bedId: string) => {
    let deleted = false;

    setWardBeds((prev) => {
      const bed = prev.find((item) => item.id === bedId);
      if (!bed || bed.occupiedByAdmissionId !== null) {
        return prev;
      }

      deleted = true;
      return prev.filter((item) => item.id !== bedId);
    });

    return deleted;
  }, []);

  const value = useMemo(
    () => ({
      admissions,
      wardBeds,
      dischargedPatients,
      admissionReports,
      dischargeReports,
      wardAvailability,
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
      wardBeds,
      dischargedPatients,
      admissionReports,
      dischargeReports,
      wardAvailability,
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
