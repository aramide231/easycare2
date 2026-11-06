import { useLayoutEffect, useState, type ReactNode } from "react";
import { useLocation, useParams } from "react-router-dom";
import { openPatientRecord } from "../hooks/useMedicalTable";

export default function PatientRecordScope({ children }: { children: ReactNode }) {
  const { id } = useParams();
  const { state } = useLocation();
  const patientId = String(state?.patient?.patientId ?? id);
  const [ready, setReady] = useState<string>();
  useLayoutEffect(() => {
    openPatientRecord(patientId);
    setReady(patientId);
  }, [patientId]);
  return ready === patientId ? children : null;
}
