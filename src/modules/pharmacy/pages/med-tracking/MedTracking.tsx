import { useState } from "react";
import MedTrackingTabs from "./components/MedTrackingTabs";
import MedicationBatchTracking from "./components/MedicationBatchTracking";
import DamagedExpiredMedications from "./components/DamagedExpiredMedications";

const MedTracking = () => {
  const [activeTab, setActiveTab] = useState<1 | 2>(1);

  return (
    <div className="pb-8">
      <MedTrackingTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 1 ? (
        <MedicationBatchTracking />
      ) : (
        <DamagedExpiredMedications />
      )}
    </div>
  );
};

export default MedTracking;
