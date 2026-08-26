import { useState } from "react";
import {
  SUPPLIERS_DETAILS_ROWS,
  type SupplierFormValues,
  type SupplierRow,
} from "./data/purchasesFigma";
import PurchasesStepTabs from "./components/PurchasesStepTabs";
import SupplierRegistrationForm from "./components/SupplierRegistrationForm";
import SuppliersDetailsTable from "./components/SuppliersDetailsTable";
import PurchasedMedicationsEntry from "./components/PurchasedMedicationsEntry";

const Purchases = () => {
  const [activeStep, setActiveStep] = useState<1 | 2>(1);
  const [suppliers, setSuppliers] = useState<SupplierRow[]>(
    () => SUPPLIERS_DETAILS_ROWS
  );

  const handleConfirmSupplier = (values: SupplierFormValues) => {
    setSuppliers((prev) => [
      {
        id: Math.max(0, ...prev.map((row) => row.id)) + 1,
        date: "12-Mar-2025",
        time: "11:15 AM",
        supplierName: values.supplierName,
        orgName: values.orgName,
        officeAddress: values.officeAddress || "—",
        phoneCountryIso: values.phoneCountryIso,
        phoneCountryCode: values.phoneCountryCode,
        phoneNumber: values.phoneNumber,
        invoiceNumber: values.invoiceNumber,
      },
      ...prev,
    ]);
  };

  return (
    <div className="pb-8">
      <PurchasesStepTabs
        activeStep={activeStep}
        onStepChange={setActiveStep}
      />

      {activeStep === 1 ? (
        <>
          <SupplierRegistrationForm onConfirm={handleConfirmSupplier} />
          <SuppliersDetailsTable rows={suppliers} />
        </>
      ) : (
        <PurchasedMedicationsEntry />
      )}
    </div>
  );
};

export default Purchases;
