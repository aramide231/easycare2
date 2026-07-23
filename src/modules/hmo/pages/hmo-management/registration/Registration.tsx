import { useMemo, useState } from "react";
import HmoRegistrationTabs from "./components/HmoRegistrationTabs";
import HmoRegistrationForm from "./components/HmoRegistrationForm";
import HmoRegistrationDetailsTable from "./components/HmoRegistrationDetailsTable";
import UpdatedHmoTariffsPanel from "./components/UpdatedHmoTariffsPanel";
import {
  buildMockHmoRegistrationRecords,
  type HmoRegistrationRecord,
} from "./data/mockHmoRegistrationRecords";

const HmoRegistration = () => {
  const [activeTab, setActiveTab] = useState<"registration" | "tariffs">(
    "registration",
  );
  const [records, setRecords] = useState<HmoRegistrationRecord[]>(() =>
    buildMockHmoRegistrationRecords(),
  );

  const sortedRecords = useMemo(
    () => [...records].reverse(),
    [records],
  );

  const handleSubmit = (record: HmoRegistrationRecord) => {
    setRecords((prev) => [record, ...prev]);
  };

  return (
    <div className="mx-auto flex w-full max-w-[1020px] flex-col gap-10">
      <HmoRegistrationTabs activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === "registration" ? (
        <>
          <HmoRegistrationForm onSubmit={handleSubmit} />
          <HmoRegistrationDetailsTable
            records={sortedRecords}
            onDelete={(id) =>
              setRecords((prev) => prev.filter((record) => record.id !== id))
            }
          />
        </>
      ) : (
        <UpdatedHmoTariffsPanel hmoRecords={sortedRecords} />
      )}
    </div>
  );
};

export default HmoRegistration;
