import { useMemo, useState } from "react";
import { Calendar } from "lucide-react";
import { useMedicalTable } from "../../../hooks/useMedicalTable";
import CategoryMedicalTable from "../../category/CategoryMedicalTable";
import {
  formFieldGridClass,
  formFieldInputClass,
  formFieldSelectClass,
  formFieldTextareaClass,
} from "../../../lib/formFieldStyles";

type BabyDetails = {
  weight: string;
  length: string;
  headCircumference: string;
  condition: string;
  gender: string;
  immunization: string;
  deliveryDateTime: string;
};

const deliveryNoteTableColumns = [
  { key: "sn", label: "SN" },
  { key: "deliveryDateTime", label: "DATE | TIME" },
  { key: "deliveryMode", label: "MOTHER'S MODE OF DELIVERY" },
  { key: "noOfBaby", label: "NO OF BABY" },
  { key: "babyWeight", label: "BABY WEIGHT" },
];

function emptyBaby(): BabyDetails {
  return {
    weight: "",
    length: "",
    headCircumference: "",
    condition: "",
    gender: "",
    immunization: "",
    deliveryDateTime: "",
  };
}

function getBabyCount(noOfBaby: string): number {
  if (!noOfBaby || noOfBaby === "1 Baby") return 1;
  const match = noOfBaby.match(/\((\d+)\s*babies?\)/i);
  return match ? Math.max(1, parseInt(match[1], 10)) : 1;
}

function formatSingleDateTime(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;

  const day = date.getDate();
  const month = date.toLocaleString("en-GB", { month: "short" });
  const year = date.getFullYear();
  const time = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `${day}-${month}-${year} ${time}`;
}

function formatTimeOnly(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;

  return date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function formatNoOfBabyForTable(value: unknown): string {
  const str = String(value ?? "");
  if (!str) return "—";
  if (str === "1 Baby") return "1";
  return str.replace(/\s*\(\d+\s*babies?\)\s*$/i, "").trim() || str;
}

function joinBabyValues(babies: BabyDetails[], key: keyof BabyDetails): string {
  return babies
    .map((baby) => baby[key]?.trim())
    .filter(Boolean)
    .join(", ");
}

function parseBabiesFromRow(row: Record<string, unknown>): BabyDetails[] {
  if (typeof row.babies !== "string") return [];
  try {
    return JSON.parse(row.babies) as BabyDetails[];
  } catch {
    return [];
  }
}

function formatTableDeliveryDateTime(row: Record<string, unknown>): string {
  const babies = parseBabiesFromRow(row);
  const datetimes = babies
    .map((baby) => baby.deliveryDateTime?.trim())
    .filter(Boolean);

  if (datetimes.length === 0) {
    const fallback = row.deliveryDateTime ?? row.dateTime;
    if (!fallback) return "—";
    return formatSingleDateTime(String(fallback));
  }

  if (datetimes.length === 1) {
    return formatSingleDateTime(datetimes[0]);
  }

  const first = new Date(datetimes[0]);
  const dateLine = `${first.getDate()}-${first.toLocaleString("en-GB", { month: "short" })}-${first.getFullYear()}`;
  const times = datetimes.map(formatTimeOnly);
  return [dateLine, ...times].join("\n");
}

function SuffixInput({
  suffix,
  value,
  onChange,
  placeholder,
}: {
  suffix: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="relative min-w-0">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`${formFieldInputClass} pr-14`}
      />
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500">
        {suffix}
      </span>
    </div>
  );
}

function renderSelectOptions(fieldName: string) {
  if (fieldName === "deliveryMode") {
    return (
      <>
        <optgroup label="Vaginal Delivery">
          <option value="Vaginal Delivery: Home Delivery">Home Delivery</option>
          <option value="Vaginal Delivery: Painless or Epidural-Assisted Delivery">
            Painless or Epidural-Assisted Delivery
          </option>
          <option value="Vaginal Delivery: Water Birth Delivery">
            Water Birth Delivery
          </option>
          <option value="Vaginal Delivery: VBAC (Vaginal Birth After Cesarean)">
            VBAC (Vaginal Birth After Cesarean)
          </option>
        </optgroup>
        <optgroup label="Assisted Delivery">
          <option value="Assisted Delivery: Forceps">Forceps</option>
          <option value="Assisted Delivery: Vacuum Birth">Vacuum Birth</option>
        </optgroup>
        <optgroup label="Cesarean Section (C/S) Delivery">
          <option value="Cesarean Section (C/S) Delivery: Elective (Lower Segment)">
            Elective (Lower Segment)
          </option>
          <option value="Cesarean Section (C/S) Delivery: Elective (Classical)">
            Elective (Classical)
          </option>
          <option value="Cesarean Section (C/S) Delivery: Emergency Lower Segment">
            Emergency Lower Segment
          </option>
          <option value="Cesarean Section (C/S) Delivery: Emergency (Classical)">
            Emergency (Classical)
          </option>
        </optgroup>
      </>
    );
  }

  if (fieldName === "noOfBaby") {
    return (
      <>
        <optgroup label="Single">
          <option value="1 Baby">1 Baby</option>
        </optgroup>
        <optgroup label="Multiple">
          <option value="Twins (2 babies)">Twins (2 babies)</option>
          <option value="Triplets (3 babies)">Triplets (3 babies)</option>
          <option value="Quadruplets (4 babies)">Quadruplets (4 babies)</option>
          <option value="Quintuplets (5 babies)">Quintuplets (5 babies)</option>
          <option value="Sextuplets (8 babies)">Sextuplets (8 babies)</option>
          <option value="Septuplets (7 babies)">Septuplets (7 babies)</option>
          <option value="Octuplets (8 babies)">Octuplets (8 babies)</option>
          <option value="Nonuplets (9 babies)">Nonuplets (9 babies)</option>
          <option value="Decaplets (10 babies)">Decaplets (10 babies)</option>
        </optgroup>
      </>
    );
  }

  if (fieldName === "patientType") {
    return (
      <>
        <option value="Booked">Booked</option>
        <option value="UnBooked">UnBooked</option>
      </>
    );
  }

  if (fieldName === "babyGender") {
    return (
      <>
        <option value="Female">Female</option>
        <option value="Male">Male</option>
      </>
    );
  }

  if (fieldName === "babyImmunization") {
    return (
      <>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </>
    );
  }

  return null;
}

function multiFieldGridClass(count: number): string {
  if (count <= 1) return "grid grid-cols-1 gap-2";
  if (count === 2) return "grid grid-cols-2 gap-2";
  if (count === 3) return "grid grid-cols-3 gap-2";
  return "grid grid-cols-2 gap-2 sm:grid-cols-3";
}

function MultiBabyDateTime({
  count,
  babies,
  onChange,
}: {
  count: number;
  babies: BabyDetails[];
  onChange: (index: number, value: string) => void;
}) {
  return (
    <div className={multiFieldGridClass(count)}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={`datetime-${index}`} className="relative min-w-0">
          <input
            type="datetime-local"
            value={babies[index]?.deliveryDateTime || ""}
            onChange={(e) => onChange(index, e.target.value)}
            className={`${formFieldInputClass} pr-10`}
          />
          <Calendar
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
            aria-hidden
          />
        </div>
      ))}
    </div>
  );
}

export default function Stage4DeliveryNote() {
  const [form, setForm] = useState<Record<string, string>>({});
  const [babies, setBabies] = useState<BabyDetails[]>([emptyBaby()]);

  const { history: stageFourHistory, save } = useMedicalTable(
    "STAGE 4: DELIVERY NOTE"
  );

  const babyCount = useMemo(
    () => getBabyCount(form.noOfBaby || ""),
    [form.noOfBaby]
  );

  const handleFormChange = (name: string, value: string) => {
    if (name === "noOfBaby") {
      const count = getBabyCount(value);
      setBabies((prev) =>
        Array.from({ length: count }, (_, index) => prev[index] ?? emptyBaby())
      );
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBabyChange = (
    index: number,
    field: keyof BabyDetails,
    value: string
  ) => {
    setBabies((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const handleSave = () => {
    const hasScalar = Object.values(form).some((value) => value?.trim());
    const hasBaby = babies.some((baby) =>
      Object.values(baby).some((value) => value?.trim())
    );
    if (!hasScalar && !hasBaby) return;

    const primaryDateTime =
      babies.find((baby) => baby.deliveryDateTime.trim())?.deliveryDateTime ?? "";

    save({
      ...form,
      babyWeight: joinBabyValues(babies, "weight"),
      babyLength: joinBabyValues(babies, "length"),
      headCircumference: joinBabyValues(babies, "headCircumference"),
      babyCondition: joinBabyValues(babies, "condition"),
      babyGender: joinBabyValues(babies, "gender"),
      babyImmunization: joinBabyValues(babies, "immunization"),
      deliveryDateTime: primaryDateTime,
      babies: JSON.stringify(babies),
    });

    setForm({});
    setBabies([emptyBaby()]);
  };

  const tableRows = stageFourHistory.map((row) => ({
    ...row,
    noOfBaby: formatNoOfBabyForTable(row.noOfBaby),
    deliveryDateTime: formatTableDeliveryDateTime(row),
  }));

  return (
    <div className="space-y-6 text-sm">
      <div className={formFieldGridClass}>
        <div className="min-w-0">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Estimated Gestational Age (E.G.A)
          </label>
          <input
            type="text"
            value={form.ega || ""}
            onChange={(e) => handleFormChange("ega", e.target.value)}
            placeholder="-input E.G.A-"
            className={formFieldInputClass}
          />
        </div>

        <div className="min-w-0">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Mother&apos;s Mode of Delivery
          </label>
          <select
            value={form.deliveryMode || ""}
            onChange={(e) => handleFormChange("deliveryMode", e.target.value)}
            className={formFieldSelectClass}
          >
            <option value="">-Select option-</option>
            {renderSelectOptions("deliveryMode")}
          </select>
        </div>

        <div className="min-w-0">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            No of Baby
          </label>
          <select
            value={form.noOfBaby || ""}
            onChange={(e) => handleFormChange("noOfBaby", e.target.value)}
            className={formFieldSelectClass}
          >
            <option value="">-Select option-</option>
            {renderSelectOptions("noOfBaby")}
          </select>
        </div>

        <div className="min-w-0">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Baby&apos;s Weight
          </label>
          <div className={multiFieldGridClass(babyCount)}>
            {Array.from({ length: babyCount }).map((_, index) => (
              <SuffixInput
                key={`weight-${index}`}
                suffix="Kg"
                value={babies[index]?.weight || ""}
                onChange={(value) => handleBabyChange(index, "weight", value)}
                placeholder="-Kg-"
              />
            ))}
          </div>
        </div>

        <div className="min-w-0">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Baby&apos;s Length
          </label>
          <div className={multiFieldGridClass(babyCount)}>
            {Array.from({ length: babyCount }).map((_, index) => (
              <SuffixInput
                key={`length-${index}`}
                suffix="CM"
                value={babies[index]?.length || ""}
                onChange={(value) => handleBabyChange(index, "length", value)}
                placeholder="-CM-"
              />
            ))}
          </div>
        </div>

        <div className="min-w-0">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Head Circumference
          </label>
          <div className={multiFieldGridClass(babyCount)}>
            {Array.from({ length: babyCount }).map((_, index) => (
              <SuffixInput
                key={`head-${index}`}
                suffix="CM"
                value={babies[index]?.headCircumference || ""}
                onChange={(value) =>
                  handleBabyChange(index, "headCircumference", value)
                }
                placeholder="-CM-"
              />
            ))}
          </div>
        </div>

        <div className="min-w-0">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Mother&apos;s Condition
          </label>
          <input
            type="text"
            value={form.motherCondition || ""}
            onChange={(e) => handleFormChange("motherCondition", e.target.value)}
            placeholder="-input mother's condition-"
            className={formFieldInputClass}
          />
        </div>

        <div className="min-w-0">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Baby&apos;s Condition
          </label>
          <div className={multiFieldGridClass(babyCount)}>
            {Array.from({ length: babyCount }).map((_, index) => (
              <input
                key={`condition-${index}`}
                type="text"
                value={babies[index]?.condition || ""}
                onChange={(e) =>
                  handleBabyChange(index, "condition", e.target.value)
                }
                placeholder="-Enter-"
                className={formFieldInputClass}
              />
            ))}
          </div>
        </div>

        <div className="min-w-0">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Patient Type
          </label>
          <select
            value={form.patientType || ""}
            onChange={(e) => handleFormChange("patientType", e.target.value)}
            className={formFieldSelectClass}
          >
            <option value="">-Select option-</option>
            {renderSelectOptions("patientType")}
          </select>
        </div>

        <div className="min-w-0">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Any Complication
          </label>
          <input
            type="text"
            value={form.anyComplication || ""}
            onChange={(e) => handleFormChange("anyComplication", e.target.value)}
            placeholder="-Enter notes here-"
            className={formFieldInputClass}
          />
        </div>

        <div className="min-w-0">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Baby&apos;s Gender
          </label>
          <div className={multiFieldGridClass(babyCount)}>
            {Array.from({ length: babyCount }).map((_, index) => (
              <select
                key={`gender-${index}`}
                value={babies[index]?.gender || ""}
                onChange={(e) =>
                  handleBabyChange(index, "gender", e.target.value)
                }
                className={formFieldSelectClass}
              >
                <option value="">-Select option-</option>
                {renderSelectOptions("babyGender")}
              </select>
            ))}
          </div>
        </div>

        <div className="min-w-0">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Baby&apos;s Immunization at Birth
          </label>
          <div className={multiFieldGridClass(babyCount)}>
            {Array.from({ length: babyCount }).map((_, index) => (
              <select
                key={`immunization-${index}`}
                value={babies[index]?.immunization || ""}
                onChange={(e) =>
                  handleBabyChange(index, "immunization", e.target.value)
                }
                className={formFieldSelectClass}
              >
                <option value="">-Select option-</option>
                {renderSelectOptions("babyImmunization")}
              </select>
            ))}
          </div>
        </div>

        <div className="min-w-0">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Clinician Name
          </label>
          <input
            type="text"
            value={form.clinician || ""}
            onChange={(e) => handleFormChange("clinician", e.target.value)}
            placeholder="capture name of filler"
            className={formFieldInputClass}
          />
        </div>

        <div className="min-w-0">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Date + Time of Delivery
          </label>
          <MultiBabyDateTime
            count={babyCount}
            babies={babies}
            onChange={(index, value) =>
              handleBabyChange(index, "deliveryDateTime", value)
            }
          />
        </div>

        <div className="col-span-2 min-w-0">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Physical Examination
          </label>
          <textarea
            rows={4}
            value={form.physicalExam || ""}
            onChange={(e) => handleFormChange("physicalExam", e.target.value)}
            placeholder="Enter notes here"
            className={formFieldTextareaClass}
          />
        </div>

        <div className="col-span-2 min-w-0">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Additional(s)
          </label>
          <textarea
            rows={4}
            value={form.additional || ""}
            onChange={(e) => handleFormChange("additional", e.target.value)}
            placeholder="Enter notes here"
            className={formFieldTextareaClass}
          />
        </div>
      </div>

      <div className="text-center">
        <button
          type="button"
          onClick={handleSave}
          className="w-full max-w-xs rounded-lg bg-[#573FD1] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#4a35b8]"
        >
          Save
        </button>
      </div>

      <CategoryMedicalTable
        title="DELIVERY NOTE DETAILS"
        columns={deliveryNoteTableColumns}
        rows={tableRows}
        wrapColumns={["deliveryDateTime"]}
        emptyMessage="No delivery note records yet."
      />
    </div>
  );
}
