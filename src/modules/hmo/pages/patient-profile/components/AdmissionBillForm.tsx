import { useEffect, useState } from "react";
import {
  ADMISSION_BILL_SUMMARY,
  buildMockAdmissionBillSections,
  formatNaira,
  type AdmissionBillSection,
} from "../data/mockAdmissionBillData";
import AdmissionBillSectionCard from "./AdmissionBillSection";

type Props = {
  onSectionsChange?: (sections: AdmissionBillSection[]) => void;
};

const AdmissionBillForm = ({ onSectionsChange }: Props) => {
  const [sections] = useState(() => buildMockAdmissionBillSections());
  const [expandedSections, setExpandedSections] = useState<string[]>(() =>
    sections.map((section) => section.id),
  );
  const [checkedSections, setCheckedSections] = useState<string[]>(["feeding"]);

  useEffect(() => {
    onSectionsChange?.(sections);
  }, [sections, onSectionsChange]);

  const toggleSection = (id: string) => {
    setExpandedSections((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const toggleChecked = (id: string, checked: boolean) => {
    setCheckedSections((prev) =>
      checked ? [...prev, id] : prev.filter((item) => item !== id),
    );
  };

  const { totalAdmissionBill, deposit, discount, amountToPay } =
    ADMISSION_BILL_SUMMARY;

  return (
    <div className="rounded-[10px] border-[0.5px] border-[#A5A5A5] p-5">
      <div className="mb-2.5 flex items-start justify-between rounded-[9px] bg-[#FFF1E6] px-5 py-2.5 italic text-[#FA7401]">
        <span className="text-lg font-semibold">Pending Payment</span>
        <span className="text-right text-xl font-bold">
          {formatNaira(amountToPay)}
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {sections.map((section) => (
          <AdmissionBillSectionCard
            key={section.id}
            section={section}
            isOpen={expandedSections.includes(section.id)}
            checked={checkedSections.includes(section.id)}
            onToggle={() => toggleSection(section.id)}
            onCheckedChange={(checked) => toggleChecked(section.id, checked)}
          />
        ))}
      </div>

      <div className="mt-4 rounded-lg border border-[#F5F5F5] bg-[#F0F0F0] p-5">
        <div className="space-y-4 text-base text-[#071639]">
          <div className="flex items-start justify-between gap-4">
            <span className="font-medium">Total Admission Bill</span>
            <span className="shrink-0 font-semibold">
              {formatNaira(totalAdmissionBill)}
            </span>
          </div>
          <div className="flex items-start justify-between gap-4">
            <span className="font-medium">Deposit</span>
            <span className="shrink-0 font-semibold">
              {formatNaira(deposit)}
            </span>
          </div>
          <div className="flex items-start justify-between gap-4">
            <span className="font-medium">Discount</span>
            <span className="shrink-0 font-semibold">
              -{formatNaira(discount)}
            </span>
          </div>
          <div className="flex items-start justify-between gap-4 rounded-[9px] bg-[#FFF1E6] px-5 py-2.5 font-semibold italic text-[#FA7401]">
            <span className="text-lg">Amount To Pay</span>
            <span className="text-xl">{formatNaira(amountToPay)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionBillForm;
