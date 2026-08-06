import { useMemo, useState } from "react";
import { ChevronDown, Filter } from "lucide-react";
import { toast } from "react-toastify";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import {
  formFieldInputClass,
  formFieldSelectClass,
} from "@/pages/doctor/patientProfile/lib/formFieldStyles";
import { buildMockPatients } from "@/pages/nurse/dashboard/data/mockPatients";
import { usePatientManagement } from "@/pages/nurse/shared/context/PatientManagementContext";
import RequestMedicationSection, {
  type PickedMedication,
} from "./components/RequestMedicationSection";

type RequestView = "department" | "patient-type";
type PatientTypeOption = "" | "In Patient" | "Out Patient";
type DepartmentOption = "" | "IPD" | "OPD";

type PatientDetails = {
  uniqueId: string;
  name: string;
  phoneNumber: string;
  age: string;
  gender: string;
};

const EMPTY_PATIENT: PatientDetails = {
  uniqueId: "",
  name: "",
  phoneNumber: "",
  age: "",
  gender: "",
};

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-1 block text-sm font-medium text-gray-700">
      {children}
    </label>
  );
}

function PhoneField({
  value,
  onChange,
  readOnly = false,
}: {
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
}) {
  return (
    <div className="flex h-[45px] overflow-hidden rounded-[8px] border-[0.5px] border-black bg-[#FAFAFA]">
      <span className="flex items-center border-r border-gray-300 bg-gray-100 px-3 text-sm font-medium text-gray-700">
        +234
      </span>
      <input
        type="tel"
        value={value}
        readOnly={readOnly}
        onChange={(e) => onChange?.(e.target.value.replace(/[^\d\s]/g, ""))}
        placeholder="0123 456 7890"
        className="h-full w-full bg-transparent px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none read-only:cursor-default"
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  placeholder,
  options,
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: { value: string; label: string }[];
  disabled?: boolean;
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <div className="relative">
        <select
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className={`${formFieldSelectClass} pr-10 disabled:cursor-not-allowed disabled:bg-gray-100`}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
          aria-hidden
        />
      </div>
    </div>
  );
}

const MakeRequest = () => {
  const { user } = useAuth();
  const { admissions } = usePatientManagement();
  const directoryPatients = useMemo(() => buildMockPatients(), []);

  /** Same pattern as Set Reminder: Create Schedule / View Reminders */
  const [activeView, setActiveView] = useState<RequestView>("department");

  const [department, setDepartment] = useState<DepartmentOption>("");
  const [departmentPhone, setDepartmentPhone] = useState("");
  const [departmentName, setDepartmentName] = useState(
    user?.fullName ?? "Sample Testing Tester",
  );

  const [patientType, setPatientType] = useState<PatientTypeOption>("");
  const [patient, setPatient] = useState<PatientDetails>(EMPTY_PATIENT);
  const [patientError, setPatientError] = useState<string | null>(null);

  const [medicationOpen, setMedicationOpen] = useState(true);
  const [medications, setMedications] = useState<PickedMedication[]>([]);

  const clearPatientDetails = () => {
    setPatient(EMPTY_PATIENT);
    setPatientError(null);
  };

  const resolvePatientByUniqueId = (
    uniqueId: string,
    type: PatientTypeOption,
  ) => {
    const query = uniqueId.trim().toLowerCase();
    if (!query || !type) {
      setPatientError(null);
      return;
    }

    if (type === "In Patient") {
      const admission = admissions.find(
        (row) => row.patientId.toLowerCase() === query,
      );

      if (!admission) {
        clearPatientDetails();
        setPatient((prev) => ({ ...prev, uniqueId }));
        setPatientError("Px Not Admitted");
        return;
      }

      setPatientError(null);
      setPatient({
        uniqueId: admission.patientId,
        name: admission.name,
        phoneNumber: admission.phoneNumber.replace(/^\+?234/, "").trim(),
        age: String(admission.age),
        gender:
          admission.gender === "M" || admission.gender === "Male"
            ? "Male"
            : admission.gender === "F" || admission.gender === "Female"
              ? "Female"
              : admission.gender,
      });
      return;
    }

    const match = directoryPatients.find(
      (row) =>
        row.patientId.toLowerCase() === query ||
        row.name.toLowerCase() === query,
    );

    if (!match) {
      setPatientError("Patient not found");
      setPatient((prev) => ({ ...prev, uniqueId }));
      return;
    }

    setPatientError(null);
    setPatient({
      uniqueId: match.patientId,
      name: match.name,
      phoneNumber: match.phoneNumber.replace(/^\+?234/, "").trim(),
      age: String(match.age),
      gender:
        match.gender === "M" || match.gender === "Male"
          ? "Male"
          : match.gender === "F" || match.gender === "Female"
            ? "Female"
            : match.gender,
    });
  };

  const handlePatientTypeChange = (value: PatientTypeOption) => {
    setPatientType(value);
    clearPatientDetails();
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!department) {
      toast.error("Select a department.");
      setActiveView("department");
      return;
    }
    if (!patientType) {
      toast.error("Select a patient type.");
      setActiveView("patient-type");
      return;
    }
    if (patientError) {
      toast.error(patientError);
      setActiveView("patient-type");
      return;
    }
    if (!patient.uniqueId.trim() || !patient.name.trim()) {
      toast.error("Enter a valid Unique ID to load patient details.");
      setActiveView("patient-type");
      return;
    }
    if (medications.length === 0) {
      toast.error("Add at least one medication.");
      return;
    }

    toast.success("Medication request submitted successfully.");
    setMedications([]);
    clearPatientDetails();
    setPatientType("");
  };

  return (
    <div className="flex h-full w-full">
      <main className="flex-1 p-6">
        <Card className="mx-auto my-6 w-full max-w-4xl rounded border-2 p-5">
          <CardContent className="p-0">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-gray-900">
                Make Request
              </h3>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className={`flex items-center gap-2 rounded-lg border-2 font-medium ${
                      activeView === "department"
                        ? "border-[#573FD1] bg-[#573FD1] text-white hover:bg-[#4a35b8] hover:text-white"
                        : "border-[#9080e0] bg-[#eeecfa] text-[#9080e0] hover:bg-[#e0dafa] hover:text-[#9080e0]"
                    }`}
                  >
                    <Filter size={16} />
                    {activeView === "department"
                      ? "Request (Department)"
                      : "Request (Patient Type)"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuItem
                    className={`cursor-pointer ${
                      activeView === "department"
                        ? "bg-[#9080e0] text-white"
                        : "bg-[#eeecfa] text-[#9080e0] hover:bg-[#e0dafa]"
                    }`}
                    onClick={() => setActiveView("department")}
                  >
                    Request (Department)
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={`cursor-pointer ${
                      activeView === "patient-type"
                        ? "bg-[#9080e0] text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveView("patient-type")}
                  >
                    Request (Patient Type)
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <hr className="mb-4" />

            <form onSubmit={handleSubmit} className="space-y-6">
              {activeView === "department" ? (
                <div className="space-y-4">
                  <SelectField
                    label="Department"
                    value={department}
                    onChange={(value) =>
                      setDepartment(value as DepartmentOption)
                    }
                    placeholder="-- select department --"
                    options={[
                      { value: "IPD", label: "IPD" },
                      { value: "OPD", label: "OPD" },
                    ]}
                  />

                  <div>
                    <FieldLabel>Phone Number</FieldLabel>
                    <PhoneField
                      value={departmentPhone}
                      onChange={setDepartmentPhone}
                    />
                  </div>

                  <div>
                    <FieldLabel>Name</FieldLabel>
                    <input
                      type="text"
                      value={departmentName}
                      onChange={(e) => setDepartmentName(e.target.value)}
                      className={formFieldInputClass}
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <SelectField
                      label="Type"
                      value={patientType}
                      onChange={(value) =>
                        handlePatientTypeChange(value as PatientTypeOption)
                      }
                      placeholder="-- select patient type --"
                      options={[
                        { value: "In Patient", label: "In Patient" },
                        { value: "Out Patient", label: "Out Patient" },
                      ]}
                    />
                    <p className="mt-2 text-xs text-gray-500">
                      If In Patient is selected and the patient is not actively
                      on admission, the system returns{" "}
                      <span className="font-semibold text-red-600">
                        Px Not Admitted
                      </span>
                      . Otherwise patient details load automatically.
                    </p>
                  </div>

                  <div>
                    <FieldLabel>Unique ID Number</FieldLabel>
                    <input
                      type="text"
                      value={patient.uniqueId}
                      disabled={!patientType}
                      onChange={(e) =>
                        setPatient((prev) => ({
                          ...prev,
                          uniqueId: e.target.value,
                        }))
                      }
                      onBlur={() =>
                        resolvePatientByUniqueId(patient.uniqueId, patientType)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          resolvePatientByUniqueId(
                            patient.uniqueId,
                            patientType,
                          );
                        }
                      }}
                      placeholder={
                        patientType === "In Patient"
                          ? "e.g. MSH/1088"
                          : "Enter Unique ID"
                      }
                      className={`${formFieldInputClass} disabled:cursor-not-allowed disabled:bg-gray-100`}
                    />
                    {patientError && (
                      <p className="mt-2 text-sm font-semibold text-red-600">
                        {patientError}
                      </p>
                    )}
                  </div>

                  <div>
                    <FieldLabel>Name</FieldLabel>
                    <input
                      type="text"
                      value={patient.name}
                      readOnly
                      className={`${formFieldInputClass} bg-gray-100`}
                    />
                  </div>

                  <div>
                    <FieldLabel>Phone Number</FieldLabel>
                    <PhoneField value={patient.phoneNumber} readOnly />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <FieldLabel>Age</FieldLabel>
                      <input
                        type="text"
                        value={patient.age}
                        readOnly
                        className={`${formFieldInputClass} bg-gray-100`}
                      />
                    </div>
                    <div>
                      <FieldLabel>Gender</FieldLabel>
                      <input
                        type="text"
                        value={patient.gender}
                        readOnly
                        className={`${formFieldInputClass} bg-gray-100`}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Florence medication logic — always under whichever request view is active */}
              <RequestMedicationSection
                open={medicationOpen}
                onToggle={() => setMedicationOpen((prev) => !prev)}
                items={medications}
                onItemsChange={setMedications}
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="rounded-lg bg-[#573FD1] px-10 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#4a35b8]"
                >
                  Submit
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default MakeRequest;
