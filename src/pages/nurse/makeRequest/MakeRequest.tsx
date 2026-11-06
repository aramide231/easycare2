import { useCallback, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DiagnosticsRequestFormShell from "@/pages/diagnostics/components/request-form/DiagnosticsRequestFormShell";
import RequestMedicationsSection, {
  type RequestMedicationsHandle,
} from "@/pages/diagnostics/components/request-form/RequestMedicationsSection";
import {
  EMPTY_DEPARTMENT_FORM,
  type DepartmentForm,
} from "@/pages/diagnostics/components/request-form/requestFormOptions";
import { useDiagnosticsRequestPatient } from "@/pages/diagnostics/components/request-form/useDiagnosticsRequestPatient";

const MakeRequest = () => {
  const [departmentForm, setDepartmentForm] = useState<DepartmentForm>({
    ...EMPTY_DEPARTMENT_FORM,
  });

  const {
    patientForm,
    patientLoaded,
    admissionError,
    updatePatientField,
    handleUniqueIdBlur,
    handlePatientTypeChange,
    resetPatientForm,
  } = useDiagnosticsRequestPatient();

  const medicationsRef = useRef<RequestMedicationsHandle>(null);

  const handleDepartmentChange = useCallback(
    <K extends keyof DepartmentForm>(key: K, value: DepartmentForm[K]) => {
      setDepartmentForm((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const handleSubmit = () => {
    if (!departmentForm.department || !departmentForm.name.trim()) {
      toast.error("Please complete the Request (Department) details.");
      return;
    }

    if (!patientForm.patientType || !patientForm.name.trim()) {
      toast.error("Please complete the Request (Patient Type) details.");
      return;
    }

    if (!medicationsRef.current?.hasMedications()) {
      toast.error("Please add at least one medication to the request.");
      return;
    }

    toast.success("Medication request submitted successfully.");
    setDepartmentForm({ ...EMPTY_DEPARTMENT_FORM });
    resetPatientForm();
    medicationsRef.current?.reset();
  };

  return (
    <div className="-mx-2 w-[calc(100%+1rem)] max-w-none space-y-6 md:-mx-3 md:w-[calc(100%+1.5rem)]">
      <DiagnosticsRequestFormShell
        title="Make Request"
        departmentForm={departmentForm}
        onDepartmentChange={handleDepartmentChange}
        patientForm={patientForm}
        patientLoaded={patientLoaded}
        admissionError={admissionError}
        onPatientFieldChange={updatePatientField}
        onPatientTypeChange={handlePatientTypeChange}
        onUniqueIdBlur={handleUniqueIdBlur}
        onSubmit={handleSubmit}
        submitLabel="Submit Request"
      >
        <div className="mt-8">
          <RequestMedicationsSection ref={medicationsRef} />
        </div>
      </DiagnosticsRequestFormShell>
      <ToastContainer position="bottom-center" autoClose={2500} />
    </div>
  );
};

export default MakeRequest;
