import { useState } from "react";
import { Plus } from "lucide-react";
import type { CategoryFieldConfig } from "../../../config/categoryFieldTypes";
import { DEFAULT_META_TABLE_COLUMNS, YES_NO_OPTIONS } from "../../../config/categoryFieldTypes";
import { useMedicalTable } from "../../../hooks/useMedicalTable";
import CategoryMedicalTable from "../../category/CategoryMedicalTable";
import {
  BABY_CONDITION_OPTIONS,
  BABY_GENDER_OPTIONS,
  LIVING_CHILDREN_OPTIONS,
} from "./antenatalFieldOptions";
import {
  formFieldInputClass,
  formFieldSelectClass,
} from "../../../lib/formFieldStyles";

type ChildBlock = Record<string, string>;

const childFieldDefs: CategoryFieldConfig[] = [
  {
    name: "dateOfBirth",
    label: "Date Of Birth",
    type: "date",
    placeholder: "DD/MM/YYY",
  },
  {
    name: "durationOfPregnancy",
    label: "Duration Of Pregnancy",
    placeholder: "-Input duration-",
  },
  {
    name: "birthWeight",
    label: "Birth Weight (Kg)",
    placeholder: "-Input weight-",
  },
  {
    name: "pregnancyOutcome",
    label: "Pregnancy, Labour & Peuperium",
    placeholder: "-Input details-",
  },
  {
    name: "babyCondition",
    label: "Baby's Condition",
    type: "select",
    placeholder: "-Select an Option-",
    options: BABY_CONDITION_OPTIONS,
  },
  {
    name: "babyGender",
    label: "Baby's Gender",
    type: "select",
    placeholder: "-Select an Option-",
    options: BABY_GENDER_OPTIONS,
  },
];

const pregnancyTableColumns = [
  ...DEFAULT_META_TABLE_COLUMNS.filter((c) => c.key !== "enteredBy"),
  { key: "totalGP", label: "TOTAL GP" },
  { key: "livingChildren", label: "NO OF LIVING CHILDREN" },
  { key: "dateOfBirth", label: "D.O.B" },
];

const emptyChildBlock = (): ChildBlock =>
  Object.fromEntries(childFieldDefs.map((f) => [f.name, ""]));

export default function PreviousPregnancyHistory() {
  const { history, save } = useMedicalTable(
    "ANTE NATAL — PREVIOUS PREGNANCY HISTORY",
  );
  const [totalGP, setTotalGP] = useState("");
  const [livingChildren, setLivingChildren] = useState("");
  const [childBlocks, setChildBlocks] = useState<ChildBlock[]>([
    emptyChildBlock(),
  ]);

  const updateChild = (index: number, name: string, value: string) => {
    setChildBlocks((prev) =>
      prev.map((block, i) =>
        i === index ? { ...block, [name]: value } : block,
      ),
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const primaryChild = childBlocks[0] ?? emptyChildBlock();
    save({
      totalGP,
      livingChildren,
      ...primaryChild,
      childCount: String(childBlocks.length),
    });
    setTotalGP("");
    setLivingChildren("");
    setChildBlocks([emptyChildBlock()]);
  };

  const inputClass = formFieldInputClass.replace("max-w-[354px]", "max-w-none");
  const selectClass = formFieldSelectClass.replace(
    "max-w-[354px]",
    "max-w-none",
  );

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSave}
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
      >
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-800">
            Total Gravity & Parity (G/P)
          </label>
          <input
            type="text"
            value={totalGP}
            onChange={(e) => setTotalGP(e.target.value)}
            placeholder="-Input G/P-"
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-800">
            Number of living Children
          </label>
          <select
            value={livingChildren}
            onChange={(e) => setLivingChildren(e.target.value)}
            className={selectClass}
          >
            <option value="">-Select a type-</option>
            {LIVING_CHILDREN_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {childBlocks.map((block, blockIndex) => (
          <div key={blockIndex} className="contents">
            {childFieldDefs.map((field) => (
              <div
                key={`${blockIndex}-${field.name}`}
                className={field.fullWidth ? "md:col-span-2" : undefined}
              >
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-800">
                  {field.label}
                </label>
                {field.type === "select" ? (
                  <select
                    value={block[field.name] || ""}
                    onChange={(e) =>
                      updateChild(blockIndex, field.name, e.target.value)
                    }
                    className={selectClass}
                  >
                    <option value="">
                      {field.placeholder ?? "-Select an Option-"}
                    </option>
                    {(field.options ?? YES_NO_OPTIONS).map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type === "date" ? "date" : "text"}
                    value={block[field.name] || ""}
                    onChange={(e) =>
                      updateChild(blockIndex, field.name, e.target.value)
                    }
                    placeholder={field.placeholder}
                    className={inputClass}
                  />
                )}
              </div>
            ))}
          </div>
        ))}

        <div className="md:col-span-2">
          <button
            type="button"
            onClick={() =>
              setChildBlocks((prev) => [...prev, emptyChildBlock()])
            }
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#573FD1] hover:text-[#4a35b8]"
          >
            <Plus className="h-4 w-4" />
            Add Another Child History
          </button>
        </div>

        <div className="md:col-span-2 pt-2 text-center">
          <button
            type="submit"
            className="w-full max-w-xs rounded-lg bg-[#573FD1] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#4a35b8]"
          >
            Save
          </button>
        </div>
      </form>

      <CategoryMedicalTable
        title="PREV PREGNANCY HISTORY"
        columns={pregnancyTableColumns}
        rows={history}
        emptyMessage="No previous pregnancy history recorded yet."
      />
    </div>
  );
}
