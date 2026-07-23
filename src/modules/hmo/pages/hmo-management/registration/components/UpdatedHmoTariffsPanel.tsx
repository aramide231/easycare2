import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { HmoRegistrationRecord } from "../data/mockHmoRegistrationRecords";
import {
  buildMockHmoTariffCategories,
  cloneTariffCategories,
  type HmoTariffCategory,
  type HmoTariffItem,
} from "../data/mockHmoTariffData";
import HmoTariffCategoryTable from "./HmoTariffCategoryTable";

type Props = {
  hmoRecords: HmoRegistrationRecord[];
};

const selectClass =
  "h-10 w-full appearance-none rounded-lg border-[0.5px] border-black bg-[#FAFAFA] px-4 pr-10 text-[15px] text-black outline-none focus:border-[#573FD1]";

const UpdatedHmoTariffsPanel = ({ hmoRecords }: Props) => {
  const hmoOptions = useMemo(
    () =>
      hmoRecords.map((record) => ({
        value: record.id,
        label: record.name,
      })),
    [hmoRecords],
  );

  const [selectedHmoId, setSelectedHmoId] = useState("");
  const [categories, setCategories] = useState<HmoTariffCategory[]>(() =>
    cloneTariffCategories(buildMockHmoTariffCategories()),
  );

  const handleUpdateItems = (
    categoryId: string,
    items: HmoTariffItem[],
  ) => {
    setCategories((prev) =>
      prev.map((category) =>
        category.id === categoryId ? { ...category, items } : category,
      ),
    );
  };

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="w-full max-w-[819px]">
        <label className="mb-1.5 block text-[15px] tracking-[-0.3px] text-black">
          HMO List
        </label>
        <div className="relative">
          <select
            value={selectedHmoId}
            onChange={(event) => setSelectedHmoId(event.target.value)}
            className={selectClass}
          >
            <option value="">-Select an Option-</option>
            {hmoOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-6 w-6 -translate-y-1/2 text-black" />
        </div>
      </div>

      <div className="flex w-full flex-col gap-6">
        {categories.map((category) => (
          <HmoTariffCategoryTable
            key={category.id}
            category={category}
            onUpdateItems={handleUpdateItems}
          />
        ))}
      </div>
    </div>
  );
};

export default UpdatedHmoTariffsPanel;
