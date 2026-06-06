import { useState } from "react";
import { useMedicalTable } from "../../../hooks/useMedicalTable";
import CategoryMedicalTable from "../../category/CategoryMedicalTable";
import {
  genConsultDeleteBtn,
  genConsultInputClass,
  genConsultLabelClass,
  genConsultSaveBtn,
  genConsultSelectClass,
  genConsultSmallSaveBtn,
} from "../genConsult/genConsultStyles";
import {
  AGE_GRADE_OPTIONS,
  COMMENT_OPTIONS,
  DOSAGE_OPTIONS,
  PERIOD_OPTIONS,
  ROUTE_OPTIONS,
  SITE_OPTIONS,
  VACCINE_TYPE_OPTIONS,
} from "./immunizationFieldOptions";

type VaccineLine = {
  vaccineType: string;
  dosage: string;
  route: string;
  site: string;
  amount: string;
  period: string;
  price: number;
};

const HISTORY_COLUMNS = [
  { key: "sn", label: "SN" },
  { key: "dateTime", label: "DATE | TIME" },
  { key: "patientType", label: "PX TYPE" },
  { key: "ageGrade", label: "AGE GRADE" },
  { key: "vaccineType", label: "TYPE OF VACCINE" },
  { key: "dosage", label: "DOSAGE" },
];

const emptyLine = (): Omit<VaccineLine, "price"> => ({
  vaccineType: "",
  dosage: "",
  route: "",
  site: "",
  amount: "",
  period: "",
});

export default function VaccineAdministration() {
  const [ageGrade, setAgeGrade] = useState("");
  const [sessionPeriod, setSessionPeriod] = useState("");
  const [weight, setWeight] = useState("");
  const [comment, setComment] = useState("");
  const [line, setLine] = useState(emptyLine());
  const [items, setItems] = useState<VaccineLine[]>([]);

  const { history, saveBatch, remove } = useMedicalTable(
    "IMMUNIZATION — VACCINE ADMINISTRATION",
  );

  const inputClass = genConsultInputClass.replace("max-w-[354px]", "max-w-none");
  const selectClass = genConsultSelectClass.replace(
    "max-w-[354px]",
    "max-w-none",
  );

  const pickVaccine = (type: string) => {
    const preset = VACCINE_TYPE_OPTIONS[type];
    setLine((prev) => ({
      ...prev,
      vaccineType: type,
      dosage: preset?.dosage ?? prev.dosage,
      route: preset?.route ?? prev.route,
      site: preset?.site ?? prev.site,
      price: preset?.price ?? 0,
    }));
  };

  const addVaccine = () => {
    if (!line.vaccineType) return;
    const preset = VACCINE_TYPE_OPTIONS[line.vaccineType];
    setItems((prev) => [
      ...prev,
      {
        ...line,
        price: preset?.price ?? (Number(line.amount) || 0),
      },
    ]);
    setLine(emptyLine());
  };

  const total = items.reduce((sum, item) => sum + item.price, 0);

  const handleSave = () => {
    if (!items.length) return;
    saveBatch(
      items.map((item) => ({
        patientType: "OPD",
        ageGrade,
        sessionPeriod,
        weight,
        comment,
        vaccineType: item.vaccineType.toUpperCase(),
        dosage: item.dosage.toUpperCase(),
        route: item.route,
        site: item.site,
        amount: item.amount,
        price: String(item.price),
      })),
    );
    setItems([]);
    setAgeGrade("");
    setSessionPeriod("");
    setWeight("");
    setComment("");
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-[#F3F0FF] p-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className={genConsultLabelClass}>Age-Grade</label>
            <select
              value={ageGrade}
              onChange={(e) => setAgeGrade(e.target.value)}
              className={selectClass}
            >
              <option value="">-Select an Option-</option>
              {AGE_GRADE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.label}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={genConsultLabelClass}>Period</label>
            <select
              value={sessionPeriod}
              onChange={(e) => setSessionPeriod(e.target.value)}
              className={selectClass}
            >
              <option value="">-Select an Option-</option>
              {PERIOD_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.label}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <label className={genConsultLabelClass}>Type of Vaccine</label>
          <select
            value={line.vaccineType}
            onChange={(e) => pickVaccine(e.target.value)}
            className={selectClass}
          >
            <option value="">-Select vaccine-</option>
            {Object.keys(VACCINE_TYPE_OPTIONS).map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={genConsultLabelClass}>Dosage</label>
          <select
            value={line.dosage}
            onChange={(e) =>
              setLine((prev) => ({ ...prev, dosage: e.target.value }))
            }
            className={selectClass}
          >
            <option value="">-Select dosage-</option>
            {DOSAGE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={genConsultLabelClass}>Administration Route</label>
          <select
            value={line.route}
            onChange={(e) =>
              setLine((prev) => ({ ...prev, route: e.target.value }))
            }
            className={selectClass}
          >
            <option value="">-Select route-</option>
            {ROUTE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={genConsultLabelClass}>Site (Body Part)</label>
          <select
            value={line.site}
            onChange={(e) =>
              setLine((prev) => ({ ...prev, site: e.target.value }))
            }
            className={selectClass}
          >
            <option value="">-Select body part-</option>
            {SITE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={genConsultLabelClass}>Amount</label>
          <input
            value={line.amount}
            onChange={(e) =>
              setLine((prev) => ({ ...prev, amount: e.target.value }))
            }
            placeholder="Amount"
            className={inputClass}
          />
        </div>
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <label className={genConsultLabelClass}>Period</label>
            <input
              type="date"
              value={line.period}
              onChange={(e) =>
                setLine((prev) => ({ ...prev, period: e.target.value }))
              }
              className={inputClass}
            />
          </div>
          <button type="button" onClick={addVaccine} className={genConsultSmallSaveBtn}>
            Save
          </button>
        </div>
      </div>

      {items.length > 0 && (
        <div className="divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex flex-wrap items-center justify-between gap-4 px-4 py-3 text-sm"
            >
              <span className="font-medium">
                {index + 1}. {item.vaccineType} | {item.dosage} | {item.route} |{" "}
                {item.site}
              </span>
              <div className="flex items-center gap-4">
                <span className="font-medium">
                  N {item.price.toLocaleString()}.00
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setItems((prev) => prev.filter((_, i) => i !== index))
                  }
                  className={genConsultDeleteBtn}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-end px-4 py-3 text-sm font-bold">
            TOTAL N {total.toLocaleString()}.00
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className={genConsultLabelClass}>Weight</label>
          <input
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="-Input weight-"
            className={inputClass}
          />
        </div>
        <div>
          <label className={genConsultLabelClass}>Comment</label>
          <select
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className={selectClass}
          >
            <option value="">-Select an Option-</option>
            {COMMENT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="text-center">
        <button
          type="button"
          onClick={handleSave}
          disabled={!items.length}
          className={`${genConsultSaveBtn} disabled:cursor-not-allowed disabled:opacity-50`}
        >
          Save
        </button>
      </div>

      <CategoryMedicalTable
        title="VACCINE ADMINISTRATION DETAILS"
        columns={HISTORY_COLUMNS}
        rows={history}
        emptyMessage="No vaccine administration recorded yet."
      />
    </div>
  );
}
