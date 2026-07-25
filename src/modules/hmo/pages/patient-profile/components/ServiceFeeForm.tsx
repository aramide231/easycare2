import { useEffect, useState } from "react";
import {
  buildMockServiceFeeSections,
  type ServiceFeeSection,
} from "../data/mockServiceFeeData";
import ServiceFeeSectionCard from "./ServiceFeeSection";

type Props = {
  onSectionsChange?: (sections: ServiceFeeSection[]) => void;
};

const ServiceFeeForm = ({ onSectionsChange }: Props) => {
  const [sections, setSections] = useState<ServiceFeeSection[]>(() =>
    buildMockServiceFeeSections(),
  );
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "ACCOMODATION",
  ]);

  useEffect(() => {
    onSectionsChange?.(sections);
  }, [sections, onSectionsChange]);

  const toggleSection = (title: string) => {
    setExpandedSections((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title],
    );
  };

  const updateSectionRows = (
    sectionId: string,
    rows: ServiceFeeSection["rows"],
  ) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId ? { ...section, rows } : section,
      ),
    );
  };

  return (
    <div className="flex w-full flex-col divide-y divide-gray-200">
      {sections.map((section) => (
        <ServiceFeeSectionCard
          key={section.id}
          title={section.title}
          rows={section.rows}
          isOpen={expandedSections.includes(section.title)}
          onToggle={() => toggleSection(section.title)}
          onRowsChange={(rows) => updateSectionRows(section.id, rows)}
        />
      ))}
    </div>
  );
};

export default ServiceFeeForm;
