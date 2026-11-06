import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { getPatientByPatientId } from "../../data/mockDiagnostics";
import {
  EMPTY_PATIENT_FORM,
  type PatientRequestForm,
} from "./requestFormOptions";

export function useDiagnosticsRequestPatient() {
  const [patientForm, setPatientForm] =
    useState<PatientRequestForm>(EMPTY_PATIENT_FORM);
  const [patientLoaded, setPatientLoaded] = useState(false);
  const [admissionError, setAdmissionError] = useState("");

  const updatePatientField = useCallback(
    <K extends keyof PatientRequestForm>(key: K, value: PatientRequestForm[K]) => {
      setPatientForm((prev) => ({ ...prev, [key]: value }));
      if (key !== "uniqueId") {
        setPatientLoaded(false);
      }
      setAdmissionError("");
    },
    []
  );

  const clearPatientDetails = useCallback(() => {
    setPatientForm((prev) => ({
      ...prev,
      name: "",
      phoneNumber: "",
      age: "",
      gender: "",
    }));
    setPatientLoaded(false);
  }, []);

  const lookupPatient = useCallback(
    (patientId: string, patientType: string) => {
      const trimmedId = patientId.trim();
      if (!trimmedId) {
        clearPatientDetails();
        setAdmissionError("");
        return;
      }

      const patient = getPatientByPatientId(trimmedId);
      if (!patient) {
        clearPatientDetails();
        setAdmissionError("");
        return;
      }

      if (patientType === "in-patient" && !patient.isInPatient) {
        clearPatientDetails();
        setAdmissionError("Px Not Admitted");
        toast.error("Px Not Admitted");
        return;
      }

      setAdmissionError("");
      setPatientLoaded(true);
      setPatientForm((prev) => ({
        ...prev,
        name: patient.name,
        phoneNumber: patient.phoneNumber,
        age: String(patient.age),
        gender: patient.gender,
      }));
    },
    [clearPatientDetails]
  );

  const handleUniqueIdBlur = useCallback(() => {
    lookupPatient(patientForm.uniqueId, patientForm.patientType);
  }, [lookupPatient, patientForm.patientType, patientForm.uniqueId]);

  const handlePatientTypeChange = useCallback(
    (patientType: string) => {
      setPatientForm((prev) => ({ ...prev, patientType }));
      setAdmissionError("");
      if (patientForm.uniqueId.trim()) {
        lookupPatient(patientForm.uniqueId, patientType);
      }
    },
    [lookupPatient, patientForm.uniqueId]
  );

  const resetPatientForm = useCallback(() => {
    setPatientForm(EMPTY_PATIENT_FORM);
    setPatientLoaded(false);
    setAdmissionError("");
  }, []);

  return {
    patientForm,
    patientLoaded,
    admissionError,
    updatePatientField,
    handleUniqueIdBlur,
    handlePatientTypeChange,
    resetPatientForm,
  };
}
